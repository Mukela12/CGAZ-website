#!/usr/bin/env node
/**
 * Temporary Database Comparison Script
 * Compares local and production PostgreSQL databases
 *
 * Usage: node scripts/compare-databases.js
 */

const { Client } = require('pg');

// Database connection strings
const LOCAL_DB_URL = 'postgresql://mukelakatungu@localhost:5432/cgaz';
const PRODUCTION_DB_URL = 'postgresql://postgres:LlvVizawjDRrfLdeRNpvwUvYabBsNIXQ@maglev.proxy.rlwy.net:24245/railway';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(80));
  log(title, 'bold');
  console.log('='.repeat(80));
}

async function getClient(connectionString, name) {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    log(`✓ Connected to ${name} database`, 'green');
    return client;
  } catch (error) {
    log(`✗ Failed to connect to ${name}: ${error.message}`, 'red');
    throw error;
  }
}

async function getTables(client) {
  const result = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
    AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `);
  return result.rows.map(row => row.table_name);
}

async function getTableSchema(client, tableName) {
  const result = await client.query(`
    SELECT
      column_name,
      data_type,
      character_maximum_length,
      is_nullable,
      column_default
    FROM information_schema.columns
    WHERE table_schema = 'public'
    AND table_name = $1
    ORDER BY ordinal_position;
  `, [tableName]);
  return result.rows;
}

async function getRowCount(client, tableName) {
  try {
    const result = await client.query(`SELECT COUNT(*) as count FROM "${tableName}";`);
    return parseInt(result.rows[0].count, 10);
  } catch (error) {
    return -1;
  }
}

async function getTableData(client, tableName, limit = 100) {
  try {
    const result = await client.query(`SELECT * FROM "${tableName}" ORDER BY id LIMIT $1;`, [limit]);
    return result.rows;
  } catch (error) {
    // Table might not have an 'id' column, try without ORDER BY
    try {
      const result = await client.query(`SELECT * FROM "${tableName}" LIMIT $1;`, [limit]);
      return result.rows;
    } catch (e) {
      return [];
    }
  }
}

async function compareSchemas(localSchema, prodSchema, tableName) {
  const differences = [];

  const localCols = new Map(localSchema.map(col => [col.column_name, col]));
  const prodCols = new Map(prodSchema.map(col => [col.column_name, col]));

  // Find columns in local but not in production
  for (const [colName, colDef] of localCols) {
    if (!prodCols.has(colName)) {
      differences.push({
        type: 'missing_in_production',
        column: colName,
        details: colDef
      });
    }
  }

  // Find columns in production but not in local
  for (const [colName, colDef] of prodCols) {
    if (!localCols.has(colName)) {
      differences.push({
        type: 'missing_in_local',
        column: colName,
        details: colDef
      });
    }
  }

  // Find columns with different definitions
  for (const [colName, localCol] of localCols) {
    if (prodCols.has(colName)) {
      const prodCol = prodCols.get(colName);
      if (localCol.data_type !== prodCol.data_type ||
          localCol.is_nullable !== prodCol.is_nullable) {
        differences.push({
          type: 'different_definition',
          column: colName,
          local: localCol,
          production: prodCol
        });
      }
    }
  }

  return differences;
}

function formatDataForComparison(data) {
  return data.map(row => {
    const formatted = {};
    for (const [key, value] of Object.entries(row)) {
      if (value instanceof Date) {
        formatted[key] = value.toISOString();
      } else if (typeof value === 'object' && value !== null) {
        formatted[key] = JSON.stringify(value);
      } else {
        formatted[key] = value;
      }
    }
    return formatted;
  });
}

async function main() {
  let localClient, prodClient;

  try {
    logSection('DATABASE COMPARISON TOOL');
    log('Comparing LOCAL vs PRODUCTION databases\n');

    // Connect to both databases
    log('Connecting to databases...', 'cyan');
    localClient = await getClient(LOCAL_DB_URL, 'LOCAL');
    prodClient = await getClient(PRODUCTION_DB_URL, 'PRODUCTION');

    // Get tables from both databases
    logSection('TABLE COMPARISON');
    const localTables = await getTables(localClient);
    const prodTables = await getTables(prodClient);

    log(`\nLocal tables (${localTables.length}): ${localTables.join(', ')}`, 'blue');
    log(`Production tables (${prodTables.length}): ${prodTables.join(', ')}`, 'magenta');

    // Find table differences
    const tablesOnlyInLocal = localTables.filter(t => !prodTables.includes(t));
    const tablesOnlyInProd = prodTables.filter(t => !localTables.includes(t));
    const commonTables = localTables.filter(t => prodTables.includes(t));

    if (tablesOnlyInLocal.length > 0) {
      log(`\n⚠ Tables ONLY in LOCAL: ${tablesOnlyInLocal.join(', ')}`, 'yellow');
    }
    if (tablesOnlyInProd.length > 0) {
      log(`\n⚠ Tables ONLY in PRODUCTION: ${tablesOnlyInProd.join(', ')}`, 'yellow');
    }

    // Compare row counts for common tables
    logSection('ROW COUNT COMPARISON');
    console.log('\n%-30s | %10s | %10s | %s', 'Table', 'Local', 'Prod', 'Difference');
    console.log('-'.repeat(70));

    const rowCountDifferences = [];

    for (const table of commonTables) {
      const localCount = await getRowCount(localClient, table);
      const prodCount = await getRowCount(prodClient, table);
      const diff = localCount - prodCount;

      let diffStr = diff === 0 ? '=' : (diff > 0 ? `+${diff}` : `${diff}`);
      let color = diff === 0 ? 'reset' : (diff > 0 ? 'green' : 'red');

      if (diff !== 0) {
        rowCountDifferences.push({ table, localCount, prodCount, diff });
      }

      console.log(`${table.padEnd(30)} | ${String(localCount).padStart(10)} | ${String(prodCount).padStart(10)} | ${colors[color]}${diffStr}${colors.reset}`);
    }

    // Highlight tables with data differences
    if (rowCountDifferences.length > 0) {
      logSection('TABLES WITH DATA DIFFERENCES');
      for (const { table, localCount, prodCount, diff } of rowCountDifferences) {
        if (diff > 0) {
          log(`\n📦 ${table}: ${diff} more rows in LOCAL than PRODUCTION`, 'green');
        } else {
          log(`\n📦 ${table}: ${Math.abs(diff)} more rows in PRODUCTION than LOCAL`, 'red');
        }
      }
    }

    // Detailed data comparison for key tables (especially partners)
    const tablesToCompare = ['partners', 'team_members', 'projects', 'blog_posts', 'success_stories', 'resources'];

    for (const table of tablesToCompare) {
      if (!commonTables.includes(table)) continue;

      const localCount = await getRowCount(localClient, table);
      const prodCount = await getRowCount(prodClient, table);

      if (localCount !== prodCount || table === 'partners') {
        logSection(`DETAILED COMPARISON: ${table.toUpperCase()}`);

        const localData = await getTableData(localClient, table);
        const prodData = await getTableData(prodClient, table);

        // Create sets of IDs for comparison
        const localIds = new Set(localData.map(r => r.id));
        const prodIds = new Set(prodData.map(r => r.id));

        const onlyInLocal = localData.filter(r => !prodIds.has(r.id));
        const onlyInProd = prodData.filter(r => !localIds.has(r.id));

        if (onlyInLocal.length > 0) {
          log(`\n🔸 Records ONLY in LOCAL (${onlyInLocal.length}):`, 'green');
          for (const record of onlyInLocal) {
            // Display key fields based on table
            if (table === 'partners') {
              log(`   ID: ${record.id} | Name: ${record.name || 'N/A'} | Type: ${record.partner_type || record.type || 'N/A'}`, 'green');
            } else if (table === 'team_members') {
              log(`   ID: ${record.id} | Name: ${record.name || 'N/A'} | Role: ${record.role || 'N/A'}`, 'green');
            } else if (table === 'projects') {
              log(`   ID: ${record.id} | Title: ${record.title || 'N/A'} | Status: ${record.status || 'N/A'}`, 'green');
            } else if (table === 'blog_posts') {
              log(`   ID: ${record.id} | Title: ${record.title || 'N/A'} | Slug: ${record.slug || 'N/A'}`, 'green');
            } else {
              log(`   ID: ${record.id} | ${JSON.stringify(record).substring(0, 100)}...`, 'green');
            }
          }
        }

        if (onlyInProd.length > 0) {
          log(`\n🔹 Records ONLY in PRODUCTION (${onlyInProd.length}):`, 'magenta');
          for (const record of onlyInProd) {
            if (table === 'partners') {
              log(`   ID: ${record.id} | Name: ${record.name || 'N/A'} | Type: ${record.partner_type || record.type || 'N/A'}`, 'magenta');
            } else if (table === 'team_members') {
              log(`   ID: ${record.id} | Name: ${record.name || 'N/A'} | Role: ${record.role || 'N/A'}`, 'magenta');
            } else if (table === 'projects') {
              log(`   ID: ${record.id} | Title: ${record.title || 'N/A'} | Status: ${record.status || 'N/A'}`, 'magenta');
            } else if (table === 'blog_posts') {
              log(`   ID: ${record.id} | Title: ${record.title || 'N/A'} | Slug: ${record.slug || 'N/A'}`, 'magenta');
            } else {
              log(`   ID: ${record.id} | ${JSON.stringify(record).substring(0, 100)}...`, 'magenta');
            }
          }
        }

        // Show common records with differences
        const commonIds = [...localIds].filter(id => prodIds.has(id));
        let recordsWithDifferences = 0;

        for (const id of commonIds) {
          const localRecord = localData.find(r => r.id === id);
          const prodRecord = prodData.find(r => r.id === id);

          const localFormatted = formatDataForComparison([localRecord])[0];
          const prodFormatted = formatDataForComparison([prodRecord])[0];

          const differences = [];
          for (const key of Object.keys(localFormatted)) {
            if (localFormatted[key] !== prodFormatted[key]) {
              // Skip updated_at and similar timestamp fields for noise reduction
              if (!['updated_at', 'created_at'].includes(key)) {
                differences.push(key);
              }
            }
          }

          if (differences.length > 0) {
            recordsWithDifferences++;
            if (recordsWithDifferences <= 5) { // Limit output
              log(`\n🔄 Record ID ${id} has differences in: ${differences.join(', ')}`, 'yellow');
              for (const key of differences.slice(0, 3)) { // Show first 3 differences
                const localVal = String(localFormatted[key]).substring(0, 50);
                const prodVal = String(prodFormatted[key]).substring(0, 50);
                log(`   ${key}: LOCAL="${localVal}" vs PROD="${prodVal}"`, 'yellow');
              }
            }
          }
        }

        if (recordsWithDifferences > 5) {
          log(`\n... and ${recordsWithDifferences - 5} more records with differences`, 'yellow');
        }
      }
    }

    // Schema comparison
    logSection('SCHEMA COMPARISON');
    for (const table of commonTables) {
      const localSchema = await getTableSchema(localClient, table);
      const prodSchema = await getTableSchema(prodClient, table);

      const differences = await compareSchemas(localSchema, prodSchema, table);

      if (differences.length > 0) {
        log(`\n⚠ Schema differences in "${table}":`, 'yellow');
        for (const diff of differences) {
          if (diff.type === 'missing_in_production') {
            log(`   Column "${diff.column}" exists in LOCAL but not in PRODUCTION`, 'green');
          } else if (diff.type === 'missing_in_local') {
            log(`   Column "${diff.column}" exists in PRODUCTION but not in LOCAL`, 'magenta');
          } else if (diff.type === 'different_definition') {
            log(`   Column "${diff.column}" has different definition`, 'yellow');
          }
        }
      }
    }

    // Summary and recommendations
    logSection('SUMMARY');

    const totalLocalRows = rowCountDifferences.filter(d => d.diff > 0).reduce((sum, d) => sum + d.diff, 0);
    const totalProdRows = rowCountDifferences.filter(d => d.diff < 0).reduce((sum, d) => sum + Math.abs(d.diff), 0);

    if (totalLocalRows > 0) {
      log(`\n📊 LOCAL has ${totalLocalRows} more rows across ${rowCountDifferences.filter(d => d.diff > 0).length} tables`, 'green');
      log('   These records may need to be migrated to PRODUCTION', 'cyan');
    }

    if (totalProdRows > 0) {
      log(`\n📊 PRODUCTION has ${totalProdRows} more rows across ${rowCountDifferences.filter(d => d.diff < 0).length} tables`, 'magenta');
    }

    // Generate SQL to sync data if needed
    const tablesWithLocalOnlyData = rowCountDifferences.filter(d => d.diff > 0).map(d => d.table);
    if (tablesWithLocalOnlyData.length > 0) {
      logSection('DATA SYNC SUGGESTION');
      log('\nTo sync LOCAL data to PRODUCTION, you can use pg_dump:', 'cyan');
      for (const table of tablesWithLocalOnlyData) {
        log(`\n# Export ${table} from local:`, 'yellow');
        log(`pg_dump -h localhost -U mukelakatungu -d cgaz -t ${table} --data-only --inserts > ${table}_data.sql`);
        log(`\n# Import to production (review the SQL first!):`, 'yellow');
        log(`psql "postgresql://postgres:LlvVizawjDRrfLdeRNpvwUvYabBsNIXQ@maglev.proxy.rlwy.net:24245/railway" < ${table}_data.sql`);
      }
    }

  } catch (error) {
    log(`\n❌ Error: ${error.message}`, 'red');
    console.error(error);
  } finally {
    if (localClient) await localClient.end();
    if (prodClient) await prodClient.end();
    log('\n✓ Database connections closed', 'green');
  }
}

main();

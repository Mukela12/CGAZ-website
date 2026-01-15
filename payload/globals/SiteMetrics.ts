import { GlobalConfig } from 'payload'

export const SiteMetrics: GlobalConfig = {
  slug: 'site-metrics',
  label: 'Site Metrics & Statistics',

  access: {
    // Everyone can read metrics (public)
    read: () => true,
    // Only admins can update
    update: ({ req: { user } }) => !!user,
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Current Metrics',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'membersCount',
                  type: 'number',
                  required: true,
                  label: 'Registered Members',
                  defaultValue: 22490,
                  admin: {
                    width: '50%',
                    description: 'Total number of registered CGAZ members',
                  },
                },
                {
                  name: 'centersCount',
                  type: 'number',
                  required: true,
                  label: 'Development Centers',
                  defaultValue: 145,
                  admin: {
                    width: '50%',
                    description: 'Number of development centers',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'districtsCount',
                  type: 'number',
                  required: true,
                  label: 'Districts Covered',
                  defaultValue: 10,
                  admin: {
                    width: '50%',
                    description: 'Number of districts with CGAZ presence',
                  },
                },
                {
                  name: 'growthRate',
                  type: 'text',
                  required: true,
                  label: 'Growth Rate',
                  defaultValue: '85%',
                  admin: {
                    width: '50%',
                    description: 'Year-over-year growth rate (include % symbol)',
                  },
                },
              ],
            },
            {
              name: 'lastUpdated',
              type: 'date',
              label: 'Last Updated',
              admin: {
                description: 'Date when these metrics were last updated',
                date: {
                  displayFormat: 'MMMM d, yyyy',
                },
              },
            },
          ],
        },
        {
          label: 'Additional Stats',
          fields: [
            {
              name: 'totalProduction',
              type: 'text',
              label: 'Total Production (Metric Tons)',
              admin: {
                description: 'Annual cashew production (optional)',
              },
            },
            {
              name: 'exportValue',
              type: 'text',
              label: 'Export Value',
              admin: {
                description: 'Annual export value in USD (optional)',
              },
            },
            {
              name: 'trainedFarmers',
              type: 'number',
              label: 'Farmers Trained',
              admin: {
                description: 'Total number of farmers who completed training (optional)',
              },
            },
            {
              name: 'certifiedFarmers',
              type: 'number',
              label: 'Certified Farmers',
              admin: {
                description: 'Number of certified organic/quality farmers (optional)',
              },
            },
          ],
        },
        {
          label: 'Display Settings',
          fields: [
            {
              name: 'showOnHomepage',
              type: 'checkbox',
              label: 'Show Metrics on Homepage',
              defaultValue: true,
            },
            {
              name: 'showInFooter',
              type: 'checkbox',
              label: 'Show Member Count in Footer',
              defaultValue: true,
            },
            {
              name: 'animateCounters',
              type: 'checkbox',
              label: 'Animate Number Counters',
              defaultValue: true,
              admin: {
                description: 'Enable animated counting effect for metrics',
              },
            },
            {
              name: 'displayNotes',
              type: 'textarea',
              label: 'Admin Notes',
              admin: {
                description: 'Internal notes about these metrics (not visible to public)',
              },
            },
          ],
        },
      ],
    },
  ],
}

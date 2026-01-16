import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'type', 'status', 'displayOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Organization Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'Auto-generated from name, used in URLs',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'International Development', value: 'international-development' },
        { label: 'Government', value: 'government' },
        { label: 'NGO', value: 'ngo' },
        { label: 'Private Sector', value: 'private' },
        { label: 'Technical Partner', value: 'technical' },
        { label: 'Financial Institution', value: 'financial' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active Partnership', value: 'active' },
        { label: 'Previous Partner', value: 'previous' },
      ],
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Partner Logo',
      admin: {
        description: 'Upload a logo image (recommended: PNG with transparent background)',
      },
    },
    {
      name: 'logoUrl',
      type: 'text',
      label: 'Logo URL (Cloudinary)',
      admin: {
        description: 'Direct Cloudinary URL for the logo (used if no logo uploaded)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Partnership Description',
      admin: {
        description: 'Brief description of the partnership and collaboration',
      },
    },
    {
      name: 'website',
      type: 'text',
      label: 'Website URL',
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country/Region',
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Partnership Start Date',
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'Partnership End Date',
      admin: {
        description: 'Leave empty for ongoing partnerships',
      },
    },
    {
      name: 'projects',
      type: 'array',
      label: 'Related Projects',
      fields: [
        {
          name: 'projectName',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'text',
        },
        {
          name: 'funding',
          type: 'text',
          label: 'Funding Amount',
        },
      ],
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first on the partners page',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Partner',
      admin: {
        description: 'Show prominently on homepage',
      },
    },
  ],
}

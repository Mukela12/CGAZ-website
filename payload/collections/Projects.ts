import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'status', 'startDate', 'district'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Project Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Planning', value: 'planning' },
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
      ],
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      label: 'Project Summary',
      admin: {
        description: 'Brief 2-3 sentence description',
      },
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      label: 'Full Description',
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
      label: 'Start Date',
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      admin: {
        description: 'Leave empty for ongoing projects',
      },
    },
    {
      name: 'fundingAgency',
      type: 'relationship',
      relationTo: 'partners',
      hasMany: true,
      label: 'Funding Partners',
    },
    {
      name: 'budget',
      type: 'text',
      label: 'Total Budget',
    },
    {
      name: 'district',
      type: 'select',
      hasMany: true,
      required: true,
      options: [
        { label: 'Sikongo', value: 'sikongo' },
        { label: 'Kalabo', value: 'kalabo' },
        { label: 'Limulunga', value: 'limulunga' },
        { label: 'Lukulu', value: 'lukulu' },
        { label: 'Mitete', value: 'mitete' },
        { label: 'Mongu', value: 'mongu' },
        { label: 'Nalolo', value: 'nalolo' },
        { label: 'Senanga', value: 'senanga' },
        { label: 'Sioma', value: 'sioma' },
        { label: 'Shangombo', value: 'shangombo' },
      ],
    },
    {
      name: 'impactMetrics',
      type: 'group',
      label: 'Impact Metrics',
      fields: [
        {
          name: 'beneficiaries',
          type: 'number',
          label: 'Total Beneficiaries',
        },
        {
          name: 'women',
          type: 'number',
          label: 'Women Beneficiaries',
        },
        {
          name: 'youth',
          type: 'number',
          label: 'Youth Beneficiaries',
        },
        {
          name: 'treesPlanted',
          type: 'number',
          label: 'Cashew Trees Planted',
        },
        {
          name: 'hectares',
          type: 'number',
          label: 'Hectares Covered',
        },
        {
          name: 'jobsCreated',
          type: 'number',
          label: 'Jobs Created',
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Featured Image',
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Photo Gallery',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Project',
      admin: {
        description: 'Show on homepage',
      },
    },
  ],
}

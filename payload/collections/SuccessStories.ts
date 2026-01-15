import type { CollectionConfig } from 'payload'

export const SuccessStories: CollectionConfig = {
  slug: 'success-stories',
  admin: {
    useAsTitle: 'farmerName',
    group: 'Content',
    defaultColumns: ['farmerName', 'location', 'featured'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'farmerName',
      type: 'text',
      required: true,
      label: 'Farmer Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Village/District',
    },
    {
      name: 'memberSince',
      type: 'text',
      required: true,
      label: 'Member Since (Year)',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Farmer Photo',
    },
    {
      name: 'story',
      type: 'textarea',
      required: true,
      label: 'Success Story',
      admin: {
        description: 'The farmer\'s journey and transformation',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      label: 'Testimonial Quote',
      admin: {
        description: 'Direct quote from the farmer',
      },
    },
    {
      name: 'achievements',
      type: 'array',
      required: true,
      label: 'Key Achievements',
      fields: [
        {
          name: 'achievement',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'metrics',
      type: 'group',
      label: 'Success Metrics',
      fields: [
        {
          name: 'incomeIncrease',
          type: 'text',
          label: 'Income Increase %',
        },
        {
          name: 'harvestYield',
          type: 'text',
          label: 'Harvest Yield',
        },
        {
          name: 'treesPlanted',
          type: 'text',
          label: 'Trees Planted',
        },
        {
          name: 'farmSize',
          type: 'text',
          label: 'Farm Size',
        },
        {
          name: 'jobsCreated',
          type: 'text',
          label: 'Jobs Created',
        },
      ],
    },
    {
      name: 'beforePhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'Before Photo',
    },
    {
      name: 'afterPhoto',
      type: 'upload',
      relationTo: 'media',
      label: 'After Photo',
    },
    {
      name: 'videoTestimonial',
      type: 'text',
      label: 'Video Testimonial URL',
      admin: {
        description: 'YouTube or Vimeo URL',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured Story',
      admin: {
        description: 'Show on homepage and success stories page',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
    },
  ],
}

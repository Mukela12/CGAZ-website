import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    group: 'Content',
    defaultColumns: ['name', 'position', 'department', 'displayOrder'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      label: 'Job Title/Position',
    },
    {
      name: 'department',
      type: 'select',
      required: true,
      options: [
        { label: 'Management', value: 'management' },
        { label: 'Technical', value: 'technical' },
        { label: 'Field Operations', value: 'field' },
        { label: 'Administration', value: 'admin' },
        { label: 'Board of Directors', value: 'board' },
      ],
    },
    {
      name: 'qualification',
      type: 'text',
      label: 'Highest Qualification',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Short Biography',
    },
    {
      name: 'photo',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'nrc',
      type: 'text',
      label: 'NRC Number',
      admin: {
        description: 'National Registration Card number (admin only)',
      },
      access: {
        read: ({ req }) => req.user?.role === 'admin',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Show on website',
      },
    },
  ],
}

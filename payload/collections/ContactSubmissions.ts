import { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'status', 'createdAt'],
    group: 'Forms & Submissions',
  },

  access: {
    // Public can create submissions
    create: () => true,
    // Only admins can read submissions
    read: ({ req: { user } }) => !!user,
    // Only admins can update
    update: ({ req: { user } }) => !!user,
    // Only admins can delete
    delete: ({ req: { user } }) => !!user,
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Phone Number',
    },
    {
      name: 'subject',
      type: 'select',
      required: true,
      options: [
        { label: 'Membership Inquiry', value: 'membership' },
        { label: 'Partnership Opportunities', value: 'partnership' },
        { label: 'Product Information', value: 'products' },
        { label: 'Training Programs', value: 'training' },
        { label: 'General Inquiry', value: 'general' },
      ],
      defaultValue: 'general',
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Message',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Resolved', value: 'resolved' },
      ],
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      label: 'Admin Notes',
      admin: {
        position: 'sidebar',
        description: 'Internal notes (not visible to submitter)',
      },
      access: {
        // Only admins can read and update this field
        read: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
      },
    },
  ],

  timestamps: true,
}

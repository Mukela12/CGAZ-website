import { CollectionConfig } from 'payload'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',

  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'status', 'subscribedAt', 'source'],
    group: 'Forms & Submissions',
  },

  access: {
    // Public can create subscriptions
    create: () => true,
    // Only admins can read subscribers
    read: ({ req: { user } }) => !!user,
    // Only admins can update
    update: ({ req: { user } }) => !!user,
    // Only admins can delete
    delete: ({ req: { user } }) => !!user,
  },

  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      label: 'Email Address',
      index: true,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name (Optional)',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
        { label: 'Bounced', value: 'bounced' },
      ],
      defaultValue: 'active',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'subscribedAt',
      type: 'date',
      label: 'Subscription Date',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Automatically set when subscriber is created',
      },
    },
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Website Footer', value: 'website' },
        { label: 'Contact Form', value: 'contact' },
        { label: 'Manual Entry', value: 'manual' },
        { label: 'Event Registration', value: 'event' },
        { label: 'Course Registration', value: 'course' },
      ],
      defaultValue: 'website',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'welcomeEmailSent',
      type: 'checkbox',
      label: 'Welcome Email Sent',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Automatically updated when welcome email is sent',
      },
    },
    {
      name: 'preferences',
      type: 'group',
      label: 'Email Preferences',
      fields: [
        {
          name: 'newsUpdates',
          type: 'checkbox',
          label: 'News & Updates',
          defaultValue: true,
        },
        {
          name: 'trainingAnnouncements',
          type: 'checkbox',
          label: 'Training Announcements',
          defaultValue: true,
        },
        {
          name: 'eventInvitations',
          type: 'checkbox',
          label: 'Event Invitations',
          defaultValue: true,
        },
        {
          name: 'marketUpdates',
          type: 'checkbox',
          label: 'Market Price Updates',
          defaultValue: true,
        },
      ],
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
        description: 'Internal notes about this subscriber',
      },
      access: {
        read: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
      },
    },
  ],

  hooks: {
    beforeChange: [
      ({ operation, data }) => {
        // Auto-set subscribedAt on create
        if (operation === 'create' && !data.subscribedAt) {
          data.subscribedAt = new Date().toISOString()
        }
        return data
      },
    ],
  },

  timestamps: true,
}

import { CollectionConfig } from 'payload'

export const CourseRegistrations: CollectionConfig = {
  slug: 'course-registrations',

  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'courseName', 'status', 'createdAt'],
    group: 'Forms & Submissions',
  },

  access: {
    // Public can create registrations
    create: () => true,
    // Only admins can read registrations
    read: ({ req: { user } }) => !!user,
    // Only admins can update
    update: ({ req: { user } }) => !!user,
    // Only admins can delete
    delete: ({ req: { user } }) => !!user,
  },

  fields: [
    // Personal Information
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Full Name',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          label: 'Email Address',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone Number',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'district',
          type: 'text',
          required: true,
          label: 'District',
          admin: {
            width: '50%',
          },
        },
      ],
    },

    // Course Details
    {
      name: 'courseName',
      type: 'select',
      required: true,
      label: 'Course/Training Program',
      options: [
        { label: 'Foundation Course - Cashew Cultivation Basics', value: 'foundation' },
        { label: 'Integrated Pest Management', value: 'pest-management' },
        { label: 'Pruning & Tree Management', value: 'pruning' },
        { label: 'Post-Harvest Handling', value: 'post-harvest' },
        { label: 'Advanced Processing Techniques', value: 'advanced-processing' },
        { label: 'Quality Control & Certification', value: 'quality-control' },
        { label: 'Business & Marketing Skills', value: 'business-marketing' },
      ],
    },
    {
      name: 'preferredDate',
      type: 'text',
      label: 'Preferred Training Date/Month',
      admin: {
        description: 'When would you like to attend? (e.g., "January 2026" or "Next available")',
      },
    },
    {
      name: 'farmingExperience',
      type: 'select',
      required: true,
      label: 'Cashew Farming Experience',
      options: [
        { label: 'Beginner (0-2 years)', value: 'beginner' },
        { label: 'Intermediate (3-5 years)', value: 'intermediate' },
        { label: 'Advanced (5+ years)', value: 'advanced' },
        { label: 'Not yet started', value: 'none' },
      ],
    },

    // Payment Information
    {
      name: 'paymentMethod',
      type: 'select',
      label: 'Payment Method',
      options: [
        { label: 'MTN Mobile Money', value: 'mtn-mobile-money' },
        { label: 'Airtel Money', value: 'airtel-money' },
        { label: 'Zamtel Kwacha', value: 'zamtel-kwacha' },
        { label: 'Bank Transfer', value: 'bank-transfer' },
        { label: 'Cash (In Person)', value: 'cash' },
        { label: 'Will Pay Later', value: 'pending' },
      ],
    },
    {
      name: 'paymentAmount',
      type: 'text',
      label: 'Payment Amount (ZMW)',
      admin: {
        description: 'Enter the amount paid or intended to pay',
      },
    },
    {
      name: 'paymentReceipt',
      type: 'upload',
      relationTo: 'media',
      label: 'Payment Receipt/Screenshot',
      admin: {
        description: 'Upload screenshot of mobile money transaction or bank receipt (optional)',
      },
    },
    {
      name: 'transactionReference',
      type: 'text',
      label: 'Transaction Reference/ID',
      admin: {
        description: 'Mobile money or bank transaction reference number',
      },
    },

    // Additional Information
    {
      name: 'additionalNotes',
      type: 'textarea',
      label: 'Additional Notes/Questions',
    },

    // Admin Fields
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Pending Review', value: 'pending' },
        { label: 'Payment Verified', value: 'payment-verified' },
        { label: 'Approved - Awaiting Schedule', value: 'approved' },
        { label: 'Confirmed - Date Assigned', value: 'confirmed' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
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
        description: 'Internal notes about this registration (not visible to registrant)',
      },
      access: {
        read: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
      },
    },
    {
      name: 'assignedTrainingDate',
      type: 'date',
      label: 'Assigned Training Date',
      admin: {
        position: 'sidebar',
        description: 'Actual date when training is scheduled',
      },
      access: {
        read: ({ req: { user } }) => !!user,
        update: ({ req: { user } }) => !!user,
      },
    },
  ],

  timestamps: true,

  upload: {
    staticDir: 'public/receipts',
    mimeTypes: ['image/*', 'application/pdf'],
  },
}

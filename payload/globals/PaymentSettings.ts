import { GlobalConfig } from 'payload'

export const PaymentSettings: GlobalConfig = {
  slug: 'payment-settings',
  label: 'Payment Settings',

  access: {
    read: () => true, // Public can read
    update: ({ req: { user } }) => !!user, // Only admin can update
  },

  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Mobile Money',
          fields: [
            {
              name: 'enableMobileMoney',
              type: 'checkbox',
              label: 'Enable Mobile Money Payments',
              defaultValue: true,
            },
            {
              name: 'mobileMoneyNumber',
              type: 'text',
              label: 'Mobile Money Number',
              required: true,
              defaultValue: '+260 97 7429666',
              admin: {
                description: 'The number users should send payments to',
              },
            },
            {
              name: 'mobileMoneyName',
              type: 'text',
              label: 'Account Holder Name',
              defaultValue: 'Cashew Growers Association of Zambia',
            },
            {
              name: 'mobileMoneyInstructions',
              type: 'textarea',
              label: 'Instructions',
              defaultValue: 'Send your training fee to the mobile money number above and upload your payment receipt.',
            },
          ],
        },
        {
          label: 'Bank Transfer',
          fields: [
            {
              name: 'enableBankTransfer',
              type: 'checkbox',
              label: 'Enable Bank Transfer Payments',
              defaultValue: true,
            },
            {
              name: 'bankName',
              type: 'text',
              label: 'Bank Name',
              defaultValue: 'Zambia National Commercial Bank',
            },
            {
              name: 'branchName',
              type: 'text',
              label: 'Branch Name',
              defaultValue: 'Woodlands Branch',
            },
            {
              name: 'sortCode',
              type: 'text',
              label: 'Sort Code',
              defaultValue: '010085',
            },
            {
              name: 'swiftCode',
              type: 'text',
              label: 'SWIFT Code',
              defaultValue: 'ZNCOZMLU',
            },
            {
              name: 'accountNumber',
              type: 'text',
              label: 'Account Number',
              required: true,
              defaultValue: '6360061500130',
            },
            {
              name: 'accountName',
              type: 'text',
              label: 'Account Name',
              defaultValue: 'Cashew Growers Association of Zambia',
            },
            {
              name: 'bankInstructions',
              type: 'textarea',
              label: 'Instructions',
              defaultValue: 'Transfer training fees using the bank details above and upload proof of payment.',
            },
          ],
        },
        {
          label: 'Cash Payment',
          fields: [
            {
              name: 'enableCash',
              type: 'checkbox',
              label: 'Enable Cash Payments',
              defaultValue: true,
            },
            {
              name: 'cashInstructions',
              type: 'textarea',
              label: 'Instructions',
              defaultValue: 'Visit any CGAZ development center to make cash payments in person. Bring your registration confirmation.',
            },
          ],
        },
      ],
    },
  ],
}

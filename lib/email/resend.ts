import { Resend } from 'resend'

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email configuration
const FROM_EMAIL = process.env.FROM_EMAIL || 'contact@fluxium.dev'
const FROM_NAME = process.env.FROM_NAME || 'Cashew Growers Association of Zambia'
const FROM = `${FROM_NAME} <${FROM_EMAIL}>`

// Base email sending function
export async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[]
  subject: string
  html: string
  replyTo?: string
}) {
  try {
    const data = await resend.emails.send({
      from: FROM,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo,
    })

    console.log('✅ Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('❌ Email error:', error)
    return { success: false, error }
  }
}

// Contact form notification to admin
export async function sendContactFormNotification(submission: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  const subjectLabels: Record<string, string> = {
    membership: 'Membership Inquiry',
    partnership: 'Partnership Opportunities',
    products: 'Product Information',
    training: 'Training Programs',
    general: 'General Inquiry',
  }

  const subjectText = subjectLabels[submission.subject] || 'Contact Form'

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #8B4513; margin-bottom: 5px; }
          .value { background: white; padding: 10px; border-radius: 4px; border-left: 3px solid #D2691E; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🥜 New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">CGAZ Website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Subject Type:</div>
              <div class="value">${subjectText}</div>
            </div>

            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${submission.name}</div>
            </div>

            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${submission.email}">${submission.email}</a></div>
            </div>

            ${
              submission.phone
                ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${submission.phone}</div>
            </div>
            `
                : ''
            }

            <div class="field">
              <div class="label">Message:</div>
              <div class="value">${submission.message.replace(/\n/g, '<br>')}</div>
            </div>

            <div class="footer">
              <p>This email was sent from the CGAZ website contact form.</p>
              <p>Reply directly to this email to respond to ${submission.name}.</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: FROM_EMAIL,
    subject: `[CGAZ Contact] ${subjectText} - ${submission.name}`,
    html,
    replyTo: submission.email,
  })
}

// Newsletter welcome email
export async function sendNewsletterWelcomeEmail(email: string, name?: string) {
  const displayName = name || 'Friend'

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 40px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #8B4513; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 32px;">🥜 Welcome to CGAZ!</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">Cashew Growers Association of Zambia</p>
          </div>
          <div class="content">
            <h2 style="color: #8B4513; margin-top: 0;">Hello ${displayName}!</h2>

            <p>Thank you for subscribing to the CGAZ newsletter. We're thrilled to have you join our community of cashew farmers, partners, and enthusiasts!</p>

            <p>You'll now receive regular updates about:</p>
            <ul style="line-height: 2;">
              <li>🌱 Latest news and success stories from our farmers</li>
              <li>📚 Training programs and workshops</li>
              <li>🎯 Market updates and product information</li>
              <li>🤝 Partnership opportunities and events</li>
              <li>📊 Industry insights and best practices</li>
            </ul>

            <p><strong>What's Next?</strong></p>
            <p>Explore our website to learn more about CGAZ's mission, meet our team, and discover the amazing work we're doing across Zambia's cashew farming communities.</p>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}" class="button" style="color: white;">Visit CGAZ Website</a>
            </div>

            <div class="footer">
              <p><strong>Cashew Growers Association of Zambia</strong></p>
              <p>Mongu, Western Province, Zambia</p>
              <p>📧 ${FROM_EMAIL}</p>
              <p style="margin-top: 15px; font-size: 11px;">
                You're receiving this because you subscribed to CGAZ updates.<br>
                You can manage your preferences or unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: 'Welcome to CGAZ - Your Subscription is Confirmed! 🥜',
    html,
  })
}

// Course registration confirmation
export async function sendCourseRegistrationConfirmation(registration: {
  name: string
  email: string
  courseName: string
  phone?: string
  district?: string
  preferredDate?: string
}) {
  const courseNames: Record<string, string> = {
    foundation: 'Foundation Course - Cashew Cultivation Basics',
    'pest-management': 'Integrated Pest Management',
    pruning: 'Pruning & Tree Management',
    'post-harvest': 'Post-Harvest Handling',
    'advanced-processing': 'Advanced Processing Techniques',
    'quality-control': 'Quality Control & Certification',
    'business-marketing': 'Business & Marketing Skills',
  }

  const courseName = courseNames[registration.courseName] || registration.courseName

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #8B4513 0%, #D2691E 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 40px; border-radius: 0 0 8px 8px; }
          .info-box { background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #D2691E; margin: 20px 0; }
          .status-badge { display: inline-block; background: #4CAF50; color: white; padding: 8px 15px; border-radius: 20px; font-size: 14px; font-weight: bold; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 32px;">✅ Registration Received!</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.9;">CGAZ Training Program</p>
          </div>
          <div class="content">
            <div style="text-align: center; margin-bottom: 30px;">
              <span class="status-badge">🎓 Registration Pending Review</span>
            </div>

            <h2 style="color: #8B4513; margin-top: 0;">Hello ${registration.name}!</h2>

            <p>Thank you for registering for our training program. We've received your application and our team is reviewing it.</p>

            <div class="info-box">
              <h3 style="margin-top: 0; color: #8B4513;">📋 Your Registration Details</h3>
              <p><strong>Course:</strong> ${courseName}</p>
              <p><strong>Name:</strong> ${registration.name}</p>
              <p><strong>Email:</strong> ${registration.email}</p>
              ${registration.phone ? `<p><strong>Phone:</strong> ${registration.phone}</p>` : ''}
              ${registration.district ? `<p><strong>District:</strong> ${registration.district}</p>` : ''}
              ${registration.preferredDate ? `<p><strong>Preferred Date:</strong> ${registration.preferredDate}</p>` : ''}
            </div>

            <h3 style="color: #8B4513;">What Happens Next?</h3>
            <ol style="line-height: 2;">
              <li><strong>Review:</strong> Our team will review your registration within 2-3 business days</li>
              <li><strong>Payment Verification:</strong> If you submitted a payment receipt, we'll verify it</li>
              <li><strong>Confirmation:</strong> You'll receive an email with your training schedule and location</li>
              <li><strong>Training Day:</strong> Attend your session and gain valuable skills!</li>
            </ol>

            <div class="info-box" style="background: #FFF3CD; border-left-color: #FFC107;">
              <p style="margin: 0;"><strong>💡 Important:</strong> Please save this email for your records. If you have any questions or need to make changes to your registration, reply to this email or contact us directly.</p>
            </div>

            <div class="footer">
              <p><strong>Cashew Growers Association of Zambia</strong></p>
              <p>Mongu, Western Province, Zambia</p>
              <p>📧 ${FROM_EMAIL}</p>
              <p style="margin-top: 15px;">
                Need help? Reply to this email or visit our website.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: registration.email,
    subject: `Training Registration Confirmed - ${courseName}`,
    html,
    replyTo: FROM_EMAIL,
  })
}

// Admin notification for new course registration
export async function sendCourseRegistrationAdminNotification(registration: {
  name: string
  email: string
  phone?: string
  district?: string
  courseName: string
  preferredDate?: string
  farmingExperience?: string
  paymentMethod?: string
  paymentAmount?: string
  transactionReference?: string
  additionalNotes?: string
}) {
  const courseNames: Record<string, string> = {
    foundation: 'Foundation Course - Cashew Cultivation Basics',
    'pest-management': 'Integrated Pest Management',
    pruning: 'Pruning & Tree Management',
    'post-harvest': 'Post-Harvest Handling',
    'advanced-processing': 'Advanced Processing Techniques',
    'quality-control': 'Quality Control & Certification',
    'business-marketing': 'Business & Marketing Skills',
  }

  const courseName = courseNames[registration.courseName] || registration.courseName

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #8B4513; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #8B4513; }
          .value { background: white; padding: 10px; border-radius: 4px; margin-top: 5px; }
          .button { display: inline-block; background: #8B4513; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">🎓 New Course Registration</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Action Required</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Course:</div>
              <div class="value">${courseName}</div>
            </div>

            <h3 style="color: #8B4513;">Applicant Information</h3>

            <div class="field">
              <div class="label">Name:</div>
              <div class="value">${registration.name}</div>
            </div>

            <div class="field">
              <div class="label">Email:</div>
              <div class="value"><a href="mailto:${registration.email}">${registration.email}</a></div>
            </div>

            ${
              registration.phone
                ? `
            <div class="field">
              <div class="label">Phone:</div>
              <div class="value">${registration.phone}</div>
            </div>
            `
                : ''
            }

            ${
              registration.district
                ? `
            <div class="field">
              <div class="label">District:</div>
              <div class="value">${registration.district}</div>
            </div>
            `
                : ''
            }

            ${
              registration.farmingExperience
                ? `
            <div class="field">
              <div class="label">Farming Experience:</div>
              <div class="value">${registration.farmingExperience}</div>
            </div>
            `
                : ''
            }

            ${
              registration.preferredDate
                ? `
            <div class="field">
              <div class="label">Preferred Date:</div>
              <div class="value">${registration.preferredDate}</div>
            </div>
            `
                : ''
            }

            ${
              registration.paymentMethod || registration.paymentAmount
                ? `
            <h3 style="color: #8B4513;">Payment Information</h3>

            ${
              registration.paymentMethod
                ? `
            <div class="field">
              <div class="label">Payment Method:</div>
              <div class="value">${registration.paymentMethod}</div>
            </div>
            `
                : ''
            }

            ${
              registration.paymentAmount
                ? `
            <div class="field">
              <div class="label">Amount:</div>
              <div class="value">ZMW ${registration.paymentAmount}</div>
            </div>
            `
                : ''
            }

            ${
              registration.transactionReference
                ? `
            <div class="field">
              <div class="label">Transaction Reference:</div>
              <div class="value">${registration.transactionReference}</div>
            </div>
            `
                : ''
            }
            `
                : ''
            }

            ${
              registration.additionalNotes
                ? `
            <h3 style="color: #8B4513;">Additional Notes</h3>
            <div class="field">
              <div class="value">${registration.additionalNotes.replace(/\n/g, '<br>')}</div>
            </div>
            `
                : ''
            }

            <div style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin/collections/course-registrations" class="button" style="color: white;">View in Admin Panel</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: FROM_EMAIL,
    subject: `[CGAZ Training] New Registration - ${courseName} - ${registration.name}`,
    html,
    replyTo: registration.email,
  })
}

import { Resend } from 'resend'

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email configuration
const FROM_EMAIL = process.env.FROM_EMAIL || 'contact@fluxium.dev'
const FROM_NAME = process.env.FROM_NAME || 'Cashew Growers Association of Zambia'
const FROM = `${FROM_NAME} <${FROM_EMAIL}>`

// Brand colors
const BRAND_GREEN = '#34A853'
const BRAND_DARK_GREEN = '#1E7E34'

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

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Email error:', error)
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
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, ${BRAND_GREEN} 0%, ${BRAND_DARK_GREEN} 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { margin: 0; font-size: 24px; font-weight: 600; }
          .header p { margin: 10px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { background: #ffffff; padding: 30px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
          .field { margin-bottom: 20px; }
          .label { font-weight: 600; color: ${BRAND_DARK_GREEN}; margin-bottom: 5px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; }
          .value { background: #f8f9fa; padding: 12px 15px; border-radius: 6px; border-left: 3px solid ${BRAND_GREEN}; }
          .value a { color: ${BRAND_GREEN}; text-decoration: none; }
          .footer { text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 13px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
            <p>CGAZ Website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Subject Type</div>
              <div class="value">${subjectText}</div>
            </div>

            <div class="field">
              <div class="label">Name</div>
              <div class="value">${submission.name}</div>
            </div>

            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${submission.email}">${submission.email}</a></div>
            </div>

            ${
              submission.phone
                ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${submission.phone}</div>
            </div>
            `
                : ''
            }

            <div class="field">
              <div class="label">Message</div>
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
  const displayName = name || 'there'

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.7; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, ${BRAND_GREEN} 0%, ${BRAND_DARK_GREEN} 100%); color: white; padding: 50px 40px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 12px 0 0 0; font-size: 15px; opacity: 0.9; }
          .content { background: #ffffff; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
          .content h2 { color: ${BRAND_DARK_GREEN}; margin-top: 0; font-size: 22px; font-weight: 600; }
          .content p { color: #4a4a4a; margin-bottom: 16px; }
          .highlight-box { background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); border-left: 4px solid ${BRAND_GREEN}; padding: 20px 24px; border-radius: 0 8px 8px 0; margin: 24px 0; }
          .highlight-box h3 { color: ${BRAND_DARK_GREEN}; margin: 0 0 12px 0; font-size: 16px; font-weight: 600; }
          .highlight-box ul { margin: 0; padding-left: 20px; color: #4a4a4a; }
          .highlight-box li { margin-bottom: 8px; }
          .button { display: inline-block; background: ${BRAND_GREEN}; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; transition: background 0.2s; }
          .button:hover { background: ${BRAND_DARK_GREEN}; }
          .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; }
          .footer-brand { color: ${BRAND_DARK_GREEN}; font-weight: 600; font-size: 15px; margin-bottom: 8px; }
          .footer-address { color: #666; font-size: 13px; margin-bottom: 4px; }
          .footer-email { color: ${BRAND_GREEN}; text-decoration: none; font-size: 13px; }
          .footer-legal { color: #999; font-size: 11px; margin-top: 16px; line-height: 1.5; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to CGAZ</h1>
            <p>Cashew Growers Association of Zambia</p>
          </div>
          <div class="content">
            <h2>Hello ${displayName}!</h2>

            <p>Thank you for subscribing to the CGAZ newsletter. We're pleased to have you join our community of cashew farmers, partners, and industry professionals.</p>

            <div class="highlight-box">
              <h3>What You'll Receive</h3>
              <ul>
                <li>Latest news and success stories from our farmers</li>
                <li>Training programs and workshop announcements</li>
                <li>Market updates and product information</li>
                <li>Partnership opportunities and events</li>
                <li>Industry insights and best practices</li>
              </ul>
            </div>

            <p><strong>What's Next?</strong></p>
            <p>Explore our website to learn more about CGAZ's mission, meet our team, and discover the work we're doing across Zambia's cashew farming communities.</p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}" class="button" style="color: white;">Visit Our Website</a>
            </div>

            <div class="footer">
              <div class="footer-brand">Cashew Growers Association of Zambia</div>
              <div class="footer-address">Mongu, Western Province, Zambia</div>
              <a href="mailto:${FROM_EMAIL}" class="footer-email">${FROM_EMAIL}</a>
              <p class="footer-legal">
                You're receiving this because you subscribed to CGAZ updates.<br>
                You can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `

  return sendEmail({
    to: email,
    subject: 'Welcome to CGAZ - Your Subscription is Confirmed',
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.7; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, ${BRAND_GREEN} 0%, ${BRAND_DARK_GREEN} 100%); color: white; padding: 50px 40px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header p { margin: 12px 0 0 0; font-size: 15px; opacity: 0.9; }
          .content { background: #ffffff; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
          .status-badge { display: inline-block; background: ${BRAND_GREEN}; color: white; padding: 10px 20px; border-radius: 24px; font-size: 14px; font-weight: 600; }
          .content h2 { color: ${BRAND_DARK_GREEN}; margin-top: 0; font-size: 22px; font-weight: 600; }
          .content h3 { color: ${BRAND_DARK_GREEN}; font-size: 16px; font-weight: 600; margin-top: 28px; }
          .info-box { background: #f8f9fa; padding: 24px; border-radius: 8px; border-left: 4px solid ${BRAND_GREEN}; margin: 24px 0; }
          .info-box h3 { margin-top: 0; color: ${BRAND_DARK_GREEN}; font-size: 15px; font-weight: 600; margin-bottom: 16px; }
          .info-box p { margin: 8px 0; color: #4a4a4a; }
          .info-box strong { color: #333; }
          .steps { margin: 20px 0; padding-left: 0; list-style: none; counter-reset: step; }
          .steps li { position: relative; padding-left: 40px; margin-bottom: 16px; color: #4a4a4a; }
          .steps li::before { content: counter(step); counter-increment: step; position: absolute; left: 0; top: 0; width: 28px; height: 28px; background: ${BRAND_GREEN}; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; }
          .notice-box { background: #fffbeb; border: 1px solid #fef3c7; padding: 16px 20px; border-radius: 8px; margin: 24px 0; }
          .notice-box p { margin: 0; color: #92400e; font-size: 14px; }
          .notice-box strong { color: #78350f; }
          .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; }
          .footer-brand { color: ${BRAND_DARK_GREEN}; font-weight: 600; font-size: 15px; margin-bottom: 8px; }
          .footer-address { color: #666; font-size: 13px; margin-bottom: 4px; }
          .footer-email { color: ${BRAND_GREEN}; text-decoration: none; font-size: 13px; }
          .footer-help { color: #999; font-size: 12px; margin-top: 16px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Registration Received</h1>
            <p>CGAZ Training Program</p>
          </div>
          <div class="content">
            <div style="text-align: center; margin-bottom: 30px;">
              <span class="status-badge">Pending Review</span>
            </div>

            <h2>Hello ${registration.name}!</h2>

            <p>Thank you for registering for our training program. We've received your application and our team is reviewing it.</p>

            <div class="info-box">
              <h3>Your Registration Details</h3>
              <p><strong>Course:</strong> ${courseName}</p>
              <p><strong>Name:</strong> ${registration.name}</p>
              <p><strong>Email:</strong> ${registration.email}</p>
              ${registration.phone ? `<p><strong>Phone:</strong> ${registration.phone}</p>` : ''}
              ${registration.district ? `<p><strong>District:</strong> ${registration.district}</p>` : ''}
              ${registration.preferredDate ? `<p><strong>Preferred Date:</strong> ${registration.preferredDate}</p>` : ''}
            </div>

            <h3>What Happens Next?</h3>
            <ol class="steps">
              <li><strong>Review:</strong> Our team will review your registration within 2-3 business days</li>
              <li><strong>Payment Verification:</strong> If you submitted a payment receipt, we'll verify it</li>
              <li><strong>Confirmation:</strong> You'll receive an email with your training schedule and location</li>
              <li><strong>Training Day:</strong> Attend your session and gain valuable skills</li>
            </ol>

            <div class="notice-box">
              <p><strong>Important:</strong> Please save this email for your records. If you have any questions or need to make changes to your registration, reply to this email or contact us directly.</p>
            </div>

            <div class="footer">
              <div class="footer-brand">Cashew Growers Association of Zambia</div>
              <div class="footer-address">Mongu, Western Province, Zambia</div>
              <a href="mailto:${FROM_EMAIL}" class="footer-email">${FROM_EMAIL}</a>
              <p class="footer-help">Need help? Reply to this email or visit our website.</p>
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, ${BRAND_GREEN} 0%, ${BRAND_DARK_GREEN} 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
          .header p { margin: 8px 0 0 0; opacity: 0.9; font-size: 14px; }
          .content { background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
          .section-title { color: ${BRAND_DARK_GREEN}; font-size: 15px; font-weight: 600; margin: 24px 0 12px 0; padding-bottom: 8px; border-bottom: 2px solid #f0f0f0; }
          .section-title:first-of-type { margin-top: 0; }
          .field { margin-bottom: 12px; }
          .label { font-weight: 600; color: ${BRAND_DARK_GREEN}; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
          .value { background: #f8f9fa; padding: 10px 14px; border-radius: 6px; border-left: 3px solid ${BRAND_GREEN}; }
          .value a { color: ${BRAND_GREEN}; text-decoration: none; }
          .button { display: inline-block; background: ${BRAND_GREEN}; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Course Registration</h1>
            <p>Action Required</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Course</div>
              <div class="value">${courseName}</div>
            </div>

            <h3 class="section-title">Applicant Information</h3>

            <div class="field">
              <div class="label">Name</div>
              <div class="value">${registration.name}</div>
            </div>

            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${registration.email}">${registration.email}</a></div>
            </div>

            ${
              registration.phone
                ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${registration.phone}</div>
            </div>
            `
                : ''
            }

            ${
              registration.district
                ? `
            <div class="field">
              <div class="label">District</div>
              <div class="value">${registration.district}</div>
            </div>
            `
                : ''
            }

            ${
              registration.farmingExperience
                ? `
            <div class="field">
              <div class="label">Farming Experience</div>
              <div class="value">${registration.farmingExperience}</div>
            </div>
            `
                : ''
            }

            ${
              registration.preferredDate
                ? `
            <div class="field">
              <div class="label">Preferred Date</div>
              <div class="value">${registration.preferredDate}</div>
            </div>
            `
                : ''
            }

            ${
              registration.paymentMethod || registration.paymentAmount
                ? `
            <h3 class="section-title">Payment Information</h3>

            ${
              registration.paymentMethod
                ? `
            <div class="field">
              <div class="label">Payment Method</div>
              <div class="value">${registration.paymentMethod}</div>
            </div>
            `
                : ''
            }

            ${
              registration.paymentAmount
                ? `
            <div class="field">
              <div class="label">Amount</div>
              <div class="value">ZMW ${registration.paymentAmount}</div>
            </div>
            `
                : ''
            }

            ${
              registration.transactionReference
                ? `
            <div class="field">
              <div class="label">Transaction Reference</div>
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
            <h3 class="section-title">Additional Notes</h3>
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

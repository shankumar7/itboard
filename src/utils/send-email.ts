import { Resend } from 'resend'
import nodemailer from 'nodemailer'

type ApplicationEmailPayload = {
  name: string
  roll_number: string
  college_email: string
  role: string
  club: string
}

export async function sendConfirmationEmail(payload: ApplicationEmailPayload) {
  const { name, roll_number, college_email, role, club } = payload

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0a0a0a; color: #ffffff; margin: 0; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background: #121212; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 40px; }
          .logo { text-align: center; margin-bottom: 30px; }
          .logo-badge { display: inline-block; background: rgba(245, 197, 24, 0.1); border: 1px solid rgba(245, 197, 24, 0.3); color: #f5c518; padding: 8px 16px; border-radius: 12px; font-weight: 800; font-size: 14px; letter-spacing: 2px; }
          h1 { color: #ffffff; font-size: 24px; font-weight: 900; margin-bottom: 10px; text-align: center; }
          p { color: rgba(255,255,255,0.7); line-height: 1.6; font-size: 15px; }
          .details-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; margin: 25px 0; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 12px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 8px; }
          .detail-label { color: rgba(255,255,255,0.4); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
          .detail-value { color: #ffffff; font-weight: 700; font-size: 14px; }
          .highlight { color: #f5c518; font-weight: 800; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-t: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.4); font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">
            <div class="logo-badge">IT BOARD CMRCET</div>
          </div>
          <h1>Application Received! 🎉</h1>
          <p>Dear <strong>${name}</strong>,</p>
          <p>Thank you for applying for the IT Board CMRCET Recruitment drive. Your application has been successfully recorded into our evaluation portal.</p>
          
          <div class="details-card">
            <div class="detail-row">
              <span class="detail-label">Roll Number</span>
              <span class="detail-value">${roll_number}</span>
            </div>
            <div class="detail-row">
              <span class="detail-label">Club Preference</span>
              <span class="detail-value">${club}</span>
            </div>
            <div class="detail-row" style="border: none; margin: 0; padding: 0;">
              <span class="detail-label">Applied Role</span>
              <span class="detail-value highlight">${role}</span>
            </div>
          </div>

          <div style="background: rgba(245, 197, 24, 0.08); border: 1px solid rgba(245, 197, 24, 0.3); border-radius: 14px; padding: 20px; margin: 25px 0;">
            <p style="color: #f5c518; font-weight: 800; font-size: 13px; margin-top: 0; text-transform: uppercase; letter-spacing: 1px;">
              ⚠️ Mandatory Step for Applicants
            </p>
            <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin-bottom: 14px; line-height: 1.5;">
              To validate your candidacy, you are required to follow both official Instagram pages below:
            </p>
            <div style="margin-bottom: 10px;">
              <a href="https://www.instagram.com/itboard_cmrcet/" target="_blank" style="display: block; background: #f5c518; color: #0a0a0a; text-decoration: none; font-weight: 800; padding: 12px 18px; border-radius: 10px; font-size: 13px; text-align: center; margin-bottom: 8px;">
                📸 Follow @itboard_cmrcet
              </a>
              <a href="https://www.instagram.com/student_council_cmrcet/" target="_blank" style="display: block; background: rgba(255,255,255,0.08); color: #ffffff; text-decoration: none; font-weight: 700; padding: 12px 18px; border-radius: 10px; font-size: 13px; text-align: center; border: 1px solid rgba(255,255,255,0.2);">
                📸 Follow @student_council_cmrcet
              </a>
            </div>
          </div>

          <p><strong>Next Steps:</strong></p>
          <p>Our core team is currently reviewing applications. Shortlisted candidates will be notified via email for interview slots.</p>
          
          <div class="footer">
            <p>IT Board CMRCET • Department of Information Technology</p>
            <p>Contact: <a href="mailto:shankumarpitta714@gmail.com" style="color:#f5c518;">shankumarpitta714@gmail.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `

  // Option A: Resend API Key
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'IT Board <recruitment@itboard.edu>',
        to: [college_email],
        subject: `IT Board Application Confirmation - ${name}`,
        html: htmlContent,
      })
      console.log(`[EMAIL SUCCESS] Sent via Resend to ${college_email}`)
      return { sent: true }
    } catch (err: any) {
      console.error('[EMAIL ERROR] Resend error:', err.message)
    }
  }

  // Option B: SMTP / Gmail App Password
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      })

      await transporter.sendMail({
        from: `"IT Board CMRCET" <${process.env.SMTP_USER}>`,
        to: college_email,
        subject: `IT Board Application Confirmation - ${name}`,
        html: htmlContent,
      })
      console.log(`[EMAIL SUCCESS] Sent via SMTP to ${college_email}`)
      return { sent: true }
    } catch (err: any) {
      console.error('[EMAIL ERROR] SMTP error:', err.message)
    }
  }

  console.log(`[EMAIL PENDING SETUP] Application for ${name} (${college_email}) logged. Add RESEND_API_KEY or SMTP_USER/SMTP_PASS in .env.local to enable real email delivery.`)
  return { sent: false, message: 'Email credentials not configured yet' }
}

import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Basic validation
  if (!body.email || !body.firstName) {
    throw createError({ statusCode: 400, statusMessage: 'Name and email are required.' })
  }

  // TODO: integrate your preferred method:
  // 1. Nodemailer / SMTP → send email to your inbox
  // 2. Resend / SendGrid API
  // 3. Save to SQLite (better-sqlite3 is already in deps)
  // 4. Push to Google Sheets via API

  // Example console log for now:
  console.log('[Enquiry]', {
    name: `${body.firstName} ${body.lastName}`,
    email: body.email,
    phone: body.phone,
    interest: body.interest,
    message: body.message,
    receivedAt: new Date().toISOString(),
  })

  return { success: true, message: 'Enquiry received.' }
})

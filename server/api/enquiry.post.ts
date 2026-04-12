export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.email || !body.firstName) {
    throw createError({ statusCode: 400, statusMessage: 'Name and email are required.' })
  }

  const db = useDB()

  // Save to DB
  db.prepare(`
    INSERT INTO enquiries (first_name, last_name, email, phone, interest, product, message)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    body.firstName,
    body.lastName || '',
    body.email,
    body.phone || '',
    body.interest || '',
    body.product || '',
    body.message || ''
  )

  // TODO: also send an email notification here
  // import { Resend } from 'resend'
  // const resend = new Resend(process.env.RESEND_API_KEY)
  // await resend.emails.send({ from: '...', to: 'hello@woodcraftstudio.in', subject: `New enquiry from ${body.firstName}`, html: `...` })

  return { success: true }
})

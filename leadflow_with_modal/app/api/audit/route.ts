import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

type Payload = {
  name: string
  email: string
  website: string
  adsBudget?: string
  selectedPackage?: string
  timestamp?: string
}

export async function POST(req: Request) {
  let data: Payload
  try {
    data = await req.json()
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 })
  }

  const {
    name,
    email,
    website,
    adsBudget = '',
    selectedPackage = 'nezvoleno',
    timestamp = new Date().toISOString(),
  } = data || {}

  if (!name || !email || !website) {
    return new NextResponse('Missing required fields', { status: 400 })
  }

  const SMTP_HOST = process.env.SMTP_HOST
  const SMTP_PORT = Number(process.env.SMTP_PORT || 465)
  const SMTP_USER = process.env.SMTP_USER
  const SMTP_PASS = process.env.SMTP_PASS
  const MAIL_TO = process.env.MAIL_TO || 'info@leadflow-performance.cz'
  const MAIL_FROM = process.env.MAIL_FROM || SMTP_USER || MAIL_TO

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return new NextResponse(
      'Email is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS (and optionally SMTP_PORT, MAIL_TO, MAIL_FROM).',
      { status: 500 }
    )
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })

  const subject = `LeadFlow audit – ${selectedPackage} – ${website}`
  const text = [
    'Nová žádost o bezplatný audit',
    '',
    `Balíček: ${selectedPackage}`,
    `Čas: ${timestamp}`,
    '',
    `Jméno: ${name}`,
    `Email: ${email}`,
    `Web: ${website}`,
    `Rozpočet Google Ads: ${adsBudget || '-'}`,
    '',
    '—',
    'Odesláno z leadflow-performance.cz',
  ].join('\n')

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      replyTo: email,
      subject,
      text,
    })
    return NextResponse.json({ ok: true })
  } catch (err: any) {
    return new NextResponse(`Failed to send email: ${err?.message || 'unknown error'}`, { status: 500 })
  }
}

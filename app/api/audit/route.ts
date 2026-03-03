import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export const runtime = "nodejs" // Nodemailer needs node runtime

type AuditPayload = {
  name?: string
  email: string
  website: string
  adsBudget?: string
  selectedPackage?: string // "39k" | "59k" | "nezvoleno" | ...
}

function escapeHtml(input: string) {
  return (input || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;")
}

function normalizeWebsite(raw: string) {
  const w = (raw || "").trim()
  if (!w) return ""
  if (/^https?:\/\//i.test(w)) return w
  return `https://${w}`
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function makeRefId() {
  const d = new Date()
  const pad = (n: number) => String(n).padStart(2, "0")
  const y = d.getFullYear()
  const m = pad(d.getMonth() + 1)
  const day = pad(d.getDate())
  const hh = pad(d.getHours())
  const mm = pad(d.getMinutes())
  const ss = pad(d.getSeconds())
  return `AUD-${y}${m}${day}-${hh}${mm}${ss}`
}

// HTML potvrzení ve stejném "clean" stylu jako web (off-white + oranžová)
function buildAutoReplyHtml(params: {
  name?: string
  website: string
  adsBudget?: string
  selectedPackage?: string
  refId: string
}) {
  const name = params.name ? `, ${escapeHtml(params.name)}` : ""
  const website = escapeHtml(params.website)
  const adsBudget = params.adsBudget ? escapeHtml(params.adsBudget) : "neuvedeno"
  const pkg = params.selectedPackage ? escapeHtml(params.selectedPackage) : "nezvoleno"
  const refId = escapeHtml(params.refId)
  const year = String(new Date().getFullYear())

  const bg = "#F7F4EF"
  const card = "#FBF8F3"
  const border = "#EFE7DD"
  const text = "#111111"
  const muted = "#7A746C"
  const cta = "#C46A1D"

  return `<!doctype html>
<html lang="cs">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <title>Potvrzení – audit přijat</title>
</head>
<body style="margin:0;padding:0;background:${bg};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
    Audit přijat. Do 48 hodin pošleme konkrétní rozbor, kde ztrácíte poptávky.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};padding:28px 12px;">
    <tr><td align="center">

      <table role="presentation" width="680" cellpadding="0" cellspacing="0"
        style="width:680px;max-width:680px;background:#FFFFFF;border-radius:18px;overflow:hidden;border:1px solid #E9E2D9;">

        <tr>
          <td style="padding:22px 24px 6px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.2;color:${text};font-weight:700;">
                  LeadFlow <span style="font-weight:700;color:${cta};">Performance</span>
                </td>
                <td align="right" style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.2;color:${muted};">
                  Potvrzení auditu
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:12px 24px 0;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:28px;line-height:1.15;color:${text};font-weight:800;">
              Audit přijat.
            </div>
            <div style="height:8px;"></div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.6;color:#3E3A35;">
              Dobrý den${name},
              děkujeme — vaši žádost o <b>bezplatný audit</b> jsme přijali.
              Do <b>48 hodin</b> vám pošleme konkrétní body, kde ztrácíte poptávky, a co upravit jako první.
            </div>
          </td>
        </tr>

        <tr><td style="padding:18px 24px 0;"><div style="height:1px;background:${border};"></div></td></tr>

        <tr>
          <td style="padding:18px 24px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td valign="top" style="padding:0 8px 0 0;width:50%;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                    style="background:${card};border:1px solid ${border};border-radius:14px;">
                    <tr><td style="padding:14px 14px 12px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.8px;text-transform:uppercase;color:#8A847B;font-weight:700;">
                        Shrnutí
                      </div>
                      <div style="height:10px;"></div>
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:${text};">
                        <b>Web:</b> ${website}<br>
                        <b>Rozpočet Google Ads:</b> ${adsBudget}<br>
                      </div>
                    </td></tr>
                  </table>
                </td>

                <td valign="top" style="padding:0 0 0 8px;width:50%;">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
                    style="background:${card};border:1px solid ${border};border-radius:14px;">
                    <tr><td style="padding:14px 14px 12px;">
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:.8px;text-transform:uppercase;color:#8A847B;font-weight:700;">
                        Reference
                      </div>
                      <div style="height:10px;"></div>
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:${text};">
                        <b>ID:</b> ${refId}<br>
                        <b>Termín:</b> do 48 hodin
                      </div>
                      <div style="height:10px;"></div>
                      <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#6F6A63;">
                        Uchovejte si ID pro rychlé dohledání.
                      </div>
                    </td></tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 24px 0;">
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.45;color:${text};font-weight:800;">
              Co bude dál
            </div>
            <div style="height:10px;"></div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
              style="background:#FFFFFF;border:1px solid ${border};border-radius:14px;">
              <tr><td style="padding:14px 14px;">
                <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.65;color:${text};">
                  <b>1)</b> Projdeme landing page (CTA, formuláře, důvěra, mobil).<br>
                  <b>2)</b> Ověříme rychlost a konverzní měření (GA4 / Google Ads).<br>
                  <b>3)</b> Pošleme vám prioritní seznam konkrétních úprav.
                </div>
              </td></tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="padding:18px 24px 0;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td bgcolor="${cta}" style="border-radius:12px;">
                  <a href="mailto:info@leadflow-performance.cz?subject=Dopl%C5%88uj%C3%ADc%C3%AD%20info%20k%20auditu%20${refId}"
                    style="display:inline-block;padding:12px 16px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#FFFFFF;text-decoration:none;font-weight:800;">
                    Doplnit 3 informace (volitelné)
                  </a>
                </td>
              </tr>
            </table>
            <div style="height:10px;"></div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#6F6A63;">
              Odpovězte na tento email a doplňte: <b>službu</b>, <b>lokalitu</b>, <b>cíl</b>. Výstup bude přesnější.
            </div>
          </td>
        </tr>

        <tr>
          <td style="padding:22px 24px 24px;">
            <div style="height:1px;background:${border};"></div>
            <div style="height:12px;"></div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;color:${muted};">
              Toto je automatické potvrzení přijetí požadavku. Pokud jste audit neodesílali, můžete tento email ignorovat.<br>
              LeadFlow Performance · info@leadflow-performance.cz
            </div>
            <div style="height:8px;"></div>
            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.7;color:#9B958D;">
              © ${year} LeadFlow Performance
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

function ensureEnv() {
  const missing: string[] = []
  if (!process.env.SMTP_HOST) missing.push("SMTP_HOST")
  if (!process.env.SMTP_USER) missing.push("SMTP_USER")
  if (!process.env.SMTP_PASS) missing.push("SMTP_PASS")
  // SMTP_PORT optional
  if (!process.env.MAIL_TO) missing.push("MAIL_TO") // where internal notifications go
  // MAIL_FROM optional
  return missing
}

function createTransporter() {
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587
  const secure = port === 465 // common pattern
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
}

export async function POST(req: Request) {
  try {
    const missing = ensureEnv()
    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: `Email is not configured. Set ${missing.join(", ")}.` },
        { status: 500 }
      )
    }

    const payload = (await req.json()) as Partial<AuditPayload>

    const name = (payload.name || "").trim()
    const email = (payload.email || "").trim()
    const websiteRaw = (payload.website || "").trim()
    const website = normalizeWebsite(websiteRaw)
    const adsBudget = (payload.adsBudget || "").trim()
    const selectedPackage = (payload.selectedPackage || "").trim() || "nezvoleno"

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Neplatný email." }, { status: 400 })
    }
    if (!websiteRaw) {
      return NextResponse.json({ ok: false, error: "Chybí URL webu." }, { status: 400 })
    }

    const refId = makeRefId()

    const transporter = createTransporter()
    const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER!
    const mailTo = process.env.MAIL_TO!

    // 1) INTERNAL MAIL (to you)
    const internalSubject = `LeadFlow audit – ${selectedPackage} – ${websiteRaw} – ${refId}`
    const internalText = [
      "Nová žádost o bezplatný audit",
      "",
      `Balíček: ${selectedPackage}`,
      `Čas: ${new Date().toISOString()}`,
      "",
      `Jméno: ${name || "(neuvedeno)"}`,
      `Email: ${email}`,
      `Web: ${websiteRaw}`,
      `Rozpočet Google Ads: ${adsBudget || "neuvedeno"}`,
      "",
      `Reference: ${refId}`,
      "",
      `Odesláno z ${new URL(req.url).host}`,
    ].join("\n")

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject: internalSubject,
      text: internalText,
      replyTo: email, // when you hit reply, it goes to client
    })

    // 2) AUTO-REPLY (to client)
    const customerSubject = "Audit přijat – ozveme se do 48 hodin"
    const customerText = `Dobrý den${name ? `, ${name}` : ""},

děkujeme — vaši žádost o bezplatný audit jsme přijali.
Do 48 hodin pošleme konkrétní rozbor, kde ztrácíte poptávky.

Shrnutí:
Web: ${websiteRaw}
Rozpočet Google Ads: ${adsBudget || "neuvedeno"}
Reference ID: ${refId}

LeadFlow Performance
info@leadflow-performance.cz
`
    await transporter.sendMail({
      from: mailFrom,
      to: email,
      subject: customerSubject,
      text: customerText,
      html: buildAutoReplyHtml({
        name: name || undefined,
        website: websiteRaw,
        adsBudget: adsBudget || undefined,
        selectedPackage,
        refId,
      }),
    })

    return NextResponse.json({ ok: true, refId })
  } catch (err: any) {
    const message = err?.message || "Unknown error"
    return NextResponse.json({ ok: false, error: message }, { status: 500 })
  }
}
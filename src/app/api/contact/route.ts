import { NextRequest, NextResponse } from 'next/server'

const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1421563264013176833/z6qUanWtLQKHmkrzwb4HkwzwfVFEIMxAdnU5XFhiDAausSJjSL81XH98daDlYHA9GBfk'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  inquiryType: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.message || !body.inquiryType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Format the message for Discord
    const discordMessage = {
      embeds: [
        {
          title: "New Contact Form Submission",
          color: 0x00ff00, // Green color
          fields: [
            {
              name: "👤 Name",
              value: body.name,
              inline: true
            },
            {
              name: "📧 Email",
              value: body.email,
              inline: true
            },
            {
              name: "📋 Inquiry Type",
              value: body.inquiryType,
              inline: true
            },
            {
              name: "📝 Subject",
              value: body.subject || "No subject provided",
              inline: false
            },
            {
              name: "💬 Message",
              value: body.message,
              inline: false
            }
          ],
          footer: {
            text: `NGNX Contact Form • ${new Date().toLocaleString('en-US', {
              timeZone: 'Africa/Lagos',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}`
          },
          timestamp: new Date().toISOString()
        }
      ]
    }

    // Send to Discord webhook
    const discordResponse = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordMessage),
    })

    if (!discordResponse.ok) {
      console.error('Discord webhook failed:', await discordResponse.text())
      return NextResponse.json(
        { error: 'Failed to send message to Discord' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Contact form submitted successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

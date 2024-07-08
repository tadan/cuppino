// functions/submit-form.js

const { Client } = require('@notionhq/client')
const nodemailer = require('nodemailer')

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' }
    }

    const { name, email, message } = JSON.parse(event.body)

    // Initialize Notion client
    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    try {
        // Add to Notion database
        await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties: {
                Name: { title: [{ text: { content: name } }] },
                Email: { email: email },
                Message: { rich_text: [{ text: { content: message } }] },
            },
        })

        // Send email notification
        let transporter = nodemailer.createTransport({
            host: 'smtp.your-email-provider.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        await transporter.sendMail({
            from: '"Your Website" <noreply@your-domain.com>',
            to: 'your-email@example.com',
            subject: 'New Contact Form Submission',
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        })

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Form submitted successfully' }),
        }
    } catch (error) {
        console.error('Error:', error)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error submitting form' }),
        }
    }
}

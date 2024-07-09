// functions/submit-form.js

const { Client } = require('@notionhq/client')
const nodemailer = require('nodemailer')

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' }
    }

    const {
        name,
        email,
        date,
        numberOfPeople,
        typeOfEvent,
        budget,
    } = JSON.parse(event.body)

    // Initialize Notion client
    const notion = new Client({ auth: process.env.NOTION_API_KEY })

    try {
        // Add to Notion database
        await notion.pages.create({
            parent: { database_id: process.env.NOTION_DATABASE_ID },
            properties: {
                Name: { title: [{ text: { content: name } }] },
                Email: { email: email },
                Date: { date: { start: date } },
                'Number Of People': { number: parseInt(numberOfPeople) },
                'Type of Event': { multi_select: [{ name: typeOfEvent }] },
                Budget: { number: parseInt(budget) },
            },
        })

        // Send email notification
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Send email notification to Cuppino
        await transporter.sendMail({
            from: '"Cuppino Catering" <noreply@your-domain.com>',
            to: 'cuppino.italy@gmail.com',
            subject: 'New Catering Inquiry',
            text: `
                Name: ${name}
                Email: ${email}
                Date: ${date}
                Number of People: ${numberOfPeople}
                Type of Event: ${typeOfEvent}
                Budget: ${budget} SEK
            `,
        })

        // Send confirmation email to customer
        await transporter.sendMail({
            from: '"Cuppino Catering" <noreply@your-domain.com>',
            to: email,
            subject: 'Catering Inquiry Confirmation',
            text: `
                Dear ${name},

                Thank you for your inquiry. Here are the details we received:

                Name: ${name}
                Email: ${email}
                Date: ${date}
                Number of People: ${numberOfPeople}
                Type of Event: ${typeOfEvent}
                Budget: ${budget} SEK

                We will get back to you soon!

                Best regards,
                Cuppino Catering Team
            `,
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

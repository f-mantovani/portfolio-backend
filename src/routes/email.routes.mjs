import Router from 'express'
import nodemailer from '../utils/nodemailer.mjs'
import throwError from '../utils/throwError.mjs'
import inputChecker from '../utils/inputChecker.mjs'

const router = Router()

router.post('/', async (req, res, next) => {
	const { email, subject, message } = req.body

	try {
		if (!email || !subject || !message) {
			throwError(true, 'Please fill in all the fields', 'email', 400)
		}

		const emailRegex = inputChecker.email(email)
		throwError(!emailRegex, 'Please enter a valid email', 'email', 400)

		let transporter = nodemailer

		const mailSent = transporter.sendMail({
			from: `"Felipe Mantovani" ${process.env.GMAIL_USER}`,
			to: email,
			subject: subject,
			text: message,
			html: `<b> Thank you for your mesage, I'll be replying as soon as I can </b>`,
		})

		const mailNotify = transporter.sendMail({
			from: `"Felipe Mantovani" ${process.env.GMAIL_USER}`,
      to: process.env.EMAIL_BCC,
      subject: subject,
      text: `<p> You received this ${message}</p>
						 <p> Contact this ${email}	</p>`,
		})

		await Promise.all([mailSent, mailNotify])
		
		res.status(200).json({ message: 'You email has been sent successfully!' })
	} catch (error) {
		error.place = 'email'
		next(error)
	}
})

export default router

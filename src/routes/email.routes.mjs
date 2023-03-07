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

		const mailSent = await transporter.sendMail({
			from: `"Felipe Mantovani" ${process.env.GMAIL_USER}`,
			to: email,
			subject: subject,
			text: message,
			bcc: process.env.EMAIL_BCC,
			html: `<b> ${message} </b>`,
		})
		res.status(200).json({ message: mailSent })
	} catch (error) {
		error.place = 'email'
		next(error)
	}
})

export default router

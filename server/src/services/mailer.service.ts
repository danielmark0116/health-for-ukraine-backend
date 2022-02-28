import nodemailer from 'nodemailer'
import nodemailerSendgrid from 'nodemailer-sendgrid'

export const transport = nodemailer.createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY,
  })
)

export const sendAccountConfirmationEmail = (email: string) => {
  transport
    .sendMail({
      from: 'no-reply@danielgrychtol.com',
      to: email,
      subject: 'HFU',
      html: `
	<h1>Confirm Your Account!</h1>
	<p>Click below:</p>
	<br />
	<br />
	<a href="https://domain.com/account_confirm/MOCK_TOKEN_STRING">Confirm Account</a>
		`,
    })
    .then(() => {
      console.log('Mail sent with success to: ', email)
    })
    .catch((e) => {
      console.log('There was an error while trying to send an email to: ', email)
      console.log(e)
    })
}

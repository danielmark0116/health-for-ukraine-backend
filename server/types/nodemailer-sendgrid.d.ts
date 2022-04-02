declare module 'nodemailer-sendgrid' {
  import { TransportOptions } from 'nodemailer'

  function nodemailerSendgrid(..._args: any): TransportOptions
  export = nodemailerSendgrid
}

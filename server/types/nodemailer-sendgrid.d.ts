declare module 'nodemailer-sendgrid' {
  import { TransportOptions } from 'nodemailer'

  function nodemailerSendgrid(...args: any): TransportOptions
  export = nodemailerSendgrid
}

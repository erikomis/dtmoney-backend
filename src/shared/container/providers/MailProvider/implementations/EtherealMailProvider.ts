import nodemailer, { Transporter } from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import { IMailProvider } from '../IMail.Provider';
import { injectable } from 'tsyringe';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        this.client = transporter;
      })
      .catch(err => console.error(err));
  }
  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const templateFileContext = fs.readFileSync(path).toString('utf-8');
    const templateParse = Handlebars.compile(templateFileContext);

    const tempalteHtml = templateParse(variables);
    const message = await this.client.sendMail({
      to,
      from: 'dtmoney  <noreplay@dtmoney.com.br>',
      subject,
      html: tempalteHtml,
    });

    console.log('Message  sent: %s', message.messageId);
    console.log('Preview URL %s', nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };

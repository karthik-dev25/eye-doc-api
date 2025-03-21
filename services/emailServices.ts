import nodemailer from 'nodemailer';

const sendSignupEmail = async (
  to: string,
  { firstName, lastName, email, phone, password }: { firstName: string; lastName: string; email: string; phone: string; password: string }
) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log('transporter: ', transporter);

  const mailOptions = {
    from: 'kar',
    to,
    subject: 'Welcome to Our App',
    text: `Hello ${firstName} ${lastName},\n\nYour account has been created.\n\nEmail: ${email}\nPhone: ${phone}\nPassword: ${password}\n\nPlease log in and change your password.`,
  };

  console.log('mailOptions: ', mailOptions);

  await transporter.sendMail(mailOptions);
};

export { sendSignupEmail };
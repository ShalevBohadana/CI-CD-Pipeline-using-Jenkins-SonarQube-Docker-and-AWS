export interface VerificationTemplateProps {
  username: string;
  verificationLink: string;
}

export const verificationTemplate = ({
  username,
  verificationLink,
}: VerificationTemplateProps) => ({
  subject: 'Verify Your Email - FullBoosts',
  text: `Hello ${username}, please verify your email by clicking: ${verificationLink}`,
  html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
        <p>Hello ${username},</p>
        <p>Welcome to FullBoosts! Please verify your email address by clicking the button below:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationLink}" 
             style="background-color: #4CAF50; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p>If the button doesn't work, you can also click this link:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
        <p>This link will expire in 1 hour.</p>
      </div>
    `,
});

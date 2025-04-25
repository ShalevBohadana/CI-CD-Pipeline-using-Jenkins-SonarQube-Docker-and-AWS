export interface SubscriptionTemplateProps {
  username: string;
  planName: string;
  price: number;
  duration: string;
  features: string[];
  startDate: string;
  endDate: string;
}

export const subscriptionTemplate = ({
  username,
  planName,
  price,
  duration,
  features,
  startDate,
  endDate,
}: SubscriptionTemplateProps) => ({
  subject: `Welcome to ${planName} - FullBoosts`,
  text: `Thank you for subscribing to ${planName}`,
  html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Subscription Confirmed</h1>
        <p>Hello ${username},</p>
        <p>Thank you for subscribing to FullBoosts!</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0;">
          <h2 style="color: #444; margin-top: 0;">${planName}</h2>
          <p>Duration: ${duration}</p>
          <p>Price: $${price.toFixed(2)}</p>
          <p>Valid from: ${startDate} to ${endDate}</p>
          
          <h3 style="margin-top: 20px;">Your Benefits:</h3>
          <ul style="list-style-type: none; padding: 0;">
            ${features
              .map(
                (feature) =>
                  `<li style="margin: 8px 0; padding-left: 24px; position: relative;">
                ✓ ${feature}
              </li>`,
              )
              .join('')}
          </ul>
        </div>
      </div>
    `,
});

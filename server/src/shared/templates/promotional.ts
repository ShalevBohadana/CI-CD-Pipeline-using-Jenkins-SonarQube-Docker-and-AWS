export interface PromotionalTemplateProps {
  title: string;
  description: string;
  imageUrl?: string;
  promoCode?: string;
  discount: {
    amount: number;
    type: 'percentage' | 'fixed';
  };
  validUntil: string;
  callToAction: {
    text: string;
    link: string;
  };
}

export const promotionalTemplate = ({
  title,
  description,
  imageUrl,
  promoCode,
  discount,
  validUntil,
  callToAction,
}: PromotionalTemplateProps) => ({
  subject: title,
  text: `${title} - ${description}`,
  html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #333; text-align: center;">${title}</h1>
        
        ${
          imageUrl
            ? `
          <img src="${imageUrl}" 
               alt="Promotional Image" 
               style="max-width: 100%; height: auto; margin: 20px 0;">
        `
            : ''
        }
        
        <p style="font-size: 16px; line-height: 1.6;">${description}</p>
        
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 4px; margin: 20px 0; text-align: center;">
          <h2 style="color: #FF5722; margin: 0;">
            ${
              discount.type === 'percentage'
                ? `${discount.amount}% OFF`
                : `$${discount.amount} OFF`
            }
          </h2>
          ${
            promoCode
              ? `
            <p style="font-size: 18px; margin: 10px 0;">
              Use code: <strong>${promoCode}</strong>
            </p>
          `
              : ''
          }
          <p style="color: #666;">Valid until ${validUntil}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${callToAction.link}" 
             style="background-color: #FF5722; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 4px; font-weight: bold;">
            ${callToAction.text}
          </a>
        </div>
        
        <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
          To unsubscribe from promotional emails, 
          <a href="{unsubscribe_link}" style="color: #666;">click here</a>
        </p>
      </div>
    `,
});

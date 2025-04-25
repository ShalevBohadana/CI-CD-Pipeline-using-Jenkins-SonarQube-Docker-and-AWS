import CryptoJS from 'crypto-js';

interface CardData {
  holder: string;
  number: string;
  expireDate: Date;
  cvv: string;
}

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'your-fallback-key';

export const encryptCardData = async (cardData: CardData): Promise<CardData> => {
  return {
    number: CryptoJS.AES.encrypt(cardData.number.toString(), ENCRYPTION_KEY).toString(),
    holder: CryptoJS.AES.encrypt(cardData.holder, ENCRYPTION_KEY).toString(),
    expireDate: cardData.expireDate, // שומרים את התאריך כמו שהוא
    cvv: CryptoJS.AES.encrypt(cardData.cvv.toString(), ENCRYPTION_KEY).toString(),
  };
};

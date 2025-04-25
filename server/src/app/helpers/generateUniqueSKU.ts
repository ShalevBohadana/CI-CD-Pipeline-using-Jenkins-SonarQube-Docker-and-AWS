const generateUniqueSKU = (char: number) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let sku = '';

  for (let i = 0; i < char; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sku += characters.charAt(randomIndex);
  }

  return sku;
};

export default generateUniqueSKU;

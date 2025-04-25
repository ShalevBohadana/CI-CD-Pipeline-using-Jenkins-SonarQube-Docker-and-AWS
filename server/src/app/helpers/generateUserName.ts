const generateUserName = (email: string): string => {
  const emailParts = email.split('@');
  const userName = emailParts[0];
  const randomNumber = Math.floor(Math.random() * 9000) + 100;
  const userNameWithRandomNumber = userName + randomNumber;

  return userNameWithRandomNumber;
};

export default generateUserName;

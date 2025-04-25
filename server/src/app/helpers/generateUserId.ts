import UserModel from '../modules/user/user.model';

export const generateUserId = async (role: string): Promise<string> => {
  const rolePrefix = role.split(' ')[0].toUpperCase();
  let newId = '';  
  let isUnique = false;
  let attempt = 0;
  const maxAttempts = 10;

  while (!isUnique && attempt < maxAttempts) {
    // Get the latest user ID for this role
    const lastUser = await UserModel.findOne({ roles: role })
      .sort({ userId: -1 })
      .lean();

    const lastUserId = lastUser?.userId || '';
    const match = lastUserId.match(/(\d+)$/);
    const lastNumber = match ? parseInt(match[1]) : 0;
    const newNumber = lastNumber + 1 + attempt;
    
    // Generate new ID with padding
    newId = `${rolePrefix}${newNumber.toString().padStart(4, '0')}`;
    
    // Check if this ID is unique
    const existingUser = await UserModel.findOne({ userId: newId }).lean();
    if (!existingUser) {
      isUnique = true;
      break;
    }
    
    attempt++;
  }

  if (!isUnique) {
    // If we couldn't find a unique ID after maxAttempts, use timestamp
    const timestamp = Date.now().toString().slice(-8);
    newId = `${rolePrefix}${timestamp}`;
  }

  return newId;
};

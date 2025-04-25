const convertToWebP = (filename: string | undefined): string => {
  if (!filename) {
    throw new Error('Invalid filename');
  }

  const extension = filename.split('.').pop()?.toLowerCase();
  if (!extension) {
    throw new Error('Invalid file extension');
  }

  const filenameWithoutExtension = filename.replace(`.${extension}`, '');

  return `${filenameWithoutExtension}.webp`;
};

export default convertToWebP;

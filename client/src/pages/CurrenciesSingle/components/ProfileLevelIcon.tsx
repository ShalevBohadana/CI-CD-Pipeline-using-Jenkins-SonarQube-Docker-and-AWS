import { useEffect, useState } from 'react';

export const profileMinLevel = 1;
export const profileMaxLevel = 7;

export const ProfileLevelIcon = ({ level }: { level: number }) => {
  const [levelImgSrc, setLevelImgSrc] = useState<string>();

  useEffect(() => {
    if (level >= profileMinLevel && level <= profileMaxLevel) {
      const loadImage = async () => {
        try {
          const levelImg = await import(`../../../assets/images/levels/level-${level}.svg`);
          setLevelImgSrc(levelImg.default);
        } catch (error) {
          console.error('Error loading image:', error);
        }
      };

      loadImage();
    }
  }, [level]);

  if (!levelImgSrc || level < profileMinLevel || level > profileMaxLevel) {
    return <span className='text-red-500 capitalize'>invalid level</span>;
  }

  return (
    <picture className='inline-flex'>
      <source media='(min-width: 350px)' srcSet={levelImgSrc} />
      <img
        src={levelImgSrc}
        alt={`Level ${level}`}
        className='inline-flex w-12 h-16 filter drop-shadow [--tw-drop-shadow:drop-shadow(0_0_.25rem_theme(colors.brand.yellow.750/.5))]'
        loading='lazy'
        width='48'
        height='64'
        decoding='async'
      />
    </picture>
  );
};

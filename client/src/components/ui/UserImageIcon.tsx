import { ComponentProps } from 'react';

import { useUserDataQuery } from '../../redux/features/auth/authApi';
import { getRandomHexString } from '../../utils';

export const DEFAULT_AVATAR_IMG = `https://www.gravatar.com/avatar/${getRandomHexString()}?s=48&d=identicon&r=G`;

export const UserImageIcon = (props: Omit<ComponentProps<'img'>, 'src' | 'srcSet' | 'alt'>) => {
  const { data: userRes } = useUserDataQuery(undefined, {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  const userImageUrl = new URL(userRes?.data.avatar || DEFAULT_AVATAR_IMG);
  return <img src={userImageUrl.href} alt='user profile' {...props} />;
};

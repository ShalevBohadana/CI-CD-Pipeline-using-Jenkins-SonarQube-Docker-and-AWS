import axios from 'axios';
import { useEffect, useState } from 'react';

import { IGamesAndCategories } from '../pages/GamesSingle/components/GameOffers';

export const useGamesAndCategories = () => {
  const [gamesAndCategories, setGamesAndCategories] = useState<IGamesAndCategories[] | undefined>(
    undefined
  );

  useEffect(() => {
    if (!gamesAndCategories || !gamesAndCategories?.length) {
      axios
        .get<IGamesAndCategories[]>('/data/gamesAndCategories.json')
        .then((data) => {
          setGamesAndCategories(data.data);
        })
        .catch(console.error);
    }
  }, [gamesAndCategories]);
  // If gamesAndCategories is still null, return an empty array to avoid null or undefined issues.
  return { gamesAndCategories: gamesAndCategories || [] };
};

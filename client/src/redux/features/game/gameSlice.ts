import { Reducer, Slice } from '@/redux-fix';
import { createSlice } from '@/redux-fix';
import { RootState } from '../../store';

// הגדרה אחת בלבד של GameState - הורדנו את הממשק הכפול
type GameState = {
  activeGame: string;
  // אם רוצים להוסיף תכונות נוספות בעתיד, אפשר להוסיף אותן כאן
};

const initialState: GameState = {
  activeGame: '',
};

export const gameSlice: Slice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setActiveGame: (state, action) => {
      state.activeGame = action.payload;
      console.log(state.activeGame);
    },
  },
  extraReducers: () => {},
});

export const { setActiveGame } = gameSlice.actions;
export const gameReducer: Reducer<GameState> = gameSlice.reducer;
export const selectActiveGame = (state: RootState) => state.game.activeGame;

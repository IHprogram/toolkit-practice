import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/slice';
import taskReducer from '../features/task/taskSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
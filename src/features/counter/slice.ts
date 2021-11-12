import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

// 型を定義
export interface CounterState {
  count: number;
};

export interface TaskState {
  task: string[];
}

export const initialState: CounterState = {
  count: 0,
};

export const taskInitialState: TaskState = {
  task: ['task初期値です'],
};

export type EntityId = number | string;

export interface EntityState<T> {
  ids: EntityId[];
  entities: {
    [id: EntityId]: T
  };
};

// nameはアクション名、
const counterSlice = createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    incrementCounter: state => {
      state.count += 1
    },
    decrementCounter: (state) => {
      state.count -= 1
    },
  }
});

const taskCreateSlice = createSlice({
  name: 'task',
  initialState: taskInitialState,
  reducers: {
    taskCreate: (state, action: PayloadAction<string>) => {
      state.task.push(action.payload)
    }
  }
});

export const { incrementCounter, decrementCounter } = counterSlice.actions;
export const { taskCreate } = taskCreateSlice.actions;


// 「state.counter」と言う名前がapp/store.tsの変数storeのreducerのcounterと一致している必要あり
export const selectCount = (state: RootState) => state.counter.count;


// reducersではなくreducer
export default counterSlice.reducer;

//PayloadActionは型を受け取れる。
import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

export interface TaskState {
  task: string[];
}

export const taskInitialState: TaskState = {
  task: ['task初期値です'],
}



const taskCreateSlice = createSlice({
  name: 'task',
  initialState: taskInitialState,
  reducers: {
    taskCreate: (state, action: PayloadAction<string>) => {
      state.task.push(action.payload)
    }
  }
})

export const { taskCreate } = taskCreateSlice.actions;


// 「state.counter」と言う名前がapp/store.tsの変数storeのreducerのcounterと一致している必要あり
export const selectTask = (state: RootState) => state.task.task;


// reducersではなくreducer
export default taskCreateSlice.reducer;

//PayloadActionは型を受け取れる。
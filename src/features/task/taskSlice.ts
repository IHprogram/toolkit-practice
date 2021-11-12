import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import { store } from '../../app/store';

export interface TaskState {
  task: string[];
}

export const taskInitialState: TaskState = {
  task: ['task初期値です'],
}

type TaskType = {
  taskId: number,
  task: string
}

const tasksAdapter = createEntityAdapter<TaskType>({
  selectId: (task) => task.taskId
})

const taskInitialEntityState = tasksAdapter.getInitialState();
console.log(taskInitialEntityState)

const taskCreateSlice = createSlice({
  name: 'task',
  initialState: taskInitialEntityState,
  reducers: {
    taskCreate: tasksAdapter.addOne,
    setTasks(state, action: PayloadAction<{ tasks: TaskType[] }>) {
      console.log(state, action)
      tasksAdapter.setAll(state, action.payload.tasks)
    }
  }
})


// CreateEntityAdapterを使わない場合の書き方
// const taskCreateSlice = createSlice({
//   name: 'task',
//   initialState: taskInitialState,
//   reducers: {
//     taskCreate: (state, action: PayloadAction<string>) => {
//       state.task.push(action.payload)
//     }
//   }
// })

export const { taskCreate } = taskCreateSlice.actions;

// 「state.counter」と言う名前がapp/store.tsの変数storeのreducerのcounterと一致している必要あり
// export const selectTask = (state: RootState) => state.task;

// Entity版
export const selectTask = tasksAdapter.getSelectors<RootState>(
  (state) => state.task
);

console.log(selectTask)

// export const allTasks = selectTask.selectAll(store.task.getState)

// reducersではなくreducer
export default taskCreateSlice.reducer;

//PayloadActionは型を受け取れる。
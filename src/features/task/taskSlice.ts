import { createAsyncThunk ,createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from "axios";
import { RootState } from '../../app/store';
import { store } from '../../app/store';

export interface TaskState {
  task: string[];
}

export const taskInitialState: TaskState = {
  task: ['task初期値です'],
}

//ThunkAPIの型
export interface ErrorResponse {
  success: boolean | string
}

export const fetchBooksInfo = createAsyncThunk<TaskType, void, {
  state: RootState,
  rejectValue: ErrorResponse
}>(
  'books/fetchBooksInfo',
  async(_, thunkApi) => {
      const data = await axios.get("https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404?", {
        params: {
          applicationId: "1019108687944298363", //楽天でログインし、自分のアプリケーションIDを取得
          title: '卓球', //後で変数にし、検索フォームのキーワードで検索できるようにする
        },
      });
      const title: string = data.data.Items[0].Item.title
      const result: TaskType = {
        taskId: 10,
        task: title
      }
      return result;
  }
)

type TaskType = {
  taskId: number,
  task: string
}

const tasksAdapter = createEntityAdapter<TaskType>({
  selectId: (task) => task.taskId
})

const taskInitialEntityState = tasksAdapter.getInitialState();

const taskCreateSlice = createSlice({
  name: 'taskEntity',
  initialState: taskInitialEntityState,
  reducers: {
    taskCreate: tasksAdapter.addOne,
    setTasks(state, action: PayloadAction<{ tasks: TaskType[] }>) {
      console.log(state, action)
      tasksAdapter.setAll(state, action.payload.tasks)
    },
    taskDelete(state, action: PayloadAction<number>) {
      console.log(state, action);
      console.log('taskAdapterです', tasksAdapter);
      // console.log('taskInitialEntityState', taskInitialEntityState);
      tasksAdapter.removeOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooksInfo.fulfilled, (state, action) => {
      console.log('成功！！', state, action)
      console.log(state.entities)
      tasksAdapter.addOne(state, action.payload)
    })
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

export const { taskCreate, taskDelete } = taskCreateSlice.actions;

// 「state.counter」と言う名前がapp/store.tsの変数storeのreducerのcounterと一致している必要あり
// export const selectTask = (state: RootState) => state.task;

// Entity版
export const selectTask = tasksAdapter.getSelectors<RootState>(
  (state) => state.task
);

// export const allTasks = selectTask.selectAll(store.task.getState)

// reducersではなくreducer
export default taskCreateSlice.reducer;

//PayloadActionは型を受け取れる。
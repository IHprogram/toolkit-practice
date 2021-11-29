import type { NextPage } from 'next'
import React, { useState } from 'react';
import {
  incrementCounter,
  decrementCounter,
  selectCount
} from '../src/features/counter/slice';
import {
  taskCreate,
  selectTask,
  fetchBooksInfo,
  taskDelete
} from '../src/features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../src/app/customHooks'
import Task from '../components/Task';

interface TaskType {
  taskId: number,
  task: string
}

const initialTask: TaskType = {
  taskId: 1,
  task: ''
};

const Home: NextPage = () => {
  // const count = useSelector(selectCount);
  // const taskState = useSelector(selectTask);
  const dispatch = useAppDispatch();

  const count = useAppSelector(selectCount);
  const tasks = useAppSelector(selectTask.selectAll);

  const [task, setTask] = useState(initialTask);
  const register = () => {
    console.log(task)
    console.log(tasks)
    dispatch(taskCreate(task))
    const stringNextId: number = task.taskId + 1
    const clearTask: TaskType = {
      taskId: stringNextId,
      task: ''
    }
    setTask(clearTask);
  }

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTask: TaskType = {
      taskId: task.taskId,
      task: e.target.value
    }
    setTask(newTask)
  }

  const check = () => {
    dispatch(fetchBooksInfo());
  }

  const deleteTask = (key: number): void => {
    console.log(key)
    dispatch(taskDelete(key))
  }

  return (
    <div>
      <h1>カウンター</h1>
      <span>
        {count}
      </span>
      <button onClick={() => dispatch(incrementCounter())}>たす</button>
      <button onClick={() => dispatch(decrementCounter())}>ひく</button>

      <div>
        <button type="button" onClick={check}>createAsyncThunkの確認</button>
      </div>

      <form>
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValue(e)} value={task.task} />
        <button type="button" onClick={() => register()}>タスク送信</button>
      </form>
      <ul>
        {/* {tasks.map((task: TaskType, index) => <Task key={index} task={task.task} />)} */}

        {tasks.map((task: TaskType, index) => { return (
          <li key={task.taskId.toString()}>
            <span>index: {index}</span>
            <span>id:{task.taskId} </span>
            <span>task:{task.task}</span>
            <button type="button" onClick={() => deleteTask(task.taskId)}>削除</button>
            <button type="button" onClick={() => console.log(task.taskId)}>key確認</button>
            <button type="button" onClick={() => console.log(task)}>task確認</button>
          </li>
        )})}
      </ul>
    </div>
  )
}

export default Home

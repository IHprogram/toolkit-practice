import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementCounter,
  decrementCounter,
  selectCount
} from '../src/features/counter/slice';
import {
  taskCreate,
  selectTask
} from '../src/features/task/taskSlice';
import { useAppDispatch, useAppSelector } from '../src/app/customHooks'

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
    // console.log(task)
    console.log(task)
    console.log(tasks)
    dispatch(taskCreate(task))
    const nextId: number = task.taskId + 1;
    const clearTask: TaskType = {
      taskId: nextId,
      task: ''
    }
    setTask(clearTask);
  }

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTask: TaskType = {
      taskId: task.taskId,
      task: e.target.value
    }
    console.log(newTask)
    setTask(newTask)
  }

  return (
    <div>
      <h1>カウンター</h1>
      <span>
        {count}
      </span>
      <button onClick={() => dispatch(incrementCounter())}>たす</button>
      <button onClick={() => dispatch(decrementCounter())}>ひく</button>

      <form>
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeValue(e)} value={task.task} />
        <button type="button" onClick={() => register()}>タスク送信</button>
      </form>
      <ul>
        {tasks.map((task) => <li key={task.taskId}>{task.task}</li>)}
      </ul>
    </div>
  )
}

export default Home

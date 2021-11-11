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

const Home: NextPage = () => {
  const count = useSelector(selectCount);
  const taskState = useSelector(selectTask);
  const dispatch = useDispatch();
  const [task, setTask] = useState('');
  const register = () => {
    // console.log(task)
    console.log(taskState)
    dispatch(taskCreate(task))
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
        <input onChange={(e) => setTask(e.target.value)} />
        <button type="button" onClick={() => register()}>タスク送信</button>
      </form>
      <ul>
        {taskState.map((task, index) => <li key={index}>{task}</li>)}
      </ul>
    </div>
  )
}

export default Home

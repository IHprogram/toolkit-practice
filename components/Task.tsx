import { NextPage } from "next";
import {
  taskDelete
} from '../src/features/task/taskSlice';
import { useAppDispatch } from '../src/app/customHooks'

interface PropsType {
  key: number,
  task: string
}

const Task = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const deleteTask = (key: number): void => {
    console.log(props, key)
    dispatch(taskDelete(key))
  }
  return (
    <>
      <li>
        <span>id:{props.key} </span>
        <span>task:{props.task}</span>
        <button type="button" onClick={() => deleteTask(props.key)}>削除</button>
        <button type="button" onClick={() => console.log(props.key)}>key確認</button>
        <button type="button" onClick={() => console.log(props)}>props確認</button>
      </li>
    </>
  )
}

export default Task;
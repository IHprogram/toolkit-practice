import { NextPage } from "next";

// interface Props {
//   data: {}
// }

// interface TaskType {
//   taskId: number,
//   task: string
// }

interface PropsType {
  key: number,
  task: string
}

const Task = (props: PropsType) => {
  return (
    <>
      <li key={props.key}>{props.task}</li>
    </>
  )
}

export default Task;
import styles from './index.module.css'
import useListOfTasks from './hooks/useListOfTasks';
import TaskItem from './components/TaskItem';
import AddTaskForm from './components/AddTaskForm';

export default function ListOfTasks() {
  const {tasks, isLoading, error} = useListOfTasks();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div style={{color: 'red'}}>Error loading tasks</div>;

  return (
    <div className={styles.list_of_tasks_container}>
      <AddTaskForm />
      {
        tasks.length !== 0 ?
      <div className={styles.list_of_tasks}>
        {tasks.map(task => <TaskItem {...task} key={task.id}/>)}
      </div>
      :
      <p>There are no tasks</p>
      }

    </div>
  )
}

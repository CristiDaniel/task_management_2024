import styles from './ListOfTasks.module.css'
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import useListOfTasks from './hooks/useListOfTasks';
import AddTaskForm from './components/AddTaskForm';

export default function ListOfTasks() {
  const {tasks, isLoading, error, deleteTask, addTask} = useListOfTasks();

  // Case no results 
  if(tasks.length === 0) return 'There are no tasks';

  // Case loading 
  if (isLoading) return <div>Loading...</div>;

  // Case error 
  if (error) return <div>Error loading tasks</div>;

  return (
    <>
    <AddTaskForm />
    <div className={styles.list_of_tasks}>
        {tasks.map(task => (
          <div className={styles.task} key={task.id}>
            <div className={styles.main_content_task}>
              <h2>{task.title}</h2>
              <p className={styles.task_description}>{task.description ? task.description : "No description"}</p>
              <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
              <p>Priority: {task.priority}</p>
              <p>Created At: {task.created_at}</p>
            </div>
            <div className={styles.task_actions}>
              <button onClick={() => deleteTask(task.id)} className={styles.task_action_delete}><FaTrashAlt /></button>
              <button onClick={() => addTask({title: 'Adaugat cu post', description: 'Descriere de test', priority: 'high'})} className={styles.task_action_edit}><FaEdit /></button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

import styles from './ListOfTasks.module.css'
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import useListOfTasks from './hooks/useListOfTasks';
import AddTaskForm from './components/AddTaskForm';
import { formatDate } from '../../helpers';

export default function ListOfTasks() {
  const {tasks, isLoading, error, deleteTask, addTask, updateTask} = useListOfTasks();

  const handleCheckboxChange = (taskId: number, completed: boolean) => {
    updateTask({taskId, updatedFields: {completed: !completed}})
  }
  const handleChangePriority = (taskId: number, priorityVal: 'low' | 'medium' | 'high') => {
    updateTask({taskId, updatedFields: {priority: priorityVal}})
  }



  // Case loading 
  if (isLoading) return <div>Loading...</div>;

  // Case error 
  if (error) return <div>Error loading tasks</div>;

    // Case no results 
    if(tasks.length === 0) {
      return (
        <>
        <AddTaskForm />
        <p>There are no tasks</p>
        </>
      )
    }
  return (
    <>
      <AddTaskForm />
    <div className={styles.list_of_tasks}>
        {tasks.map(task => (
          <div className={styles.task} key={task.id}>
            <div className={styles.main_content_task}>
              <input onChange={() => handleCheckboxChange(task.id, task.completed)} type="checkbox" checked={task.completed}/>
              <div>
                <div className={styles.title_container}>
                  <h2>{task.title}</h2>
                  <p>Priority:
                  <select
                    name="priority"
                    value={task.priority}
                    onChange={(el) => handleChangePriority(task.id, el.target.value as 'low' | 'medium' | 'high')}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  </p>
                </div>
                <p>Created At: {formatDate(task.created_at)}</p>
              </div>
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


import { FaTrashAlt } from 'react-icons/fa';
import { ITaskItem, ITaskPriority } from '../../interfaces';
import styles from './index.module.css';
import useListOfTasks from '../../hooks/useListOfTasks';
import { formatDate } from '../../../../helpers';

export default function TaskItem(props: ITaskItem) {
  const {deleteTask, updateTask} = useListOfTasks();

  const handleCheckboxChange = (taskId: number, completed: boolean) => {
    updateTask({taskId, updatedFields: {completed: !completed}})
  }
  const handleChangePriority = (taskId: number, priorityVal: ITaskPriority) => {
    updateTask({taskId, updatedFields: {priority: priorityVal}})
  }

  const priorityColors = {
    low: {border: "#006200", color: "#008f00"},
    medium: {border: "#6f6f00", color: "#cccc00"},
    high: {border: "#630000", color: "#b00000"},
  }
    return (
        <div className={styles.task} draggable={true}>
        <div className={styles.main_content_task}>
          <div>
            <div className={styles.title_container}>
              <h2 style={{textDecoration: `${props.completed ? 'line-through' : 'none'}`}}>{props.title}</h2>
              <p>Priority:
              <select
              style={{border: `1px solid ${priorityColors[props.priority].border}`, color: `${priorityColors[props.priority].color}`}}
                name="priority"
                value={props.priority}
                onChange={(el) => handleChangePriority(props.id, el.target.value as ITaskPriority)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              </p>
            </div>
            <span className={styles.date_added}>Created At: {formatDate(props.created_at)}</span>
          </div>
        </div>
        <div className={styles.task_actions}>
          <label>Mark as done
          <input onChange={() => handleCheckboxChange(props.id, props.completed)} type="checkbox" checked={props.completed}/>
          </label>
          <button onClick={() => deleteTask(props.id)} className={styles.task_action_delete}><FaTrashAlt /></button>
        </div>
      </div>
    )
}
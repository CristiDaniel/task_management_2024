import { FaTrashAlt } from "react-icons/fa";
import { ITaskItem, ITaskPriority } from "../../interfaces";
import styles from "./index.module.css";
import useListOfTasks from "../../hooks/useListOfTasks";
import { formatDate } from "../../../../helpers";
import { useState } from "react";

/**
 * TaskItem component displays a single task with options to mark as completed, change priority, and delete.
 */
export default function TaskItem(props: ITaskItem) {
  const { deleteTask, updateTask } = useListOfTasks();
  const [taskStatus, setTaskStatus] = useState<ITaskItem["status"]>(
    props.status
  );

  const handleSelectStatus = (
    taskId: ITaskItem["id"],
    status: ITaskItem["status"]
  ) => {
    setTaskStatus(status);
    updateTask({ taskId, updatedFields: { status } });
  };
  const handleChangePriority = (
    taskId: ITaskItem["id"],
    priorityVal: ITaskPriority
  ) => {
    updateTask({ taskId, updatedFields: { priority: priorityVal } });
  };

  const priorityColors = {
    low: { border: "#006200", color: "#008f00" },
    medium: { border: "#6f6f00", color: "#cccc00" },
    high: { border: "#630000", color: "#b00000" },
  };
  return (
    <div className={styles.task} draggable={true}>
      <div className={styles.main_content_task}>
        <div>
          <div className={styles.title_container}>
            <h2>{props.title}</h2>
            <p>
              Priority:
              <select
                style={{
                  border: `1px solid ${priorityColors[props.priority].border}`,
                  color: `${priorityColors[props.priority].color}`,
                }}
                name="priority"
                value={props.priority}
                onChange={(el) =>
                  handleChangePriority(
                    props.id,
                    el.target.value as ITaskPriority
                  )
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </p>
          </div>
          <span className={styles.date_added}>
            Created At: {formatDate(props.created_at)}
          </span>
        </div>
      </div>
      <div className={styles.task_actions}>
        <label>
          Status
          <select
            name="status"
            onChange={(e) =>
              handleSelectStatus(
                props.id,
                e.target.value as ITaskItem["status"]
              )
            }
            value={taskStatus}
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="on_hold">On Hold</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>
        <button
          onClick={() => deleteTask(props.id)}
          className={styles.task_action_delete}
        >
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
}

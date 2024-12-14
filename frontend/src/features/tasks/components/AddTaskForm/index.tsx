import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";

import styles from "./index.module.css";
import useListOfTasks from "../../hooks/useListOfTasks";
import { ITaskItem } from "../../interfaces";

/**
 * AddTaskForm Component
 *
 * A form component for adding a new task with a title and priority.
 * It validates input, adds the task, and resets the form after submission.
 */
const AddTaskForm = () => {
  const { addTask } = useListOfTasks();
  const [formData, setFormData] = useState<
    Pick<ITaskItem, "title" | "priority">
  >({
    title: "",
    priority: "low",
  });
  const { title } = formData;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim() === "") {
      toast.error("Task-ul trebuie sa aiba o denumire.");
      return;
    }
    addTask(formData);
    resetForm();
  };

  function resetForm() {
    setFormData({
      title: "",
      priority: "low",
    });
  }

  return (
    <form className={styles.add_task_form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Task Title"
      />
      <input type="submit" value="Add Task" />
    </form>
  );
};

export default AddTaskForm;

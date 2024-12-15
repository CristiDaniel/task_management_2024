import axios from "axios";
import {
  ITaskItem,
  ITaskPriorityCounts,
  ITaskStatusCounts,
  IUpdateTaskParams,
} from "../interfaces";

export const fetchTask = async (
  taskId: ITaskItem["id"]
): Promise<ITaskItem> => {
  const response = await axios.get(
    `http://localhost:8000/api/tasks/${taskId}/`
  );
  return response.data;
};

export const fetchListOfTasks = async (): Promise<ITaskItem[]> => {
  const response = await axios.get<ITaskItem[]>(
    `http://localhost:8000/api/tasks${window.location.search}`
  );
  return response.data;
};

export const deleteTask = async (taskId: ITaskItem["id"]): Promise<void> => {
  const response = await axios.delete(
    `http://localhost:8000/api/tasks/${taskId}/`
  );
  return response.data;
};

export const addTask = async (newTask: Partial<ITaskItem>) => {
  const response = await axios.post(
    `http://localhost:8000/api/tasks/`,
    newTask
  );
  return response.data;
};
export const updateTask = async ({
  taskId,
  updatedFields,
}: IUpdateTaskParams) => {
  const response = await axios.patch(
    `http://localhost:8000/api/tasks/${taskId}/`,
    updatedFields
  );
  return response.data;
};

export const countPriorityTasks = async (): Promise<ITaskPriorityCounts> => {
  const response = await axios.get(
    `http://localhost:8000/api/tasks/count-priorities`
  );
  return response.data;
};
export const countStatusTasks = async (): Promise<ITaskStatusCounts> => {
  const response = await axios.get(
    `http://localhost:8000/api/tasks/count-status`
  );
  return response.data;
};

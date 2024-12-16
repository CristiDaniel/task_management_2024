import axios from "axios";
import {
  ITaskItem,
  ITaskPriorityCounts,
  ITaskStatusCounts,
  IUpdateTaskParams,
} from "../interfaces";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const fetchTask = async (
  taskId: ITaskItem["id"]
): Promise<ITaskItem> => {
  const response = await axios.get(
    `${BASE_URL}/api/tasks/${taskId}/`
  );
  return response.data;
};

export const fetchListOfTasks = async (): Promise<ITaskItem[]> => {
  const response = await axios.get<ITaskItem[]>(
    `${BASE_URL}/api/tasks${window.location.search}`
  );
  return response.data;
};

export const deleteTask = async (taskId: ITaskItem["id"]): Promise<void> => {
  const response = await axios.delete(
    `${BASE_URL}/api/tasks/${taskId}/`
  );
  return response.data;
};

export const addTask = async (newTask: Partial<ITaskItem>) => {
  const response = await axios.post(
    `${BASE_URL}/api/tasks/`,
    newTask
  );
  return response.data;
};
export const updateTask = async ({
  taskId,
  updatedFields,
}: IUpdateTaskParams) => {
  const response = await axios.patch(
    `${BASE_URL}/api/tasks/${taskId}/`,
    updatedFields
  );
  return response.data;
};

export const countPriorityTasks = async (): Promise<ITaskPriorityCounts> => {
  const response = await axios.get(
    `${BASE_URL}/api/tasks/count-priorities`
  );
  return response.data;
};
export const countStatusTasks = async (): Promise<ITaskStatusCounts> => {
  const response = await axios.get(
    `${BASE_URL}/api/tasks/count-status`
  );
  return response.data;
};

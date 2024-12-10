import axios from "axios";
import { ITaskItem, UpdateTaskParams } from "../interfaces";

export const fetchTask = async (taskId : number): Promise<ITaskItem> => {
    const response = await axios.get(`http://localhost:8000/api/tasks/${taskId}/`);
    return response.data;
}

export const fetchListOfTasks = async (): Promise<ITaskItem[]> => {
    const response = await axios.get(`http://localhost:8000/api/tasks${window.location.search}`);
    return response.data;
  }
export const deleteTask = async (taskId: number) => {
    const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`);
    return response.data
}
export const addTask = async (newTask: Partial<ITaskItem>) => {
    const response = await axios.post(`http://localhost:8000/api/tasks/`, newTask)
    return response.data
}
export const updateTask = async ({taskId, updatedFields} : UpdateTaskParams) => {
    const response = await axios.patch(`http://localhost:8000/api/tasks/${taskId}/`, updatedFields);
    return response.data
}
export const filterTasks = async (queryParams: {[key: string]: any}) => {
    const response = await axios.post(`http://localhost:8000/api/tasks/`, queryParams)
    return response.data
}

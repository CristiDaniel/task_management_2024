import axios from "axios";
import { TaskItem } from "../interfaces";

export const fetchTask = async (taskId : number): Promise<TaskItem> => {
    const response = await axios.get(`http://localhost:8000/api/tasks/${taskId}/`);
    return response.data;
}

export const fetchListOfTasks = async (): Promise<TaskItem[]> => {
    const response = await axios.get('http://localhost:8000/api/tasks');
    return response.data;
  }
export const deleteTask = async (taskId: number) => {
    const response = await axios.delete(`http://localhost:8000/api/tasks/${taskId}/`);
    return response.data
}
export const addTask = async (newTask: any) => {
    const response = await axios.post(`http://localhost:8000/api/tasks/`, newTask)
    return response.data
}

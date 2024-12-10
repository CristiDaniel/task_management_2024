import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITaskItem } from "../interfaces";
import {
  addTask,
  countPriorityTasks,
  deleteTask,
  fetchListOfTasks,
  updateTask,
} from "../services/taskService";
import { toast } from "react-toastify";

const useListOfTasks = () => {
  const queryClient = useQueryClient();
  const {
    data: tasks = [],
    error,
    isLoading,
    isError,
  } = useQuery<ITaskItem[]>({
    queryKey: ["tasks"],
    queryFn: fetchListOfTasks,
  });

  // Remove task from the list
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: number) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["countTaskPriorities"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(`A aparut o eroare la stergerea task-ului!`);
    },
  });

  // Update a task from the list
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["countTaskPriorities"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(`A aparut o eroare la actualizarea task-ului!`);
    },
  });

  // Add a new task
  const addTaskMutation = useMutation({
    mutationFn: (newTask: any) => addTask(newTask),
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["countTaskPriorities"] });
      toast.success(`Task-ul ${task.title} a fost adaugat cu succes`);
    },
    onError: (err) => {
      console.log(err);
      toast.error(`A aparut o eroare la sadaugarea task-ului!`);
    },
  });

  // Add a new task
  const { data: countPriority = { low: 0, medium: 0, high: 0 } } = useQuery({
    queryKey: ["countTaskPriorities"],
    queryFn: countPriorityTasks,
  });

  return {
    tasks,
    countPriority,
    isLoading,
    error,
    isError,
    deleteTask: deleteTaskMutation.mutate,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
  };
};

export default useListOfTasks;

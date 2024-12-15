import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITaskItem, ITaskPriorityCounts, ITaskStatusCounts } from "../interfaces";
import {
  addTask,
  countPriorityTasks,
  countStatusTasks,
  deleteTask,
  fetchListOfTasks,
  updateTask,
} from "../services/taskService";
import { toast } from "react-toastify";


/**
 * Custom React hook for managing tasks list.
 */
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

  //** Remove task from the list */
  const deleteTaskMutation = useMutation({
    mutationFn: (taskId: ITaskItem["id"]) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["countTaskPriorities"] });
      queryClient.invalidateQueries({ queryKey: ["countStatusTasks"] });
    },
    onError: (err) => {
      console.log(err);
      toast.error(`A aparut o eroare la stergerea task-ului!`);
    },
  });

  /** Update a task from the list */
  const updateTaskMutation = useMutation({
    mutationFn: updateTask,
    onSuccess: (item) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["countTaskPriorities"] });
      queryClient.invalidateQueries({ queryKey: ["countStatusTasks"] });
      toast.success(`Task-ul ${item.title} a fost actualizat!`);
    },
    onError: (err) => {
      console.log(err);
      toast.error(`A aparut o eroare la actualizarea task-ului!`);
    },
  });

  /** Add a new task */
  const addTaskMutation = useMutation({
    mutationFn: (newTask: Partial<ITaskItem>) => addTask(newTask),
    onSuccess: (task) => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["countTaskPriorities"] });
      queryClient.invalidateQueries({ queryKey: ["countStatusTasks"] });
      toast.success(`Task-ul ${task.title} a fost adaugat cu succes`);
    },
    onError: (err) => {
      console.log(err);
      toast.error(`A aparut o eroare la adaugarea task-ului!`);
    },
  });

  /** Count tasks per priority */
  const { data: countPriority = {} } = useQuery<ITaskPriorityCounts>({
    queryKey: ["countTaskPriorities"],
    queryFn: countPriorityTasks,
  });

  /** Count tasks per status */
  const { data: countStatus = {}} = useQuery<ITaskStatusCounts>({
    queryKey: ["countStatusTasks"],
    queryFn: countStatusTasks,
  });

  return {
    tasks,
    countPriority,
    countStatus,
    isLoading,
    error,
    isError,
    deleteTask: deleteTaskMutation.mutate,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
  };
};

export default useListOfTasks;

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ITaskItem } from "../interfaces";
import { addTask, deleteTask, fetchListOfTasks, updateTask } from "../services/taskService";
import { toast } from "react-toastify";


const useListOfTasks = () => {
    const queryClient = useQueryClient();
    const { data:tasks = [], error, isLoading, isError } = useQuery<ITaskItem[]>({
        queryKey: ['tasks'],
        queryFn: fetchListOfTasks,
      });

    // Remove task from the list
    const deleteTaskMutation = useMutation({
      mutationFn: (taskId: number) => deleteTask(taskId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
      }
    })

    // Update a task from the list
    const updateTaskMutation = useMutation({
      mutationFn: updateTask,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
      }
    })
    
    // Add a new task
    const addTaskMutation = useMutation({
      mutationFn: (newTask: any) => addTask(newTask),
      onSuccess: (task) => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
        toast.success(`Task-ul ${task.title} a fost adaugat cu succes`)
      },
    })


      
      return {
        tasks,
        isLoading,
        error,
        isError,
        deleteTask: deleteTaskMutation.mutate,
        addTask: addTaskMutation.mutate,
        updateTask: updateTaskMutation.mutate,
      }
}

export default useListOfTasks;
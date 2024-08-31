import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { TaskItem } from "../interfaces";
import { addTask, deleteTask, fetchListOfTasks } from "../services/taskService";
import { toast } from "react-toastify";


const useListOfTasks = () => {
    const queryClient = useQueryClient();
    const { data:tasks = [], error, isLoading, isError } = useQuery<TaskItem[]>({
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
    
    // Add a new task
    const addTaskMutation = useMutation({
      mutationFn: (newTask: any) => addTask(newTask),
      onSuccess: (task) => {
        queryClient.invalidateQueries({ queryKey: ['tasks'] })
        toast.success(`Task-ul ${task.title} a fost adaugat cu succes`)
      },
      onError: (error) => {
        console.log(error.response.data)
      }
    })
      
      return {
        tasks,
        isLoading,
        error,
        isError,
        deleteTask: deleteTaskMutation.mutate,
        addTask: addTaskMutation.mutate
      }
}

export default useListOfTasks;
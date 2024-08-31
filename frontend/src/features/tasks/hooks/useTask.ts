import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteTask, fetchTask } from "../services/taskService";

const useTask = (taskId: number) => {
    const queryClient = useQueryClient();

    const {data:task, isLoading, isError, error } = useQuery({
        queryKey: ['task'],
        queryFn: () => fetchTask(taskId)
    });

    const deleteTaskMutation = useMutation({
        mutationFn: () => deleteTask(taskId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] })
        }
    })

    return {
        task,
        isLoading,
        isError,
        error,
        deleteTask: deleteTaskMutation.mutate
    }
}

export default useTask;
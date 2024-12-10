export interface ITaskItem {
    id: number;
    title: string;
    completed: boolean;
    priority: ITaskPriority,
    created_at: string;
}

export interface TaskListProps {
    tasks: ITaskItem[];
}

export interface UpdateTaskParams {
    taskId: number,
    updatedFields: Partial<ITaskItem>
}

export type ITaskPriority = 'low' | 'medium' | 'high';
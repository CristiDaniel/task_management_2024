export interface TaskItem {
    id: number;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high',
    created_at: string;
}

export interface TaskListProps {
    tasks: TaskItem[];
}

export interface UpdateTaskParams {
    taskId: number,
    updatedFields: Partial<TaskItem>
}

export type taskPriority = Pick<TaskItem, 'priority'>;
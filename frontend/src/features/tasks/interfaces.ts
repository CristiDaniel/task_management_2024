export interface ITaskItem {
    id: number;
    title: string;
    completed: boolean;
    priority: ITaskPriority,
    created_at: string;
}

export interface IUpdateTaskParams {
    taskId: number,
    updatedFields: Partial<ITaskItem>
}

export interface ITaskPriorityCounts {
    low: number;
    medium: number;
    high: number;
}

export type ITaskPriority = 'low' | 'medium' | 'high';
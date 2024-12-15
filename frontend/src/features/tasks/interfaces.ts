export interface ITaskItem {
    id: number;
    title: string;
    status: ITaskStatus;
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
export type ITaskStatus = 'pending' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
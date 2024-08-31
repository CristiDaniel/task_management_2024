export interface TaskItem {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
    priority: 'low' | 'medium' | 'high',
    created_at: string;
}

export interface TaskListProps {
    tasks: TaskItem[];
}
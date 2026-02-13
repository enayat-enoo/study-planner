export type Priority = 'Low' | 'Medium' | 'High';

export interface Task {
    id: string;
    title: string;
    priority: Priority;
    completed: boolean;
    createdAt: number;
}

export interface Subject {
    id: string;
    name: string;
    tasks: Task[];
    createdAt: number;
}

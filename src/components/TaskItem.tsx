import { Check, Trash2 } from 'lucide-react';
import type { Task } from '../types';
import { cn } from '../utils';

interface TaskItemProps {
    task: Task;
    onToggle: (taskId: string) => void;
    onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
    const priorityColors = {
        Low: 'bg-green-100 text-green-700 ring-green-600/20',
        Medium: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20',
        High: 'bg-red-100 text-red-700 ring-red-600/20',
    };

    return (
        <div className={cn(
            "group flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-white transition-all hover:shadow-sm",
            task.completed && "bg-slate-50 opacity-75"
        )}>
            <div className="flex items-center gap-3 overflow-hidden">
                <button
                    onClick={() => onToggle(task.id)}
                    className={cn(
                        "flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center transition-colors",
                        task.completed
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-slate-300 hover:border-blue-500 bg-white"
                    )}
                >
                    {task.completed && <Check size={14} strokeWidth={3} />}
                </button>

                <div className="flex flex-col min-w-0">
                    <span className={cn(
                        "text-sm font-medium text-slate-700 truncate transition-all",
                        task.completed && "text-slate-400 line-through"
                    )}>
                        {task.title}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className={cn(
                            "text-xs px-1.5 py-0.5 rounded-md font-medium ring-1 ring-inset",
                            priorityColors[task.priority]
                        )}>
                            {task.priority}
                        </span>
                    </div>
                </div>
            </div>

            <button
                onClick={() => onDelete(task.id)}
                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-md hover:bg-red-50"
                aria-label="Delete task"
            >
                <Trash2 size={16} />
            </button>
        </div>
    );
}

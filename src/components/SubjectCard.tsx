import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Subject, Priority } from '../types';
import { TaskItem } from './TaskItem';
import { ProgressBar } from './ProgressBar';

interface SubjectCardProps {
    subject: Subject;
    onAddTask: (subjectId: string, title: string, priority: Priority) => void;
    onDeleteTask: (subjectId: string, taskId: string) => void;
    onToggleTask: (subjectId: string, taskId: string) => void;
    onDeleteSubject: (subjectId: string) => void;
}

export function SubjectCard({
    subject,
    onAddTask,
    onDeleteTask,
    onToggleTask,
    onDeleteSubject
}: SubjectCardProps) {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskPriority, setNewTaskPriority] = useState<Priority>('Medium');
    const [isAdding, setIsAdding] = useState(false);

    const completedCount = subject.tasks.filter(t => t.completed).length;
    const totalCount = subject.tasks.length;
    const progress = totalCount === 0 ? 0 : (completedCount / totalCount) * 100;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        onAddTask(subject.id, newTaskTitle, newTaskPriority);
        setNewTaskTitle('');
        setIsAdding(false);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
            <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">{subject.name}</h3>
                        <p className="text-xs text-slate-500 font-medium">
                            {completedCount} / {totalCount} tasks completed
                        </p>
                    </div>
                    <button
                        onClick={() => onDeleteSubject(subject.id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                        title="Delete Subject"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
                <ProgressBar progress={progress} className="h-2" />
            </div>

            <div className="p-4 flex-1 flex flex-col gap-2 min-h-[150px]">
                {subject.tasks.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-6 text-sm italic">
                        <p>No tasks yet.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        {subject.tasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={(taskId) => onToggleTask(subject.id, taskId)}
                                onDelete={(taskId) => onDeleteTask(subject.id, taskId)}
                            />
                        ))}
                    </div>
                )}

                {isAdding ? (
                    <form onSubmit={handleSubmit} className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 animate-in fade-in slide-in-from-top-1">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Task name..."
                            className="w-full text-sm bg-white border border-slate-200 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 mb-2"
                            autoFocus
                        />
                        <div className="flex justify-between items-center">
                            <select
                                value={newTaskPriority}
                                onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
                                className="text-xs bg-white border border-slate-200 rounded px-2 py-1 focus:outline-none focus:border-blue-500 text-slate-600"
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAdding(false)}
                                    className="text-xs text-slate-500 hover:text-slate-700 px-2 py-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!newTaskTitle.trim()}
                                    className="bg-blue-600 text-white text-xs px-3 py-1 rounded font-medium disabled:opacity-50 hover:bg-blue-700 transition"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="mt-2 flex items-center justify-center gap-1 w-full py-2 rounded-lg border border-dashed border-slate-300 text-slate-500 text-sm hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all font-medium"
                    >
                        <Plus size={16} />
                        Add Task
                    </button>
                )}
            </div>
        </div>
    );
}

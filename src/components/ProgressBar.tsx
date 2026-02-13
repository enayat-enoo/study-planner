import clsx from 'clsx';

interface ProgressBarProps {
    progress: number; // 0 to 100
    className?: string;
}

export function ProgressBar({ progress, className }: ProgressBarProps) {
    return (
        <div className={clsx("w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700", className)}>
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
        </div>
    );
}

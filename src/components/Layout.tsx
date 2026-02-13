import type { ReactNode } from 'react';
import { BookOpen } from 'lucide-react';

interface LayoutProps {
    children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Header / Navbar */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-600 rounded-lg text-white">
                            <BookOpen size={20} />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-800">
                            Study<span className="text-blue-600">Planner</span>
                        </h1>
                    </div>
                    {/* Add more header items here if needed (e.g., current date, user profile placeholder) */}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>

            {/* Simple Footer */}
            <footer className="border-t border-slate-200 py-6 mt-12 bg-white">
                <div className="max-w-5xl mx-auto px-4 text-center text-slate-400 text-sm">
                    © {new Date().getFullYear()} Study Planner. All rights reserved.
                </div>
            </footer>
        </div>
    );
}

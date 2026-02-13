import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Layout } from './components/Layout';
import { SubjectCard } from './components/SubjectCard';
import { AddSubjectModal } from './components/AddSubjectModal';
import useLocalStorage from './hooks/useLocalStorage';
import type { Subject, Priority } from './types';

// Simple UUID generator if uuid package is not installed (it wasn't in plan, using random string)
const generateId = () => Math.random().toString(36).substring(2, 9);

function App() {
  const [subjects, setSubjects] = useLocalStorage<Subject[]>('study-planner-subjects', []);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addSubject = (name: string) => {
    const newSubject: Subject = {
      id: generateId(),
      name,
      tasks: [],
      createdAt: Date.now(),
    };
    setSubjects([...subjects, newSubject]);
  };

  const deleteSubject = (subjectId: string) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      setSubjects(subjects.filter(s => s.id !== subjectId));
    }
  };

  const addTask = (subjectId: string, title: string, priority: Priority) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          tasks: [
            ...subject.tasks,
            {
              id: generateId(),
              title,
              priority,
              completed: false,
              createdAt: Date.now(),
            }
          ]
        };
      }
      return subject;
    }));
  };

  const toggleTask = (subjectId: string, taskId: string) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          tasks: subject.tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return subject;
    }));
  };

  const deleteTask = (subjectId: string, taskId: string) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === subjectId) {
        return {
          ...subject,
          tasks: subject.tasks.filter(task => task.id !== taskId)
        };
      }
      return subject;
    }));
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Your Subjects</h2>
          <p className="text-slate-500">Track your progress across different topics</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-sm active:scale-95"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">Add Subject</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => (
          <SubjectCard
            key={subject.id}
            subject={subject}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
            onToggleTask={toggleTask}
            onDeleteSubject={deleteSubject}
          />
        ))}

        {subjects.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-1">No subjects yet</h3>
            <p className="text-slate-500 mb-4">Get started by adding your first subject</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
            >
              Add a new subject
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddSubjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={addSubject}
        />
      )}
    </Layout>
  );
}

export default App;

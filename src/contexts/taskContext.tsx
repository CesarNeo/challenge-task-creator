import { createContext, ReactNode, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { database } from '../services/firebase';

type Task = {
    id: string;
    title: string;
    resume: string;
    status: string;
    date: Date;
}

type TaskContextProps = {
    children: ReactNode;
}

type TaskContextData = {
    tasks: Task[] | undefined;
    newTasksFiltered: Task[] | undefined;
    handleFilterByStatus: (status: string) => void;
    setNewTasksFiltered: Dispatch<SetStateAction<Task[] | undefined>>;
}

export const TaskContext = createContext({} as TaskContextData);

export function TaskContextProvider({ children }: TaskContextProps) {
    const [tasks, setTasks] = useState<Task[]>();
    const [newTasksFiltered, setNewTasksFiltered] = useState<Task[] | undefined>(undefined);

    function handleFilterByStatus(status: string) {
        if (!tasks) {
            return;
        }

        const tasksFiltered = tasks.filter(task => task.status === status);

        setNewTasksFiltered(tasksFiltered);
    }

    useEffect(() => {
        const taskRef = database.ref('tasks');

        taskRef.on('value', task => {
            const databaseTask = task.val();
            const firebaseTasks: Task[] = databaseTask ?? {};
            const parsedTasks = Object.entries(firebaseTasks).map(([key, value]) => {

                return {
                    id: key,
                    title: value.title,
                    resume: value.resume,
                    status: value.status,
                    date: value.date
                }
            });

            setTasks(parsedTasks);
        });
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, newTasksFiltered, handleFilterByStatus, setNewTasksFiltered }}>
            {children}
        </TaskContext.Provider>
    );
}
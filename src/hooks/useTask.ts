import { useContext } from 'react';

import { TaskContext } from '../contexts/taskContext';

export function useTask() {
    const value = useContext(TaskContext);

    return value;
}
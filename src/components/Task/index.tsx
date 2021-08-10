import React, { useState } from 'react';
import { ReactElement } from 'react';
import { BiChevronDown, BiTrashAlt } from 'react-icons/bi';
import { useTask } from '../../hooks/useTask';
import { database } from '../../services/firebase';

import styles from './styles.module.scss';

type OpenTaskStatus = {
    id: string;
    open: boolean;
}

export function Task(): ReactElement {
    const { tasks, newTasksFiltered } = useTask();
    const [openTask, setOpenTask] = useState<OpenTaskStatus>({ id: '', open: false });

    const classNameTasks = (id: string, status: string) => {
        if (!tasks) {
            return;
        }

        const findTask = tasks.find(task => task.id === id);

        if (findTask) {
            switch (status) {
                case 'Concluído':
                    return styles.taskContainerCompleted
                case 'Pendente':
                    return styles.taskContainerPending
                default:
                    return styles.taskContainerCanceled
            }
        } else {
            return '';
        }

    }

    function handleTaskDropdownOpen(id: string) {
        if (!tasks) {
            return;
        }

        const idTaskIsEqual = tasks.find(task => task.id === id);

        if (!idTaskIsEqual) {
            return;
        }

        setOpenTask({ id, open: !openTask.open });
    }

    async function handleTaskStatusUpdate(id: string, status: string) {
        await database.ref(`tasks/${id}`).update({
            status
        });
    }

    async function handleTaskDelete(id: string) {
        await database.ref(`tasks/${id}`).remove();
    }

    return (
        <>
            {newTasksFiltered === undefined ? (
                tasks?.map(task => (
                    <div
                        key={task.id}
                        className={classNameTasks(task.id, task.status)}
                    >
                        <div
                            className={styles.taskContent}>
                            <header>
                                <h1>{task.title}</h1>
                            </header>
                            <span>{task.date}</span>
                            <p>{task.resume}</p>
                        </div>
                        <footer>
                            <div className={styles.dropdownStatusContainer}>
                                <button
                                    type="button"
                                    onClick={() => handleTaskDropdownOpen(task.id)}
                                    className={styles.buttonDropdownStatus}
                                >
                                    {task.status}
                                    <BiChevronDown size={19} />
                                </button>
                                {openTask.id === task.id && openTask.open && (
                                    <ul className={styles.dropdownStatusContent}>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => handleTaskStatusUpdate(task.id, 'Concluído')}
                                            >
                                                Concluído
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => handleTaskStatusUpdate(task.id, 'Pendente')}
                                            >
                                                Pendente
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => handleTaskStatusUpdate(task.id, 'Cancelado')}
                                            >
                                                Cancelado
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <button type="button" onClick={() => handleTaskDelete(task.id)}>
                                <BiTrashAlt size={24} />
                            </button>
                        </footer>
                    </div>
                ))
            ) : (
                newTasksFiltered?.map(task => (
                    <div
                        key={task.id}
                        className={classNameTasks(task.id, task.status)}
                    >
                        <div
                            className={styles.taskContent}>
                            <header>
                                <h1>{task.title}</h1>
                            </header>
                            <span>{task.date}</span>
                            <p>{task.resume}</p>
                        </div>
                        <footer>
                            <div className={styles.dropdownStatusContainer}>
                                <button
                                    type="button"
                                    onClick={() => handleTaskDropdownOpen(task.id)}
                                    className={styles.buttonDropdownStatus}
                                >
                                    {task.status}
                                    <BiChevronDown size={19} />
                                </button>
                                {openTask.id === task.id && openTask.open && (
                                    <ul className={styles.dropdownStatusContent}>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => handleTaskStatusUpdate(task.id, 'Concluído')}
                                            >
                                                Concluído
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => handleTaskStatusUpdate(task.id, 'Pendente')}
                                            >
                                                Pendente
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                type="button"
                                                onClick={() => handleTaskStatusUpdate(task.id, 'Cancelado')}
                                            >
                                                Cancelado
                                            </button>
                                        </li>
                                    </ul>
                                )}
                            </div>
                            <button type="button" onClick={() => handleTaskDelete(task.id)}>
                                <BiTrashAlt size={24} />
                            </button>
                        </footer>
                    </div>
                ))
            )}
        </>
    );
}
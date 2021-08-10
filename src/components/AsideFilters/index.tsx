import { useState } from 'react';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';

import { useTask } from '../../hooks/useTask';

import styles from './styles.module.scss';

export function AsideFilters() {
    const { handleFilterByStatus, setNewTasksFiltered } = useTask();
    const [buttonActive, setButtonActive] = useState('all');
    const isActiveButtonAll = buttonActive === 'all';
    const isActiveButtonCompleted = buttonActive === 'completed';
    const isActiveButtonPending = buttonActive === 'pending';
    const isActiveButtonCanceled = buttonActive === 'canceled';


    return (
        <aside className={styles.asideFiltersContainer}>
            <button
                type="button"
                onClick={() => {
                    setNewTasksFiltered(undefined);
                    setButtonActive('all');
                }}
            >

                <div className={isActiveButtonAll ? styles.active : ''}>
                    {isActiveButtonAll
                        ? <BsFillBookmarkFill size={25} />
                        : <BsBookmark size={25} />
                    }
                    <span>Mostrar todos</span>
                </div>
            </button>
            <button
                type="button"
                onClick={() => {
                    handleFilterByStatus('Concluído');
                    setButtonActive('completed');
                }}
            >
                <div className={isActiveButtonCompleted ? styles.active : ''}>
                    {isActiveButtonCompleted
                        ? <BsFillBookmarkFill size={25} />
                        : <BsBookmark size={25} />
                    }
                    <span>Concluído</span>
                </div>
            </button>
            <button
                type="button"
                onClick={() => {
                    handleFilterByStatus('Pendente');
                    setButtonActive('pending');
                }}
            >
                <div className={isActiveButtonPending ? styles.active : ''}>
                    {isActiveButtonPending
                        ? <BsFillBookmarkFill size={25} />
                        : <BsBookmark size={25} />
                    }
                    <span>Pendente</span>
                </div>
            </button>
            <button
                type="button"
                onClick={() => {
                    handleFilterByStatus('Cancelado');
                    setButtonActive('canceled');
                }}
            >
                <div className={isActiveButtonCanceled ? styles.active : ''}>
                    {isActiveButtonCanceled
                        ? <BsFillBookmarkFill size={25} />
                        : <BsBookmark size={25} />
                    }
                    <span>Cancelado</span>
                </div>
            </button>
        </aside>
    );
}
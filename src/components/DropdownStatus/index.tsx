import { ReactElement } from "react";
import { BiChevronDown } from 'react-icons/bi';
import { useStatus } from "../../hooks/useStatus";

import styles from './styles.module.scss';

export function DropdownStatus(): ReactElement {
    const { handleTaskStatus, taksStatus, setOpen, open } = useStatus();

    return (
        <div className={styles.dropdownStatusContainer}>
            <button
                type="button"
                onClick={() => setOpen(!open)}
                className={styles.buttonDropdownStatus}
            >
                {taksStatus}
                <BiChevronDown size={19} />
            </button>
            {open && (
                <ul className={styles.dropdownStatusContent}>
                    <li>
                        <button
                            type="button"
                            onClick={() => handleTaskStatus('Concluído')}
                        >
                            Concluído
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => handleTaskStatus('Pendente')}
                        >
                            Pendente
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={() => handleTaskStatus('Cancelado')}
                        >
                            Cancelado
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
}
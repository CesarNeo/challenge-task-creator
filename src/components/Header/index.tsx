import Image from 'next/image'
import { ReactElement } from 'react';

import logoImg from '../../../public/images/logo.svg';

import styles from './styles.module.scss';

export function Header(): ReactElement {

    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <Image src={logoImg} alt="taskcreator" />
            </div>
        </header>
    );
}
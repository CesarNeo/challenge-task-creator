import { useContext } from 'react';

import { StatusContext } from '../contexts/statusContext';

export function useStatus() {
    const value = useContext(StatusContext);

    return value;
}
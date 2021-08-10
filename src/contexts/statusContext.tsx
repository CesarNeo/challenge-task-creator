import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

type StatusContextData = {
    taksStatus: string;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>
    handleTaskStatus: (status: string) => void;
}

type StatusContextProviderProps = {
    children: ReactNode;
}

export const StatusContext = createContext({} as StatusContextData);

export function StatusContextProvider({ children }: StatusContextProviderProps) {
    const [taksStatus, setTaksStatus] = useState('Pendente');
    const [open, setOpen] = useState(false);

    function handleTaskStatus(status: string) {
        switch (status) {
            case 'Concluído':
                setTaksStatus('Concluído');
                setOpen(false);
                break;
            case 'Cancelado':
                setTaksStatus('Cancelado');
                setOpen(false);
                break;
            default:
                setTaksStatus('Pendente');
                setOpen(false);
        }
    }

    return (
        <StatusContext.Provider value={{ taksStatus, open, handleTaskStatus, setOpen }}>
            {children}
        </StatusContext.Provider>
    )
}
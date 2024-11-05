import React, { createContext, useContext, useState, useCallback } from 'react';

interface ReloadContextProps {
    reload: boolean;
    triggerReload: () => void;
}
const ReloadContext = createContext<ReloadContextProps | undefined>(undefined);

export const ReloadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [reload, setReload] = useState(false);

    const triggerReload = useCallback(() => {
        setReload(prev => !prev);
    }, []);

    return (
        <ReloadContext.Provider value={{ reload, triggerReload }}>
            {children}
        </ReloadContext.Provider>
    );
};

export const useReload = () => {
    const context = useContext(ReloadContext);
    if (!context) {
        throw new Error('useReload must be used within a ReloadProvider');
    }
    return context;
};
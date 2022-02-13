import { useState, useEffect, useCallback } from 'react';

/*function getStorageValue(key, defaultValue) {
    const saved = localStorage.getItem("favoriteMovies");
    var initVal = saved ? JSON.parse(saved) : [];
    return initVal || [];
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue)
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}*/

export function useLocalStorage(key, initialState) {
    const serializedInitialState = JSON.stringify(initialState);
    let storageValue = initialState;
    try {
        storageValue = JSON.parse(localStorage.getItem(key)) ?? initialState;
    } catch {
        localStorage.setItem(key, serializedInitialState);
    }
    const [value, setValue] = useState(storageValue);
    const updatedSetValue = useCallback(
        newValue => {
            const serializedNewValue = JSON.stringify(newValue);
            if (
                serializedNewValue === serializedInitialState ||
                typeof newValue === 'undefined'
            ) {
                localStorage.removeItem(key);
            } else {
                localStorage.setItem(key, serializedNewValue);
            }
            setValue(newValue ?? initialState);
        },
        [initialState, serializedInitialState, key]
    );
    return [value, updatedSetValue];
}
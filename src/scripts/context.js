import { createContext } from "react";

const initialValue = {
    displayName: '',
    getData: () => alert('Vide')
}

export const UserDataContext = createContext(initialValue);
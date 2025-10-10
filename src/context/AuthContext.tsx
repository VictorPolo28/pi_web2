"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import {User} from "@/types/User" // Tipo para el usuario




type AuthContextType = {
    user: User | null;   // Usuario actual o null si no está autenticado
    login:(email: string, password: string) => Promise<void>; // Función para login
    logout:() =>  void;
}

const AuthContext  = createContext<AuthContextType | undefined>(undefined);
// Se crea el contexto con tipo AuthContextType o undefined inicialmente

export const AuthProvider = ({children} :{children: ReactNode})=> {
    const [user, setUser] = useState<User | null> (null); // Estado del usuario

    const login = async (email:string, password:string)=> {
        try{
            const res = await fetch("http://localhost:8080/api/users/login",{
             method:"POST",
             headers:{"Content-Type":"application/json"},
             body:JSON.stringify({email,password}),

            });
            if(!res.ok){
                throw new Error("Credenciales incorrectas");
            }
            const data = await res.json(); // Obtiene datos del usuario
                setUser(data);
                localStorage.setItem("user",JSON.stringify(data)) ; // Guarda en localStorage
        }catch(error){
            console.error(error);
            alert("Error al iniciar sesion");
        }
    };


    const logout = () => {
        setUser(null); // Limpia estado
        localStorage.removeItem("user"); // Elimina del localStorage
    };
    return(
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context  = useContext(AuthContext);
    if(!context){
        throw new Error("useAuthContext debe usarse  dentro AuthProvider");
    }
    return context;
};
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import api from "../api";

export const AuthContext = createContext(false)

export function AuthProvider({children}){

    const[isAuthenticated , setIsAuthenticated] = useState(false)
    const [username , setUsername] = useState("")

    function get_username(){
        api.get(`/get_username/`)
        .then(res => {
            console.log(res.data);
            setUsername(res.data.username);
               
        })
        .catch(err => {
            console.log(err.message);
            
        })
    }

    function handleAuth(){
        const token = localStorage.getItem("access")
        if(!token){
            setIsAuthenticated(false)
            return;
        }
        const decoded = jwtDecode(token)
        const expiry_time = decoded.exp
        const current_time = Date.now() / 1000
        if(expiry_time >= current_time){
            setIsAuthenticated(true)
        }
        else{
            setIsAuthenticated(false)
        }
    }

    useEffect(() => {
        handleAuth()
        get_username()
    } , [])

    const authValue = {isAuthenticated , setIsAuthenticated , get_username , username}

    return(<>
    <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
    </>
    );

}
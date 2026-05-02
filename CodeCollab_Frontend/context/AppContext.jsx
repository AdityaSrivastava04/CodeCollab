import axios from "axios"
import {createContext, useEffect, useState} from "react"
import { server } from "../src/main"

const AppContext= createContext(null)

export const AppProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const [isAuth,setIsAuth]=useState(false)

    async function fecthUser() {
        setLoading(true)
        try {
            const data=axios.get(`${server}/api/v1/profile`,{
                withCredentials:true,
            })

            setUser(data)
            setIsAuth(true)

        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fecthUser()
    },[])

    return <AppContext.Provider value={{setIsAuth,isAuth,user,setUser,loading}}>{children}</AppContext.Provider>
}
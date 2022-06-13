import axios from "axios"
import React, { createContext, useEffect, useState } from "react"
import App from "../App"

export const MainContext = createContext()


const Context = () => {

  const [user,setuser] = useState({})
  const [tocken,settocken] = useState("")
  const [cartItem,setcartItem] = useState([])
  const [selectedProduct, setselectedProduct] = useState("")
  const [address, setAddress] = useState("")
    const [fetchAgain, setFetchAgain] = useState(false)
    const [allUsers, setAllUsers] = useState([])

    

    useEffect(()=>{
        let userlist = JSON.parse(localStorage.getItem("shoeDetails"))
        
        setuser({...user,...userlist})
        settocken(localStorage.getItem("shoetocken"))
        console.log("context UseEffect Called")
    },[])

    return (
        <>
        <MainContext.Provider value={{user, tocken, cartItem, setcartItem, selectedProduct, setselectedProduct, address, setAddress, fetchAgain, setFetchAgain, allUsers, setAllUsers, settocken}}>
            <App />
        </MainContext.Provider>
        </>
    )
}

 
export default Context
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0);


export default function UserContextProvider(props){
    const [userRegister, setUserRegister]=useState(null);
    const [userLogin, setUserLogin] = useState(null);
  
    useEffect(()=>{

        if(localStorage.getItem('userToken')!==null){
            setUserLogin(localStorage.getItem('userToken'));
            setUserRegister(localStorage.getItem('userToken'))
        }
    },[])
    

    return<>
    <UserContext.Provider value={{userLogin, setUserLogin , userRegister , setUserRegister}}>
        {props.children}
    </UserContext.Provider>
    </>

}


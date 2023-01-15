import { useEffect, useState } from "react";
import RouteComp from "./Router";
import { authService }  from "fBase";

function App() {
  
  const [init, setInit] = useState(false);
  const [isLogedin, setIsLogedin] = useState(authService.auth.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=>{    
    authService.authIntance.onAuthStateChanged(authService.auth,(user)=>{
      
      if(user){
        setIsLogedin(true);
        setUserObj(user);
      }
      else{
        setIsLogedin(false);
      }
      setInit(true);
    })
  },[])
  return (
    <> 
      {init ? <RouteComp isLogedin={isLogedin} userObj={userObj} /> : "initialiazing..."}
      <footer>&copy; {new Date().getFullYear() } Switter</footer>
    </>
  );
}

export default App;

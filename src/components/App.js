import { useEffect, useState } from "react";
import RouteComp from "./Router";
import  authService  from "fBase";

function App() {
  
  const [init, setInit] = useState(false);
  const [isLogedin, setIsLogedin] = useState(authService.auth.currentUser);
  
  useEffect(()=>{    
    authService.authIntance.onAuthStateChanged(authService.auth,(user)=>{
      if(user){
        setIsLogedin(true);
      }
      else{
        setIsLogedin(false);
      }
      setInit(true);
    })
  },[])
  return (
    <> 
      {init ? <RouteComp isLogedin={isLogedin} /> : "initialiazing..."}
      <footer>&copy; {new Date().getFullYear() } Switter</footer>
    </>
  );
}

export default App;

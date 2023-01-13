import { useState } from "react";
import RouteComp from "./Router";
import * as authService from "fBase";

function App() {
  const [isLogedin, setIsLogedin] = useState(authService.auth.currentUser);
  return (
    <> 
      <RouteComp isLogedin={isLogedin} />
      <footer>&copy; {new Date().getFullYear() } Switter</footer>
    </>
  );
}

export default App;

import { useState } from "react";
import RouteComp from "./Router";

function App() {
  const [isLogedin, setIsLogedin] = useState(false);
  return (
    <> 
      <RouteComp isLogedin={isLogedin} />
      <footer>&copy; {new Date().getFullYear() } Switter</footer>
    </>
  );
}

export default App;

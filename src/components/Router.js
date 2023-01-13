import {HashRouter as Router, Routes, Route} from "react-router-dom"
import  Auth from "routes/Auth" 
import  Home  from "routes/Home";

const RouteComp=({isLogedin})=>{
    
   
    return (
        <Router>
            <Routes>
                {isLogedin ? <Route path="/" element={<Home />}/> : <Route path="/" element={<Auth />} />}                
            </Routes>
        </Router>
    );
}

export default RouteComp ;
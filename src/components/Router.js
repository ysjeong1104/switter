import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Auth from "routes/Auth" 
import Home  from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const RouteComp=({isLogedin})=>{
    
   
    return (
        <Router>
            {isLogedin && <Navigation/>}
            <Routes>
                {isLogedin ? 
                    <>
                        <Route exact path="/" element={<Home />}/> 
                        <Route exact path="/profile" element={<Profile />}/> 
                    </>
                    : 
                    <>
                        <Route exact path="/" element={<Auth />} />
                    </>
                }                
             </Routes>
        </Router>
    );
}

export default RouteComp ;
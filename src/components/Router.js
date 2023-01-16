import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Auth from "routes/Auth" 
import Home  from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const RouteComp=({isLogedin,userObj,refreshUser})=>{
    
   
    return (
        <Router>
            {isLogedin && <Navigation userObj={userObj}/>}
            <Routes>
                {isLogedin ? 
                    <>
                        <Route exact path="/" element={<Home userObj={userObj} />}/> 
                        <Route exact path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser}/>}/> 
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
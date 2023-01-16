import {HashRouter as Router, Routes, Route} from "react-router-dom"
import Auth from "routes/Auth" 
import Home  from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const RouteComp=({isLogedin,userObj,refreshUser})=>{
    
   
    return (
        <Router>
            {isLogedin && <Navigation userObj={userObj}/>}
            <div
                style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
                }}
            >
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
             </div>
        </Router>
    );
}

export default RouteComp ;
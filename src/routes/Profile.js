import  authService  from "fBase";
import { useNavigate } from "react-router-dom";

const Profile=()=>{
    const navigate = useNavigate();
    const onLogOutClick=()=>{        
        authService.authIntance.signOut(authService.auth);    
        navigate("/")    
    }
   
    return (
        <>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}

export default Profile ;
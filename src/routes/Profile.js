/* eslint-disable react-hooks/exhaustive-deps */
import  { authService, dbService } from "fBase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile=({userObj,refreshUser})=>{
    const navigate = useNavigate();
    const onLogOutClick=()=>{        
        authService.authIntance.signOut(authService.auth);    
        navigate("/")    
    }

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    
    const getMySweet= async()=>{
        const collection = dbService.dbService.collection(dbService.db,"sweets");
        const query = dbService.dbService.query(collection,
                dbService.dbService.where("creatorId","==",userObj.uid),
                dbService.dbService.orderBy("createAt","DESC"));
        const sweets = await dbService.dbService.getDocs(query);

        console.log(sweets.docs.map(doc=>doc.data()));
    }
    const onSubmit= async(event)=>{
        event.preventDefault();
        
        if(userObj.displayName !== newDisplayName){
            await authService.authIntance.updateProfile(userObj,{displayName : newDisplayName});   
            refreshUser();
        }
        
    }

    const onChange=(event)=>{

        const {target:{value}} = event;
        setNewDisplayName(value);
    }
    useEffect(()=>{
        getMySweet();
    },[])
    

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input type="text" placeholder="Display Name" onChange={onChange} value={newDisplayName} autoFocus  className="formInput"/>
                <input type="submit" value="Update Profile" 
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>           
        </div>
    )
}

export default Profile ;
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
        <>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Display Name" onChange={onChange} value={newDisplayName}/>
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    )
}

export default Profile ;
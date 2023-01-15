import { dbService, storageService } from "fBase";
import { useState } from "react";

const Sweet=({sweetObj,isOwner})=>{
    
    const [editing, setEditing] = useState(false);
    const [newSweet, setNewSweet] = useState(sweetObj.text);
    const onDeleteClick= async()=>{
        const ok = window.confirm("진짜 지워요?");
        if(ok){
            const doc = dbService.dbService.doc(dbService.db,"sweets",sweetObj.id)
            try{            
                
                if(sweetObj.imgUrl){
                    const storage = storageService.getStorage();
                    const imgInfo = storageService.ref(storage,sweetObj.imgUrl);
                    await storageService.deleteObject(imgInfo);
                }
                dbService.dbService.deleteDoc(doc)
            }
            catch(err){
                console.log(err.message);
            }
        }else{

        }
    }

    const toggleEditing=()=>{
        setEditing((prev)=>!prev);
    }

    const onSubmit=(event)=>{        
        event.preventDefault();        

        const doc = dbService.dbService.doc(dbService.db,"sweets",sweetObj.id)

        try{
            dbService.dbService.updateDoc(doc,{text : newSweet});
        }
        catch(err){
            console.log(err.message);
        }    
        
        setEditing(false);

    }
    const onChange=(event)=>{

        const {target:{value}} = event;
        setNewSweet(value);
    }
    return ( 
        <div>
            
            {editing? 
                <>
                    <form onSubmit={onSubmit}>
                        <input type="text" placeholder="Edit your Sweet" value={newSweet} onChange={onChange} required/>
                        <button type="submit">Update Sweet</button>
                        <button onClick={toggleEditing}>cancle</button>
                    </form>
                </> 
                :
                <>
                    <h4>{sweetObj.text ? sweetObj.text : "nothing"}</h4> 
                    {sweetObj.imgUrl ? 
                    <div>
                        <img src={sweetObj.imgUrl} alt='' width="40px" height="50px"/>
                    </div> 
                    : ""}
                   {
                        isOwner && 
                        <>
                            <button onClick={onDeleteClick}>delete sweet</button>
                            <button onClick={toggleEditing}>edit sweet</button>
                        </>
                    }
                </>
            
            }
        </div> 
    );
}

export default Sweet;
import { dbService, storageService } from "fBase";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            
            {editing? 
                <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input type="text" placeholder="Edit your Sweet" autoFocus value={newSweet} onChange={onChange}  className="formInput" required/>
                        <button type="submit" className="formBtn">Update Sweet</button>
                        <button onClick={toggleEditing} className="formBtn cancelBtn">cancle</button>
                    </form>
                </> 
                :
                <>
                    <h4>{sweetObj.text ? sweetObj.text : "nothing"}</h4> 
                    {sweetObj.imgUrl && <img src={sweetObj.imgUrl} alt='' /> }
                   {
                        isOwner && 
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                          {/*  <button onClick={onDeleteClick}>delete sweet</button>
                            <button onClick={toggleEditing}>edit sweet</button>*/}
                        </div>
                    }
                </>
            
            }
        </div> 
    );
}

export default Sweet;
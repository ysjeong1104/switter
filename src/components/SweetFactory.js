import { useState,useRef } from "react";
import { dbService,storageService } from "fBase";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const SweetFactory=({userObj})=>{

    const [sweet, setSweet] = useState("")
    const [attachment, setAttachment] = useState("");
    const fileObj = useRef();
    const collection = dbService.dbService.collection(dbService.db,"sweets");

    const onSubmit= async(event)=>{
        event.preventDefault();
        if (sweet === "") {
            return;
        }
       // const collection = dbService.dbService.collecdtion(dbService.db,"sweets");        
        //console.log(fileObj.current.files[0].type);
        let attachmentUrl = "";
        if(attachment !== ""){
            const file = fileObj.current.files[0];
            const metaData = {
                contentType: file.type
            };
            const storage = storageService.getStorage();
            const fileRef = storageService.ref(storage,`${userObj.uid}/${uuidv4()}`);
            const upResult = await storageService.uploadBytes(fileRef,file,metaData);
            attachmentUrl = await storageService.getDownloadURL(upResult.ref);
            
        }
        const sweetValue = {   text : sweet,
            imgUrl : attachmentUrl,
            createAt : Date.now(), 
            creatorId : userObj.uid
        }
        
      //  await fileRef
        await dbService.dbService.addDoc(collection,sweetValue);        
        setSweet("");      
        setAttachment("")
        fileObj.current.value = '';
    }
    const onChange=(event)=>{
        
        const {target:{value}} = event;
        setSweet(value);
    }    

    const onFileChange=(event)=>{
        console.log(event)
        const {target:{files}} = event;       
        if(files.length > 0){
            const theFile = files[0];
            const reader = new FileReader(theFile);
            try{
                reader.onloadend=(finishedEvent)=>{
                    const {currentTarget : {result}} = finishedEvent;
                    setAttachment(result);
                }
                reader.readAsDataURL(theFile);
            }
            catch(err){
                console.log(err)
            }
        }
        else{
            setAttachment(null);
         //   console.log(fileObj.current.value);
          //  fileObj.current.value = "";
        }
       // console.log(theFile);
    }

    const onClearAttachment=()=>{
        
        setAttachment(null);
        fileObj.current.value = "";
    }

    return(
        <form onSubmit={onSubmit} className="factoryForm"> 
            <div className="factoryInput__container">
                <input type="text" name='sweet' value={sweet} onChange={onChange} placeholder="What's on your mind" maxLength={120}
                    className="factoryInput__input" />
                
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />                
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} ref={fileObj} 
                style={{
                    opacity: 0,
                }}/>

            {attachment &&(
                <div className="factoryForm__attachment">
                    <img
                        src={attachment}
                        style={{
                        backgroundImage: attachment,
                        }}
                    alt=""/>
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
    );
}

export default SweetFactory
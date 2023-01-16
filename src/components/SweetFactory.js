import { useState,useRef } from "react";
import { dbService,storageService } from "fBase";
import {v4 as uuidv4} from "uuid";
const SweetFactory=({userObj})=>{

    const [sweet, setSweet] = useState("")
    const [attachment, setAttachment] = useState(null);
    const fileObj = useRef();
    const collection = dbService.dbService.collection(dbService.db,"sweets");
    
    const onSubmit= async(event)=>{
        event.preventDefault();
       // const collection = dbService.dbService.collecdtion(dbService.db,"sweets");        
        //console.log(fileObj.current.files[0].type);
        let attachmentUrl = "";
        if(attachment !== null){
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
        setAttachment(null)
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
        <form onSubmit={onSubmit}>                
            <input type="text" name='sweet' value={sweet} onChange={onChange} placeholder="What's on your mind" maxLength={120}/>
            <input type="file" accept="image/*" onChange={onFileChange} ref={fileObj}/>
            <input type="submit" value="Sweet" />
            {attachment && <div><img src={attachment} width="50px" height="50px" alt=''/><button onClick={onClearAttachment}>Clear</button></div>}
        </form>
    );
}

export default SweetFactory
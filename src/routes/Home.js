import { useEffect, useState } from "react";
import { dbService } from "fBase";
import Sweet from "components/Sweet";

const Home=({userObj})=>{

    const [sweet, setSweet] = useState("");
    const [sweets, setSweets] = useState([]);
    const collection = dbService.dbService.collection(dbService.db,"sweets");
  //  console.log(userObj);
 
    useEffect(()=>{
      //  const collection = dbService.dbService.collection(dbService.db,"sweets");
     //   getSweets();       
        const q = dbService.dbService.query(collection);
        dbService.dbService.onSnapshot(q,snapshop=>{
            const sweetArray = snapshop.docs.map((obj)=>({
                id : obj.id,
                ...obj.data()
            }))

            setSweets([...sweetArray]);
        })
    },[])
    const onSubmit= async(event)=>{
        event.preventDefault();
       // const collection = dbService.dbService.collection(dbService.db,"sweets");        
        await dbService.dbService.addDoc(collection,
                {   text : sweet,
                    createAt : Date.now(), 
                    creatorId : userObj.uid
                });        
        setSweet("");
        
    }
    const onChange=(event)=>{
        const {target:{value}} = event;
        setSweet(value);
    }    
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" name='sweet' value={sweet} onChange={onChange} placeholder="What's on your mind" maxLength={120}/>
                <input type="submit" value="Sweet" />
            </form>
            <div>
                {sweets.map((data)=>{
                    return (
                        <Sweet key={data.id} sweetObj={data} isOwner={data.creatorId === userObj.uid }/>
                    )}
                )}
                
            </div>
        </div>
    )
}

export default Home ;
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect,  useState } from "react";
import { dbService } from "fBase";

import Sweet from "components/Sweet";
import SweetFactory from "components/SweetFactory";

const Home=({userObj})=>{

    
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
    
    return (
        <div className="container">
            <SweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
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
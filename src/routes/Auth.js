import * as authService  from "fBase";
import { useState } from "react";

const Auth=()=>{

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange=(event)=>{
        
        const {target : {name, value}} = event;
        if(name === "email"){
            setEmail(value);
        }
        if(name ==="password"){
            setPassword(value);
        }
    }

    const onSubmit= async(event)=>{
        event.preventDefault();      
        try{
            let data;
            if(newAccount)  {
                //create Account
                data =  await authService.createUserWithEmailAndPassword(authService.auth,email,password);
            }else{
                //Login
                data = await authService.signInWithEmailAndPassword(authService.auth, email,password);
            }
            console.log(data);
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name='email' type='email' placeholder="Email" required  value={email} onChange={onChange}/>
                <input name='password' type='password' placeholder="Password" required  value={password} onChange={onChange}/>
                <input type='submit' value={newAccount ? "Create Account" : "Log in"}/>
            </form>
            <div>
                <button>
                    Continue with Google
                </button>
                <button>
                    Continue with Github
                </button>
            </div>
        </div>
    );
}

export default Auth;
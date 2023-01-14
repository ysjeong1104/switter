import authService from "fBase";
import { useState } from "react";

const Auth=()=>{

    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
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
                data =  await authService.authIntance.createUserWithEmailAndPassword(authService.auth,email,password);
            }else{
                //Login
                data = await authService.authIntance.signInWithEmailAndPassword(authService.auth,email,password);
            }
            console.log(data);
        }
        catch(error){
            setError(error.message);
        }
    }

    const toggleAccount = ()=>{
        setNewAccount(prev=> !prev);
    }

    const onSocialClick=async (event)=>{

        const {target:{name}} = event;
        let provider = null;
        if(name === "google"){
            provider = new authService.authIntance.GoogleAuthProvider();
        }
        else if(name ==="github"){
            provider = new authService.authIntance.GithubAuthProvider();
        }

        const data = await authService.authIntance.signInWithPopup(authService.auth,provider);

        console.log(data);

    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name='email' type='email' placeholder="Email" required  value={email} onChange={onChange}/>
                <input name='password' type='password' placeholder="Password" required  value={password} onChange={onChange}/>
                <input type='submit' value={newAccount ? "Create Account" : "Log in"}/>
                <div>{error}</div>
            </form>
            <span onClick={toggleAccount}>{newAccount?"sign in " : "Create Account"}</span>
            <div>
                <button name="google" onClick={onSocialClick}>
                    Continue with Google
                </button>
                <button name="github" onClick={onSocialClick}>
                    Continue with Github
                </button>
            </div>
        </div>
    );
}

export default Auth;
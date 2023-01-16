import AuthForm from "components/AuthForm";
import { authService } from "fBase";

const Auth=()=>{
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
            <AuthForm/>
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
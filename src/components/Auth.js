import { auth, googleAuthProvider } from "../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import "../styles/Auth.css";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = (props) =>{
    const { setIsAuth } = props;

    const signInHandler = async() =>{
        try{
            const userData = await signInWithPopup(auth, googleAuthProvider);
            cookies.set("auth-token", userData.user.refreshToken);
            setIsAuth(true);
        }catch(err){
            console.error(err);
        }
        
    }

    return(
        <div className="auth">
            <p>before you continue please SignIn with your google account</p>
            <button className="btn btn-outline-primary" onClick={signInHandler}>SignIn</button>
        </div>
    );
}
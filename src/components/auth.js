import { auth, googleProvider } from "../Config/firebase";
import { createUserWithEmailAndPassword, signOut, signInWithPopup } from "firebase/auth";
import { useState } from "react";


export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    console.log(auth?.currentUser?.photoURL)

    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signinwithgoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    };
    
    const Logout = async () => {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div> 
            <input 
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input
                placeholder="Password" 
                type="password"
                onChange={(e) => setpassword(e.target.value)}
            />
            <button onClick={signIn}> Sign In </button>
            <button onClick={signinwithgoogle}> Sign In with Google</button>
            <button onClick={Logout}> Sign Out </button>
        </div>
    )
}
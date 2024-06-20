'use client'
import {signOut } from "@firebase/auth";
import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "@/lib/firebase";
import {deleteCookieServer, setServerCookie} from "@/actions/serverCookies";
import {setCookieClient} from "@/actions/clientCookies";


const  singIn=async (email:string,password:string)=>{
    await signInWithEmailAndPassword(auth,email,password)
        .then( (userCredential) => {
             setCookieClient('token',userCredential.user.uid)
            return window.location.replace('/pages/home');
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
            return errorCode
        });
}

export default singIn

export async function sinOut(){
    await deleteCookieServer('token')
    await signOut(auth)
    return window.location.replace('/login')
}
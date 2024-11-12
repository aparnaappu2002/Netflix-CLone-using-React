
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";





const firebaseConfig = {
  apiKey: "AIzaSyB78trMf4IfabJbCyPRRi_Ua64LFtUFTRk",
  authDomain: "netflix-clone-ec50c.firebaseapp.com",
  projectId: "netflix-clone-ec50c",
  storageBucket: "netflix-clone-ec50c.firebasestorage.app",
  messagingSenderId: "79829717405",
  appId: "1:79829717405:web:12956d9c5b329aa8cadf74"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

const signup = async (name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password)
        const user = res.user
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })
    }catch(error)
    {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email,password) =>{
    try{

       await signInWithEmailAndPassword(auth,email,password)

    }catch(error)
    {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = ()=>{
    signOut(auth)
}

export {auth,db,login,signup,logout}
import { createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../Firebase/Firebase.config";
export const AuthContext = createContext()




const AuthProvider = ({children}) => {

  const [user , setUser] = useState(null)
  const [loading , setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    function googleSignIn(){
        return signInWithPopup(auth, googleProvider)
    }

    function logOut(){
      return signOut(auth)
      setLoading(true)
    }

    useEffect(()=>{
      onAuthStateChanged(auth,(currentUser)=>{
        if(currentUser){
          setUser(currentUser)
          setLoading(true)
        }else{
          setUser(null)
          setLoading(false)
        }
      })
    })



    const obj = {
        googleSignIn,logOut,user , setUser, loading, setLoading
    }
    return (
        <AuthContext.Provider value={obj}>
          {children}
        </AuthContext.Provider>
      );
}

export default AuthProvider
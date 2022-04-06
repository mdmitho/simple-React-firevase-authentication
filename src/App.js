
import './App.css';
import app from './firebase.init';

import {getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut} from 'firebase/auth'
import { useState } from 'react';
const auth =getAuth()


function App() {

  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const gitProvider = new GithubAuthProvider();

  const handleGoogleSingIn =()=>{
    // console.log('woring');
    signInWithPopup(auth,googleProvider)
    .then(result =>{
      const user = result.user
      setUser(user)
      console.log(user);
    })
    .catch(error => {
      console.log(error);
    })
  }

 const handleGithubSingIn =()=>{
       signInWithPopup(auth,gitProvider)
       .then(result =>{
         const user = result.user
         setUser(user)
         console.log(user);
       }).catch(error=> {
  console.error(error);
       })

 }

  const handleSingOut = () =>{
    signOut(auth)
    .then(() => {
      // Sign-out successful.
      setUser({})
    }).catch((error) => {
      // An error happened.
      setUser({})
    });
  }
  return (
    <div className="App">
      <h1>hi</h1>

      {/* {condigiton ? true : flase} */}
  {  
      user.uid? 
      <button onClick={handleSingOut}>Sing Out</button> :
  <>
       <button onClick={handleGoogleSingIn}> Google Sing In</button>
      <button onClick={handleGithubSingIn}>Github Sing IN</button>
  </>
      }
      <h1>Name : {user.displayName}</h1>
      <p>I know your email address : {user.email}</p>
      <img src={user.photoURL} alt="" />
   
     
    </div>
  );
}


export default App;

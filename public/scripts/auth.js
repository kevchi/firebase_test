import { auth,
  createUserWithEmailAndPassword_Fi,
  signInWithEmailAndPassword_Fi,
  onAuthStateChanged_Fi,
  signOut_Fi 

} from './app.js'


const userEmail = document.querySelector("#userEmail");
const userPassword = document.querySelector("#userPassword");
const authForm = document.querySelector("#authForm");
const secretContent = document.querySelector("#secretContent");


secretContent.style.display = 'none';

export const userSignUp = async() => {
    const signUpEmail = userEmail.value;
    const signUpPassword = userPassword.value;
    createUserWithEmailAndPassword_Fi(auth, signUpEmail, signUpPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("Your account has been created!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    })
}

export const userSignIn = async() => {
    const signInEmail = userEmail.value;
    const signInPassword = userPassword.value;
    signInWithEmailAndPassword_Fi(auth, signInEmail, signInPassword)
    .then((userCredential) => {
        const user = userCredential.user;
        alert("You have signed in successfully!");
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage)
    })
}



    export const checkAuthState = async() => {
      onAuthStateChanged_Fi(auth, user => {
          if(user) {
              authForm.style.display = 'none';
              secretContent.style.display = 'block';
          }
          else {
              authForm.style.display = 'block';
              secretContent.style.display = 'none';
          }
      })
  }
  
export const userSignOut = async() =>  {
    {
      await signOut_Fi(auth);
  }
      };
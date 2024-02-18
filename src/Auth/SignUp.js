import React, { useState} from 'react';
import { auth } from '../firebase/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import { Link } from 'react-router-dom';

const SignUp = ({ isAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verficationMessage, setVerificationMessage] = useState("");
    const [error, setError] = useState("");

    const signUp = async (e) => {
        e.preventDefault();
        
        try {
            const userCredential = await signUpAndVerifyEmail(email, password);
            console.log(userCredential);
            setVerificationMessage("Verification email sent. Please check your email and click on the verifcation link.");
        
        } catch (error){

            if (error.code === "auth/email-already-in-use"){
                setError("Email address is already in use. Please use a different email address.");
            }
            console.log(error);
        }
    };

    const signUpAndVerifyEmail = async (email, password) => {

        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // Send Email Verification
            await sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log("Verifrication email sent.");
                })
                .catch((error) => {
                    console.log(error);
                });

        return userCredential; 
    }


    return (
      <div className="flex items-start justify-center container mx-auto mt-20 p-4 h-screen" >


        <div className="bg-white p-4 rounded-md w-2/3 h-1/2 shadow-lg">
          <form onSubmit={signUp}>
              <h1 className="text-2xl font-bold mt-5 mb-5 flex items-center justify-center">Create Account</h1>
              <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 mt-5 mb-5 border-b"
                ></input>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 mt-5 mb-10 border-b"
                ></input>

              <div className="flex items-center justify-center">

                  <button type="submit" className="bg-green-500 text-white p-3
                rounded-md hover:bg-green-600 text-lg flex justify-center">
                    Sign Up
                  </button>
              </div>

              {verficationMessage && (
                  <div className="mt-3 text-green-500 text-center text-base">{verficationMessage}</div>
              )}

              {error && !verficationMessage && (
                  <div className="mt-3 text-green-500 text-center text-base">{error}</div>
              )}

              {isAuthenticated && (
                  <div className="flex items-center justify-center">
                       <Link to="/login" className="bg-green-500 text-white px-5 py-2 mt-3 rounnded hover:bg-green-600">
                            Sign In
                        </Link>
                  </div>
                 
              )}

          </form>
        </div>

        <div className="w-1/2 p-2 flex flex-col absolute bottom-0 left-0 ">
            <Link to="/" className="bg-green-500 text-white py-2 px-1 
                rounded-md hover-bg-green-600 text-base flex justify-center">
                    Back to Home
            </Link>
            

        </div>

        <div className="w-1/2 p-2 flex flex-col absolute bottom-0 right-0">
            <Link to="/dashboard" className="bg-green-500 text-white py-2 px-1 
                rounded-md hover-bg-green-600 text-base flex justify-center">
                    Profile
            </Link>
        </div>


      </div>
      
    )
}

export default SignUp;
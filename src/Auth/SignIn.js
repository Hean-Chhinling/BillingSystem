import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [forgotPasswordClicked, setForgotPasswordClicked] = useState(false);
    const navigate = useNavigate();
  
    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(userCredential);
            navigate('/dashboard');
        })
        .catch((error) => {
            console.log(error);
            setError("Invalid username or password. Please Try Again.");
        });
    };

    const handleForgotPassword = () => {
        if(!forgotPasswordClicked){
            setForgotPasswordClicked(true);
            sendPasswordResetEmail(auth, email)
            .then(() => {
                setError("Password reset email sent. Check your inbox.");
            })
            .catch((error) => {
                console.log(error);
                setError("Error sending password reset email. Please enter a valid email.");
            });
        }
        
    }



  return (
    <div className="flex items-start justify-center container mx-auto mt-20 p-4 h-screen">

        <div className="bg-white p-4 rounded-md w-2/3 h-1/2 shadow-lg">
            <form onSubmit={signIn}>
                <h1 className="text-2xl font-bold mt-5 mb-5 flex items-center justify-center">Log In</h1>
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
                    className="w-full p-2 mt-5 mb-5 border-b"
                ></input>

                <div className="flex items-center justify-center">
                    <button type="submit" className="bg-green-500 text-white p-3
                rounded-md hover:bg-green-600 text-lg flex justify-center">
                        Log In
                    </button>
                </div>

                {error && (
                    <p className="text-red-500 mt-3 text-center text-base">{error}</p>
                )}

                {error && !forgotPasswordClicked && (
                    <div className="flex items-center justify-center mt-1">
                        <button type="button" onClick={handleForgotPassword} className="text-green-500 hover:underline focus:outline-none text-base">
                            Forgot Password?
                        </button>
                    </div>
                )}
                
            </form>
        </div>
    

        <div className="w-1/2 p-2 flex flex-col absolute bottom-0 left-0 ">
            <Link to="/" className="bg-green-500 text-white py-2 px-1 
                rounded-md hover:bg-green-600 text-base flex justify-center">
                    Back to Home
            </Link>
            

        </div>

        <div className="w-1/2 p-2 flex flex-col absolute bottom-0 right-0">
            <Link to="/dashboard" className="bg-green-500 text-white py-2 px-1 
                rounded-md hover:bg-green-600 text-base flex justify-center">
                    Profile
            </Link>
        </div>
    </div>
  )
}

export default SignIn;
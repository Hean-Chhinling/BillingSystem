import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut} from 'firebase/auth';
import { auth, storage } from '../firebase/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { serverTimestamp } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';
import { v4 } from "uuid";
import { BeatLoader } from 'react-spinners';

// require('dotenv').config();

const Dashboard = () => {
    const [authUser, setAuthUser] = useState(null);
    const [userData, setDataUser] = useState({
        Name: '', PhoneNumber: '', Bank: null,
    });
    const [buttonStatus, setButtonStatus] = useState('Save Data');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    const userSignOut = () => {
        signOut(auth)
            .then(() => {
                console.log("Sign out successful");
            })
            .catch((error) => console.log(error));
    };


    let name, value;
    console.log(userData);
    const data = (e) => {
        name = e.target.name;
        value = e.target.value;
        setDataUser((prevData) => ({ ...prevData, [name]: value }));
    };

    const updateDataAndSave = async (e) => {
        e.preventDefault();
        setButtonStatus('Saving...');
    
        try {
            if (!userData.Bank) {
                alert("Please select a bank QR code image.")
                setButtonStatus('Save Data');
                return;
            }
    
            const { Name, PhoneNumber, Bank } = userData;
            const userId = authUser.uid;
            const timestamp = serverTimestamp();

            const imageRef = ref(storage, `images/${Bank.name + v4()}`);

            const authToken = await authUser.getIdToken();
            console.log("Auth Token: ", authToken);
            console.log("User Id", userId);

            await uploadBytes(imageRef, Bank);
            const url = await getDownloadURL(imageRef);
            
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //'Authorization': `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    userId, Name, PhoneNumber, Bank:url, timestamp,
                }),
            };

            console.log("Option: ", options)
        
            const result = await fetch(
                process.env.REACT_APP_FIREBASE_REALTIME_DATABASE,
                options
            );

            console.log("Repponse Status: ", result.status);
            console.log("Response Content: ", await result.text());

            if (result) {
                setButtonStatus("Saved Data");
                alert("Data saved successfully");
            } else {
                setButtonStatus("Save Data");
                alert("Error occured. Data cannot be saved.");
            }
    
        } catch (error) {
            console.error("Error during file upload:", error);
            setButtonStatus('Save Data');
        }
    };


    useEffect(() => {
        const listen = onAuthStateChanged(auth, async (user) => {
            console.log("User: ", user);
            if (user && user.emailVerified) {
                setAuthUser(user);
            } else {
                navigate("/");
            }

            // Set a loading to false by 300 millisecond once authentication check is completed
            setTimeout(() => {
                setLoading(false);
            }, 300);
        });

        return () => {
            listen();
        };
    }, [navigate]);





    return (
        <div className="container mx-auto p-4 h-screen">
            {loading ? (
                <div className="flex justify-center items-center h-screen">
                    <BeatLoader color="#4CAF50" loading={loading} size={15} />
                </div>
                ) : authUser ?(
                    <>
                        <p className="text-lg lg:text-1xl xl:text-2xl font-bold text-green-600">{`Signed In as ${authUser.email}`}</p>

                        <div className="mt-5 mb-5 bg-white p-4 rounded-md h-3/5 shadow-lg">

                            <form method="POST">
                                <div className="mt-4 mb-5">
                                    <label className="block text-base lg:text-2xl font-semibold text-green-800 mb-2" htmlFor="Name">
                                        Name
                                    </label>
                                    <input
                                        className="text-base lg:text-2xl w-full p-2 border rounded-md"
                                        type="text"
                                        name="Name"
                                        placeholder="Enter your name"
                                        value={userData.Name}
                                        autoComplete="off" required onChange={data}
                                    />
                                </div>

                                <div className="mb-5">
                                    <label className="block text-base lg:text-2xl font-semibold text-green-800 mb-2" htmlFor="PhoneNumber">
                                        Phone Number
                                    </label>
                                    <input
                                        className="text-base lg:text-2xl w-full p-2 border rounde-md"
                                        type="number"
                                        name="PhoneNumber"
                                        placeholder="Enter your phone number"
                                        value={userData.PhoneNumber}
                                        autoComplete="off" required onChange={data} />
                                </div>

                                <div className="mb-2">
                                    <label className="block text-base lg:text-2xl text-xm font-semibold text-green-800 mb-2" htmlFor="Bank">
                                        Upload your bank QR code image (.jpg, .png)
                                    </label>
                                    <input
                                        className="text-base lg:text-2xl w-full p-2 border rounded-md"
                                        type="file"
                                        name="Bank"
                                        // value={userData.Bank} 
                                        autoComplete="off"
                                        required
                                        onChange={(event) => {
                                            setDataUser((prevData) => ({
                                                ...prevData,
                                                Bank: event.target.files[0],
                                            }));
                                        }}
                                    />
                                </div>

                                <div className="text-sm lg:text-2xl w-1/2 p-2 flex">

                                    <button
                                        className={`mt-2 ${buttonStatus === 'Saved Data' ? 'bg-white text-gray-500' : 'bg-green-500 text-white hover:bg-green-600'} px-4 py-2 rounded-md`}
                                        type="submit"
                                        onClick={updateDataAndSave}
                                        disabled={buttonStatus === 'Saved Data'}
                                    >
                                        {buttonStatus}
                                    </button>
                                </div>

                            </form>
                        </div>

                        <div className="w-1/2 p-2 flex flex-col absolute bottom-0 left-0 ">
                            <button onClick={userSignOut} className="text-sm lg:text-2xl bg-green-500 text-white py-2 px-1 
                        rounded-md hover:bg-green-600 text-base">
                                Sign Out
                            </button>

                        </div>
                        <div className="w-1/2 p-2 flex flex-col absolute bottom-0 right-0 ">
                            <Link to="/calculation" className="text-sm lg:text-2xl bg-green-500 text-white py-2 px-1 
                        rounded-md hover:bg-green-600 text-base flex justify-center">
                                Start Calculation Now
                            </Link>

                        </div>
                    </>
                ) : (
                    <>
                        <p className="text-xl">Signed Out</p>
                        <Link to="/" className="bg-green-500 text-white py-2 px-2 mt-2 rounded-md hover:bg-green-600 flex justify-center">
                            Back Home
                        </Link>
                    </>
                )}
        </div>
    );
};
export default Dashboard;
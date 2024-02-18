import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';


const Home = ({ isAuthenticated, menuOpen }) => {
    console.log("Menu Open: ", menuOpen);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isAuthenticated || !isAuthenticated) {

            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    }, [isAuthenticated])


    const backgroundImage = 'https://images.unsplash.com/photo-1543006623-e23032c9b70e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=988&q=80';

    const [backgroundStyle, setBackgroundStyle] = useState({
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        height: '93%', // Initial height
        left: '5.7%',
        transition: 'transform 0.3s ease',
        transform: menuOpen ? 'translateY(10px)' : 'translateY(0)',
    });

    const overlayStyle = {
        position: 'absolute',
        top: 71.555,
        left: '54.69%',
        right: '10%',
        bottom: 10,
        width: '45%',
        height: '92%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 2,
        transition: 'transform 0.3s ease',
        transform: menuOpen ? 'translateY(100px)' : 'translateY(0)',
    };

    const frameStyle = {
        border: '10px solid green',
        boxSizing: 'border-box',
        position: 'absolute',
        top: 72,
        left: '54.69%',
        right: '2%',
        bottom: '1%',
        height: '92%',
        width: '45.3%',
        zIndex: 10,
        transition: 'transform 0.3s ease',
        transform: menuOpen ? 'translateY(100px)' : 'translateY(0)',
    }

    // Update height and width based on screen size
    const updateBackgroundStyle = () => {
        if (window.innerWidth < 500) {
            setBackgroundStyle(prevStyle => ({
                ...prevStyle,
                height: '83%',
                width: '43%'
            }));
        } else {
            setBackgroundStyle(prevStyle => ({
                ...prevStyle,
                height: '93%',
            }));
        }
    };

    useEffect(() => {

        window.addEventListener('resize', updateBackgroundStyle);
        updateBackgroundStyle();

        return () => window.removeEventListener('resize', updateBackgroundStyle);
    });

    useEffect(() => {
        const translateYValue = isAuthenticated ? '10px' : '40px';
        const newBackgroundStyle = {
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            height: '93%', // Initial height
            left: '5.7%',
            transition: 'transform 0.3s ease',
            transform: menuOpen ? `translateY(${translateYValue})` : 'translateY(0)',
        };

        setBackgroundStyle(newBackgroundStyle);
    }, [menuOpen, isAuthenticated]);


    console.log("Loading: ", loading);

    return (
            <div className="container mx-auto h-screen">
                { loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <BeatLoader color="#4CAF50" loading={loading} size={25} />
                    </div>
                ) : (
                        
                    <div className="container mx-auto p-2 flex lg:flex-row h-screen">        
                            <>
                            
                                <div className="w-1/2 p-4 flex flex-col justify-center">
                                    <h1 className="text-1xl lg:text-3xl xl:text-5xl font-semibold mb-4 text-center"> Welcome to our Billing System</h1>
                                    <p className="text-base lg:text-2xl xl:text-3xl text-gray-600 mb-8 md:text-1xl lg:text-2xl xl:text-3xl hidden md:block">
                                        Effortlessly manage electricity billing for your tenants.
                                        Simply input the room number, tenant's name, previous meter reading, current meter reading,
                                        and the unit price to generate accurate and efficient billing statements
                                    </p>
                                    {isAuthenticated ? (
                                        <>
                                            <Link to="/calculation" className="text-lg lg:texl-1xl xl:text-2xl bg-green-500 text-white text-center py-2 px-4 rounded-md hover:bg-green-600 flex flex-col items-center justify-center">
                                                Start Calculation Now
                                            </Link>
                                            <Link to="/login" className="text-lg lg:texl-1xl xl:text-2xl bg-green-500 text-white py-2 px-4 mt-3 rounded-md hover:bg-green-600 flex items-center justify-center">
                                                Sign In
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <Link to="/calculation" className="text-lg lg:texl-1xl xl:text-2xl bg-green-500 text-white text-center py-2 px-4 rounded-md hover:bg-green-600 flex items-center justify-center">
                                                Start Calculation Now
                                            </Link>
                                            <Link to="/login" className="text-lg lg:texl-1xl xl:text-2xl bg-green-500 text-white py-2 px-4 mt-3 rounded-md hover:bg-green-600 flex items-center justify-center">
                                                Sign In
                                            </Link>
                                            <Link to="/signup" className="text-lg lg:texl-1xl xl:text-2xl bg-green-500 text-white py-2 px-4 mt-3 rounded-md hover:bg-green-600 flex items-center justify-center">
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                                <div className="w-1/2 bg-right-bg bg-cover bg-center" style={backgroundStyle}></div>
                                <div style={overlayStyle}></div>
                                <div style={frameStyle}></div>
                            </>
                    </div>        
                )}
        </div>
    );
}

export default Home;
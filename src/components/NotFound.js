import React from 'react';

const NotFound = () => {

    return (
        <div className="container mx-auto h-screen flex items-center justify-center">

            <div className="text-center">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">404 - Not Found</h1>
                <p className="text-lg lg:text-1xl xl:text-2xl">Oops! The page you are looking for might be in another universe.</p>
            </div>
            
        </div>
    );
}

export default NotFound;
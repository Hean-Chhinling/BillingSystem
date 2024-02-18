import React from 'react';

const Footer = () => {

    return (
        <footer className="bg-green-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div>
                    <p className="text-xs lg:text-base xl:text-1xl">&copy; 2023 Hean Chhinling. All rights reserved.</p>
                </div>
                <div className="text-xs lg:text-base xl:text-1xl mr-4">
                    Email: heanchhinling@gmail.com
                </div>
            </div>
        </footer>
    );
}

export default Footer;
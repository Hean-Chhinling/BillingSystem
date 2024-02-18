import React from 'react';
import homeImage from '../assets/Home.png';
import profileImage from '../assets/Profile.png';
import signupImage from '../assets/Signup.png';
import signinImage from '../assets/Signin.png';
import calculationImage from '../assets/Calculation.png';
import downloadpdfImage from '../assets/Pdfresult.png';


const About = () => {

    return (
        <div className="container mx-auto p-4 h-auto">
            <h1 className="text-3lg lg:text-2xl xl:text-3xl font-bold mb-4">About BillingSystem Website</h1>

            {/* Purpose Section */}

            <section className="mb-4 md:mb-6">
                <h2 className="text-lg lg:text-2lg xl:text-2xl font-bold mb-2">Purpose</h2>
                <p className="text-base lg:text-lg xl:text-1xl hover:text-green-800 transition duration-300 ease-in-out transform hover:scale-105">
                    BillingSystem aims to simplify the billing process for house owners by providing an easy-to-use platform.
                    Create PDF billing statements with QR codes for tenatns, making payments straightforward and efficent.
                </p>
            </section>

            {/* Features Section */}

            <section className="mb-4 md:mb-6">
                <h2 className="text-lg lg:text-2lg xl:text-2xl font-bold mb-2">
                    Features
                </h2>
                <ul className="list-disc list-inside text-base lg:text-lg xl:text-1xl">
                    <li className="hover:text-green-800 transition duration-300 ease-in-out transform hover:scale-105">Auto PDF Generation for billing statements</li>
                    <li className="hover:text-green-800 transition duration-300 ease-in-out transform hover:scale-105">Save User Profile with Name, Phone Number, and Bank QR Code.</li>
                    <li className="hover:text-green-800 transition duration-300 ease-in-out transform hover:scale-105">Allow Anonymouse Billing Calculations, but cannot download PDF format.</li>
                </ul>
            </section>

            {/* How It Works Section */}
            
            <section className="mb-4 md:mb-6">
                <h2 className="text-lg lg:text-2lg xl:text-2xl font-bold mb-2">How It Works</h2>
                <p className="text-base lg:text-lg xl:text-1xl hover:text-green-800 transition duration-300 ease-in-out transform hover:scale-105">
                    BillingSystem allows users to instantly calculate bills without creating an account.
                    For personalized experience, users can create an accouunt, complete their profile with name,
                    phone number, and upload their bank's QR code. The system then auto-generates PDF bills with the provided information.
                </p>
                <p className="text-base lg:text-lg xl:text-1xl hover:text-green-800 transition duration-300 ease-in-out transform hover:scale-105 mb-4 mt-4">
                    Below are a step-by-step guide:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <img src={homeImage} alt="Home" className="w-full h-auto mb-2 transition duration-300 ease-in-out transform hover:scale-105" />
                    <img src={signupImage} alt="Home" className="w-full h-auto mb-2 transition duration-300 ease-in-out transform hover:scale-105" />
                    <img src={signinImage} alt="Home" className="w-full h-auto mb-2 transition duration-300 ease-in-out transform hover:scale-105" />
                    <img src={profileImage} alt="Home" className="w-full h-auto mb-2 transition duration-300 ease-in-out transform hover:scale-105" />
                    <img src={calculationImage} alt="Home" className="w-full h-auto mb-2 transition duration-300 ease-in-out transform hover:scale-105" />
                    <img src={downloadpdfImage} alt="Home" className="w-full h-auto mb-2 transition duration-300 ease-in-out transform hover:scale-105" />
                </div>
            </section>

            {/* About the Developer Section */}

            <section>
                <h2 className="text-lg lg:text-2lg xl:text-2xl font-bold mb-2">About Me</h2>
                <p className="text-base lg:text-lg xl:text-1xl hover:text-green-800 transition duration-300 ease-in-out transform hover:scale-105">
                    I am, Hean Chhinling, a second-year Computer Science student at the University of Debrecen. 
                    Witnessing the manual billing struggles of my landlord and my family inspired
                    me to create BillingSystem. This platform aims to expedite the billing process for house owners 
                    and simplify payments for tenants.
                </p>
            </section>


        </div>
    );
}

export default About;
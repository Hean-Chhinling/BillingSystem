import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import DownloadPDF from './DownloadPDF';
import { PDFDownloadLink } from '@react-pdf/renderer';


const Calculation = () => {

    // const navigate = useNavigate();

    const [redirectToHome, setRedirectToHome] = useState(false);
    const [tenantInfo, setTenantInfo] = useState({
        roomNumber: 0,
        oldElectricityNumber: 0,
        newElectricityNumber: 0,
        pricePerUnit: 0,
        totalAmount: 0,
    });

    const [showCalculation, setShowCalculation] = useState(false);

    const performCalculation = () => {
        const { oldElectricityNumber, newElectricityNumber, pricePerUnit } = tenantInfo;
        const totalUnit = newElectricityNumber - oldElectricityNumber;
        const totalAmount = totalUnit * pricePerUnit;

        setTenantInfo({ ...tenantInfo, totalAmount });
        setShowCalculation(true);
    };

    
    const [dynamicHeight, setDynamicHeight] = useState('63vh');

    useEffect(() => {
        const updateHeight = () => {
            if (window.matchMedia("(min-width: 1024px)").matches) {
                setDynamicHeight("64vh");
            } else {
                setDynamicHeight("63.5vh")
            }
        };

        // Add event listener for window resize
        window.addEventListener('resize', updateHeight);

        // Call the updateHeight function to set the initial value
        updateHeight();

        // Clean up event listener
        return () => window.removeEventListener('resize', updateHeight);
    }, []);

    const onButtonClick = () => {
        setRedirectToHome(true);
    };

    if (redirectToHome) {
        return <Navigate to="/" />;
    }

    

    return (
        <div className="container mx-auto p-2 flex h-screen sm:flex-row">
            <div className="w-1/2 p-2 flex flex-col absolute bottom-0 left-0 ">
                <button onClick={onButtonClick} className="bg-green-500 text-white py-2 px-1 
                rounded-md hover:bg-green-600 text-base lg:text-1xl xl:text-2xl">
                    Back to Home
                </button>

            </div>

            <div className="w-1/2 p-2">
                <div className="bg-right-bg bg-cover bg-center h-screen p-4">
                    <div className="bg-white p-4 rounded-md shadow-lg" style={{height: "66.2%"}}>
                        <div className="text-lg lg:text-2xl xl:text-3xl font-bold mb-4">
                            Electricity Calculation
                        </div>
                        <div className="mb-4">
                            <label htmlFor="roomNumber" className="text-base lg:text-2xl block text-gray-700">Room Number: </label>
                            <input
                                type="text"
                                id="roomNumber"
                                className="text-xs lg:text-2xl w-full border rounded-md p-2"
                                value={tenantInfo.roomNumber}
                                onChange={(e) => setTenantInfo({ ...tenantInfo, roomNumber: e.target.value })}

                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="oldNumber" className="text-base lg:text-2xl block text-gray-700">Old Number: </label>
                            <input
                                type="number"
                                id="oldNumber"
                                className="text-xs lg:text-2xl w-full border rounded-md p-2"
                                value={tenantInfo.oldElectricityNumber}
                                onChange={(e) => setTenantInfo({ ...tenantInfo, oldElectricityNumber: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="newNumber" className="text-base lg:text-2xl block text-gray-700">New Number: </label>
                            <input
                                type="number"
                                id="newNumber"
                                className="text-xs lg:text-2xl w-full border rounded-md p-2"
                                value={tenantInfo.newElectricityNumber}
                                onChange={(e) => setTenantInfo({ ...tenantInfo, newElectricityNumber: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="pricePerUnit" className="text-base lg:text-2xl block text-gray-700">Price Per Unit: </label>
                            <input
                                type="number"
                                id="pricePerUnit"
                                className="text-xs lg:text-2xl w-full border rounded-md p-2"
                                value={tenantInfo.pricePerUnit}
                                onChange={(e) => setTenantInfo({ ...tenantInfo, pricePerUnit: e.target.value })}
                            />
                        </div>

                    </div>


                </div>

            </div>

            <div className="w-1/2 p-2 flex flex-col absolute bottom-0 right-0 z-20">
                <button onClick={performCalculation} className="bg-green-500 text-white py-2 px-1 
                    rounded-md hover:bg-green-600 text-base lg:text-1xl xl:text-2xl">
                    Calculate
                </button>
            </div>

            <div className="bg-left-bg bg-cover bg-center h-screen p-4 w-1/2 py-6">
                <div className="bg-white flex flex-col p-4 rounded-md shadow-lg relative" style={{ height: dynamicHeight}}>
                    <div className="flex flex-col items-center w-full" style={{ marginLeft: '1%'}}>
                        <div className="text-lg lg:text-2xl xl:text-3xl font-bold mb-4 self-center">
                            Calculation Results
                        </div>
                        {showCalculation && (
                            <div className="mt-6">

                                <div className="mb-2">
                                    <p className="text-base lg:text-2xl text-gray-700">
                                        Room Number: {tenantInfo.roomNumber}
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-base lg:text-2xl block text-gray-700">
                                        Old Number: {tenantInfo.oldElectricityNumber}
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-base lg:text-2xl block text-gray-700">
                                        New Number: {tenantInfo.newElectricityNumber}
                                    </p>
                                </div>
                                <div className="mb-2">
                                    <p className="text-base lg:text-2xl block text-gray-700">
                                        Total Unit: {tenantInfo.newElectricityNumber - tenantInfo.oldElectricityNumber}
                                    </p>
                                </div>

                                <div className="mb-2">
                                    <p className="text-base lg:text-2xl block text-gray-700">
                                        Total Amount: ${tenantInfo.totalAmount}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>



                    <div className="absolute bottom-2 left-4">
                        <PDFDownloadLink document={<DownloadPDF tenantInfo={tenantInfo} />} fileName={`Calculation_Result_RoomNumber_${tenantInfo.roomNumber}`}>
                            {({ loading }) =>
                                (loading ?
                                    <button className="text-white bg-green-500 hover:bg-green-600 focus:outline-none rounded-lg font-medium text-xs lg:text-base px-3 py-2 text-center sm:mb-2 sm:ml-2">Loading Document...</button>
                                    :
                                    <button className="text-white bg-green-500 hover:bg-green-600 focus:outline-none rounded-lg font-medium text-xs lg:text-base px-3 py-2 text-center sm:mb-2 sm:ml-2">Download PDF</button>
                                )
                            }
                        </PDFDownloadLink>
                        
                    </div>

                </div>
            </div>


        </div>
    );
}

export default Calculation;
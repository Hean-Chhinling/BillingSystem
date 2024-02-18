import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { ref, onValue, query, limitToLast } from 'firebase/database';
import { auth, database } from '../firebase/firebase';


// Define the styles for the PDF content
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    header: {
        backgroundColor: '#32B450',
        padding: 10,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    container: {
        padding: 10,
        alignItems: 'center',
        flexGrow: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textDecoration: 'underline',
        marginBottom: 50,
    },
    infoText: {
        fontSize: 24,
        marginBottom: 40,
    },
    boldText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    totalAmount: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        fontSize: 30,
        fontWeight: 'bold',
        border: '2px solid black',
        padding: 5,
    },
    bankInfoText: {
        position: 'absolute',
        bottom: 270,
        left: 20,
        fontSize: 20,
    },

    phoneNumber: {
        position: 'absolute',
        bottom: 240,
        left: 20,
        fontSize: 20,
    },

    bankImage: {
        position: 'absolute',
        width: 180,
        height: 200,
        bottom: 20,
        left: 20,
    },
});


const DownloadPDF = ({ tenantInfo, updateUserData }) => {

    const [userData, setUserData] = useState(null);

    const fetchData = async (user) => {

        const userDataRef = ref(database, 'UserData');

        // '3' here mean looping from the last '3' if the user is matched then it will 'setUserData'
        // will set the 'data' value immediately 
        const lastQuery = query(userDataRef, limitToLast(3));

        onValue(lastQuery, (snapshot) => {
            const myData = snapshot.val();

            console.log("Sorted: ", myData);

            for (const genKey in myData) {
                const data = myData[genKey];
                
                if (user.uid === data.userId) {
                    // console.log("genKey: " + genKey);
                    // console.log("Name: ", data.Name);
                    // console.log("Phone Number: ", data.PhoneNumber);
                    //console.log("Bank: ", data.Bank);
                    setUserData(data)
                    console.log(data)
                }
                
            }
            
            
        }, (errorObject) => {
            console.log("The read failed: " + errorObject.name);
        });

        
    }

    



    useEffect(() => {

        const listen = auth.onAuthStateChanged(async (user) => {
            if (user && user.emailVerified) {
                await fetchData(user);
            }
        });

        return () => listen();
    }, []);

    return (

        <Document>
            <Page style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerText}>Billing Systems</Text>
                </View>
                {/* Content */}
                <View style={styles.container}>
                    <Text style={styles.title}>Calculation Results</Text>
                    <Text style={styles.infoText}>Room Number: {tenantInfo.roomNumber}</Text>
                    <Text style={styles.infoText}>Old Number: {tenantInfo.oldElectricityNumber}</Text>
                    <Text style={styles.infoText}>New Number: {tenantInfo.newElectricityNumber}</Text>
                    <Text style={styles.boldText}>Total Unit: {tenantInfo.newElectricityNumber - tenantInfo.oldElectricityNumber}</Text>
                    <Text style={styles.bankInfoText}>Bank Info : {userData?.Name || "N/A"}</Text>
                    <Text style={styles.phoneNumber}>Phone Number: {userData?.PhoneNumber || "N/A"}</Text>
                    <Image style={styles.bankImage} src={userData?.Bank} />
                    <Text style={styles.totalAmount}>Total Amount: ${tenantInfo.totalAmount}</Text>
                </View>
            </Page>
        </Document>
    );

};
export default DownloadPDF;
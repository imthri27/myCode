import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { useEffect, useRef, useState } from 'react';
import QrView from './qrCodeView'

interface objectMess {
        id: 'string',
        name: 'string',
        address: 'string',
        birth: 'string',
        img: 'string',
        JWT: 'string'

        // userId: number,
        // id: number,
        // title: string,
        // completed: boolean
}
const QRCode: React.FC = () => {
    // const peopleApi = "https://jsonplaceholder.typicode.com/todos"
    const peopleApi = "http://localhost:3000/people";
    // const [ID, setID] = useState('')
    const [showScan ,setShowScan] = useState(true)
    const contentRef = useRef<HTMLIonContentElement>()
    const [objectMess, setObjectMess] = useState<objectMess | undefined>()
    
    // const [showToast, setShowToast] = useState(false)
    const startScan = async () => {
        await BarcodeScanner.checkPermission({ force: true});
        contentRef.current!.style.opacity = "0.7"
        contentRef.current!.style.background = "none"
        
        BarcodeScanner.hideBackground();
        setShowScan(false)
        setObjectMess(undefined)

        const result = await BarcodeScanner.startScan();
        if(result.hasContent) {
            setShowScan(true)

            contentRef.current!.style.opacity = "1"
            contentRef.current!.style.background = "inherit"

            const ID = result.content.slice(-2, result.content.length)
            // const ID = parseInt(result.content.slice(-2, result.content.length))
            console.log(ID);
            
            callApi(ID);
        }
    }

    const stopScan = () => {
        contentRef.current!.style.opacity = "1"
        contentRef.current!.style.background = "inherit"
        BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
        setShowScan(true)
    }

    const checkPermission = async () => {
        const status = await BarcodeScanner.checkPermission({force: true});
        if(status.granted){
            return true;
        }

        return false;
    }

    // call API
     const callApi = (ID: string) => {
        console.log('đang call');

            fetch(peopleApi)
                .then(response => {
                  return response.json();
                })
                .then(people => {
                  var jwtExist  = people.filter((person: any) => {
                    return person.JWT !== "null" && person.JWT !== "undefined"
                  })
                  return jwtExist;
                })
                .then((jwtExist) => {
                   const arr = jwtExist.find((person: any) => {
                    return person.id == ID })
                    console.log(arr);
                    setObjectMess(arr)
                })  
                .catch((err) => {
                    console.log(err);
                    
                })
            console.log(objectMess);
            
    }
    return (
        <>
            <QrView 
                stopScan={stopScan}
                startScan={startScan}
                mess={objectMess}
                showScan={showScan}
                contentRef={contentRef}
            />
        </>
    ) 
}
export default QRCode;
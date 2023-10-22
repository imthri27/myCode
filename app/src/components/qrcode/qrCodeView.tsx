import { IonButton, IonButtons, IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './style.css'

interface ContainerProps {
    startScan: () => void;
    stopScan: () => void;
    mess: {
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

    } | undefined,
    showScan: boolean,
    contentRef: any
    
 }

const QRCodeView: React.FC<ContainerProps> = ({
      startScan,
      stopScan,
      mess,
      showScan,
      contentRef
}) => {
  return (
    <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>
                        QR Scan
                  </IonTitle>
                  <IonButtons slot='end'>
                      {!showScan && <IonButton  onClick={stopScan}>Stop Scan</IonButton>}
                    { showScan && <IonButton  onClick={startScan}>Start Scan</IonButton>}          
                  </IonButtons>
              </IonToolbar>
          </IonHeader>
          <IonContent  className='hideBg' ref={contentRef}>
                {!showScan && <div className='opadiv'></div>}
                {mess && 
                        <IonList className='list'>
                            <div className='img'>
                                <img src={mess.img} alt=''></img>   
                            </div>
                            <div className='item'>
                                <p>Họ và tên: {mess.name}</p>
                                <p>Địa chỉ: {mess.address}</p>
                                <p>Ngày sinh: {mess.birth}</p>
                            </div>
                        </IonList>
                }
          </IonContent>
      </IonPage>
  );
};

export default QRCodeView;

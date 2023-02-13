import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const newIncidentNotify = () => toast(
    <div>
        Новий інцидент! {"\n"} Перейдіть на сторінку інцидентів!
    </div>,
    {
        id: 'incident',
        duration: 1000,
        position: "bottom-left",
        style: {
            background: '#ff0000',
            color: '#233044',
            height: '150px',
            width: '270px'
        }
    }
);

const IncidentsToast = () => {

    useEffect(() => {
        const interval = setInterval(() => newIncidentNotify(), 2000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (

        /*<Toaster position="bottom-left" toastOptions={{
            style: {
                background: '#ff0000',
                color: '#233044',
            },
            duration: 10000,
        }} />*/
        <></>

    );
};

export default IncidentsToast

import React, {useEffect, useState} from 'react';
import {RouterProvider} from "react-router-dom";
import router from "../router";
import {checkFollowedUsers} from "../utils/checkFollowedUsers";
import Alert from "./Alert/alert";



type AlertsType = {
    message: string,
    time: any
}
// @ts-ignore
const a =  Date.now();

const App = () => {
    const [alerts, setAlerts] = useState<AlertsType[]>([]);
    const alertWithReason = (message: string) => {

        setAlerts((prevState) => [
            ...prevState,
            {
                message: message,
                time: a
            }
        ])

    }
    const closeAlert = (time: string) => {
        const withoutClosed = alerts.filter(alert => alert.time !== time);
        setAlerts(withoutClosed)
    }

    useEffect(() => {
        const evenMin = 10000;
        const interval = setInterval( async ()=> {
            await checkFollowedUsers(alertWithReason)
        }, evenMin);

        return () => clearInterval(interval)
    }, []);


    return (
        <div>
            <div style={{position:"fixed", right: 0, bottom: 0, display: "flex", flexDirection: "column", gap: 5, paddingBottom: 10, paddingRight:10}}>
                {alerts.map((alert, _i) => (
                    <Alert message={alert.message} key={`${alert.message}_${alert.time}_${_i}`}  close={() => closeAlert(alert.time)}/>
                ))}
            </div>


            <RouterProvider router={router} />
        </div>
    );
};

export default App;

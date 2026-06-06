import { useState, useEffect } from "react";
import { AppData } from "../Create_Context/flightcontext";


export default function DataProvider({ children }) {

    const [flights, setflights] = useState([]);
    const [route, setroute] = useState([]);
    const [crew, setcrew] = useState([]);
    const [customer, setcustomer] = useState([]);
    const [booking, setbooking] = useState([]);
    const [loading, setloading] = useState(true);


    useEffect(() => {
        Promise.all([
            fetch("http://localhost/flight_management_system/Flights/flightget.php")
                .then(res => res.json()),

            fetch("http://localhost/flight_management_system/Routes/routesget.php")
                .then(res => res.json())
        ]).then(([flightsData, routeData]) => {
            console.log("Flights:", flightsData);
            console.log("Routes:", routeData);

            setflights(flightsData);
            setroute(routeData);
        })
            .catch(err => {
                console.error(err);
            })
            .finally(() => {
                setloading(false);
            });
    }, []);
    console.log(flights);
    return (

        <AppData.Provider value={{
            flights,
            setflights,

            route,
            setroute,
            crew,
            setcrew,
            customer,
            setcustomer,
            booking,
            setbooking,
            loading,

        }}>
            {children}
        </AppData.Provider>

    );
}


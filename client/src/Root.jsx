import React, { createContext, useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import Location from './pages/Location/Location'

import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import Analytics from './pages/Analytics/Analytics';
import Dashboard from './pages/Dashboard/Dashboard';
import Drones from './pages/Drones/Drones';
import Manage from './pages/Manage/Manage';
import Settings from './pages/Settings/Settings';
import useSocket from './components/Socket';

export const DroneContext = createContext();

const Root = () => {
    const { droneStatus } = useSocket();
    const [dronesListInfo,setDronesInfoList]=useState([])

    useEffect(() => {
        if (!droneStatus) 
            return;
        setDronesInfoList(prevList => {
            const filteredList = prevList.filter(drone => drone.droneId !== droneStatus.droneId);
            return [...filteredList, droneStatus];
        });
    }, [droneStatus]);

    const links=[
        {
            name:"Dashboard",
            icon:SpaceDashboardIcon,
            path:"/dashboard",
            component: Dashboard
        },
        {
            name:"Drones",
            icon:ConnectingAirportsIcon,
            path:"/drones",
            component: Drones
        },
        {
            name:"Analytics",
            icon:DonutLargeIcon,
            path:"/analytics",
            component: Analytics
        },
        {
            name:"Location",
            icon:LocationOnIcon,
            path:"/location",
            component: Location
        },
        {
            name:"Manage",
            icon:LocationOnIcon,
            path:"/manage",
            component: Manage
        },
        {
            name:"Settings",
            icon:SettingsIcon,
            path:"/settings",
            component: Settings
        }
    ]
    return (
        <DroneContext.Provider value={{ dronesListInfo }}>
            <Sidebar links={links} appTitle={true}/>
        </DroneContext.Provider>
    )
}

export default Root
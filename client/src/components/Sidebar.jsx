import React from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from "./Button";

function Sidebar({ links, appTitle=false  }) 
{
    const location = useLocation();
    return (
        <div className="flex">
            <div className="flex-col h-screen bg-[#00334E] w-60">
                {appTitle && 
                    <div className="h-[10vh] flex justify-center items-center">
                        <p className="text-[#E8E8E8] changa-one-regular text-center p-2 text-4xl hover:scale-105 transition-all duration-100">
                            DroneWatch
                        </p>
                    </div>
                }
                <div className="text-[#E8E8E8] p-2 flex flex-col gap-4 h-[80vh] overflow-y-auto">
                    {links.map((link) => (
                        <Link 
                            key={link.path}
                            to={link.path}
                            className={`
                                p-2 rounded flex gap-2 text-lg items-center
                                ${location.pathname === link.path 
                                    ? "bg-[#E8E8E8] text-[#145374] font-bold"   
                                    : "hover:bg-[#145374]"}     
                            `}
                        >
                            <link.icon />
                            <p> {link.name} </p>
                        </Link>
                    ))}
                </div>
                {appTitle && 
                    <div className="h-[10vh] flex justify-center items-center">
                        <div className="text-[#E8E8E8] flex items-center gap-6">
                            <Link className="scale-[2] hover:scale-[2.1] active:scale-[1.9] transition-all duration-300"> 
                                <AccountCircleIcon /> 
                            </Link>
                            <Button Icon={LogoutIcon} text={"Log Out"} />
                        </div>
                    </div>
                }
            </div>

            <div className="p-3 h-screen overflow-y-auto">
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to={links[0].path} replace />}
                    />
                    {links.map((link) => (
                        <Route key={link.path} path={link.path} element={<link.component />} />
                    ))}
                </Routes>
            </div>
        </div>
    );
}

export default Sidebar;

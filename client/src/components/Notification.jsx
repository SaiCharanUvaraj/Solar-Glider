import React from 'react'
import { createRoot } from "react-dom/client";
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

export function notify(text,type=null,timer=null,progress=false,link=null)
{
    document.querySelectorAll(".global-notification").forEach(n => n.remove());

    const container = document.createElement("div");
    container.className = "global-notification"; 
    document.body.appendChild(container);

    const root = createRoot(container);

    const close = () => {
        root.unmount();
        container.remove();
    };

    root.render(<Notification text={text} type={type} close={close} progress={progress} link={link} />);

    if (timer) 
    {
        setTimeout(() => {
            close();
        }, timer*1000);
    }
}

const Notification = ({text,type,close,progress,link}) => {
    let bgColor="bg-[#00334E]/70"
    if(type=="success")
        bgColor="bg-green-700/60"
    if(type=="failure")
        bgColor="bg-red-700/60"
    return (
        <div className={"fixed top-5 right-5 backdrop-blur-md text-[#E8E8E8] p-2 rounded-md shadow-xl border border-gray-600/60 z-[9999] "+bgColor+" animate-slideInRight"}>
            <div className="text-md font-medium flex gap-3 items-center">
                <div>{text}</div>
                {progress && <CircularProgress size="20px" />}
                {link && <div className='cursor-pointer text-sm hover:underline text-blue-900' onClick={link.onClick}>{link.name}</div>}
                <div className="cursor-pointer ml-2" onClick={()=>close()}> <CloseIcon /> </div>
            </div>
        </div>
    )
}

export default Notification 
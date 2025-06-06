"use client";

import React, { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const { data } = useAppSelector((state) => state.user);
  const [socket, setSocket] = useState(null);


  useEffect(() => {
    const socketUrl = "";

    const socketInstance = io(socketUrl);

    setSocket(socketInstance);
    socketInstance.on("connect", () => {
      // console.log('Connected!!!')
    });

    socketInstance.on("connect_error", (err) => {
      // console.log(`connect_error due to ${err}`)
    });

    if (userId && socketInstance) {
      socketInstance.emit("joinRoom", userId);
      // socketInstance.on('monitorBoardData',(data)=>{
      //   console.log("context",{data})
      //  })
    }
    return () => {
      socketInstance.emit("leaveRoom", userId);
      socketInstance.removeAllListeners();
      socketInstance.disconnect();
    };
  }, [userId]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};

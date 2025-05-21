import React, { createContext, ReactNode, useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

// Define the type of the context
interface ISignalRContext {
  connection: signalR.HubConnection | null;
}

// Create the context with the above type
const SignalRContext = createContext<ISignalRContext | undefined>(undefined);

// Define the type of the props
interface SignalRProviderProps {
  children: ReactNode;
}

const SignalRProvider: React.FC<SignalRProviderProps> = ({ children }) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/chathub")
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => console.log("Connection started!"))
        .catch((err) => console.log("Error establishing connection: ", err));

      return () => {
        connection
          .stop()
          .then(() => console.log("Connection stopped!"))
          .catch((err) => console.log("Error stopping connection: ", err));
      };
    }
  }, [connection]);

  return (
    <SignalRContext.Provider value={{ connection }}>
      {children}
    </SignalRContext.Provider>
  );
};

export { SignalRContext, SignalRProvider };

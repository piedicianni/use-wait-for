import { useEffect, useState } from "react";
import "./App.css";
import useWaitFor from "./hooks/useWaitFor";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticatedOnTime = useWaitFor(isAuthenticated, true);

  useEffect(() => {
    const timer = setTimeout(() => setIsAuthenticated(true), 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      is authenticated:
      {isAuthenticatedOnTime === undefined
        ? ""
        : isAuthenticatedOnTime.toString()}
    </div>
  );
}

export default App;

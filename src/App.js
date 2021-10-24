import { useEffect, useState } from "react";
import "./App.css";
import useWaitFor from "./hooks/useWaitFor";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const isAuthenticatedWithinOneSecond = useWaitFor(
    isAuthenticated,
    true,
    1000
  );

  useEffect(() => {
    const timer = setTimeout(() => setIsAuthenticated(true), 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      is authenticated:
      {isAuthenticatedWithinOneSecond?.toString()}
    </div>
  );
}

export default App;

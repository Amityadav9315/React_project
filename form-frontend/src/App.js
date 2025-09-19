import React, { useState } from "react";
import Auth from "./Auth";
import TaskApp from "./TaskApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {!isLoggedIn ? <Auth onLogin={() => setIsLoggedIn(true)} /> : <TaskApp />}
    </div>
  );
}

export default App;

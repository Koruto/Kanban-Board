import Kanban from './Kanban';
import Authentication from './Authentication';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <div className="h-full ">
      {isLoggedIn ? (
        <Kanban setLogIn={setIsLoggedIn} />
      ) : (
        <Authentication setLogIn={setIsLoggedIn} />
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import Navbar from './component/Navbar';
import Login from './component/login';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);
  const handleProfile = () => alert('Profile clicked!');
  const handleAbout = () => alert('About clicked!');

  return (
    <Provider store={appStore}>
      <Navbar
        user={user}
        onLogout={handleLogout}
        onProfile={handleProfile}
        onAbout={handleAbout}
      />
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <div>
          <h2>Welcome, {user.name}!</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </Provider>
  );
}

export default App;
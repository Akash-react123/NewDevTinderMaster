import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar = ({ user, onLogout, onProfile, onAbout }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => setShowMenu(!showMenu);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="https://avatars.githubusercontent.com/u/118036704?s=280&v=4" alt="DevTinder Logo" className={styles.logoImg} />
        <span className={styles.title}>DevTinder</span>
      </div>
      <div className={styles.userSection}>
        {user ? (
          <div className={styles.profileWrapper}>
            <img
              src={user.avatar}
              alt={user.name}
              className={styles.avatar}
              onClick={handleMenuToggle}
              style={{ cursor: 'pointer' }}
            />
            {showMenu && (
              <div className={styles.dropdownMenu}>
                <button onClick={onProfile} className={styles.menuItem}>Profile</button>
                <button onClick={onAbout} className={styles.menuItem}>About</button>
                <button onClick={onLogout} className={styles.menuItem}>Log Out</button>
              </div>
            )}
          </div>
        ) : (
          <span className={styles.noUser}></span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
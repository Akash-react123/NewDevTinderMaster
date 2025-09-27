import React, { useState } from 'react';
import styles from './Navbar.module.css';

const defaultAvatar = "https://i.pinimg.com/736x/7f/79/6d/7f796d57218d9cd81a92d9e6e8e51ce4--free-avatars-online-profile.jpg";

const Navbar = ({ user, onLogout, onProfile, onAbout, onSettings }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => setShowMenu((prev) => !prev);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="https://avatars.githubusercontent.com/u/118036704?s=280&v=4" alt="DevTinder Logo" className={styles.logoImg} />
        <span className={styles.title}>DevTinder</span>
      </div>
      <div className={styles.userSection}>
        <div className={styles.profileWrapper}>
          <div className={styles.profileInfo} onClick={handleMenuToggle}>
            <img
              src={user ? user.avatar : defaultAvatar}
              alt={user ? user.name : "Profile"}
              className={styles.avatar}
              style={{ cursor: 'pointer' }}
            />
            {user && <span className={styles.userName}>{user.name}</span>}
            <span className={styles.caret}>&#9662;</span>
          </div>
          {showMenu && (
            <div className={styles.dropdownMenu}>
              {user && <button onClick={onProfile} className={styles.menuItem}>Profile</button>}
              <button onClick={onSettings} className={styles.menuItem}>Settings</button>
              <button onClick={onAbout} className={styles.menuItem}>About</button>
              {user && <button onClick={onLogout} className={styles.menuItem}>Log Out</button>}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
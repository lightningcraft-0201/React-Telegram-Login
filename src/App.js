import React, { useEffect } from 'react';
import './App.css';

function App() {
  // Function to handle Telegram authentication
  const onTelegramAuth = (user) => {
    console.log('User data:', user);

    // Send user data to your backend server for verification and processing
    fetch('localhost:5000/auth/telegram', { // Replace with your actual backend URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.ok) {
          alert('Logged in successfully!');
        } else {
          alert('Failed to log in.');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in. Please try again.');
      });
  };

  useEffect(() => {
    // Define the global function that the widget will call upon authentication
    window.onTelegramAuth = onTelegramAuth;

    // Create a script element for the Telegram widget
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?22';
    script.async = true;
    script.setAttribute('data-telegram-login', 'unigames_tg_bot'); // Replace with your bot username
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-userpic', 'true');
    script.setAttribute('data-radius', 'default');
    script.setAttribute('data-onauth', 'onTelegramAuth(user)');
    script.setAttribute('data-request-access', 'write');

    // Append the script to the target div
    const targetDiv = document.getElementById('telegram-login-button');
    if (targetDiv) {
      targetDiv.appendChild(script);
    }

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (targetDiv) {
        targetDiv.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Login with Telegram</h1>
        <p>Click the button below to log in with your Telegram account:</p>
        {/* The Telegram login button will be injected here by the widget script */}
        <div id="telegram-login-button"></div>
      </header>
    </div>
  );
}

export default App;

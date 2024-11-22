import React from 'react';

const Welcome = () => {
    const firstName = localStorage.getItem('firstName'); // Retrieve the user's name

    return (
        <div>
            <h1>Welcome, {firstName}!</h1>
            <p>Thank you for logging in. Enjoy your session.</p>
        </div>
    );
};

export default Welcome;

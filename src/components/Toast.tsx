import React, { useEffect, useState } from 'react';

// @ts-ignore
const Toast = ({ message, duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setIsVisible(true);

            const timeout = setTimeout(() => {
                setIsVisible(false);
            }, duration);

            return () => clearTimeout(timeout);
        }
    }, [message, duration]);

    return (
        <div className={`toast ${isVisible ? 'show' : ''}`}>
            <div className="toast-body">
                {message}
            </div>
        </div>
    );
};

export default Toast;

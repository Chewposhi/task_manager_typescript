import React from 'react';
import { styles } from "../styles";

interface HeroProps {
    selectedUser: number;
    onUserChange: (userId: number) => void;
}

const Hero: React.FC<HeroProps> = ({ selectedUser, onUserChange }) => {
    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = parseInt(event.target.value); // Convert value to number
        onUserChange(userId); // Call the callback function to update the selected user
    };

    return (
        <div className="flex gap-4 items-center justify-center">
            <p className={`${styles.heroHeadText}`}>
                Task Management Dashboard
            </p>
            <div>
                <label htmlFor="userDropdown" className="mr-2">Select User:</label>
                <select id="userDropdown" value={selectedUser} onChange={handleUserChange}>
                    {[...Array(10)].map((_, index) => (
                        <option key={index + 1} value={index + 1}>{index + 1}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Hero;

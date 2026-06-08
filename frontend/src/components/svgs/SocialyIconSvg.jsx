import React from "react";

const SocialyIconSvg = (props) => (
    <svg 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        {...props}
    >
        <defs>
            <linearGradient id="socialyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />  
                <stop offset="100%" stopColor="#EC4899" /> 
            </linearGradient>
        </defs>
        <path
            d="M75,25 
               C65,12 35,10 25,28 
               C15,45 40,52 45,58 
               C52,65 55,75 42,85 
               C28,95 15,82 18,72
               M22,74
               C20,60 55,45 62,38
               C72,28 85,38 75,25 Z"
            fill="url(#socialyGrad)"
            stroke="url(#socialyGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default SocialyIconSvg;
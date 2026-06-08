import React from "react";

const SocialyFullLogoSvg = (props) => (
    <svg 
        viewBox="0 0 320 100"
        xmlns="http://www.w3.org/2000/svg" 
        {...props}
    >
        <defs>
            <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
            
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Playball&display=swap');
                    .socialy-text {
                        font-family: 'Playball', cursive;
                        font-size: 52px;
                        font-style: italic;
                        font-weight: bold;
                    }
                `}
            </style>
        </defs>

        <g transform="translate(10, 0)">
            <path
                d="M75,25 
                   C65,12 35,10 25,28 
                   C15,45 40,52 45,58 
                   C52,65 55,75 42,85 
                   C28,95 15,82 18,72
                   M22,74
                   C20,60 55,45 62,38
                   C72,28 85,38 75,25 Z"
                fill="url(#logoGrad)"
                stroke="url(#logoGrad)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>

        <text 
            x="105" 
            y="62" 
            className="socialy-text"
        >
            Socialy
        </text>
    </svg>
);

export default SocialyFullLogoSvg;
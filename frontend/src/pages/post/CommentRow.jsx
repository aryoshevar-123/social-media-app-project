import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const CommentRow = ({ c }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        const element = textRef.current;
        if (element) {
            const hasOverflow = element.scrollHeight > element.clientHeight;
            setIsClamped(hasOverflow);
        }
    }, [c.text]);

    return (
        <div className='flex gap-3 items-start p-4 border-b border-gray-800 hover:bg-[#16181C] hover:bg-opacity-10 transition duration-200 min-w-0 max-w-full'>
            <Link to={`/profile/${c.user?.username}`} className='avatar shrink-0'>
                <div className='w-8 rounded-full'>
                    <img src={c.user?.profileImg || "/avatar-placeholder.png"} alt='avatar' />
                </div>
            </Link>
            
            <div className='flex flex-col flex-1 min-w-0 max-w-full overflow-hidden'>
                <div className='flex items-center gap-2 flex-wrap'>
                    <Link to={`/profile/${c.user?.username}`} className='font-bold text-sm truncate max-w-37.5 md:max-w-xs'>
                        {c.user?.fullName}
                    </Link>
                    <span className='text-gray-500 text-sm truncate'>
                        <Link to={`/profile/${c.user?.username}`}>@{c.user?.username}</Link>
                    </span>
                </div>
                
                <div className='text-sm mt-1 text-gray-200 min-w-0 max-w-full'>
                    <p 
                        ref = {textRef}
                        className={`whitespace-pre-wrap wrap-break-word break-normal transition-all duration-200 ${
                        isExpanded ? "" : "line-clamp-3"
                    }`}>
                        {c.text}
                    </p>
                    {(isClamped || isExpanded) && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)} 
                            className='text-primary hover:underline font-semibold text-xs block mt-1 focus:outline-none'
                        >
                            {isExpanded ? "Show less" : "...more"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentRow;
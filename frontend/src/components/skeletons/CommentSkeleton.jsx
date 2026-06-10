const CommentSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 w-full p-4">
        <div className="flex items-center gap-4">
            <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-2">
                <div className="skeleton h-2 w-12 rounded-full"></div>
                <div className="skeleton h-2 w-24 rounded-full"></div>
            </div>
        </div>
        <div className="flex flex-col gap-2">
            <div className='skeleton h-4 w-full'></div>
            <div className='skeleton h-4 w-2/3'></div>
        </div>
    </div>
  );
};

export default CommentSkeleton
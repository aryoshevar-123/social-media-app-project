import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom"
import Post from "../../components/common/Post";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import toast from "react-hot-toast";

const PostPage = () => {
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const queryClient = useQueryClient();

    const { data: authUser } = useQuery({ queryKey: ["authUser"]});

    const { data: post, isLoading, error } = useQuery({
        queryKey: ["postDetails", id],
        queryFn: async () => {
            try {
                const res = await fetch(`/api/posts/post/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to load post");
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        }
    });

    const { mutate: commentPost, isPending: isCommenting } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch(`/api/posts/comment/${id}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({text: comment}),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Something went wrong");
                return data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onSuccess: () => {
            setComment("");
            toast.success("Comment posted successfully");
            queryClient.invalidateQueries({ queryKey: ["postDetails", id] });
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handlePostComment = (e) => {
        e.preventDefault();
        if (!comment.trim() || isCommenting) return;
        commentPost();
    };

    if (isLoading) {
        return (
            <div className='flex-[4_4_0] border-r border-gray-700 min-h-screen flex justify-center items-center'>
                <LoadingSpinner size='lg' />
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className='flex-[4_4_0] border-r border-gray-700 min-h-screen flex justify-center items-center'>
                <p className='text-center text-lg text-gray-500'>Post not found</p>
            </div>
        );
    }

    return (
        <div className='flex-[4_4_0] border-r border-gray-700 min-h-screen flex flex-col'>
            <Post post={post} />

            <div className='p-4 border-b border-gray-700 bg-[#16181C] bg-opacity-30'>
                <form className='flex gap-2 items-center' onSubmit={handlePostComment}>
                    <div className='avatar'>
                        <div className='w-8 rounded-full'>
                            <img src={authUser?.profileImg || "/avatar-placeholder.png"} alt='me' />
                        </div>
                    </div>
                    <textarea
                        className='textarea w-full p-2 bg-transparent text-md resize-none border-none focus:outline-none h-10 placeholder-gray-500'
                        placeholder='Post your reply...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button className='btn btn-primary rounded-full btn-sm text-white px-4' disabled={isCommenting || !comment.trim()}>
                        {isCommenting ? <span className='loading loading-spinner loading-xs'></span> : "Reply"}
                    </button>
                </form>
            </div>

            <div className='flex flex-col flex-1 overflow-y-auto'>
                {post.comments?.length === 0 ? (
                    <p className='text-sm text-slate-500 text-center my-6'>No replies yet. Be the first one! 😉</p>
                ) : (
                    post.comments.map((c) => (
                        <div key={c._id} className='flex gap-3 items-start p-4 border-b border-gray-800 hover:bg-[#16181C] hover:bg-opacity-10 transition duration-200'>
                            <Link to={`/profile/${c.user?.username}`} className='avatar'>
                                <div className='w-8 rounded-full'>
                                    <img src={c.user?.profileImg || "/avatar-placeholder.png"} />
                                </div>
                            </Link>
                            <div className='flex flex-col flex-1'>
                                <div className='flex items-center gap-2'>
                                    <Link to={`/profile/${c.user?.username}`} className='font-bold text-sm hover:underline'>
                                        {c.user?.fullName}
                                    </Link>
                                    <span className='text-gray-500 text-sm'>@{c.user?.username}</span>
                                </div>
                                <div className='text-sm mt-1 text-gray-200'>{c.text}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PostPage
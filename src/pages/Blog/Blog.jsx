import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams hook

const Blog = () => {
    const [currentBlog, setCurrentBlog] = useState(null);
    const [latestBlogs, setLatestBlogs] = useState([]);
    const { slug } = useParams(); // Extract slug from URL

    useEffect(() => {
        // fetchCurrentBlog(); // Fetch current blog
        fetchLatestBlogs(); // Fetch latest blogs
    }, []);

    // Example function to fetch current blog data
    // const fetchCurrentBlog = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:4001/api/blog/${slug}`); // Assuming your API endpoint for current blog data is '/api/current-blog'
    //         if (!response.ok) {
    //             throw new Error('Failed to fetch current blog');
    //         }
    //         const data = await response.json();
    //         setCurrentBlog(data);
    //     } catch (error) {
    //         console.error('Error fetching current blog:', error);
    //     }
    // };

    // Example function to fetch latest blogs data
    const fetchLatestBlogs = async () => {
        try {
            const response = await fetch(`http://localhost:4001/api/blogs`);
            if (!response.ok) {
                throw new Error('Failed to fetch latest blogs');
            }
            const data = await response.json();
            
            // Sort the blogs by their published date in descending order
            data.sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
            
            // Get the latest three blogs
            const latestThreeBlogs = data.slice(0, 3);
            
            setLatestBlogs(latestThreeBlogs);
        } catch (error) {
            console.error('Error fetching latest blogs:', error);
        }
    };
        

    return (
        <>
            <div className="container">
                <div className="row ">
                    <div className="col-md-8 mb-4">
                        {currentBlog && (
                            <div className="card mb-3">
                                <div className="card-body">
                                    <h1 className="card-title">{currentBlog.title}</h1>
                                    <p className="card-text">{currentBlog.description}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="col-md-12">
                        <h2>Latest Sports Blogs</h2>
                        <div className="row d-flex" style={{ overflowX: 'auto' }}>
                            {latestBlogs.map(blog => (
                                    <div key={blog.id} className=" mb-3">
                                <Link to={`/blog/${blog.slug}`}>
                                        <div className="card">
                                            <div className="card-body">
                                                <h3 className="card-title">{blog.title}</h3>
                                                <p className="card-text">{blog.description}</p>
                                            </div>
                                        </div>
                                </Link>
                                    </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Blog;

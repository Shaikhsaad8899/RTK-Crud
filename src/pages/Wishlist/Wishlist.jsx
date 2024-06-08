import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWishlistItems = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:4001/api/getWishlistItems', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setWishlist(response.data);
            } catch (error) {
                setError('Error fetching wishlist items');
            } finally {
                setLoading(false);
            }
        };

        fetchWishlistItems();
    }, []);

    const handleRemoveFromWishlist = async (item_id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.delete(`http://localhost:4001/api/removeFromWishlist/${item_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                setWishlist(prevWishlist => prevWishlist.filter(item => item.item_id !== item_id));
            } else {
                console.error('Failed to remove item from wishlist:', response.data.message);
            }
        } catch (error) {
            console.error('Error removing item from wishlist:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div><p>Your wishlist is empty. Add some items to your wishlist!</p></div>;
    // }

    return (
        <>
            <div className="wishlist">
                <h2>Wishlist</h2>
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    {wishlist.length === 0 ? (
                        <p>Your wishlist is empty. Add some items to your wishlist!</p>
                    ) : (
                        wishlist.map((item) => (
                            <div className="col-lg-4" key={item.id}>
                                <div className="wishlist-item">
                                    <img src={item.image} alt={item.name} />
                                    <div className="details">
                                        <div className="name">{item.name}</div>
                                        <div className="description">{item.description}</div>
                                        <div className="price">{item.price}</div>
                                        <button onClick={() => handleRemoveFromWishlist(item.item_id)}>Remove from Wishlist</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Wishlist;

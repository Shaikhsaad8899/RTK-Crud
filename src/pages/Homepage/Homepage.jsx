import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Slider from 'react-slick';
import { useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { addToWishlist } from '../../Redux/slices/wishlistSlice';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Homepage = () => {
    const [loading, setLoading] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [electronicItems, setElectronicItems] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    let navigate = useNavigate();

    const dispatch = useDispatch();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const handleAddToWishlist = async (item) => {
        console.log('Item to add to wishlist:', item);
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const { item_id, name, description, image, price } = item;
            const response = await axios.post('http://localhost:4001/api/addItemToWishlist', { item_id, name, description, image, price }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (response.data.success) {
                dispatch(addToWishlist(item));
                setWishlist((prevWishlist) => [...prevWishlist, item]);
                console.log('Item added to wishlist:', response.data);
            } else {
                console.error('Failed to add item to wishlist:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding item to wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
        navigate('/login');
    };

    useEffect(() => {
        const fetchElectronicItems = async () => {
            try {
                const response = await axios.get('http://localhost:4001/api/getProducts');
                setElectronicItems(response.data);
            } catch (error) {
                console.error('Error fetching electronic items:', error);
            }
        };

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
                console.error('Error fetching wishlist items:', error);
            }
        };

        fetchElectronicItems();
        fetchWishlistItems();

        const token = localStorage.getItem('token');
        if (token) {
            axios.post('http://localhost:4001/api/validateToken', { token })
                .then(response => {
                    if (response.data.valid) {
                        setIsLoggedIn(true);
                        setUsername(response.data.username);
                        console.log(response.data.username);
                    } else {
                        localStorage.removeItem('token');
                        localStorage.removeItem('username');
                        setIsLoggedIn(false);
                    }
                })
                .catch(error => {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                    setIsLoggedIn(false);
                });
        } else {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-6">
                            <a className="navbar-brand" href="#">{isLoggedIn ? `Welcome, ${username}` : 'Welcome'}</a>
                            {isLoggedIn && <button onClick={handleLogout}>Log Out</button>}
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                        <div className="col-6">
                            <div className="collapse navbar-collapse" id="navbarNav">
                                <ul className="navbar-nav w-100 d-flex justify-content-evenly">
                                    <li className="nav-item">
                                        <a className="nav-link" href="#"><i className="fa fa-home"></i> Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#"><i className="fa fa-info-circle"></i> About Us</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#"><i className="fa fa-briefcase"></i> Careers</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin"><i className="fa fa-briefcase"></i> Admin</Link>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#"><i className="fa fa-envelope"></i> Contact Us</a>
                                    </li>
                                    {isLoggedIn && (
                                        <li className="nav-item">
                                            <Link to="/wishlist"><i className="fa fa-heart"></i>
                                                <span className="wishlist-count">{wishlist.length}</span>
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <Container className="mt-4">
                <Row>
                    {electronicItems.map((item) => (
                        <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
                            <Card style={{ width: 'auto' }}>
                                <Card.Img style={{ width: "auto", height: "150px",objectFit:"contain" }} variant="top" src={`/assets/images/products/${item.image}`} alt={item.name} />
                                <Card.Body>
                                    <Card.Title><React.Fragment>{item.name}</React.Fragment></Card.Title>
                                    <Card.Text><React.Fragment>{item.description}</React.Fragment></Card.Text>
                                    <Card.Text><strong>{item.price}</strong></Card.Text>
                                    <div className="row">
                                        <div className="col-6">
                                            <Button variant="primary" onClick={() => handleAddToWishlist(item)}>Add to Cart</Button>
                                        </div>
                                        <div className="col-6">
                                            {isLoggedIn && (
                                                <Button variant="secondary" onClick={() => handleAddToWishlist(item)}>Add to Wishlist</Button>
                                            )}
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Homepage;

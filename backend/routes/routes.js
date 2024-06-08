const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, login, getBlogBySlug, getBlogs, addItemToWishlist, validateToken, getProducts, getWishlistItems, removeFromWishlist, addProduct, updateProduct } = require('../app/controller/controller');
router.post('/api/login', login);
router.get('/api/users', getUsers);
router.post('/api/users', createUser);
router.put('/api/users/:id', updateUser);
router.delete('/api/users/:id', deleteUser);
router.get('/api/blogs', getBlogs);
router.get('/api/blog/:slug', getBlogBySlug);
router.post('/api/addItemToWishlist', addItemToWishlist);
router.post('/api/validateToken', validateToken);
router.get('/api/getProducts', getProducts);
router.get('/api/getWishlistItems', getWishlistItems);
router.delete('/api/removeFromWishlist/:item_id', removeFromWishlist);
router.post('/api/products', addProduct);
router.put('/api/updateProduct/:item_id', updateProduct);

module.exports = router;

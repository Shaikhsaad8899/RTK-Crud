// controller.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const jwt = require('jsonwebtoken');
const { db } = require('../../config/config'); // Assuming db is properly configured in config/config.js
const secretKey = 'saad@#$2020';
const login = (req, res) => {
    const { username, password } = req.body;

    // Query the database to check if a user with the provided username and password exists
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // If a user with the provided username and password exists
        if (result.length > 0) {
            // Generate a JWT token with user information
            const payload = {
                user_id: result[0].user_id, // Assuming user_id is the primary key of the user_login table
                username: result[0].username
            };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            res.json({ token, username: result[0].username }); // Send token and username in response
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
};
const getUsers = (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching users' });
            return;
        }
        res.json(result);
    });
};
const createUser = (req, res) => {
    const { name, email } = req.body;
    const imageFileName = req.file.originalname; // Use the original filename provided by the client
    console.log(imageFileName, "imageFileName");

    // Move the uploaded image to the specified directory
    const imagePath = path.join('../public/assets/images', imageFileName);
    fs.rename(req.file.path, imagePath, (err) => {
        if (err) {
            console.error("Error saving image:", err);
            res.status(500).json({ error: 'Error saving image' });
            return;
        }

        const sql = 'INSERT INTO users (name, email, image) VALUES (?, ?, ?)';
        db.query(sql, [name, email, imageFileName], (err, result) => {
            if (err) {
                console.error("Error adding user:", err);
                res.status(500).json({ error: 'Error adding user' });
                return;
            }
            res.json({ user_id: result.insertId, name, email, image: imageFileName });
        });
    });
};
const updateUser = (req, res) => {
    const { user_id } = req.params;
    const { name, email } = req.body;
    const sql = 'UPDATE users SET name=?, email=? WHERE user_id=?';
    db.query(sql, [name, email, user_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating user' });
            return;
        }
        res.json({ user_id, name, email });
    });
};
const deleteUser = (req, res) => {
    const { user_id } = req.params;

    // First, retrieve the filename of the image associated with the user
    const getImageFilenameSql = 'SELECT image FROM users WHERE user_id=?';
    db.query(getImageFilenameSql, [user_id], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting user' });
            return;
        }

        // If the user exists
        if (result.length > 0) {
            const imageFilename = result[0].image;

            // Delete the user from the database
            const deleteUserSql = 'DELETE FROM users WHERE user_id=?';
            db.query(deleteUserSql, [user_id], (err, result) => {
                if (err) {
                    res.status(500).json({ error: 'Error deleting user' });
                    return;
                }

                // Move the image file to the 'deleted' directory
                const imagePath = path.join(__dirname, '..', 'public', 'assets', 'images', imageFilename);
                const deletedImagePath = path.join(deletedDir, imageFilename);

                fs.rename(imagePath, deletedImagePath, (err) => {
                    if (err) {
                        console.error("Error moving image to 'deleted' directory:", err);
                        res.status(500).json({ error: 'Error moving user image to "deleted" directory' });
                        return;
                    }
                    res.json(user_id); // Send response after successfully moving user image to 'deleted' directory
                });
            });
        } else {
            // User not found
            res.status(404).json({ error: 'User not found' });
        }
    });
};
const getBlogBySlug = (req, res) => {
    const { slug } = req.params;

    // Query the database to fetch the blog based on the provided slug
    const sql = 'SELECT * FROM blog_data WHERE slug = ?';
    db.query(sql, [slug], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // If a blog with the provided slug exists
        if (result.length > 0) {
            res.json(result[0]);
        } else {
            // If blog with the provided slug does not exist
            res.status(404).json({ error: 'Blog not found' });
        }
    });
};
const getBlogs = (req, res) => {
    // Query the database to fetch all blogs
    const sql = 'SELECT * FROM blog_data';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // If there are blogs in the database
        if (result.length > 0) {
            res.json(result);
        } else {
            // If there are no blogs in the database
            res.status(404).json({ error: 'No blogs found' });
        }
    });
};
const getProducts = (req, res) => {
    // Query the database to fetch all blogs
    const sql = 'SELECT * FROM electronic_items';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
            return;
        }

        // If there are blogs in the database
        if (result.length > 0) {
            res.json(result);
        } else {
            // If there are no blogs in the database
            res.status(404).json({ error: 'No blogs found' });
        }
    });
};
const addItemToWishlist = (req, res) => {
    const { item_id, name, description, image, price } = req.body;
    const token = req.headers.authorization.split(' ')[1];

    // Verify and decode the JWT token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'Invalid token' });
            return;
        }

        // Extract user ID from the decoded token
        const user_id = decoded.user_id;

        // Insert item into wishlist table with the user's ID
        const sql = 'INSERT INTO wishlist (user_id, item_id, name, description, image, price) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(sql, [user_id, item_id, name, description, image, price], (err, result) => {
            if (err) {
                res.status(500).json({ error: 'Database error' });
                return;
            }
            res.json({ success: true, message: 'Item added to wishlist' });
        });
    });
};
const getWishlistItems = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];  // Extract the token from the header

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Extract user_id from the token
        const user_id = decoded.user_id;

        // Query the database to fetch wishlist items for the user
        const sql = 'SELECT * FROM wishlist WHERE user_id = ?';
        db.query(sql, [user_id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (result.length > 0) {
                res.json(result);
            } else {
                res.status(404).json({ error: 'No wishlist items found' });
            }
        });
    });
};
const removeFromWishlist = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];  // Extract the token from the header

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Extract user_id from the token
        const user_id = decoded.user_id;
        const item_id = req.params.item_id;

        const sql = 'DELETE FROM wishlist WHERE user_id = ? AND item_id = ?'; // Fix SQL syntax
        db.query(sql, [user_id, item_id], (err, result) => {
            console.log(sql, "sql", user_id, item_id); // Print SQL query and user_id for debugging
            if (err) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (result.affectedRows > 0) {
                res.json({ success: true });
            } else {
                res.status(404).json({ error: 'Item not found in wishlist' });
            }
        });
    });
};
const validateToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ valid: false, error: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        res.json({ valid: true, username: decoded.username });
    } catch (error) {
        res.status(401).json({ valid: false, error: 'Invalid token' });
    }
};
const addProduct = (req, res) => {
    const { name, description, price } = req.body;
    const image = req.file.filename;
    const sql = 'INSERT INTO electronic_items (name, description, price, image) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, description, price, image], (err, result) => {
        if (err) {
            console.error("Error adding product:", err);
            res.status(500).json({ error: 'Error adding product' });
            return;
        }
        // res.status(201).json({
        //     message: 'Product added successfully',
        //     product: { id: result.insertId, name, description, price, image }
        // });
    });
    // const product = { name, description, price, image };
    res.status(201).json({ message: 'Product added successfully' });

};
const updateProduct = (req, res) => {
    const { item_id } = req.params;
    const { name, description, price } = req.body;
    let image;

    if (req.file) {
        image = req.file.filename;
    }

    let sql;
    let queryParams;

    if (image) {
        sql = 'UPDATE electronic_items SET name = ?, description = ?, price = ?, image = ? WHERE item_id = ?';
        queryParams = [name, description, price, image, item_id];
    } else {
        sql = 'UPDATE electronic_items SET name = ?, description = ?, price = ? WHERE item_id = ?';
        queryParams = [name, description, price, item_id];
    }

    db.query(sql, queryParams, (err, result) => {
        if (err) {
            console.error("Error updating product:", err);
            res.status(500).json({ error: 'Error updating product' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json({
            message: 'Product updated successfully',
            product: { id: item_id, name, description, price, image }
        });
    });
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    login,
    getBlogBySlug,
    getBlogs,
    addItemToWishlist,
    validateToken,
    getProducts,
    getWishlistItems,
    removeFromWishlist,
    addProduct,
    updateProduct
};

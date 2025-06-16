const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, 'restaurant.db'));

const sampleMenuItems = [
    {
        name: 'Classic Mala Hot Pot',
        description: 'Traditional Sichuan hot pot with your choice of ingredients in our signature spicy mala broth',
        price: 24.99,
        category: 'Hot Pot',
        image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3'
    },
    {
        name: 'Mala Xiang Guo',
        description: 'Dry pot style mala with your choice of meats and vegetables, stir-fried in our special sauce',
        price: 18.99,
        category: 'Signature Dishes',
        image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3'
    },
    {
        name: 'Mala Noodles',
        description: 'Hand-pulled noodles tossed in our signature mala sauce with vegetables and your choice of protein',
        price: 15.99,
        category: 'Noodles',
        image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3'
    },
    {
        name: 'Mala Skewers',
        description: 'Assorted meats and vegetables on skewers, grilled and tossed in mala sauce',
        price: 16.99,
        category: 'Appetizers',
        image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3'
    },
    {
        name: 'Mala Dumplings',
        description: 'Handmade dumplings filled with pork and vegetables, served with mala dipping sauce',
        price: 12.99,
        category: 'Appetizers',
        image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3'
    },
    {
        name: 'Mala Tofu',
        description: 'Silken tofu in our signature mala sauce with minced meat and Sichuan peppercorns',
        price: 14.99,
        category: 'Vegetarian',
        image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3'
    },
    {
        name: 'Mala Fried Rice',
        description: 'Wok-fried rice with vegetables and your choice of protein, seasoned with mala spices',
        price: 13.99,
        category: 'Rice Dishes',
        image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3'
    },
    {
        name: 'Mala Wontons',
        description: 'Delicate wontons filled with pork and shrimp, served in mala broth',
        price: 11.99,
        category: 'Soups',
        image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3'
    },
    {
        name: 'Mala Chicken Wings',
        description: 'Crispy wings tossed in our signature mala sauce with Sichuan peppercorns',
        price: 15.99,
        category: 'Appetizers',
        image_url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?ixlib=rb-4.0.3'
    }
];

const sampleContactInfo = {
    address: '123 Restaurant Street, New York, NY 10001',
    phone: '(555) 123-4567',
    email: 'info@mala.com',
    opening_hours: 'Monday-Sunday: 11:00 AM - 10:00 PM'
};

// Initialize database
db.serialize(() => {
    // Create tables
    db.run(`CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        category TEXT NOT NULL,
        image_url TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS contact_info (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        address TEXT NOT NULL,
        phone TEXT NOT NULL,
        email TEXT NOT NULL,
        opening_hours TEXT NOT NULL
    )`);

    // Clear existing data
    db.run('DELETE FROM menu_items');
    db.run('DELETE FROM contact_info');

    // Insert sample menu items
    const insertMenuItem = db.prepare('INSERT INTO menu_items (name, description, price, category, image_url) VALUES (?, ?, ?, ?, ?)');
    sampleMenuItems.forEach(item => {
        insertMenuItem.run(item.name, item.description, item.price, item.category, item.image_url);
    });
    insertMenuItem.finalize();

    // Insert sample contact info
    db.run('INSERT INTO contact_info (address, phone, email, opening_hours) VALUES (?, ?, ?, ?)',
        [sampleContactInfo.address, sampleContactInfo.phone, sampleContactInfo.email, sampleContactInfo.opening_hours],
        (err) => {
            if (err) {
                console.error('Error inserting contact info:', err);
            } else {
                console.log('Database initialized successfully!');
            }
        }
    );
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error('Error closing database:', err);
    } else {
        console.log('Database connection closed.');
    }
}); 
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const dbFolder = './db';

if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder);
}

const db = new sqlite3.Database('./db/ecommerce.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    category TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id)
  )`);

  db.run(`DELETE FROM products`); // เคลียร์ก่อน insert ใหม่

  //เพิ่มสินค้า
  db.run(`INSERT INTO products (name, description, price, image_url, category)
    VALUES 
    
    ('Nordic Chair', 'Stylish chair', 50.00, 'images/product-1.png', 'เก้าอี้'),
    ('Kruzo Aero Chair', 'Comfortable design', 78.00, 'images/product-2.png', 'เก้าอี้'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/product-3.png', 'เก้าอี้'),

    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/sofa1.avif', 'โซฟา'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/sofa2.avif', 'โซฟา'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/sofa3.avif', 'โซฟา'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/sofa4.avif', 'โซฟา'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/sofa5.avif', 'โซฟา'),

    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/bed1.avif', 'เตียงนอน'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/bed2.avif', 'เตียงนอน'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/bed4.avif', 'เตียงนอน'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/bed3.avif', 'เตียงนอน'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/bed6.avif', 'เตียงนอน'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/bed5.avif', 'เตียงนอน'),

    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/desk1.avif', 'โต๊ะ'),
    ('Ergonomic Chair', 'Work-friendly chair', 43.00, 'images/desk2.avif', 'โต๊ะ')

  `);

  console.log("Database created and sample products inserted.");
});

db.close();

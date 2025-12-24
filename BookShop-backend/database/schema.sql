-- ============================================
-- Order Processing System Database Schema
-- ============================================

-- Drop existing tables if they exist (for development/testing)
DROP TABLE IF EXISTS ShoppingCart;
DROP TABLE IF EXISTS SalesItems;
DROP TABLE IF EXISTS SalesTransactions;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS BookAuthors;
DROP TABLE IF EXISTS Authors;
DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS Publishers;
DROP TABLE IF EXISTS Customers;

-- ============================================
-- Table: Publishers
-- Stores publisher information
-- ============================================
CREATE TABLE Publishers (
    publisher_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: Books
-- Stores book details and inventory
-- ============================================
CREATE TABLE Books (
    isbn VARCHAR(13) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    publisher_id INT NOT NULL,
    publication_year INT,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    category ENUM('Science', 'Art', 'Religion', 'History', 'Geography') NOT NULL,
    stock_quantity INT NOT NULL DEFAULT 0 CHECK (stock_quantity >= 0),
    threshold INT NOT NULL DEFAULT 10 CHECK (threshold >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (publisher_id) REFERENCES Publishers(publisher_id) ON DELETE RESTRICT
);

-- ============================================
-- Table: Authors
-- Stores author information
-- ============================================
CREATE TABLE Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- Table: BookAuthors
-- Many-to-many relationship between Books and Authors
-- ============================================
CREATE TABLE BookAuthors (
    book_isbn VARCHAR(13) NOT NULL,
    author_id INT NOT NULL,
    PRIMARY KEY (book_isbn, author_id),
    FOREIGN KEY (book_isbn) REFERENCES Books(isbn) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE CASCADE
);

-- ============================================
-- Table: Orders
-- Stores publisher orders for restocking books
-- ============================================
CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    book_isbn VARCHAR(13) NOT NULL,
    publisher_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pending', 'Confirmed') DEFAULT 'Pending',
    confirmed_date TIMESTAMP NULL,
    FOREIGN KEY (book_isbn) REFERENCES Books(isbn) ON DELETE CASCADE,
    FOREIGN KEY (publisher_id) REFERENCES Publishers(publisher_id) ON DELETE RESTRICT
);

-- ============================================
-- Table: Customers
-- Stores customer account information
-- ============================================
CREATE TABLE Customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============================================
-- Table: SalesTransactions
-- Stores customer purchase transactions
-- ============================================
CREATE TABLE SalesTransactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    credit_card_number VARCHAR(16) NOT NULL,
    credit_card_expiry VARCHAR(7) NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE RESTRICT
);

-- ============================================
-- Table: SalesItems
-- Stores individual items in each sales transaction
-- ============================================
CREATE TABLE SalesItems (
    sales_item_id INT AUTO_INCREMENT PRIMARY KEY,
    transaction_id INT NOT NULL,
    book_isbn VARCHAR(13) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_purchase DECIMAL(10, 2) NOT NULL CHECK (price_at_purchase >= 0),
    FOREIGN KEY (transaction_id) REFERENCES SalesTransactions(transaction_id) ON DELETE CASCADE,
    FOREIGN KEY (book_isbn) REFERENCES Books(isbn) ON DELETE RESTRICT
);

-- ============================================
-- Table: ShoppingCart
-- Stores items in customer shopping carts
-- ============================================
CREATE TABLE ShoppingCart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    book_isbn VARCHAR(13) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_customer_book (customer_id, book_isbn),
    FOREIGN KEY (customer_id) REFERENCES Customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (book_isbn) REFERENCES Books(isbn) ON DELETE CASCADE
);

-- ============================================
-- Create Indexes for Performance
-- ============================================
CREATE INDEX idx_books_category ON Books(category);
CREATE INDEX idx_books_publisher ON Books(publisher_id);
CREATE INDEX idx_books_stock ON Books(stock_quantity);
CREATE INDEX idx_orders_status ON Orders(status);
CREATE INDEX idx_orders_book ON Orders(book_isbn);
CREATE INDEX idx_sales_customer ON SalesTransactions(customer_id);
CREATE INDEX idx_sales_date ON SalesTransactions(transaction_date);
CREATE INDEX idx_sales_items_transaction ON SalesItems(transaction_id);
CREATE INDEX idx_sales_items_book ON SalesItems(book_isbn);
CREATE INDEX idx_cart_customer ON ShoppingCart(customer_id);

-- ============================================
-- Insert Sample Data for Testing
-- ============================================

-- Sample Publishers
INSERT INTO Publishers (name, address, phone) VALUES
('Penguin Books', '123 Publisher St, New York, NY', '555-0101'),
('HarperCollins', '456 Book Ave, London, UK', '555-0102'),
('McGraw-Hill', '789 Education Rd, Boston, MA', '555-0103'),
('Oxford University Press', '321 Academic Ln, Oxford, UK', '555-0104'),
('National Geographic', '654 Geography Blvd, Washington, DC', '555-0105');

-- Sample Books
INSERT INTO Books (isbn, title, publisher_id, publication_year, price, category, stock_quantity, threshold) VALUES
('9780143127741', 'Sapiens: A Brief History of Humankind', 1, 2015, 24.99, 'History', 50, 10),
('9780062316097', 'Educated: A Memoir', 2, 2018, 18.99, 'History', 30, 10),
('9780071831468', 'Calculus Made Easy', 3, 2019, 29.99, 'Science', 20, 5),
('9780198507239', 'The Oxford Dictionary of Art', 4, 2015, 49.99, 'Art', 15, 5),
('9781426220371', 'National Geographic Atlas', 5, 2020, 39.99, 'Geography', 25, 8),
('9780143111597', 'The God Delusion', 1, 2008, 19.99, 'Religion', 40, 10),
('9780062132093', 'The Innovators', 2, 2014, 21.99, 'History', 35, 10),
('9780071835923', 'Physics for Scientists', 3, 2018, 89.99, 'Science', 12, 5),
('9780198569039', 'Art Through the Ages', 4, 2017, 69.99, 'Art', 8, 5),
('9781426218835', 'World Geography Atlas', 5, 2019, 44.99, 'Geography', 18, 8);

-- Sample Authors
INSERT INTO Authors (name) VALUES
('Yuval Noah Harari'),
('Tara Westover'),
('Silvanus P. Thompson'),
('Ian Chilvers'),
('National Geographic Society'),
('Richard Dawkins'),
('Walter Isaacson'),
('Raymond A. Serway'),
('Fred S. Kleiner'),
('National Geographic Maps');

-- Link Books and Authors
INSERT INTO BookAuthors (book_isbn, author_id) VALUES
('9780143127741', 1),
('9780062316097', 2),
('9780071831468', 3),
('9780198507239', 4),
('9781426220371', 5),
('9780143111597', 6),
('9780062132093', 7),
('9780071835923', 8),
('9780198569039', 9),
('9781426218835', 10);

-- Sample Customers
INSERT INTO Customers (username, password, first_name, last_name, email, phone, shipping_address) VALUES
('john_doe', 'password123', 'John', 'Doe', 'john.doe@example.com', '555-1001', '123 Main St, Springfield, IL'),
('jane_smith', 'password456', 'Jane', 'Smith', 'jane.smith@example.com', '555-1002', '456 Oak Ave, Chicago, IL'),
('bob_wilson', 'password789', 'Bob', 'Wilson', 'bob.wilson@example.com', '555-1003', '789 Pine Rd, Boston, MA'),
('alice_brown', 'passwordabc', 'Alice', 'Brown', 'alice.brown@example.com', '555-1004', '321 Elm St, Seattle, WA'),
('charlie_davis', 'passwordxyz', 'Charlie', 'Davis', 'charlie.davis@example.com', '555-1005', '654 Maple Dr, Austin, TX');

-- Sample past sales transactions (for testing reports)
INSERT INTO SalesTransactions (customer_id, transaction_date, total_amount, credit_card_number, credit_card_expiry) VALUES
(1, DATE_SUB(NOW(), INTERVAL 2 MONTH), 74.97, '4532123456789012', '12/2026'),
(2, DATE_SUB(NOW(), INTERVAL 1 MONTH), 119.98, '5425233430109903', '06/2025'),
(3, DATE_SUB(NOW(), INTERVAL 3 WEEK), 49.98, '4916338506082832', '09/2027'),
(1, DATE_SUB(NOW(), INTERVAL 2 WEEK), 89.99, '4532123456789012', '12/2026'),
(4, DATE_SUB(NOW(), INTERVAL 1 WEEK), 139.97, '371449635398431', '03/2026'),
(2, DATE_SUB(NOW(), INTERVAL 3 DAY), 24.99, '5425233430109903', '06/2025'),
(5, DATE_SUB(NOW(), INTERVAL 1 DAY), 69.99, '6011111111111117', '11/2025');

-- Sample sales items
INSERT INTO SalesItems (transaction_id, book_isbn, quantity, price_at_purchase) VALUES
(1, '9780143127741', 2, 24.99),
(1, '9780062316097', 1, 18.99),
(2, '9780071835923', 1, 89.99),
(2, '9780198569039', 1, 29.99),
(3, '9781426220371', 1, 39.99),
(3, '9780143111597', 1, 9.99),
(4, '9780071835923', 1, 89.99),
(5, '9780198569039', 2, 69.99),
(6, '9780143127741', 1, 24.99),
(7, '9780198569039', 1, 69.99);

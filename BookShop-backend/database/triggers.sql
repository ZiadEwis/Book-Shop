-- ============================================
-- Order Processing System Database Triggers
-- ============================================

DELIMITER //

-- ============================================
-- Trigger 1: Prevent Negative Stock Quantities
-- Fires before updating book stock quantity
-- Prevents updates that would result in negative stock
-- ============================================
CREATE TRIGGER before_update_books_check_stock
BEFORE UPDATE ON Books
FOR EACH ROW
BEGIN
    IF NEW.stock_quantity < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Cannot update: Stock quantity cannot be negative';
    END IF;
END//

-- ============================================
-- Trigger 2: Automatic Order Placement
-- Fires after updating book stock quantity
-- Automatically places order when stock drops below threshold
-- Order quantity is fixed at 50 units
-- ============================================
CREATE TRIGGER after_update_books_auto_order
AFTER UPDATE ON Books
FOR EACH ROW
BEGIN
    -- Check if stock has dropped from above threshold to below threshold
    IF OLD.stock_quantity >= OLD.threshold 
       AND NEW.stock_quantity < NEW.threshold THEN
        
        -- Place an order for 50 units (constant quantity)
        INSERT INTO Orders (book_isbn, publisher_id, quantity, status)
        VALUES (NEW.isbn, NEW.publisher_id, 50, 'Pending');
    END IF;
END//

-- ============================================
-- Trigger 3: Update Stock on Order Confirmation
-- Fires after updating order status
-- Automatically adds ordered quantity to stock when order is confirmed
-- ============================================
CREATE TRIGGER after_update_orders_confirm
AFTER UPDATE ON Orders
FOR EACH ROW
BEGIN
    -- Check if order status changed from Pending to Confirmed
    IF OLD.status = 'Pending' AND NEW.status = 'Confirmed' THEN
        
        -- Update the book stock quantity
        UPDATE Books
        SET stock_quantity = stock_quantity + NEW.quantity
        WHERE isbn = NEW.book_isbn;
        
        -- Note: The confirmed_date is set by the UPDATE statement in the application
    END IF;
END//

DELIMITER ;

-- ============================================
-- Display Created Triggers
-- ============================================
SHOW TRIGGERS;

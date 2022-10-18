-- migrate:up
CREATE TABLE orders(
    id INT NOT NULL AUTO_INCREMENT,
    order_number VARCHAR(500) NOT NULL,
    user_id INT NOT NULL,
    order_status_id INT NOT NULL,
    PRIMARY KEY(id), 
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT orders_order_status_id_fkey FOREIGN KEY (order_status_id) REFERENCES order_status(id)
);

-- migrate:down
DROP TABLE orders;
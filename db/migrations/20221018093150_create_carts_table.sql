-- migrate:up
CREATE TABLE carts(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    stock_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    PRIMARY KEY(id), 
    CONSTRAINT carts_stock_id_fkey FOREIGN KEY (stock_id) REFERENCES stock(id),
    CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE carts;
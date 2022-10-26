-- migrate:up
CREATE TABLE order_items(
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    stock_id INT NOT NULL,
    quantity INT NOT NULL,
    PRIMARY KEY(id), 
    CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT order_items_stock_id_fkey FOREIGN KEY (stock_id) REFERENCES stock(id)
);

-- migrate:down
DROP TABLE order_items;
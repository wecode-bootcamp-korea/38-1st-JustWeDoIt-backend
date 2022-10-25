-- migrate:up
ALTER TABLE order_items MODIFY order_id INT NOT NULL;
ALTER TABLE order_items MODIFY stock_id INT NOT NULL;
ALTER TABLE order_items MODIFY quantity INT NOT NULL;
ALTER TABLE order_items MODIFY  CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id);
ALTER TABLE order_items MODIFY CONSTRAINT order_items_stock_id_fkey FOREIGN KEY (stock_id) REFERENCES stock(id);



-- migrate:down


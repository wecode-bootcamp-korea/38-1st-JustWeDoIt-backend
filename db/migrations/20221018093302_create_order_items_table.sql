-- migrate:up
CREATE TABLE order_items(
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    stock_id INT NOT NULL,
    quantity_id INT NOT NULL,
    shipment_id INT NOT NULL,
    order_item_status_id INT NOT NULL,
    PRIMARY KEY(id), 
    CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT order_items_stock_id_fkey FOREIGN KEY (stock_id) REFERENCES stock(id),
    CONSTRAINT order_items_shipment_id_fkey FOREIGN KEY (shipment_id) REFERENCES shipments(id),
    CONSTRAINT order_items_order_item_status_id_fkey FOREIGN KEY (order_item_status_id) REFERENCES order_item_status(id)
);

-- migrate:down
DROP TABLE order_items;
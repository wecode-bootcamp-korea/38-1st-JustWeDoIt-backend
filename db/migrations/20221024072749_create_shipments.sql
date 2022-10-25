-- migrate:up
CREATE TABLE shipments(
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    addressee_name VARCHAR(30) NOT NULL,
    addressee_address VARCHAR(500) NOT NULL,
    addressee_phone_number VARCHAR(100) NOT NULL,
    company VARCHAR(200) NOT NULL,
    tracking_number VARCHAR(200) NOT NULL,
    shipping_status_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT shipments_order_id_fkey FOREIGN KEY (order_id) REFERENCES orders(id),
    CONSTRAINT shipments_shipping_status_id_fkey FOREIGN KEY (shipping_status_id) REFERENCES shipping_status(id)
);

-- migrate:down
DROP TABLE shipments;
-- migrate:up
CREATE TABLE stock (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    size INT NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    PRIMARY KEY(id), 
    CONSTRAINT stock_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE stock;

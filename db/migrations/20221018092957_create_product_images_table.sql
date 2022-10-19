-- migrate:up
CREATE TABLE product_images (
    id INT NOT NULL AUTO_INCREMENT,
    product_id INT NOT NULL,
    image_url VARCHAR(1000) NULL,
    PRIMARY KEY(id),
    CONSTRAINT product_images_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) 
);

-- migrate:down
DROP TABLE product_images;
-- migrate:up
CREATE TABLE reviews(
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    rating INT NULL,
    content VARCHAR(3000) NULL,
    PRIMARY KEY(id), 
    CONSTRAINT reviews_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id),
    CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id)
);

-- migrate:down
DROP TABLE reviews;
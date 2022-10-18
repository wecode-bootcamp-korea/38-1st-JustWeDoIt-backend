-- migrate:up
CREATE TABLE products (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(3000) NULL,
        category_id INT NOT NULL,
        special_id INT NOT NULL,
        gender_id INT NOT NULL,
        thumbnail_image_url VARCHAR(1000) NULL,
        price DECIMAL NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id),
        CONSTRAINT products_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id),
        CONSTRAINT products_special_id_fkey FOREIGN KEY (special_id) REFERENCES special(id),
        CONSTRAINT products_gender_id_fkey FOREIGN KEY (gender_id) REFERENCES gender(id) 
);

-- migrate:down
DROP TABLE products
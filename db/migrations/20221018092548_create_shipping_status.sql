-- migrate:up
CREATE TABLE shipping_status(
    id INT NOT NULL AUTO_INCREMENT,
    status VARCHAR(100) NOT NULL,
    PRIMARY KEY(id)
 
);

-- migrate:down
DROP TABLE shipping_status;
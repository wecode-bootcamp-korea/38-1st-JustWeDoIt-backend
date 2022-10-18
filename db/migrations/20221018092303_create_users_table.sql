-- migrate:up
CREATE TABLE users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(200) NOT NULL,
        password VARCHAR(200) NOT NULL,
        phone_number VARCHAR(50) NULL,
        address VARCHAR(200) NULL,
        resident_number_front INT NULL,
        residetn_number_back INT NULL,
        point DECIMAL NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE users;
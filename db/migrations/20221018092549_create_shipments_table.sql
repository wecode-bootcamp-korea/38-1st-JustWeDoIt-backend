-- migrate:up
CREATE TABLE shipments(
    id INT NOT NULL AUTO_INCREMENT,
    company VARCHAR(200) NULL,
    tracking_number VARCHAR(200) NOT NULL,
    PRIMARY KEY(id)
);

-- migrate:down
DROP TABLE shipments;

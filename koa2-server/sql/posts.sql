CREATE TABLE IF NOT EXISTS posts (
    id INT NOT NULL AUTO_INCREMENT,
    title varchar(100) NOT NULL,
    uid varchar(100) not null,
    ctime varchar(100) not null,
    content text(0) not null,
    PRIMARY KEY(id)
)
/* Initial database table structure */
CREATE TABLE IF NOT EXISTS servers(
    id INTEGER AUTO_INCREMENT,
	ip VARCHAR(50) NOT NULL,
	port VARCHAR(5) NOT NULL,
	name VARCHAR(50) NOT NULL,
	section VARCHAR(50) NOT NULL,
    
    PRIMARY KEY(id)
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS options(
    id INTEGER AUTO_INCREMENT,
	label VARCHAR(50) NOT NULL,
	value VARCHAR(20) NOT NULL,
    
    PRIMARY KEY(id)
)ENGINE=INNODB;

/* Inserts the options base value */
INSERT INTO options(label, value)VALUES('minimal', false),('refreshtimer', '30'),('showMS', true);

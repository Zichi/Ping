/* Initial database table structure */

CREATE TABLE IF NOT EXISTS servers(
	ip VARCHAR(50) NOT NULL,
	port VARCHAR(5) NOT NULL,
	name VARCHAR(50) NOT NULL,
	section VARCHAR(50) NOT NULL,
	id INTEGER AUTO_INCREMENT 
)ENGINE=INNODB;

CREATE TABLE IF NOT EXISTS options(
	label VARCHAR(50) NOT NULL,
	option VARCHAR(20) NOT NULL,
	id INTEGER AUTO_INCREMENT
)ENGINE=INNODB;

/* Inserts the options base value */
INSERT INTO options ('label', 'option') VALUES ('minimal', false),('refreshtimer', '30'),('showMS', true);

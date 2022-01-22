-- ========================TABLE FEATURES ======================================
DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features(
  feature_id SERIAL NOT NULL,
  id INT NOT NULL,
  feature VARCHAR(255),
  value VARCHAR(100),
  PRIMARY KEY (feature_id),
  FOREIGN KEY (id) REFERENCES products (id)
);

COPY features(feature_id, id, feature, value)
FROM '/Users/hathadam/Google Drive/sdc/data/features.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON features (id);

-- ========================TABLE PHOTOS======================================
DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos(
  photo_id SERIAL NOT NULL,
  style_id INT NOT NULL,
  thumbnail_url TEXT,
  url TEXT,
  PRIMARY KEY (photo_id),
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);

COPY photos(photo_id, style_id, thumbnail_url, url)
FROM '/Users/hathadam/Google Drive/sdc/data/photos.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON photos (style_id);

-- ========================TABLE PRODUCTS ======================================
CREATE SCHEMA IF NOT EXISTS sdc;

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
  id SERIAL NOT NULL,
  name VARCHAR(30),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(30),
  default_price INT,
  PRIMARY KEY (id)
);

COPY products(id, name, slogan, description, category, default_price)
FROM '/Users/hathadam/Google Drive/sdc/data/product.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON products (id);

-- ========================TABLE SKUS ======================================
DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE skus(
  sku_id SERIAL NOT NULL,
  style_id INT NOT NULL,
  size VARCHAR(14),
  quantity INT,
  PRIMARY KEY (sku_id),
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);

COPY skus(sku_id, style_id, size, quantity)
FROM '/Users/hathadam/Google Drive/sdc/data/skus.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON skus (style_id);
-- ========================TABLE STYLES ======================================
DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE styles(
  style_id SERIAL NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100),
  sale_price INT,
  original_price INT,
  default_style BOOLEAN,
  PRIMARY KEY (style_id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

COPY styles(style_id, product_id, name, sale_price, original_price, default_style)
FROM '/Users/hathadam/Google Drive/sdc/data/styles.csv'
DELIMITER ','
NULL AS 'null'
CSV HEADER;
CREATE INDEX style_idx ON styles (style_id);
CREATE INDEX product_idx ON styles (product_id);

-- ========================TABLE RELATED ======================================

DROP TABLE IF EXISTS related CASCADE;
CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  FOREIGN KEY (current_product_id) REFERENCES products (id)
);

COPY related(id, current_product_id, related_product_id)
FROM '/Users/hathadam/Google Drive/sdc/data/related.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX related_productId_index ON related (current_product_id);

-- ========================USING mySQL ======================================
-- SET GLOBAL local_infile=1;

-- mysql --local-infile=1 -u root -p

-- pwd to get the path // example '/Users/hathadam/Google Drive/sdc/productOverviewSQL/productDummy.csv'


-- pg_dump

-- USE productOverview;

-- DROP TABLE IF EXISTS product_list;

-- CREATE TABLE product_list (
--   product_id INT NOT NULL PRIMARY KEY,
--   name VARCHAR(100),
--   slogan TEXT(200),
--   description TEXT(300),
--   category VARCHAR(100),
--   default_price VARCHAR(100)
-- );

-- LOAD DATA LOCAL INFILE '/Users/hathadam/Google Drive/sdc/data/product.csv' INTO TABLE product_list
-- FIELDS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 rows
-- (product_id , name, slogan, description,category, default_price);

-- CREATE TABLE product_listDummy (
--   product_id INT NOT NULL PRIMARY KEY,
--   name VARCHAR(100),
--   slogan TEXT(200),
--   description TEXT(300),
--   category VARCHAR(100),
--   default_price VARCHAR(100)
-- );

-- LOAD DATA LOCAL INFILE '/Users/hathadam/Google Drive/sdc/productOverviewSQL/productDummy.csv' INTO TABLE product_listDummy
-- FIELDS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 rows
-- (product_id , name, slogan, description,category, default_price);


-- CREATE TABLE product_listDummy (
--   product_id INT NOT NULL PRIMARY KEY,
--   name VARCHAR(100),
--   slogan TEXT(200),
--   description TEXT(300),
--   category VARCHAR(100),
--   default_price VARCHAR(100)
-- );

-- LOAD DATA LOCAL INFILE '/Users/hathadam/Google Drive/sdc/productOverviewSQL/productDummy.csv' INTO TABLE product_listDummy
-- FIELDS TERMINATED BY ','
-- LINES TERMINATED BY '\n'
-- IGNORE 1 rows
-- (product_id , name, slogan, description,category, default_price);


-- load data local infile '/Users/danieltawata/Documents/sdc/reviewsSQL/test.csv'
-- into table test2
-- fields terminated by ','
-- optionally enclosed by '"'
-- lines terminated by '\n'
-- ignore 1 rows
-- (review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness);


-- ========================AWS Deployment==============================================
-- ========================TABLE FEATURES ======================================
DROP TABLE IF EXISTS features CASCADE;
CREATE TABLE features(
  feature_id SERIAL NOT NULL,
  id INT NOT NULL,
  feature VARCHAR(255),
  value VARCHAR(100),
  PRIMARY KEY (feature_id),
  FOREIGN KEY (id) REFERENCES products (id)
);

COPY features(feature_id, id, feature, value)
FROM '/home/ubuntu/features.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON features (id);

-- ========================TABLE PHOTOS======================================
DROP TABLE IF EXISTS photos CASCADE;
CREATE TABLE photos(
  photo_id SERIAL NOT NULL,
  style_id INT NOT NULL,
  thumbnail_url TEXT,
  url TEXT,
  PRIMARY KEY (photo_id),
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);

COPY photos(photo_id, style_id, thumbnail_url, url)
FROM '/home/ubuntu/photos.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON photos (style_id);

-- ========================TABLE PRODUCTS ======================================
CREATE SCHEMA IF NOT EXISTS sdc;

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products(
  id SERIAL NOT NULL,
  name VARCHAR(30),
  slogan VARCHAR(255),
  description TEXT,
  category VARCHAR(30),
  default_price INT,
  PRIMARY KEY (id)
);

COPY products(id, name, slogan, description, category, default_price)
FROM '/home/ubuntu/product.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON products (id);

-- ========================TABLE SKUS ======================================
DROP TABLE IF EXISTS skus CASCADE;
CREATE TABLE skus(
  sku_id SERIAL NOT NULL,
  style_id INT NOT NULL,
  size VARCHAR(14),
  quantity INT,
  PRIMARY KEY (sku_id),
  FOREIGN KEY (style_id) REFERENCES styles (style_id)
);

COPY skus(sku_id, style_id, size, quantity)
FROM '/home/ubuntu/skus.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX ON skus (style_id);
-- ========================TABLE STYLES ======================================
DROP TABLE IF EXISTS styles CASCADE;
CREATE TABLE styles(
  style_id SERIAL NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(100),
  sale_price INT,
  original_price INT,
  default_style BOOLEAN,
  PRIMARY KEY (style_id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

COPY styles(style_id, product_id, name, sale_price, original_price, default_style)
FROM '/home/ubuntu/styles.csv'
DELIMITER ','
NULL AS 'null'
CSV HEADER;
CREATE INDEX style_idx ON styles (style_id);
CREATE INDEX product_idx ON styles (product_id);

-- ========================TABLE RELATED ======================================

DROP TABLE IF EXISTS related CASCADE;
CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  current_product_id INT NOT NULL,
  related_product_id INT NOT NULL,
  FOREIGN KEY (current_product_id) REFERENCES products (id)
);

COPY related(id, current_product_id, related_product_id)
FROM '/home/ubuntu/related.csv'
DELIMITER ','
CSV HEADER;
CREATE INDEX related_productId_index ON related (current_product_id);
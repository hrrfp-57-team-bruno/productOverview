USE productOverview;

DROP TABLE IF EXISTS product_list;

CREATE TABLE product_list (
  product_id INT NOT NULL PRIMARY KEY,
  name VARCHAR(100),
  slogan TEXT(200),
  description TEXT(300),
  category VARCHAR(100),
  default_price VARCHAR(100)
);

LOAD DATA LOCAL INFILE '/Users/hathadam/Google Drive/sdc/data/product.csv' INTO TABLE product_list
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 rows
(product_id , name, slogan, description,category, default_price);

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





-- SET GLOBAL local_infile=1;

-- mysql --local-infile=1 -u root -p

-- pwd to get the path // example '/Users/hathadam/Google Drive/sdc/productOverviewSQL/productDummy.csv'


-- pg_dump
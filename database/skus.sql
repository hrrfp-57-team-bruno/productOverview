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
CREATE USER prompt_mkt_dev WITH PASSWORD 'prompt_mkt_dev';
ALTER USER prompt_mkt_dev CREATEDB;
CREATE DATABASE prompt_mkt WITH OWNER prompt_mkt_dev;
GRANT ALL PRIVILEGES ON DATABASE prompt_mkt TO prompt_mkt_dev;

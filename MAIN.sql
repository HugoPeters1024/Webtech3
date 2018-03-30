--
-- File generated with SQLiteStudio v3.1.1 on vr mrt 30 16:49:39 2018
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Users
CREATE TABLE Users (user_id INTEGER PRIMARY KEY UNIQUE NOT NULL, username STRING, first_name STRING, last_name STRING, address STRING);
INSERT INTO Users (user_id, username, first_name, last_name, address) VALUES (0, 'admin', 'hacker', 'man', NULL);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

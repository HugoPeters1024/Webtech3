--
-- File generated with SQLiteStudio v3.1.1 on wo apr 4 13:57:34 2018
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Baskets
CREATE TABLE Baskets (user_id REFERENCES Users (user_id), products STRING);

-- Table: Categories
CREATE TABLE Categories (cat_id INTEGER PRIMARY KEY, parent INTEGER REFERENCES Categories (cat_id), cat_name STRING);
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (1, 2, 'Falcon 9');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (2, NULL, 'Rockets');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (3, 2, 'Big Boi');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (4, NULL, 'Transportation');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (5, 4, 'Cars');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (6, NULL, 'Weapons');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (7, NULL, 'Fashion');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (8, 9, 'Storage');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (9, NULL, 'Energy');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (10, 6, 'Mass Destruction');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (11, NULL, 'Collider');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (12, NULL, 'Building');
INSERT INTO Categories (cat_id, parent, cat_name) VALUES (13, NULL, 'Sticker');

-- Table: Manufactures
CREATE TABLE Manufactures (maker_id INTEGER PRIMARY KEY, name STRING);
INSERT INTO Manufactures (maker_id, name) VALUES (1, 'SpaceX');
INSERT INTO Manufactures (maker_id, name) VALUES (2, 'NASA');
INSERT INTO Manufactures (maker_id, name) VALUES (3, 'Elon Musk');
INSERT INTO Manufactures (maker_id, name) VALUES (4, 'Tesla');
INSERT INTO Manufactures (maker_id, name) VALUES (5, 'The Boring Company');
INSERT INTO Manufactures (maker_id, name) VALUES (6, 'USSR');
INSERT INTO Manufactures (maker_id, name) VALUES (7, 'United States');
INSERT INTO Manufactures (maker_id, name) VALUES (8, 'CERN');
INSERT INTO Manufactures (maker_id, name) VALUES (9, 'France');
INSERT INTO Manufactures (maker_id, name) VALUES (10, 'Xzeres');
INSERT INTO Manufactures (maker_id, name) VALUES (11, 'Rob de Wit');
INSERT INTO Manufactures (maker_id, name) VALUES (12, 'SV Sticky');

-- Table: Products
CREATE TABLE Products (product_id INTEGER PRIMARY KEY, name STRING, Categorie INTEGER, maker_id INTEGER REFERENCES Manufactures (maker_id), price INTEGER, image STRING);
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (1, 'Falcon 9 v1.0', 1, 1, 57000000, 'http://space.skyrocket.de/img_lau/falcon-9__dragon-crs2__1.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (2, 'Falcon 9 v1.1', 1, 1, 61200000, 'http://space.skyrocket.de/img_lau/falcon-9-v1-1-r__jason-3__1.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (3, 'Falcon 9 v1.2 (FT)', 1, 1, 62000000, 'http://space.skyrocket.de/img_lau/falcon-9-v1-2__iridium-next-1__1.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (4, 'Falcon Heavy', 1, 1, 90000000, 'http://s.numrush.nl/wp-content/uploads/2018/02/38583830575_6d03f39ea5_k.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (5, 'Dragon cargo', 2, 1, 133000000, 'http://www.nasa.gov/sites/default/files/iss041e020918.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (6, 'BFR', 3, 1, 7000000, 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/SpaceX_BFR_launch_vehicle.jpg/100px-SpaceX_BFR_launch_vehicle.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (7, 'Saturn V', 3, 2, 185000000, 'https://img.purch.com/w/640/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzAxMS83NzEvaTAyL2FzLTUwMi1hcG9sbG8tNi5qcGc/MTMxNDY0Njk3OQ==');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (8, 'Hyperloop (1 mile)', 4, 3, 65000000, 'https://singularityhub.com/wp-content/uploads/2018/03/hyperloop-concept-future-transportation-1.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (9, 'Model S', 5, 4, 74500, 'https://www.tesla.com/tesla_theme/assets/img/models/v1.0/section-hero-background.jpg?20180111');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (10, 'Model X', 5, 4, 79500, 'https://www.tesla.com/sites/default/files/images/model-x/section-hero-background.jpg?20170907');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (11, 'Not a Flamethrower', 6, 5, 500, 'https://static1.squarespace.com/static/5915617137c58104451ac5fb/t/5a7237c79140b7a6ff425a1a/1517434828005/Boring_Company_Flamethrower.png');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (12, 'A Hat', 7, 5, 20, 'http://www.comedycentral.co.uk/sites/default/files/styles/image-w-760-scale/public/cc_uk/galleries/large/2017/10/18/hat._x.jpg?itok=GBNDK6zB');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (13, 'Powerwall', 8, 4, 6600, 'https://www.extremetech.com/wp-content/uploads/2016/11/press_powerwall2_header-640x360.png');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (14, 'Solar panel', 9, 4, 19000, 'https://cdn.vox-cdn.com/thumbor/hospJZgMTkYre-ElEqAO8itVk9Q=/0x0:2880x1128/1200x800/filters:focal(1156x329:1616x789)/cdn.vox-cdn.com/uploads/chorus_image/image/58574863/tesla_solar_panels_powerwalls_home_depot_2.0.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (15, 'Roadster', 5, 4, 250000, 'https://www.tesla.com/sites/default/files/images/roadster/roadster-social.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (16, 'Tsar Bomba (full)', 10, 6, 300000000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Tsar_Bomba_Revised.jpg/220px-Tsar_Bomba_Revised.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (17, 'Tsar Bomba (test)', 10, 6, 220000000, 'https://www.atomicheritage.org/sites/default/files/styles/large/public/Tsar_Bomba_Revised_User-Croquant%20with%20modifications%20by%20User-Hex%20%28Own%20work%29%20CC-BY-SA-3.0%20via%20Wikimedia%20Commons.jpg?itok=0d4NXQul');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (18, 'Little Boy Bomb', 10, 7, 160000000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Little_boy.jpg/300px-Little_boy.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (19, 'Fat Man Bomb', 10, 7, 190000000, 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Fat_man.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (20, 'Large Hadron Collider', 11, 8, 9000000000, 'https://home.cern/sites/home.web.cern.ch/files/image/inline-images/old/lhc_long_1.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (21, 'Eiffel Tower', 11, 9, 480000000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1200px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (22, 'Skystream windmill', 9, 10, 10000, 'http://www.kilowattsolar.eu/wp-content/uploads/2013/02/dsc_0256_elec-1024x680.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (23, 'NASA social polo', 7, 2, 40, 'https://cdn.shopify.com/s/files/1/2120/7043/products/nasa-social-polo_1024x1024.jpg?v=1504711269');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (24, 'NASA zip hoodie', 7, 2, 35, 'https://kickz.akamaized.net/nl/media/images/p/1200/alpha_industries-NASA_Zip_Hoody-Grey_Heather-1.jpg');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (25, 'Astronaut Tie', 7, 2, 28, 'https://cdn.shopify.com/s/files/1/2120/7043/products/astronaut-tie_1024x1024.jpg?v=1508251993');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (26, 'Moon Tie', 7, 2, 28, 'https://cdn.shopify.com/s/files/1/2120/7043/products/moon-tie_1024x1024.jpg?v=1508251866');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (27, 'Mars Tie', 7, 2, 28, 'https://cdn.shopify.com/s/files/1/2120/7043/products/mars-tie_1024x1024.jpg?v=1508251706');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (28, 'ISS Tie', 7, 2, 28, 'https://cdn.shopify.com/s/files/1/2120/7043/products/iss-tie_1024x1024.jpg?v=1508251523');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (29, 'Sticky sticker', 12, 12, 0, 'https://svsticky.nl/wp-content/uploads/Sticky-120bar.png');
INSERT INTO Products (product_id, name, Categorie, maker_id, price, image) VALUES (30, 'Execut Sticker', 12, 11, 0, 'https://pbs.twimg.com/profile_images/911243522463891457/cYE4xMzc_400x400.jpg');

-- Table: Sessions
CREATE TABLE Sessions (user_id INTEGER REFERENCES Users (user_id), session_token STRING UNIQUE ON CONFLICT ROLLBACK NOT NULL, expired DATETIME NOT NULL);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (0, 'FFDJSAKF', 0);

-- Table: Transactions
CREATE TABLE Transactions (product_id INTEGER REFERENCES Products (product_id), user_id INTEGER REFERENCES Users (user_id), date STRING);

-- Table: Users
CREATE TABLE Users (user_id INTEGER PRIMARY KEY UNIQUE NOT NULL, username STRING UNIQUE, first_name STRING, last_name STRING, address STRING, email STRING, password STRING NOT NULL);
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password) VALUES (0, 'wouter', 'mr.', 'hackerman', 'om de hoek', 'spam@robdewit.nl', 12345);
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password) VALUES (1, 'hugo', 'the', 'beast', 'in de goot', 'nee', 'drugsdrugs');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

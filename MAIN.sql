--
-- File generated with SQLiteStudio v3.1.1 on zo apr 15 15:29:40 2018
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

-- Table: Comments
CREATE TABLE Comments (comment STRING, comment_id INTEGER PRIMARY KEY, user_id INTEGER REFERENCES Users (user_id), product_id INTEGER REFERENCES Products (product_id));
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('praise kek', 0, 14, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Yeeh boii', 1, 14, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Leuke hoed man!', 2, 14, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('&lt;script&gt;alert(1)&lt;/script&gt;', 3, 14, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Doe wat leuks', 4, 14, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Vet veel comments!', 5, 14, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Beetje duur wel :(', 6, 14, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Maar wel gekocht hoor!', 7, 14, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Ik moet er niks van hebben, al die wetenschap.', 8, 19, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('''UNION ALL SELECT * FROM USERS', 9, 19, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('SpaceX is beter', 10, 19, 23);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Ik houd niet zo van dit product want ik heb hoogtevrees.







Ziet u?', 11, 14, 5);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('f', 12, 14, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Papa Elon plz respond', 13, 14, 8);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Krijg je het huis er ook bij?', 14, 14, 14);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Die nieuwe vinnik mooier, verkopen jullie die ook?', 15, 14, 1);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Lol, wouter, ga niet cross site scripten, lukt je toch niet.', 16, 19, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Mag ik m''n geld terug plz?', 17, 14, 24);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('<b>bold text<b>', 18, 14, 24);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('<p>freaky</p>', 19, 14, 24);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('??', 20, 19, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('??????????', 21, 19, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('''Vo', 22, 19, 29);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('<i>italic<i>', 23, 19, 24);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('<a href>link</a>', 24, 19, 24);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('&lt;iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen&gt;&lt;/iframe&gt;', 25, 19, 24);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('&lt;script&gt;buyProduct(2)&lt;/script&gt;', 26, 19, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('<a>injection</a>', 27, 19, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Many<br><br><br><br><br>Whitespace', 28, 14, 8);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('<b>Dik</b>', 29, 14, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Joe staat mooi in mn achtertuin.', 30, 20, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('<img src="https://novaator.err.ee/256761/tuumaosakeste-porgutis-ringlesid-taas-prootonid" />', 31, 20, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('<img src="https://s.err.ee/photo/crop/2014/09/22/197485h8703t28.jpg" />', 32, 20, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('DIK', 33, 20, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('alert(1) lel', 34, 20, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('I have been to the Eiffel tower. There were a lot of people. They all said a bunch of made up words like "baget, krwassant and fromag".', 35, 20, 21);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('ayyy



', 36, 20, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('omaw mou shindeiru', 37, 14, 18);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Dat plaatje hierboven kan inmiddels niet meer.', 38, 14, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('henlo can I has EgG hogo killed my penguenos :(', 39, 18, 17);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('sad ik wil plaatje', 40, 18, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Waarom staat 10000 niet bij de quantity?', 41, 18, 30);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('when moon?', 42, 18, 26);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Can I park in space too?', 43, 18, 15);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('a q p', 44, 22, 6);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('     w', 45, 22, 6);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('a q p', 46, 22, 6);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('....W', 47, 22, 6);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Wie dit leest is dom xd', 48, 22, 15);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('', 49, 22, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$''`$$$$$$$$$$$$$''`$$$
$$$$$$  $$$$$$$$$$$  $$$$
$$$$$$$  ''$/ `/ `$'' .$$$$
$$$$$$$$. i  i  /! .$$$$$
$$$$$$$$$.--''--''   $$$$$$
$$^^$$$$$''        J$$$$$$
$$$   ~""   `.   .$$$$$$$
$$$$$e,      ;  .$$$$$$$$
$$$$$$$$$$$.''   $$$$$$$$$
$$$$$$$$$$$$.    $$$$$$$$
$$$$$$$$$$$$$     $by&TL$ Sick site bruh', 50, 22, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$$$$$$$$$$$$$$$$$$$$$
$$$$$''`$$$$$$$$$$$$$''`$$$
$$$$$$  $$$$$$$$$$$  $$$$
$$$$$$$  ''$/ `/ `$'' .$$$$
$$$$$$$$. i  i  /! .$$$$$
$$$$$$$$$.--''--''   $$$$$$
$$^^$$$$$''        J$$$$$$
$$$   ~""   `.   .$$$$$$$
$$$$$e,      ;  .$$$$$$$$
$$$$$$$$$$$.''   $$$$$$$$$
$$$$$$$$$$$$.    $$$$$$$$
$$$$$$$$$$$$$     $by&TL$ Sick site bruh', 51, 22, 16);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Z U C C', 52, 14, 32);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('hey guys ;)', 53, 25, 20);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Senator, I don''t know what that means.', 54, 19, 32);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Is deze hoed ook in het roze verkrijgbaar?', 55, 27, 12);
INSERT INTO Comments (comment, comment_id, user_id, product_id) VALUES ('Nee, roze is #$@&%*! lelijk!', 56, 16, 12);

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
INSERT INTO Manufactures (maker_id, name) VALUES (13, 'Spele.nl');

-- Table: Products
CREATE TABLE Products (product_id INTEGER PRIMARY KEY, name STRING, cat_id INTEGER REFERENCES Categories (cat_id), maker_id INTEGER REFERENCES Manufactures (maker_id), price INTEGER, image STRING);
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (1, 'Falcon 9 v1.0', 1, 1, 57000000, 'http://space.skyrocket.de/img_lau/falcon-9__dragon-crs2__1.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (2, 'Falcon 9 v1.1', 1, 1, 61200000, 'http://space.skyrocket.de/img_lau/falcon-9-v1-1-r__jason-3__1.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (3, 'Falcon 9 v1.2 (FT)', 1, 1, 62000000, 'http://space.skyrocket.de/img_lau/falcon-9-v1-2__iridium-next-1__1.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (4, 'Falcon Heavy', 1, 1, 90000000, 'http://s.numrush.nl/wp-content/uploads/2018/02/38583830575_6d03f39ea5_k.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (5, 'Dragon cargo', 2, 1, 133000000, 'http://www.nasa.gov/sites/default/files/iss041e020918.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (6, 'BFR', 3, 1, 7000000, 'https://upload.wikimedia.org/wikipedia/en/thumb/9/90/SpaceX_BFR_launch_vehicle.jpg/100px-SpaceX_BFR_launch_vehicle.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (7, 'Saturn V', 3, 2, 185000000, 'https://img.purch.com/w/640/aHR0cDovL3d3dy5zcGFjZS5jb20vaW1hZ2VzL2kvMDAwLzAxMS83NzEvaTAyL2FzLTUwMi1hcG9sbG8tNi5qcGc/MTMxNDY0Njk3OQ==');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (8, 'Hyperloop (1 mile)', 4, 3, 65000000, 'https://singularityhub.com/wp-content/uploads/2018/03/hyperloop-concept-future-transportation-1.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (9, 'Model S', 5, 4, 74500, 'https://www.tesla.com/tesla_theme/assets/img/models/v1.0/section-hero-background.jpg?20180111');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (10, 'Model X', 5, 4, 79500, 'https://www.tesla.com/sites/default/files/images/model-x/section-hero-background.jpg?20170907');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (11, 'Not a Flamethrower', 6, 5, 500, 'https://static1.squarespace.com/static/5915617137c58104451ac5fb/t/5a7237c79140b7a6ff425a1a/1517434828005/Boring_Company_Flamethrower.png');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (12, 'A Hat', 7, 5, 20, 'http://www.comedycentral.co.uk/sites/default/files/styles/image-w-760-scale/public/cc_uk/galleries/large/2017/10/18/hat._x.jpg?itok=GBNDK6zB');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (13, 'Powerwall', 8, 4, 6600, 'https://www.extremetech.com/wp-content/uploads/2016/11/press_powerwall2_header-640x360.png');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (14, 'Solar panel', 9, 4, 19000, 'https://cdn.vox-cdn.com/thumbor/hospJZgMTkYre-ElEqAO8itVk9Q=/0x0:2880x1128/1200x800/filters:focal(1156x329:1616x789)/cdn.vox-cdn.com/uploads/chorus_image/image/58574863/tesla_solar_panels_powerwalls_home_depot_2.0.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (15, 'Roadster', 5, 4, 250000, 'https://www.tesla.com/sites/default/files/images/roadster/roadster-social.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (16, 'Tsar Bomba (full)', 10, 6, 300000000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Tsar_Bomba_Revised.jpg/220px-Tsar_Bomba_Revised.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (17, 'Tsar Bomba (test)', 10, 6, 220000000, 'https://www.atomicheritage.org/sites/default/files/styles/large/public/Tsar_Bomba_Revised_User-Croquant%20with%20modifications%20by%20User-Hex%20%28Own%20work%29%20CC-BY-SA-3.0%20via%20Wikimedia%20Commons.jpg?itok=0d4NXQul');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (18, 'Little Boy Bomb', 10, 7, 160000000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Little_boy.jpg/300px-Little_boy.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (19, 'Fat Man Bomb', 10, 7, 190000000, 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Fat_man.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (20, 'Large Hadron Collider', 11, 8, 9000000000, 'https://home.cern/sites/home.web.cern.ch/files/image/inline-images/old/lhc_long_1.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (21, 'Eiffel Tower', 12, 9, 480000000, 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/1200px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (22, 'Skystream windmill', 9, 10, 10000, 'http://www.kilowattsolar.eu/wp-content/uploads/2013/02/dsc_0256_elec-1024x680.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (23, 'NASA social polo', 7, 2, 40, 'https://cdn.shopify.com/s/files/1/2120/7043/products/nasa-social-polo_1024x1024.jpg?v=1504711269');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (24, 'NASA zip hoodie', 7, 2, 35, 'https://kickz.akamaized.net/nl/media/images/p/1200/alpha_industries-NASA_Zip_Hoody-Grey_Heather-1.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (25, 'Astronaut Tie', 7, 2, 28, 'https://cdn.shopify.com/s/files/1/2120/7043/products/astronaut-tie_1024x1024.jpg?v=1508251993');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (26, 'Moon Tie', 7, 2, 28, 'https://cdn.shopify.com/s/files/1/2120/7043/products/moon-tie_1024x1024.jpg?v=1508251866');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (27, 'Mars Tie', 7, 2, 28, 'https://cdn.shopify.com/s/files/1/2120/7043/products/mars-tie_1024x1024.jpg?v=1508251706');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (28, 'ISS Tie', 7, 2, 28, 'https://cdn.shopify.com/s/files/1/2120/7043/products/iss-tie_1024x1024.jpg?v=1508251523');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (29, 'Sticky sticker', 13, 12, 0, 'https://svsticky.nl/wp-content/uploads/Sticky-120bar.png');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (30, 'Execut Sticker', 13, 11, 0, 'https://pbs.twimg.com/profile_images/911243522463891457/cYE4xMzc_400x400.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (31, 'Green Rocket Launcher', 6, 13, 250, 'http://weblog.mijngame.nl/wp-content/uploads/pinguin-tank.jpg');
INSERT INTO Products (product_id, name, cat_id, maker_id, price, image) VALUES (32, 'zucc', 10, 7, -1, 'https://image.ibb.co/mvhxMc/eceb8543_e4e9_4fa2_bbb2_2e790d5c57d9.jpg');

-- Table: Sessions
CREATE TABLE Sessions (user_id INTEGER REFERENCES Users (user_id), session_token STRING UNIQUE ON CONFLICT ROLLBACK NOT NULL, expired INTEGER NOT NULL);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (0, 'FFDJSAKF', 0);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (2, 'babe9bfb8ffc87e11196b975f01782f998d895835c419d51d0a4a81cdaa509b8', 55);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (3, '44947a1d6ed9d8f1ae55f32dad766df45572353b8530308568873b035442a0d4', 55);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (15, '9845864e7bc9bbca1b76bd5cd3ecf21236aefb22614f5e15307fa4ea17d6538a', 55);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (15, '383a259de9ef95f5a60203bcc964e4840fb76cec74df3dc2dd16740d6020cac7', 55);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (17, '8f8c5310fcc50419280664deab52bbb5ea657620e234a8d0084c762d8bcc3f6e', 'Fri Apr 06 2018 17:10:50 GMT+0200 (CEST)21600000');
INSERT INTO Sessions (user_id, session_token, expired) VALUES (18, '03e1d8070e679d46f451a6a82dede66f499869ba7c17cc1cbb9d520cd8b9f3f1', 1523052454226);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (18, '7b59e50931f570fa3acfd4310e9a63d2251b27032b06914b5c44f1f5f88888df', 1523053276526);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (18, '50a79b0039938293c3d31bcb2f21bdbf9b1c463f26a83ce64f6966ccbaa7d107', 1523053577099);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (20, '3627bc9e0ecbb0d85e4ec5aa582779b557435198fe55efdd28cb2383d291f9f7', 1523279872586);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (21, '49ebf11289c209a6c4a394551cf31d010d1ee500c341fb8bb3bb78cb18445912', 1523371208430);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (18, '1fb2af454d77bf901fdd6c8f3b9ab948839c379855377cf59e5a8f3afb718386', 1523487866645);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (22, '8a82d1b2abb3a4153c2fbad05b16625a39254dc18f7d3f2860d73f04b5832e8d', 1523529318350);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (24, '53e0fb0fc642a9b7d38687933039965c8f575024428324a586197db0833d1ecb', 1523572611283);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (25, '62593335b9344752cbccb43e96e7a0f4f6945f4abfa9148dbe40081d0c373c01', 1523610552864);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (25, 'b7478c7c6cf29770f82ce9d03a6205e7b883ed0eb7a6b35f5eed22179b78dab9', 1523610668621);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (26, 'b0b996fbe57c5188487e4c07c1ebc101385e95e8950a712e9818acd8941a187b', 1523735073625);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (26, 'd35799e883803cbc67a425377ddad674619e2345c07d9e0f66d514aa83093c7c', 1523737407683);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (18, 'db6d150cec4e767bb4ba38f853ab3d1aa8a4c3c6555f3527dad905578c542696', 1523737642753);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (14, 'cd6fe2634d33b4886a9e8e69a67dccd90fac3911a58818da74c0dc9b316b38be', 1523745858708);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (18, 'f24ff0f6b021ce34e7beb2bcc17693f6b102244cf84eda0fddf565dae679fd4f', 1523746373505);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (16, '14da03351ca211af03c8e74f8cc1c8c3ee356077c345cc284c4da0928be6b5e0', 1523804643918);
INSERT INTO Sessions (user_id, session_token, expired) VALUES (28, '345cc7e9cb6ce7681585092a46e7c49e3abaa203daac69b37aa69b0c4a9a3379', 1523804605738);

-- Table: Transactions
CREATE TABLE Transactions (product_id INTEGER REFERENCES Products (product_id), user_id INTEGER REFERENCES Users (user_id), date STRING, amount INTEGER NOT NULL);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (1, 14, 1522958738825, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (6, 14, 1522958744815, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (1, 14, 1522967600852, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (1, 14, 1522967873621, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (8, 14, 1522967963344, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (19, 14, 1522967980619, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (5, 14, 1522968480086, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (3, 14, 1522970217791, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (8, 14, 1522970221405, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (12, 15, 1522970662226, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 15, 1522970684045, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (30, 15, 1522970697756, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (28, 15, 1522970712373, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (3, 14, 1522970921209, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 14, 1522976870043, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (24, 14, 1522980159788, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 14, 1522980180030, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 14, 1522981501352, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (27, 14, 1522981509511, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (30, 14, 1522981519550, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (19, 14, 1522981612619, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (10, 14, 1522981665603, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 14, 1523008639581, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (3, 14, 1523008664251, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 14, 1523008737807, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 14, 1523008737808, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (4, 14, 1523008743295, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (8, 14, 1523011024327, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (25, 14, 1523012220001, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (7, 14, 1523013514605, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (8, 14, 1523024698853, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (24, 14, 1523024716416, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (21, 14, 1523024776160, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (24, 14, 1523024778726, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 14, 1523026979731, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 17, 1523027261346, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (23, 14, 1523045053472, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (16, 14, 1523045825409, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (23, 14, 1523045868506, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (7, 14, 1523047715497, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (3, 14, 1523047719792, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (1, 14, 1523047723254, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (10, 14, 1523047728793, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (14, 14, 1523047731558, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (16, 18, 1523051805724, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 18, 1523051849352, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 18, 1523052939705, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 14, 1523137528119, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 14, 1523207699477, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (26, 14, 1523210227413, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (23, 19, 1523210433573, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (25, 19, 1523211008809, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (27, 14, 1523213126599, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (7, 14, 1523217192874, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (21, 14, 1523217198248, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (27, 14, 1523217209036, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (8, 14, 1523219300113, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (25, 14, 1523219543322, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (12, 14, 1523220047697, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (12, 14, 1523225891774, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (1, 19, 1523231336271, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (1, 19, 1523231345428, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 20, 1523272332889, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (21, 20, 1523273152221, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (26, 14, 1523279846184, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (5, 14, 1523289148721, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (12, 14, 1523313267980, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (12, 14, 1523313529980, 4);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (12, 14, 1523313844780, 5);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (18, 14, 1523315894849, 10);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (9, 14, 1523315947812, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (2, 14, 1523315955290, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (9, 14, 1523318542274, 9);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (10, 14, 1523319798232, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (7, 21, 1523365153107, 2);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (18, 21, 1523365188454, 9);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (17, 18, 1523479232449, 6);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (30, 18, 1523479363993, 2);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (26, 18, 1523479393790, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (15, 18, 1523479462567, 2);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (32, 18, 1523481834023, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (31, 18, 1523481848457, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (31, 18, 1523481859263, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 22, 1523521133998, 10);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (32, 22, 1523523300254, 10);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (32, 22, 1523523316714, 10);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (30, 14, 1523524431418, 10);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (31, 14, 1523542203871, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (31, 14, 1523557345042, 6);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (8, 14, 1523561342115, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (24, 25, 1523604511485, 10);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (32, 25, 1523604549384, 3);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (32, 14, 1523605881979, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (20, 26, 1523729040511, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (32, 18, 1523731199009, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (31, 18, 1523731212670, 10);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (32, 18, 1523731463634, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (31, 18, 1523731508702, 121212);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (32, 18, 1523731548366, 1e+27);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (15, 18, 1523731598135, 'alert(1)');
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (15, 18, 1523731637949, '<script>alert(''if you see this, you have been hacked'')</script>');
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (32, 16, 1523796597611, 1);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (6, 19, 1523798024102, 4);
INSERT INTO Transactions (product_id, user_id, date, amount) VALUES (12, 27, 1523798279698, 1);

-- Table: Users
CREATE TABLE Users (user_id INTEGER PRIMARY KEY UNIQUE NOT NULL, username STRING UNIQUE CHECK (LENGTH(username) >= 3), first_name STRING, last_name STRING, address STRING, email STRING, password STRING NOT NULL, salt STRING);
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (0, 'wouter', 'mr.', 'hackerman', 'om de hoek', 'spam@robdewit.nl', 12345, NULL);
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (1, 'hugo', 'the', 'beast', 'in de goot', 'nee', 'drugsdrugs', NULL);
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (2, 'Hugo', ' Hugo', 'Peters', 'Pythagoraslaan, 105H', 'mail@hugopeters.nl', '69fde292430fa93fe2735e532fa58968d5f158a639166615722f90716cc56b25', 'fdsjk');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (3, 'Hugo1', ' fdsajkl;', 'fdsjkl;', 'dfjksal', 'fjdsk;', '746dc219fd6e7fc11784e670413ead19746d41d01f4ba4883066cf4bee5d2bfc', 'efc1941925918343cfcbcc1ea2903d82b039dfb36d675d3b469b0fe1b5f4bbd7');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (4, 'xXxHack0rManxXx', ' Hugo', 'Peters', 'Stupid', 'hpeters1024@gmail.com', '4421b829449ba31f3f8680193ed459fae32d9828c6f7ab3750330172e86dfc25', '90bad9b2c77185394a11ac856c6171d2c2fc9e16bf6effef13abb30a0cf31c54');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (5, 'Hugo2', ' Hugo', 'Peters', 'Stupid', 'hpeters1024@gmail.com', 'fea3d2d915342acb8a5d9e6c2be3f544a96ebe6ba2765fcca84dfbeb37fd4574', '5b5b5b1e37618ed7d9c09118420663feb2a390f1b59d1bda61a4deeb8d41ac0b');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (6, 'Hugo3', ' Hugo', 'Peters', 'Stupid', 'hpeters1024@gmail.com', 'eab5dee8bf4021403337652204a1c951e267e3e8c7407442e2e6581cb319b7b0', 'b1e612368a0c392c9dce2d8d591a93376813a682feb20b38efb6aef3b8622e2f');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (7, 'Hugo69', ' fdksl;', 'fdjksl;', 'fdksal;', 'jfdksl', '920dbb71de1bd1cbc795f0fac5be3557fb64f4207e73cffe30cac8100fbc715e', '2085832cebb407c75b9d9a63a23ab27586ee01ce1746af091d051411390cff83');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (8, 'Hugo70', ' fdksl;', 'fdjksl;', 'fdksal;', 'jfdksl', '48a581974ea9c8a35bdfbbf55bc73ab3b3d465198b65d9c8f11f0eff14062791', '0133262cc220d976e74304179af47e3ed09b5544a0cdb20c52a7b4d682321341');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (9, 'Hugo55', ' fjdkl;', 'fdjkll;', 'fdskal;', 'jfkdsl;', '53c82949b62ce62a5648578ff8ad602a6e8838dd5ea31d9d6f8f506c78f44be6', '099cae56022e16f8dedf6d720c65e5f2d444338eae7a09e4c322820819e6a40d');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (10, 'Hugo56', ' fjdkl;', 'fdjkll;', 'fdskal;', 'jfkdsl;', 'cd2f38e731e4c199e219487fab0602fadf9870b581526bd89f876740dfe7086e', '579f89994da39619ec92469cc49fcde7c3ebc5d7d45b02b9b03ac04227efbeec');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (11, 'Hugo57', ' fjdkl;', 'fdjkll;', 'fdskal;', 'jfkdsl;', 'e598caa90bd4b3b98cceab307dee219efeb092e58d4aa1f6319d385d5c279c59', 'ad1884916d9c26fe5abd8e7f646310f54b26804e574abdc9ebc191a185f5c534');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (12, 'Hugo590', ' fjdkl;', 'fdjkll;', 'fdskal;', 'jfkdsl;', '8daa042bcf68aa35548cacc1fcf4c5b6f3e1851c8e22e60ce9024c509899d041', '0a6e2ab699ec5e26f61dfbe76d75754421d7134a380a6a489b4105ea646dbb6e');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (13, 482389, ' jfkdsla;', 'fdsaklj', 'jfkdsaa;', 'jekfljas;', '405b94653300a21baffcab030429a5fd978a644203367aa815bb508c5d88c30f', '8a27cc270a1e00521e634fd83a8a673e22c9d6288b60b2eaf69978e882ac00d3');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (14, 'wouter12', 'Tard', 'Wouter', 'Niet op de uni in elk geval', 'hacker@wouter.com', 'fa294608cd02c436ac192c14365ce4e543dee33e4b4cd2a06717f731393d58e0', 'b20e26881be46ac01271b9f4bcb428d290837cf249fe74074e2cb721a46596ea');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (15, 'glenn', ' foo', 'bar', 'gamehall', 'dingen@hotmail.nl', '5f6b6269db5078e17c9f1e1c728cc9fcd496b91afed270a9c6b5158150401e35', '59169b469860455c0961a6f01eb168ad9d8a482cae0e41f5b81b9bea3d3d5ebb');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (16, 'HugoPeters', ' Hugo', 'Peters', 'Pythagoraslaan, 105H', 'hpeters1024@gmail.com', '96b047f039db114d26588491443177d3bf80926c09f7e7b8c58e4a105496987c', 'bd1ba7b7fd3a9a1e2a91a7d81e042eed786771714c8fedf2f7e4e326eb168bae');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (17, '&lt;script&gt;alert(1)&lt;/script&gt;', ' fjdklsa', 'fjdkls', 'fdklas', 'jfdksla;', '7658842a36298865ca5dbce3b30fe76036bf3fd882390e76d239f34a035b8afe', '15624085935747fee3991fed696a4ba53317e0f8459eacf6913e157a2b14b35a');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (18, 'Birb', ' Birb', 'Beep!', 'Still a cage :(', 'birb@noor.com', 'bb50062fa15ea730dd2a813f65756357598b4299830fd82ad421bb2e3a9b4e13', '87efaa063eef03f100f5a5b843163191f8ec7dc8a04c425c5bbcdb8e23fd5c02');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (19, 'HugoMFPeters', ' Hugo', 'Peters', 'Pythagoraslaan, 105H', 'hpeters1024@gmail.com', '5df1ec921f307275e1f4e76b82063e9ba904a7b8c7bb7dcc1f43ba2c1c7ef54f', 'aaa8baa06bee164a0aa777454a0483aac4dd07ee5378e698fee7d414d56e5e3e');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (20, 'JeBoyyJeff', ' Jeff', 'Jefferson', 'Noone', 'bull@morebull.nl', 'a581674be24d288bcfeae823c3f7e9f27445e0a75f665f2d8fc5d02d587eacac', '49e9be98cc3ea0252a4fa1c82b5536a19c2d344aa2929faa3fc57cf17de17c48');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (21, 'XOXO', ' jullie zijn stom', 'kunnen jullie mijn website ook maken?', 'x', '@.nl', 'b360f00d08d1daad3c76fdb03e979307998de890f405a0f9e929d32863f4949c', '1f4710225a17f7516335488376c43da7aed82ca432a1aa58e7aa65d5b8116a75');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (22, 'willie wortel', ' willie', 'wortel', 'in katrien', 'willie@wortel.nl', '8bcea02b8a232cd4f0a21fa88a2c1f33b317c7343e55754608bd6696c2d333a3', 'f385e3f82f8a03f2532a0bcaf49bad584d871f773fc565a6106e765aa1517f71');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (23, 'LastPass', ' Hugo', 'Peters', 'Pythagoraslaan, 105H', 'hpeters1024@gmail.com', 'cd431ca5e92a1e0e3e91a0744c5ea9b93d2e923dc6b8bfa491eb249c455b2602', 'cf11dfb14fbbaec2596b71031dcc5b9c13d72da02a6c7c998ccc34ef8a4d416e');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (24, 'TheHugo', 'Hugo', 'Peters', 'fdjkl;', 'email', '470bbcaa0013bfb01b33da33eb33b3e6f3582f5395eb91eca7910f32d143a7a8', '22286aab6d926592ee38fa95c21ab1ce18794173c4d0994add7a44b87c01595a');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (25, 'maurin', 'Maurin', 'Voshol', 'Hof van Delftstraat, 3', 'maurinvoshol@gmail.com', 'efda7f97f26b64c78374000bbc6562de9b8607411034285192f8010b6c6624a1', '9f8c4a2de57cb16ec74f59f7c147c5aae05be4e3b6042b9a806a891ef3988015');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (26, 'Hugo12', 'Bull', 'Shit', 'Facebook', 'nee', 'd3e9b800a5388fb44ad5903692da688631944f010a9761ce88acfb3e787ff210', '74fc0f0fb7e59b71d76da37eba0fa9aca6da124e928afd4965bd68ba220388de');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (27, 'Konijn', 'Broer', 'Konijn', 'Konijnenhol 10', 'Konijn', '63c66cc00e6181e1b5129fc1c7a3edc54ec5d74f56ec5ba25a5a4cffbbc10f9f', 'c3e5763ae5e509e003d1ff99b92b92f50f1389c738fd17414ff80f338ecc9773');
INSERT INTO Users (user_id, username, first_name, last_name, address, email, password, salt) VALUES (28, 'Test', 'Test', 'Test', 'Tetest123', 'test@test.com', '538f143a5486cd1c78812e3971c323c5233baf7ffa6df99c96de91aca64507f8', 'd6f39cd70599341037b2968b36d6c5f303adebc3e1f09a0606205742efec06fd');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-10-20 00:52:24.436

-- tables
-- Table: Beer
CREATE TABLE Beer (
    name varchar(32) NOT NULL,
    brewery varchar(32) NOT NULL,
    style_id int NOT NULL,
    organic bool NOT NULL,
    abv int NOT NULL,
    CONSTRAINT name PRIMARY KEY (name)
);

-- Table: Brewery
CREATE TABLE Brewery (
    name varchar(32) NOT NULL,
    review_id int NOT NULL,
    city varchar(32) NOT NULL,
    state varchar(32) NOT NULL,
    established int NOT NULL,
    CONSTRAINT name PRIMARY KEY (name)
);

-- Table: Review
CREATE TABLE Review (
    id int NOT NULL,
    brewery_name varchar(32) NOT NULL,
    rating double(1,1) NOT NULL,
    flavor double(1,1) NOT NULL,
    comment text NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: Style
CREATE TABLE Style (
    id int NOT NULL,
    description text NOT NULL,
    ibu varchar(32) NOT NULL,
    abv int NOT NULL,
    CONSTRAINT id PRIMARY KEY (id)
);

-- Table: StyleBreweryAssoc
CREATE TABLE StyleBreweryAssoc (
    id int NOT NULL,
    style_id int NOT NULL,
    brewery_name varchar(32) NOT NULL,
    CONSTRAINT StyleBreweryAssoc_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Beer_Brewery (table: Beer)
ALTER TABLE Beer ADD CONSTRAINT Beer_Brewery FOREIGN KEY Beer_Brewery (brewery)
    REFERENCES Brewery (name);

-- Reference: Beer_Style (table: Beer)
ALTER TABLE Beer ADD CONSTRAINT Beer_Style FOREIGN KEY Beer_Style (style_id)
    REFERENCES Style (id);

-- Reference: Brewery_Review (table: Brewery)
ALTER TABLE Brewery ADD CONSTRAINT Brewery_Review FOREIGN KEY Brewery_Review (review_id)
    REFERENCES Review (id);

-- Reference: Review_Beer (table: Review)
ALTER TABLE Review ADD CONSTRAINT Review_Beer FOREIGN KEY Review_Beer (brewery_name)
    REFERENCES Beer (name);

-- Reference: Table_6_Brewery (table: StyleBreweryAssoc)
ALTER TABLE StyleBreweryAssoc ADD CONSTRAINT Table_6_Brewery FOREIGN KEY Table_6_Brewery (brewery_name)
    REFERENCES Brewery (name);

-- Reference: Table_6_Style (table: StyleBreweryAssoc)
ALTER TABLE StyleBreweryAssoc ADD CONSTRAINT Table_6_Style FOREIGN KEY Table_6_Style (style_id)
    REFERENCES Style (id);

-- End of file.


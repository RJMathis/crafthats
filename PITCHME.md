@title[Introduction]

# Brewtiful World

##### The Beer Place


<span class="byline">Samuil Borisov, Rita Mathis, Audric Ganser, Travis Reed, Pablo Velasco</span>

---

@title[DataBase]

### Database
* Models
	* Beer, Style, Breweries, Reviews
* API's
	* brewerydb.com, ratebeer.com

Note:
(Talk about their relationship to each other or what their attributes were?)
Naming convention of beers across API's were different
Population of database only occured if all attributes of a model were present

---

@title[API]

### API
* SQLAlchemy
* Flask
* unittest
* RESTful API best practices


Note:
Sort functionality used either name or rating of respective model
Filter functionality per model was unique to one another (except limit and offset)
	Mix and matching available filters to a model possible (nothing is required)

---

@title[User Interface]

### Front-end: User Interface
* React.js
* Fuse.js
* axios
* react-highlight-words
* CSS
* Bootstrap


---

@title[Demonstration]
### Demo

[Our Brewtiful World](https://brewtiful.world)

---

@title[Self Critique]
### Self Critique
* What did we do well?
	* Team Communication & Planning.
	* Adapting to new design requirements
	* Design/Develop/Refine
	
---
* What did we learn?
---?image=https://outlivinglife.files.wordpress.com/2013/02/information_hose.jpg&size=70% 70%

---
* New technology stack
---
* What can we do better?
	* Mobile design, Search Scalability, Data Collection
* What puzzles us?
	* Service workers

Note:
Scalability (search in backend)
More robust data (Handle all data from api's even if the data needed was missing, more API's to scrape from)
Cron jobs implementation to update or import new data
Libraries (Fuse.io etc)
SQLAlchemy, GCP, Flask, ReactJS 
---

@title[Other Critique]
### Critique of gamingdb.info
* What did they do well?
	* Design, Responsive layout, Good Data, back-end Pagination
* What did we learn from their website?
	* Music games were the highest rated
* What can they do better?
	* Cross Browser design, pages for pagination
* What puzzles us about their website?
	* "Teams Top Picks"

---

@title[Visualization]
### Visualization
###### Audric Ganser, Rita Mathis
* D3 V4
* gamingdb.com
* Jquery
* HTML/CSS

[Gaming DB Visualization](http://aganser.com/visualization.html)
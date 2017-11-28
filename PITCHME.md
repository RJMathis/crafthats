@title[Introduction]

# Brewtiful World

##### The Beer Place


<span class="byline">Samuil Borisov, Rita Mathis, Audric Ganser, Travis Reed, Pablo Velasco</span>

---

@title[DataBase]

### Database
###### Rita Mathis, Pablo Velasco, Audric Ganser, Samuil Borisov
* Models
	* Beer, Style, Breweries, Reviews
* API's
	* brewerydb.com, ratebeer.com
* How We Scraped
	* brewerydb (beer, style, breweries)
	* ratebeer (beer reviews)

Note:
(Talk about their relationship to each other or what their attributes were?)
Naming convention of beers across API's were different
Population of database only occured if all attributes of a model were present

---

@title[API]

### API
###### Rita Mathis, Samuil Borisov, Pablo Velasco
* SQLAlchemy
* Routes/Endpoints
	* beers, beers/{id}...
	* filters
	* sorting

Note:
Sort functionality used either name or rating of respective model
Filter functionality per model were unique to one another (except limit and offset)
	Mix and matching available filters to a model possible (nothing is required)

---

@title[User Interface]

### Front-end: User Interface
###### Travis Reed, Audric Ganser
* React.js
* Fuse.js
* axios
* react-highlight-words
* CSS


---

@title[Demonstration]
### Demo

[Our Brewtiful World](https://brewtiful.world)

---

@title[Self Critique]
### Self Critique
* What did we do well?
	* Good design, Fast search
* What did we learn?
	* All the SQL, GCP, Libraries
* What can we do better?
	* Mobile design, Scalability, More robust data
* What puzzles us?
	* Service workers and how they work

Note:
Scalability (search in backend)
More robust data (Handle all data from api's even if the data needed was missing)
Cron jobs implementation to update or import new data
Libraries (Fuse.io etc)
---

@title[Other Critique]
### Critique another project
* What did they do well?
	* Design, Responsive layout, Good Data, back-end Pagination
* What did we learn from their website?
	* RPG and Adventure games were the highest rated
* What can they do better?
	* Cross Browser design, Better front-end pagination
* What puzzles us about their website?
	* What is "Teams Top Pick" based off of?

---

@title[Visualization]
### Visualization
###### Audric Ganser
* D3 V4
* gamingdb.com
* Jquery
* HTML/CSS

[Gaming DB Visualization](http://aganser.com/visualization.html)

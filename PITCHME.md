@title[Introduction]

# Brewtiful World

##### The Beer Place


<span class="byline">Samuil Borisov, Rita Mathis, Audric Ganser, Travis Reed, Pablo Velasco</span>

---

@title[DataBase]

### Database
* GCP MySQL Storage
* Tables
	* Beer, Style, Breweries, Reviews
* Populating
	* brewerydb.com, ratebeer.com

Note:
Naming convention of beers across API's were different
Population of database only occured if all attributes of a model were present

---

@title[API]

### API
* SQLAlchemy
* Flask
* unittest
* RESTful API best practices
* Caching


Note:
Sort functionality used either name or rating of respective model
Filter functionality per model was unique to one another (except limit and offset)
	Mix and matching available filters to a model possible (nothing is required)

---

@title[User Interface]

### Front-end: User Interface
* html/CSS
* Bootstrap
* React.js
* Fuse.js
* axios
* react-highlight-words


---

@title[Demonstration]
### Demo

[Our Brewtiful World](https://brewtiful.world)

---

@title[Self Critique]
### Self Critique
* What did we do well?
	* Agile Development
	* Minimal, Elegant User Interface
	* Separated Services
	
Note:
Google Hangout meetups, Scrum Master: made sure issues were tracked in Trello, Post-class standups, Sprint planning at the beginning of each phase, Github: protected master branch, PR template, code reviews
	
---
* What did we learn?
	* GCP
	* SQLAlchemy
	* Testing Tools
	* Full-stack Development
	
Note: python unittest module, postman, selenium

---
* What can we do better?
	* Search Scalability
	* Data Collection
* What puzzles us?
	* Service workers

Note:
Scalability (search in backend)
More robust data (Handle all data from api's even if the data needed was missing, more API's to scrape from)
Cron jobs implementation to update or import new data
---

@title[Other Critique]
### Critique of gamingdb.info
* What did they do well?
	* Design, Fast loading
* What did we learn from their website?
	* Navigating Backwards
* What can they do better?
	* Adding page numbers to pagination
	* Resize images on model page
* What puzzles us about their website?
	* Ambiguous "Teams Top Picks"

---

@title[Visualization]
### Visualization
* D3 V4
* gamingdb.com
* Jquery
* HTML/CSS

[Gaming DB Visualization](http://aganser.com/visualization.html)

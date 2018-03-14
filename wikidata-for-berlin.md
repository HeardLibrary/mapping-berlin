# Getting Started with Wikidata

This tutorial introduces the basics of [Wikidata](https://www.wikidata.org/wiki/Wikidata:Main_Page), an offshoot of Wikipedia. Since its launch five and a half years ago on October 30, 2012, Wikidata has developed steadily and has become a repository of all kinds of facts across the Wikipedia language editions. In what follows, you will become familiar with the purpose and goals of Wikidata, including how to contribute to its development, as well as how to use Wikidata to study the history and geography of Berlin.

## Learning Outcomes

* Articulate the short and long term goals of Wikidata
* Learn to contribute Wikidata
* Write simple SPARQL queries to retrieve and visualze data from Wikidata

## What is Wikidata?

To understand the problems that Wikidata addresses, you need to reflect on the challenges posed by Wikipedia's [295 language editions](https://en.wikipedia.org/wiki/List_of_Wikipedias). Ideally, articles in these language editions should be linked together. If you create an article about a German scholar on the English Wikipedia, you'd want to connect that article to any existing articles on other language editions, including the German edition but also to the Chinese, French, etc. editions too. In the past, you had to create these language links manually. As might be expected, syncronizing editions was sometimes spotty, meaning that an equivalent article might exist on another language edition, but not be reported on your edition.

* [Phase One](https://en.wikipedia.org/wiki/Wikidata#Phase_1) aspires to connect articles on the same topic across language editions. Rather than asking editors to link from every language edition to every other language edition, Wikidata centralized the process. In other words, the Wikidata project moved the relationship between Wikipedia editions from a [matrix model](https://commons.wikimedia.org/wiki/File:Complete_graph_K7.svg) to a [hub-and-spoke model](https://upload.wikimedia.org/wikipedia/commons/4/49/Star_network_7.svg).

* [Phase Two](https://en.wikipedia.org/wiki/Wikidata#Phase_2) connected the statements made on the different language editions. If, for instance, you put up an infobox with a photograph about a intellectual figure on one language edition, you'd like other editors to have access to that information. This phase of the Wikidata project makes that possible and is gradually extending the range of statements that you can query across language editions.

* [Phase Three](https://en.wikipedia.org/wiki/Wikidata#Phase_3) will make it possible to share lists across language editions such as, for example, this [List of female scientists in the 21st century](https://en.wikipedia.org/wiki/List_of_female_scientists_in_the_21st_century) and to make sure that they get updated automatically when new information is entered.

## Let's Make Some Edits!

Now that you have a sense of what Wikidata is about, let's make some contributions. Wikidata is not just about automating the exchange of information. Like Wikipedia, it's freely editable and you can contribute information to it directly.

### Setting Your Languages

You create a username for Wikidata like you do on Wikipedia. In fact, if you have signed into Wikipedia already, you should already have a username on Wikidata. You can create your user page and talk page as you would on Wikipedia. If you're interested in editing labels in languages other than English, you can also add language codes using the Babel extension to Wikidata: `{{#babel:en-N|fr-3|de-5}}`

### Taking the *Items* Tour

Let's start with taking an introductory [tour](https://www.wikidata.org/w/index.php?title=Q16943273&tour=wbitems&uselang=EN&data=ok) of how to edit Wikidata items. An [item](https://www.wikidata.org/wiki/Wikidata:Glossary#Item) according to Wikidata is a "a real-world object, concept, event that is given an identifier." Items have names like [Q64](https://www.wikidata.org/wiki/Q64). While these names look weird to speakers of English (or any other natural language), they provide a way of identifying information across editions without privileging any particular linguistic community. In other words, we all need to learn Wikidata's version of [Esperanto](https://www.wikidata.org/wiki/Q143).

## Let's Query Wikidata

The best part about Wikidata is that you don't need to look up information across its pages. You can write simple (and complex) queries to pinpoint precisely the data you want to receive. The query language for Wikidata is called [SPARQL](https://www.w3.org/TR/sparql11-overview/) or the SPARQL Protocol and RDF Query Language.

### Example SPARQL Queries

Let's try a few SPARQL queries related to Berlin, visualizing them in different ways.

#### List of Movies filmed in Berlin

```sparql
SELECT ?Film ?FilmLabel WHERE {
  ?Film wdt:P915 wd:Q64.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }

}
LIMIT 100
```

### Image Grid of Governing Mayors of Berlin

```sparql
#defaultView:ImageGrid

SELECT ?Governing_Mayor_of_Berlin ?image ?member_of ?member_ofLabel WHERE {
  ?Governing_Mayor_of_Berlin wdt:P39 wd:Q641159.
  OPTIONAL { ?Governing_Mayor_of_Berlin wdt:P18 ?image. }
  OPTIONAL { ?Governing_Mayor_of_Berlin wdt:P1416 ?member_of. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
LIMIT 100
```

#### Galleries, Libraries, Archives and Museums in Berlin

```sparql
#defaultView:ImageGrid

SELECT DISTINCT ?glam ?glamLabel ?image WHERE {
  ?glam wdt:P131 wd:Q64; # Located in Berlin (but not administrative subdivisions since query times out with wdt:P131*)
        wdt:P31/wdt:P279* wd:Q1030034. # Any instance of / subclass of GLAM
  OPTIONAL { ?glam wdt:P18 ?image. } # proi
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],de". }
}
ORDER BY (?glamLabel)
```

#### Map of Churches in Berlin

```sparql
# Churches in Berlin
#defaultView:Map
SELECT ?church ?churchLabel ?image ?coordinate_location WHERE {
  ?church wdt:P131 wd:Q64.
  ?church wdt:P31 wd:Q16970.
  OPTIONAL { ?church wdt:P18 ?image. }
  OPTIONAL { ?church wdt:P625 ?coordinate_location. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "de". }
}
```

#### Timeline of Theologians in Berlin

```sparql
# A Timeline of Theologians Active in Berlin
#defaultView:Timeline
SELECT ?theologian ?theologianLabel ?date_of_birth ?image WHERE {
  ?theologian wdt:P106 wd:Q1234713.
  ?theologian wdt:P937 wd:Q64.
  OPTIONAL { ?theologian wdt:P569 ?date_of_birth. }
  OPTIONAL { ?theologian wdt:P18 ?image. }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
```
#### Books Published During the Weimar Republic

```sparql
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

# Books published in Germany during the Weimar Republic

SELECT ?book ?authorLabel ?bookLabel ?year ?image WHERE {
  ?book wdt:P31 wd:Q571 ;
        wdt:P495 wd:Q183 ;
        wdt:P577 ?date ;
        wdt:P50 ?author .
  bind(year(?date) as ?year)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  FILTER((?date >= "1918-11-09T00:00:00Z"^^xsd:dateTime) && (?date <= "1933-01-30T00:00:00Z"^^xsd:dateTime))
}
ORDER BY ?year
```

#### Founding Dates of Universities in Berlin

```sparql
# Forked from http://tinyurl.com/jrv757r
#defaultView:Timeline
SELECT ?university ?universityLabel ?founding (SAMPLE(?image) AS ?image) WHERE {
  ?university wdt:P31 wd:Q3918.
  ?university wdt:P571 ?founding.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
  OPTIONAL { ?university wdt:P18 ?image. }
  ?university wdt:P131 wd:Q64.
}
GROUP BY ?university ?universityLabel ?founding
LIMIT 50
```

### Let's Play with Wikidata

By way of conclusion, let's try out the [Wikidata Game](https://tools.wmflabs.org/wikidata-game/) and see whether we can make improvements to the quality of Wikidata's data.

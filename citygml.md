# CityGML

Our goal in this session is to understand the basics of CityGML and to survey its potential applications in the digital humanities.

![City GML of the Reichstag in Berlin](https://i.imgur.com/KQRlyfg.png)]

## What is CityGML?

[CityGML](https://www.citygml.org/) is an adaptation of the Geography Markup Language (or [GML](http://www.opengeospatial.org/standards/gml)) that allows the representation of three dimension structures and their environments.

The CityGML 2.0 standard defines different "levels of detail" or LOD. Put roughly, these LOD provide increasing levels of detail in their representation of 3D structures. This [video](https://vimeo.com/101502213) illustrates the differences.

A recent article by Filip Biljecki, *et. al.* titled “[Applications
of 3D City Models: State of the Art Review](http://www.mdpi.com/2220-9964/4/4/2842)” surveys the options for using CityGML in research and practice.

## Exploring CityGML as Data

Our first exercise will be to explore CityGML qua data. This repository contains a [LOD2 example of CityGML](exercises/CityGML/b1_lod2_s.gml), encoded by [TU Delft](https://3d.bk.tudelft.nl/). If you open the file in Atom, you'll find that it's encoded according to the eXtensible Markup Language (or [XML](https://www.w3.org/TR/xml/)).

A JSON version of the CityGML standard is also under development at TU Delft called [CityJSON](http://www.cityjson.org/en/0.5/). The software support for CityJSON is not yet robust, but [projects are underway](http://www.cityjson.org/en/0.5/software/).

## Validating CityGML

The next exercise will be to download and validate more complex CityGML. The Berlin Senate Department for Economics, Energy and Public Enterprises as and the Berlin Partner for Business and Technology maintain a [CityGML dataset (LOD2) for Berlin](http://www.businesslocationcenter.de/berlin3d-downloadportal/?lang=en). The portal allows us to select buildings or entire neighborhoods and download them as CityGML or other 2D and 3D formats.

Let's explore this data set using the oXygen XML Editor, which is available freely to students and faculty in the College of Arts & Science at Vanderbilt through the [Software Store](https://it.vanderbilt.edu/software-store/). We will use oXygen to check that our CityGML is well-formed and also valid by associating the CityGML Schema to our instance. You can find the Schemas on the [TUDelft3D Github Repository](https://github.com/tudelft3d/CityGML-schema-validation/tree/master/schemas).

## Visualizing CityGML

While tools exist to visualize and manipulate CityGML, the easiest to use is [Azul](https://itunes.apple.com/app/azul/id1173239678?mt=12) from TU Delft. Azul is available only for OSX. In this session, we will explore our datasets in Azul and see how changes to the CityGML data change the rendering of our structures.

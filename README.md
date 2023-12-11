## Project Title:
Exploring the Relationship between Obesity and Leading Causes of Death in the United States

## Project Description:
Overall, this project aims to uncover the relationship between the overall obesity proportions as well as prevalent medical diseases in the United States throughout 7 years, in addition to the obesity data from 2015. Our focus is on the development of an interactive map that integrates HTML, CSS, and JS to show the relationship across all states. Our prioritization is to give a user-friendly interface so the relationship is more easily interpreted. 

In terms of the JavaScript code, we employed Mapbox and Chart.js to dynamically project trends over different spaces and times. Some of the features include tooltips for state-specific statistics over the period from 2010 - 2017. We implemented distinct color schemes to differentiate the disease statistics for Total Deaths, Total Cancer, Total Heart, and Total Stroke cases.

About the HTML, we prioritized the optimal layout that would allow users to use all the main functions and features of the map. Our corresponding CSS code aims to create an aesthetic appeal. Some specific features include the map overlay (or the legend) appearance, the navigation bar, as well as the overall coherence of the interface. In addition to this, we used the hover functionality for the obesity proportion to convey the state statistics table. 



## Project Goal:

One goal that we prioritized is the temporal analyses spanning over 7 years throughout 2010-2017, in addition to obesity data from the year 2015. The perspective of the temporal analysis allows us to take a closer look at the distinctive patterns with regard to the relationship between obesity and these underlying medical diseases in a more holistic view of health dynamics. 

Another prioritizing goal that led our project was creating a user-friendly design that highlights an intuitive and accessible design so that users are given the freedom to navigate seamlessly throughout the site. By ensuring these factors in our design, we hope to attract and empower a broader audience, which includes government officials, insurance providers, and policymakers to easily perceive the relationship between obesity proportion statistics and underlying medical diseases. 

Our ambition to employ these focuses extends to regional insights into deaths associated with obesity and underlying diseases. Specializing the relationship between the two, allows for a more targeted approach in terms of interventions in specific areas of the United States, allowing a further look into what diseases and solutions should be addressed. Furthermore, we hope to contribute to public health policies through these methods and provide tools to concerned stakeholders in the pursuit of healthcare management and tackling public health issues.


The application URL: https://sbains2.github.io/Geog328Final/index.html



## Main functions:

The project involves the comprehensive collection of data from two sources: Obesity Prevalence (throughout our nation) and Leading Causes of Death by State (2010-2017).

We performed data cleaning to find detailed information related to the relationship between Obesity and Leading Causes of Death. The core of our project is the creation of an interactive map. We leverage GitHub technologies and Mapbox GL JS to design and build an intuitive and user-friendly map interface where states can be selected to show obesity and relevant causes of death.

The overall main functions include an Interactive Map, a Line Chart, and a list of States (arranged from low to high prevalence).

Interactive Map:

As you hover over different states on the map, a black box appears, showing the overall prevalence of obesity in that state.
obese_data() -> Reads in the National_Obesity_By_State.geojson file while using Mapbox GL JS functions inorder to produce an interactive map including
the legend, being able to hover over each state, and also creating the list of states and organizing them. 

Line Chart:
When you click on a state, for example, Washington, a line chart opens up on the right side of your screen. It displays four different variables: the leading causes of death (Cancer, Stroke, Heart, and total Deaths) from 2010 to 2017.
showLineChart() -> Reads in the causes_of_death.json folder, and represents a line-chart with all the given variables in the JSON file. This code produces a Chart.js 
chart that takes in the variables of: Year, Death by Heart Disease, Death by Cancer, Death by Stroke, and Total Deaths


## Data sources: 
Source 1: Data for the National Obesity Percentages (by State) [National Obesity Percentages](https://catalog.data.gov/dataset/national-obesity-by-state-d765a)

This data set has the characteristics of National Obesity Percentages categorized by State. This source is a JSON file -- which allows us to be able to visualize 
the dataset onto a map, so that we're able to present the different percentages of obesity by State. 

Source 2: Causes of Death [2010-2017, Leading Causes Of Death by State](https://catalog.data.gov/dataset/nchs-leading-causes-of-death-united-states)

This dataset comprises the attributes of Leading Causes of Death categorized by state. Despite being initially obtained as a messy JSON file with complexities, we successfully organized and refined the data by filtering for the specific variables of interest. Focused on examining the relationship between Obesity and other variables, such as deaths attributed to Cancer, Stroke, and Heart Disease, our objective was to explore potential correlations between these causes and obesity, acknowledging that the observed outcomes may stem from an interconnected relationship with obesity.

Relationship Example: [Prevalance Of Obesity among U.S Adults by State](https://www.cdc.gov/obesity/data/prevalence-maps.html#overall)

In the example given, we are inspired by the color-grading and legend within this map, which allows us to build the relationship and view the prevalence of obesity throughout each state. However, we would like to create a map that goes more in-depth by comparing other variables, creating interactions (specific percentages for each state), and even organizing and displaying the states with the lowest to highest prevalence.



## Applied libraries (e.g., mapbox gl js) and Web Services (e.g., github, basemap) in use:

GitHub - We used GitHub in order to communicate and work on this project together! It is also the service that allows us to be able to represent
this map on a GitHub website.

Mapbox Gl JS - We used MapBox GL JS to initialize, customize, and create interactive functions for the map. 

Chart JS - We used ChartJS function inorder to create the line-chart


## Acknowledgment:

We acknowledge that a portion of the data may be dated, considering that the Source 1 Dataset originated from a 2015 survey. 

It is important to recognize that the correlation between causes of death and obesity percentages is not entirely straightforward, given that fatalities attributed to conditions like Cancer, Stroke, and Heart Disease can result from factors unrelated to obesity. The creation of the map was based on the available datasets, but it is acknowledged that a more comprehensive and refined map on this subject could be developed with improved resources and datasets.

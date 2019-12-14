# Data Visualization in Virtual Reality

#### Directed Research Project under Dr. Saty Raghavachary 
#### University of Southern California



The objective of this project was to study the possibilities of visualizing data in virtual reality. To achieve this, the key components that needed to be understood were WebVR, A-Frame and D3. WebVR was the medium through which the user could experience the visualizations, A-Frame provided the tools to set up the VR scene and entities, while D3 enabled DOM manipulation and definition of various visualization attributes.

In Visualization I, the data was read from a static JSON file using XMLHttpRequest and Browserify, and its corresponding bar chart was generated. Visualization II emulated the first in basic functionality but sourced the data from Google Firebase’s Cloud Firestore. The same visualization was first created in regular D3, without the use of A-Frame VR. This was done to test the interaction with the Cloud Firestore database and to be used as a reference for the VR visualization. Along with being able to read dynamic data from a database, Visualization II also had custom annotations that appeared when the mouse hovered over a bar. This allowed the user to understand the values and relative heights of the bars, thereby experiencing an effective visualization of the data.

Visualization I (VR): -
https://bl.ocks.org/IshaanVasant/raw/b84726b84c14d9ba3e058cef85376acb/a65ab438a0e25b9037710b2b001fcf79b1cec721/

Visualization II (2D): -
https://bl.ocks.org/IshaanVasant/raw/a48d9913dd7e09f00e9a75fd5fdc275f/16c77118283a6fd869ffbea1d4fa458edaf9b188/

Visualization II (VR): -
https://bl.ocks.org/IshaanVasant/raw/dd43e5511102eb6e3c3fab4b8638584f/a9d7b9815f2cc1e7cd0c5a800fbbf28826ef5b0c/


Medium article on the project - https://towardsdatascience.com/data-visualization-in-virtual-reality-32408475b66

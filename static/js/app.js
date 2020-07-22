// from data.js
var tableData = data;
var filteredData = tableData.filter(sighting => sighting.datetime === "1/1/2010");

// reference the table body
var tbody = d3.select("tbody");

function buildTable(data) {


  tbody.html(" ")

  // Console.log the ufo data from data.js
  console.log(data);

  // update each cell's text with ufo sighting object values
  data.forEach(function(ufoSightings) {
    console.log(ufoSightings);

    // append a row to the table for each ufo sighting object
    var row = tbody.append("tr");

    // add data to the row
    Object.entries(ufoSightings).forEach(function([key, value]) {
      console.log(key, value);
      
      // Append a cell to the row for each value
      var cell = row.append("td");
      cell.text(value);
    });
  });
};

// create lists of cities, states, and shapes in the data array

var sightingcountry = tableData.map(function(data) {
  return data.country;
});
var sightingstate = tableData.map(function(data) {
  return data.state;
});
var sightingcity = tableData.map(function(data) {
  return data.city;
});
var sightingshape = tableData.map(function(data) {
  return data.shape;
});
var sightingduration = tableData.map(function(data) {
  return data.durationMinutes;
});

var uniqueCountry = Array.from(new Set(sightingcountry));
  uniqueCountry.sort();
  console.log(uniqueCountry);

var uniqueState = Array.from(new Set(sightingstate));
  uniqueState.sort();
  console.log(uniqueState);

var uniqueCity = Array.from(new Set(sightingcity));
uniqueCity.sort();
console.log(uniqueCity);

var uniqueShape = Array.from(new Set(sightingshape));
uniqueShape.sort();
console.log(uniqueShape);

var uniqueDuration = Array.from(new Set(sightingduration));
uniqueDuration.sort();
console.log(uniqueDuration);


// add the lists from above to the dropdown filters

var selCountry = d3.select('#country');
uniqueCountry.forEach(function(country){
  selCountry.append("option").text(country)
});

var selState = d3.select('#state');
uniqueState.forEach(function(state){
  selState.append("option").text(state)
});

var selCity = d3.select('#city');
uniqueCity.forEach(function(city){
  selCity.append("option").text(city)
});

var selShape = d3.select('#shape');
uniqueShape.forEach(function(shape){
  selShape.append("option").text(shape)
});

var selDuration = d3.select('#duration');
uniqueDuration.forEach(function(durationMinutes){
  selDuration.append("option").text(durationMinutes)
});

function filterTable() { 

  // Prevent the page from refreshing so it will run the code below
  d3.event.preventDefault();
  
  // collect user input data
  var inputdate = d3.select("#datetime");
  var inputcountry = d3.select("#country");
  var inputstate = d3.select("#state");
  var inputcity = d3.select("#city");
  var inputshape = d3.select("#shape");
  var inputduration = d3.select("#duration");

  // use the user input data as filters for the table (as many as are supplied)
  var filteredData = tableData.filter(sighting => (inputdate.property("value") === "" || sighting.datetime === inputdate.property("value")) && 
                                                  (inputcountry.property("value") === "" || sighting.country === inputcountry.property("value")) &&
                                                  (inputstate.property("value") === "" || sighting.state === inputstate.property("value")) &&
                                                  (inputcity.property("value") === "" || sighting.city === inputcity.property("value")) &&
                                                  (inputshape.property("value") === "" || sighting.shape === inputshape.property("value")) &&
                                                  (inputduration.property("value") === "" || sighting.durationMinutes === inputduration.property("value")));
  
  buildTable(filteredData);
};

// filter the table when the filter table button is clicked
d3.select("#filter-btn").on("click", filterTable);

// redisplay the filtered table
buildTable(tableData);



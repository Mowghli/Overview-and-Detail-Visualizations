
var i=0;

var poot=function toot(CountryCLick,CountryDat, data, pootis, text){

    
  d3.select("#bardock").select(".bar").remove();
  d3.select("#bardock").select("g").remove();

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 550 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


var y = d3.scaleBand()
          .range([height, 0])
          .padding(0.1);

var x = d3.scaleLinear()
          .range([0, width]);
          

var svg = d3.select("#bardock")
    .attr("width", width + 100 + margin.right)
    .attr("height", height + 150 + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + 100+ "," + 0 + ")");





var maxx=d3.max(pootis);
var minn=d3.min(pootis);
console.log(maxx+" "+minn);

  data.forEach(function(d) {
    if(CountryCLick[d.Country]==1)
    d.BirthRate = +d.BirthRate;
  });


  x.domain([minn,maxx])
  y.domain(data.map(function(d) { 


    if(CountryCLick[d.Country]==1)

    return d.Country; }));
  //y.domain([0, d3.max(data, function(d) { return d.BirthRate; })]);


  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
    .filter(function(d) { return CountryCLick[d.Country]==1})
      .attr("fill", "steelblue")
      // .attr("x", function(d) { return x(CountryDat[d.Country]); })
      .attr("width", function(d) { 
         console.log(CountryDat[d.Country])
        return x(CountryDat[d.Country]); } )
      .attr("y", function(d) { return y(d.Country); })
      .attr("height", y.bandwidth());


  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));


  svg.append("g")
      .call(d3.axisLeft(y));
      i=1;

      svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + margin.top + 20) + ")")
      .style("text-anchor", "middle")
      .text(text);




  }
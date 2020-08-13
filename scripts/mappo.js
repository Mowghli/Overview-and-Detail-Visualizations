var h = 700 , w = 700;
    var tooltip = d3.select("body")
              .append("div")
              .style("position", "absolute")
              .style("visibility", "hidden")
              .style("color" , "black")
              .style("border", "0px")
              .style("text-align", "center")
      
      var tooltit =   d3.select("body")
              .append("div")  
              .style("position", "absolute")
              .style("visibility", "hidden")
              .style("color" , "black")
              .style("width", "1px")
              .style("border-right", "10px solid black")
  
              .style("border-top", "10px solid transparent")  
              .style("border-bottom", "10px solid transparent")
              .style("font-size", "0")
              .style("line-height","0")
          


    var canvas = d3.select("body").append("svg")
            .attr("width" , w)
            .attr("height" , h)
            
    

    var q = d3.queue()
    .defer(d3.json, "custom.geo.json")
    .defer(d3.csv, "data/countries_processed.csv")
    .await(ready);

var CountryClick = [];
var CountryDat=[];


    function ready(error, map, dot)
    {


      var i=0;

        if (error) throw error;
        var pootiSpencer = [];
        var BirthRate = []; 
        dot.forEach(function(d) {
            BirthRate[d.Country] = +d.Birthrate; 
            CountryDat[d.Country] = +d.Birthrate;
            CountryClick[d.Country]=+0;
            pootiSpencer[i]  = +d.Birthrate; 
           i++;
          })

        var Population= []; 
        dot.forEach(function(d) {
            Population[d.Country] = +d.Population; 
            // pootiSpencer[i]  =+d.Population; 
           // i++;
          })

        var Area = []; 
        dot.forEach(function(d) {
            Area[d.Country] = +d.Area; 
            // pootiSpencer[i]  = +d.Area; 
           // i++;
          })

        var PopDen = []; 
        dot.forEach(function(d) {
            PopDen[d.Country] = +d.PopDen;
            // pootiSpencer[i]  = +d.PopDen;
           // i++; 
          })

        var Phones = []; 
        dot.forEach(function(d) {
            Phones[d.Country] = +d.Phones; 
            // pootiSpencer[i]  = +d.Phones; 
           // i++;
          })

        var Crops = []; 
        dot.forEach(function(d) {
            Crops[d.Country] = +d.Crops; 
            // pootiSpencer[i]  = +d.Crops; 
           // i++;
          })

        var DeathRate = []; 
        dot.forEach(function(d) {
            DeathRate[d.Country] = +d.Deathrate; 
            // pootiSpencer[i]  = +d.Deathrate;
           // i++;
          })

        var Options = ["BirthRate", "Population","Area", "PopDen","Phones", "Crops","DeathRate"];


        d3.select("#selectButton")
      .selectAll('myOptions')
      .data(Options)
      .enter()
      .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button


    
      
      var color = d3.scaleThreshold()
              .domain([0, 10, 15, 20, 25, 30, 35, 50])
              .range(["#D7301F", "#EF6548", "#FBB676", "#FEF4B9", "#A8C87D", "#359A4B", "#1B532D", "#12351F"])

      var colours = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
       "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63", 
       "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"];


       var heatmapColour = d3.scaleLinear()
      .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
      .range(colours);


              


    var meaning = d3.scaleOrdinal()
            .domain(["BirthRate", "Population","Area", "PopDen","Phones", "Crops","DeathRate"])
              .range(["Birth Rate: ", "Population: ","Area: ", "Population Density","Phones: ", "Crops: ","DeathRate: "])

      // var color = d3.scaleThreshold()
      //         .domain([0, 100])
      //         .range(["#D7301F", "#EF6548"])


    var cen = [ 39.74739, -105 ]
        var scale  = 110000;
        var offset = [w/2 , h/2 - 40];
          
      

    var projection = d3.geoMercator()
      .scale(120)
        // .center([0,20])
        .translate([w / 2, h / 2]);

        var path = d3.geoPath().projection(projection);
var f=0;


    var areas = canvas.selectAll("path")
              .data(map.features)
              .enter()
              .append("path")
              .attr("d" , path)
              .style("stroke", "black")
              .style("stroke-width", "0.5")



    .on("mousemove", function() {
         tooltip.style("top", (event.pageY - 20) + "px")
            .style("left", (event.pageX + 15) + "px");

            tooltit.style("top", (event.pageY - 10) + "px")
            .style("left", (event.pageX +5) + "px");
      })

      .on("mouseout", function() {
         tooltip.style("visibility", "hidden");
         tooltit.style("visibility", "hidden");
      })

      .on("mouseover", function(d) {
        tooltip.transition()    
                .duration(2000)    
                .style("opacity", .8);
         tooltip.style("visibility", "visible")
          .html(function(){
           return d.properties.name + " <br/> Birth rate:<br/>"  + d.count
          }

            )
          .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px")
            .style("background", "black")
          .style("font-family","Sans-serif")
          .style("color", "white")
          .style("padding","10px");
          tooltit.transition()    
                .duration(2000)    
                .style("opacity", .8);
          tooltit.style("visibility", "visible")
          .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px")
      })
      

pootiSpencer=[];
i=0;

    areas.datum(function(d) {

          d.count = BirthRate[d.properties.name];
          pootiSpencer[i] =+BirthRate[d.properties.name];
           i++;

          return d;
      });

    var maxx=d3.max(pootiSpencer);
    var minn=d3.min(pootiSpencer);

    var c = d3.scaleLinear().domain(d3.extent(pootiSpencer)).range([0,1]);

   var threshold = d3.scaleThreshold()
    .domain(pootiSpencer)
    .range(["#6e7c5a", "#a0b28f", "#d8b8b3", "#b45554", "#760000"]);
var text="Birth Rate Numbers: ";

    // console.log(x);
var formatNumber = d3.format(".0f");

var heatmappo = d3.scaleThreshold()
      .domain(d3.range(minn, maxx, maxx / (colours.length )))
      .range(colours);

var x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, 10]);

var xAxis = d3.axisBottom(x)
    .tickValues(heatmappo.domain())

    .tickFormat(function(d) { return formatNumber( d); });

var g = canvas.append("g").attr("transform", "translate(100,550)").call(xAxis);

g.selectAll("rect")
  .data(heatmappo.range().map(function(color) {
    var d = heatmappo.invertExtent(color);
    if (d[0] == null) d[0] = x.domain()[0];
    if (d[1] == null) d[1] = x.domain()[1];
    return d;
  }))
  .enter().insert("rect", ".tick")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { 


      // console.log(d[0]);
      return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return heatmappo(d[0]); });


    
       var datat;

    areas.attr("fill", function(d) { 

      // return color(d.count); 
      if(d.count>=0)
                {
      return heatmapColour(c(d.count));
    }

    })





    function update(selectedGroup) {

        var i=0;
        // var CountryClick = [];
        var CountryDat=[];


        var pootiSpencer = [];
              // dot.forEach(function(d) {
              //   pootiSpencer[d.Country] = d.count; 
              // })
          areas.datum(function(d) {
          if(selectedGroup=="BirthRate")
          {
          d.count = BirthRate[d.properties.name];
          // console.log(d.count);
           pootiSpencer[i] =+BirthRate[d.properties.name];
           i++;
           CountryDat[d.properties.name] = +BirthRate[d.properties.name];

            // CountryClick[d.properties.name]=+0;
          return d;
        }
        if(selectedGroup=="Population")
          {
          d.count = Population[d.properties.name];
          pootiSpencer[i] =+Population[d.properties.name];
           i++;
           CountryDat[d.properties.name] = +Population[d.properties.name];
           text="Population numbers (divided by 10 million): ";
            // CountryClick[d.properties.name]=+0;
          // pootiSpencer[d.Country] =Population[d.properties.name];
          return d;
        }
        if(selectedGroup=="Area")
          {
          d.count = Area[d.properties.name];
          pootiSpencer[i] =+Area[d.properties.name];
           i++;
           CountryDat[d.properties.name] = +Area[d.properties.name];
           text="Areas (square mile): ";
            // CountryClick[d.properties.name]=+0;
          // pootiSpencer[d.Country] =Area[d.properties.name];
          return d;
        }
        if(selectedGroup=="PopDen")
          {
          d.count = PopDen[d.properties.name];
          pootiSpencer[i] =+PopDen[d.properties.name];
           i++;
           CountryDat[d.properties.name] = +PopDen[d.properties.name];
           text="Population Density per square mile (divided by 10)";
            // CountryClick[d.properties.name]=+0;
          // pootiSpencer[d.Country] =PopDen[d.properties.name];
          return d;
        }
        if(selectedGroup=="Phones")
          {
          d.count = Phones[d.properties.name];
          pootiSpencer[i] =+Phones[d.properties.name];
           i++;
           CountryDat[d.properties.name] = +Phones[d.properties.name];
           text="Phones (per 1000): ";
            // CountryClick[d.properties.name]=+0;
          // pootiSpencer[d.Country] =Phones[d.properties.name];
          return d;
        }
        if(selectedGroup=="Crops")
          {
          d.count = Crops[d.properties.name];
          pootiSpencer[i] =+Crops[d.properties.name];
           i++;
           CountryDat[d.properties.name] = +Crops[d.properties.name];
           text="Crops (Percentage): ";
            // CountryClick[d.properties.name]=+0;
          // pootiSpencer[d.Country] =Crops[d.properties.name];
          return d;
        }
        if(selectedGroup=="DeathRate")
          {
          d.count = DeathRate[d.properties.name];
          pootiSpencer[i] =+DeathRate[d.properties.name];
           i++;
           CountryDat[d.properties.name] = +DeathRate[d.properties.name];
           text="Death rates: ";
            // CountryClick[d.properties.name]=+0;
          // pootiSpencer[d.Country] = DeathRate[d.properties.name];
          return d;
        }

          
      })

            poot(CountryClick, CountryDat, dot, pootiSpencer,text);
              areas.on("mouseover", function(d) {
        tooltip.transition()    
                .duration(2000)    
                .style("opacity", .8);
         tooltip.style("visibility", "visible")
          .html(function(){
           return d.properties.name + " <br/> "+meaning(selectedGroup)+"<br/>"  + d.count
          }

            )
          .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px")
            .style("background", "black")
          .style("font-family","Sans-serif")
          .style("color", "white")
          .style("padding","10px");
          tooltit.transition()    
                .duration(2000)    
                .style("opacity", .8);
          tooltit.style("visibility", "visible")
          .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px")
      })


              // .attr("fill", function(d) { return color2(d.count); })
              maxx=d3.max(pootiSpencer);
              minn=d3.min(pootiSpencer);
              console.log(maxx);
              // dot.forEach(function(d){console.log(d.count);})
              colours = ["#6363FF", "#6373FF", "#63A3FF", "#63E3FF", "#63FFFB", "#63FFCB",
               "#63FF9B", "#63FF6B", "#7BFF63", "#BBFF63", "#DBFF63", "#FBFF63", 
               "#FFD363", "#FFB363", "#FF8363", "#FF7363", "#FF6364"];

              heatmapColour = d3.scaleLinear()
              .domain(d3.range(0, 1, 1.0 / (colours.length - 1)))
              .range(colours);


              c = d3.scaleLinear().domain(d3.extent(pootiSpencer)).range([0,1]);

              x = d3.scaleLinear() 
              .domain(c.domain())
              .range([minn,maxx]);
              // .domain([0, 10, 20])
              // .range(["#D7301F", "#EF6548", "#FBB676"])


// This where the legend will be updated:
  console.log(minn)
  console.log(maxx)
  
  var thing = d3.scaleOrdinal().domain(minn, maxx).range([0,50]);
console.log(maxx / 100000000*(colours.length ))
var t=10;


if(selectedGroup=="Population")
{
    t=3.85
    minn=minn/10;
    maxx=maxx/10;
    text="Population numbers (divided by 10 million): ";
}
if(selectedGroup=="Area")
{
    t=2.96
    minn=minn/100000;
    maxx=maxx/100000;
    text="Areas (square mile): ";
}
if(selectedGroup=="PopDen")
{
    t=4.95
    minn=minn/10;
    maxx=maxx/10;
    text="Population Density per square mile (divided by 10)";
}
if(selectedGroup=="Phones")
{
    t=5.64
    minn=minn/10;
    maxx=maxx/10;
    text="Phones (per 1000): ";
}
if(selectedGroup=="Crops")
{
    t=28.75
    text="Crops (Percentage): ";
    // minn=minn/10000000;
    // maxx=maxx/10000000;
}
if(selectedGroup=="DeathRate")
{
    t=17
    text="Death rates: ";
    // minn=minn/10000000;
    // maxx=maxx/10000000;
}





            heatmappo = d3.scaleThreshold()
       .domain(d3.range(minn, maxx, maxx / (colours.length )))
      // .domain(d3.range(minn, maxx, maxx / (colours.length )))
      .range(colours);

      x = d3.scaleLinear()
    .domain([0, 1])
    .range([0, t]);

      xAxis = d3.axisBottom(x)
     // .tickSize(17)
     .tickValues(heatmappo.domain())
     .tickFormat(function(d) { return formatNumber(d); });

    g.call(xAxis);

g.selectAll("rect")
  .data(heatmappo.range().map(function(color) {
    var d = heatmappo.invertExtent(color);
    if (d[0] == null) d[0] = x.domain()[0];
    if (d[1] == null) d[1] = x.domain()[1];
    return d;
  }))
 .insert("rect", ".tick")
    .attr("height", 8)
    .attr("x", function(d) { return x(d[0]); })
    .attr("width", function(d) { 
      console.log(x(d[1])+"  "+x(d[0]))
      return x(d[1]) - x(d[0]); })
    .attr("fill", function(d) { return heatmappo(d[0]); });


              areas.transition()    
                .duration(2000) .attr("fill", function(d) { 
                if(d.count>=0)
                {

                return heatmapColour(c(d.count)); }
                // return "black"

              })
                
      areas.on("click", function(d){

                  if(CountryClick[d.properties.name]==0)
                  {
                    d3.select('#map').selectAll('path').classed("selected", false)
                  d3.select('#map').selectAll('path').style("opacity", "0.2")
                  s=d.properties.neighbourhood;
                  d3.select(this).style("opacity", "0.1")
                  // d3.select(this).classed('tootsieroll', true);
                  //drawLineChart(d.properties.neighbourhood)
                  s=d3.select(this).properties;
                  console.log("Swag="+d.properties.name);
                  d3.select(this).selectAll('path').classed("selected", true)
                  CountryClick[d.properties.name]=1
                  poot(CountryClick, CountryDat, dot, pootiSpencer, text)
                  return;
                }else
                {
                  // d3.selectAll('path').classed("selected", true)
                  // d3.selectAll("path").style("opacity", "1")
                   d3.select(this).style("opacity", "1")
                   // d3.select(this).classed('tootsieroll', false);
                  CountryClick[d.properties.name]=0
                  poot(CountryClick, CountryDat, dot, pootiSpencer, text)
                  // f=0;
                }});
    
      g.select("text")
         .attr("fill", "#000")
         .attr("font-weight", "bold")
         .attr("text-anchor", "start")
         .attr("y", -6)
         .attr("transform", "translate(0,-5)")
         .text(text);

    }

    d3.select("#batata").on("click", function(d) {
        // recover the option that has been chosen
        d3.selectAll("path").style("opacity", "1");
        i=0;
        dot.forEach(function(d){
          CountryClick[d.Country]=0;

        }

        )
        poot(CountryClick, CountryDat, dot, pootiSpencer, text);
    })


    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)
    })

     // g.append("text")
     //     .attr("fill", "#000")
     //     .attr("font-weight", "bold")
     //     .attr("text-anchor", "start")
     //     .attr("y", -6)
     //     .text(text);
     g.select("text")
         .attr("fill", "#000")
         .attr("font-weight", "bold")
         .attr("text-anchor", "start")
         .attr("transform", "translate(0,-5)")
         .attr("y", -6)
         .text(text);
// var Options = ["BirthRate", "Population","Area", "PopDen","PopDen", "Crops","DeathRate",];

areas.on("click", function(d){

                  if(CountryClick[d.properties.name]==0)
                  {
                    // d3.select('#map').selectAll('path').classed("selected", false)
                  // d3.select('#map').selectAll('path').style("opacity", "0.2")
                  s=d.properties.neighbourhood;
                  // d3.selectAll("path").attr("fill","brown");
                  d3.select(this).style("opacity", "0.1")
                  // d3.select(this).classed('tootsieroll', true);
                  d3.select('#chart').select('path').remove();
                  d3.select('#chart').selectAll("text").remove();
                  //drawLineChart(d.properties.neighbourhood)
                  // s=d3.select(this).properties;
                  console.log("Swag="+d.properties.name);
                  d3.select(this).selectAll('path').classed("selected", true)
                  CountryClick[d.properties.name]=1
                  poot(CountryClick, CountryDat, dot, pootiSpencer, text)
                  return;
                }else
                {
                  // d3.selectAll('path').classed("selected", true)
                  // d3.selectAll("path").style("opacity", "1")
                   d3.select(this).style("opacity", "1")
                   // d3.select(this).classed('tootsieroll', false);
                  CountryClick[d.properties.name]=0
                  poot(CountryClick, CountryDat, dot, pootiSpencer, text)
                  // f=0;
                }});

    }



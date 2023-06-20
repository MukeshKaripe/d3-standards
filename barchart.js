const margin = { top: 70, right: 40, bottom: 60, left: 175 };
const width = 660 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// create svg

d3.select('.bar-chart')
.append('svg')
.attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
//   .attr("transform", `translate(${margin.left},${margin.top})`);
.attr("transform", "translate(" +margin.left +"," +margin.top+ ")");

// load and process the data JSON DATA

d3.csv('folder/bog_bodies.csv').then(data => {
    data.forEach(d=>{
        d.total = +d.total;
    });

// console.log(data);

const x=d3.scaleLinear()
.range([0,width])
.domain([0,d3.max(data,function(d){
    return d.total;
})]);

const y=d3.scaleBand()
// for horizontal bar-chart
.range([height,0])
.padding(0.1)
.domain([data.map(function(d){
return d.bog_body_type;
})]);

const xaxis=d3.axisBottom(x);
const yaxis = d3.axisLeft(y);


});
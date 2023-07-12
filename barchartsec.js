const data=[
    {id:'d1' , values:10,region:'usa'},
    {id:'d2' , values:11,region:'canada'},
    {id:'d3' , values:12,region:'india'},
    {id:'d4' , values:6,region:'germany'},

];

const margin = {"top":70,right:30,"bottom":40,left:80};
const width = 700-margin.left - margin.right;
const height = 500-margin.top-margin.bottom;

// scale 
// name type we use map
// number type we use max 
const xscale = d3.scaleBand()
.padding(0.1)
.domain(data.map(function(d){
    return d.region
}) )

.range([0,width]);


const yscale = d3.scaleLinear()
.domain([0,d3.max(data,function(d){
    return d.values;
})])
.range([height,0]);

// create svg element and append it to the chart
const svg=d3.select('#chart')
.append('svg')
.attr('width',width+margin.left+margin.right)
.attr('height',height+margin.top+margin.bottom)
.append('g')
.attr('transform',`translate(${margin.left},${margin.top})`);
// create data

svg.selectAll('.bar')
.data(data)

.enter()
.append('rect')
.attr('class','bar')
.attr('width',xscale.bandwidth())
.attr('height', function (d){
    return height  - yscale(d.values)
} )
.attr('x', function(d){
    return xscale(d.region)
} )
.attr('y', function(d){
    return yscale(d.values);
})
.attr('fill','steelblue')

;

const line = d3.line()
.x(function(d){
    return xscale(d.region)
})
.y(function(d){
    return yscale(d.values)
});

svg.append('path')
.datum(data)
.attr('fill','none')
.attr('stroke','#222')
.attr('stroke-width',2)
.attr('d',line)
.attr('stroke','red');

// axis
const xaxis = svg.append('g')
.attr('transform',`translate( 0, ${height} )`)
.call(d3.axisBottom(xscale));


const yaxis = svg.append('g')
.call(d3.axisLeft(yscale));


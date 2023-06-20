// let tablebody = document.querySelector('tbody');


// let url ='http://localhost:5050/mobiles';
// let mobiles=[];

// function getmobiles(){

//  fetch(url)
// .then(response=>
// // console.log(response)
    
// response.json()
// )
//     .then(data=>{
//         mobiles= data;
//         updatetable();
//     })
// }
// getmobiles();
// function updateTable(){

              
// }

const margin ={top:70,right:30,bottom:40,left:80};
const width=1200-margin.left - margin.right;
const height=500-margin.top-margin.bottom;

// scale 
const x = d3.scaleTime()
.range([0,width]);
const y= d3.scaleLinear()
.range([height,0]);

// create svg element and append it to the chart
const svg=d3.select('#chart')
.append('svg')
.attr('width',width+margin.left+margin.right)
.attr('height',height+margin.top+margin.bottom)
.append('g')
.attr('transform',`translate(${margin.left},${margin.top})`);
// create data

// const data = [
//     { date: new Date("2022-01-01"), value: 200 },
//     { date: new Date("2022-02-01"), value: 250 },
//     { date: new Date("2022-03-01"), value: 180 },
//     { date: new Date("2022-04-01"), value: 300 },
//     { date: new Date("2022-05-01"), value: 280 },
//     { date: new Date("2022-06-01"), value: 220 },
//     { date: new Date("2022-07-01"), value: 300 },
//     { date: new Date("2022-08-01"), value: 450 },
//     { date: new Date("2022-09-01"), value: 280 },
//     { date: new Date("2022-10-01"), value: 600 },
//     { date: new Date("2022-11-01"), value: 780 },
//     { date: new Date("2022-12-01"), value: 320 }
//   ];
//   console.log(data);
const datasource = d3.csv('folder/jdi_data_daily.csv').then(function(data){

  // parse the date and covert the population to a number
const parseDate=d3.timeParse('%Y-%m-%d');
data.forEach(d=>{
  // foreach go to each data 
  d.date = parseDate(d.date);
  d.population=+d.population;
// symbol(+) is chnage data to number formate
});
  console.log(data);



//   define x and y domains lines forms at bottom (x) and left(y)

x.domain(d3.extent(data,d =>d.date));
y.domain([65000,d3.max(data,d=>d.population)]);

// Add x-axis
svg.append('g')
.attr('transform',`translate(0,${height})`)
.style('font-size','14px')
.call(d3.axisBottom(x)
.tickValues(x.ticks(d3.timeMonth.every(6)))

.tickFormat(d3.timeFormat('%b %y')))
.call(g => g.select('.domain').remove())
.selectAll('.tick line')
.style('stroke-opacity',0)
svg.selectAll('.tick text')
.attr('fill','#777');



// add y-axis
svg.append('g')
.style('font-size','14px')
.call(d3.axisLeft(y)
.ticks((d3.max(data,d=>d.population) - 65000)/5000)
 .tickFormat(d=>{
  return `${(d/1000).toFixed(0)}k`;
 }) 
 .tickSize(0)
 .tickPadding(10)
 )
 .call(g => g.select('.domain').remove())
.selectAll('.tick text')
.style('fill','#777')
.style('visibility',(d,i,nodes)=>{
  if(i == 0){
    return 'hidden';

  }
  else{
    return 'visible';

  }
});
// add vertical gridlines
svg.selectAll('xGrid')
.data(x.ticks().slice(1))
.join('line')
.attr('x1',d => x(d))
.attr('x2',d => x(d))
.attr('y1',0)
.attr('y2',height)
.attr('stroke','#e0e0e0')
.attr('stroke-width',0.5);

const line = d3.line()
.x(d => x(d.date))
.y(d => y(d.population));

// add horizontal gridlines
svg.selectAll('yGrid')
.data(y.ticks((d3.max(data, d => d.population) - 65000) / 5000).slice(1))
.join('line')
.attr('x1',0)
.attr('x2',width)
.attr('y1',d=> y(d))
.attr('y2',d=> y(d))
.attr('stroke','#e0e0e0')
.attr('stroke-width',0.5)


// add chart Title 
svg.append('text')
.attr('class', 'chart-title')
.attr('x',margin.left - 115)
.attr('y',margin.top -100)
.style('font-size','24px')
.style('font-family','sans-serif')
.text('prison population in us');
// title 

svg.append('text')
.attr('class','sidetext')
.attr('y',0 - margin.left)
.attr('x', 0 -(height / 2))
.attr('dy','1em')

.text('Total Population');

// add line path to svg element
const path= svg.append('path')
.datum(data)
// .data(data)
.attr('fill','none')
.attr('stroke','steelblue')
.attr('stroke-width',2)
.attr('d',line);

// add a cricle element

const circle = svg.append('circle')
.attr('r',0)
.attr('class','circle-inner');
// create tooltip div

const tooltip = d3.select("body")
.append('div')
.attr('class','tooltip');



// create svg element and append it to chart\

const listeningRect = svg.append('rect')
.attr('width',width)
.attr('height',height);

// creating mouse function
listeningRect.on('mousemove', function(event){
  const [xCoord] = d3.pointer(event,this);
  const bisectDate = d3.bisector(d => d.date).left;
  // bisector takes clossest data.
  const x0 = x.invert(xCoord);
  const i = bisectDate(data,x0,1);
  const d0 = data[i-1];
  const d1 = data[i];
  const d = x0 - d0.date > d1.date - x0 ? d1 : d0;
  const xPos=x(d.date);
  const yPos=y(d.population);


// update the circle position

circle.attr('cx',xPos)
.attr('cy',yPos);

// console.log(yPos);

// add transition for circle radius

circle.transition()
.duration(50)
.attr('r',5);

// add in our tooltip
tooltip
.style('dispay','block')
.style('left',`${xPos + 100}px`)
.style('top',`${yPos + 50}px`)
.html(`<strong>Date:</strong> ${d.date.toLocaleDateString()}<br><strong>Population:</strong> ${d.population !== undefined ? (d.population / 1000).toFixed(0) + 'k' : 'N/A'} `);



});
// listening rectangle mouse leave function

listeningRect.on("mouseleave", function () {
  circle.transition()
    .duration(50)
    .attr("r", 0);

  tooltip.style("display", "none");
});




});

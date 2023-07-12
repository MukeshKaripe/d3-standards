const details = [
    {grade:'A+',number:6 },
    {grade:'A',number:10 },
    {grade:'B',number:12 },

    {grade:'C',number:8 },

    {grade:'D',number:4 },
    {grade:'F',number:2 },
 

]




const margin = {"top":70,right:30,"bottom":40,left:80};
const width = 800-margin.left - margin.right;
const height = 600-margin.top-margin.bottom;


const svg = d3.select('#chart')
.append('svg')
.attr('width',width)
.attr('height',height)
// .attr('background','red')
.style('background','lightblue')

const colors = d3.scaleOrdinal(d3.schemeDark2);
// const colors =d3.scaleOrdinal(d3.schemePastel1) 
// light colors

const data = d3.pie()
.sort(null)
.value(function(d){
    return d.number;
})(details)
;
console.log(data);

const segments = d3.arc()
.innerRadius(0)
.outerRadius(200)
.padAngle(0.05)
.padRadius(50);

const sections = svg.append('g')
.attr('transform','translate(250,250)')
.selectAll('path')
.data(data);

sections
.enter()
.append('path')
.attr('d',segments)
.attr('fill',function(d){
    return colors(d.data.number);
});

const content=d3.select('g')
.selectAll('text')
.data(data);
content
.enter()
.append('text')
.classed('inside',true)
.each(function(d){
    // return d = data.number;
    const center = segments.centroid(d);
    d3.select(this)
    // text element is selected
    .attr('x', center[0])
    .attr('y', center[1])
    .text(d.data.number);

})   //loop through all element


// to get main g element

const legend = svg.append('g')
 .attr('transform','translate(500,100)')
 .selectAll('.legend')
 .data(data);

legend
.enter()
.append('g')
.classed('legend',true);
// to get child g by using legend call

const childlegend = legend
.enter()
.append('g')
.classed('legend',true)
.attr('transform',function(d,i){
    return `translate(0,${(i+1)*30})`;

});
// above function adds 10px gap using transform property

childlegend
.append('rect')
.attr('width',20)
.attr('height',20)
.attr('fill',
function(d){
    return colors(d.data.number);
});

childlegend.append('text').classed('label',true).text(
    function(d){
        return d.data.grade;
    }
)
.attr('fill',
function(d){
    return colors(d.data.number);
})
.attr('x',30)
.attr('y',20)
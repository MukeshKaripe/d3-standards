const margin = { top: 70, right: 40, bottom: 60, left: 175 };
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// create svg

const svg = d3.select('.bar-chart')
    .append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    //   .attr("transform", `translate(${margin.left},${margin.top})`);
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// load and process the data JSON DATA

d3.csv('bog_bodies.csv').then(data => {
    data.forEach(d => {
        d.total = +d.total;
    });

    // console.log(data);

    // sort data
    data.sort(function (a, b) {
        return d3.ascending(a.total, b.total)
    });
    // const x =d3.scaleLinear()
    //     // .padding(0.1) error
  
    //     .domain([0, d3.max(data, function (d) {
    //         return d.total;
    //     })])
    //     .range([ 0, width]);
   
    // practise
      const x = d3.scaleBand()
      .padding(0.1)
   
      .domain(data.map(function (d) {
        return d.bog_body_type;
}))
.range([ 0, width]);
    

// d=>d.bog_body_type
    // const y = d3.scaleBand()
    // .padding(0.1)
    //     // for horizontal bar-chart
    //     .range([height, 0])
       
    //     // padding in scaleBand
       
    //     .domain(data.map(function (d) {
    //         return d.bog_body_type;
    // }));


    // practise
    const y = d3.scaleLinear()
    .range([height,0])
          .domain([0, d3.max(data, function (d) {
            return d.total;
        })]);

        
// d => d.total instead of function
    const xaxis = d3.axisBottom(x) ;
    const yaxis = d3.axisLeft(y);

    // create bars 

    // svg.selectAll('.bar')
    //     .data(data) //adding of data
    //     .enter() //entring data to visualization
    //     .append('rect') //manupulating
    //     .attr('class', 'bar')
    //     .attr('y', function (d) {
    //         return y(d.bog_body_type);
    //     })
   
    //     .attr('height', y.bandwidth())
    //     .attr('x', 0)
    //     .attr('width', function (d) {
    //         return x(d.total);
    //     })
    //     .style('fill', 'skyblue');

    const bars = svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    
    .attr("y",0)
    .attr("height",  function (d) {
        return height - y(d.total);
    })
    .attr("x",function (d) {
        return x(d.bog_body_type);
    } )
    .attr("width",  x.bandwidth()
   )
//    .attr('transform',`translate(0,${height - y(d.total)  })`)
  
    .style("fill", "steelblue");


    // add x and y axis to the chart

    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xaxis);


    svg.append('g')
        .call(yaxis);


      
});
// d is for data , i is for index

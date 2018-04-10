const margin = {top: 40, right: 40, bottom: 30, left: 40};
var height, width, x, y;
let states_1, tipBox_1;
var tooltip_1, tooltipLine_1;

countries = [
	{"id": "Argentina", "text": "Argentina", "color": "red"},
	{"id": "Australia", "text": "Australia", "color": "red"},
	{"id": "Austria", "text": "Austria", "color": "red"},
	{"id": "Bahrain", "text": "Bahrain", "color": "red"},
	{"id": "Belgium", "text": "Belgium", "color": "red"},
	{"id": "Brazil", "text": "Brazil", "color": "red"},
	{"id": "Canada", "text": "Canada", "color": "red"},
	{"id": "China", "text": "China", "color": "red"},
	{"id": "Croatia", "text": "Croatia", "color": "red"},
	{"id": "Czech Republic", "text": "Czech Republic", "color": "red"},
	{"id": "Denmark", "text": "Denmark", "color": "red"},
	{"id": "Dominican Rep.", "text": "Dominican Rep.", "color": "red"},
	{"id": "Egypt", "text": "Egypt", "color": "red"},
	{"id": "Finland", "text": "Finland", "color": "red"},
	{"id": "France", "text": "France", "color": "red"},
	{"id": "Germany", "text": "Germany", "color": "red"},
	{"id": "Greece", "text": "Greece", "color": "red"},
	{"id": "Hong Kong, China", "text": "Hong Kong, China", "color": "red"},
	{"id": "Hungary", "text": "Hungary", "color": "red"},
	{"id": "India", "text": "India", "color": "red"},
	{"id": "Indonesia", "text": "Indonesia", "color": "red"},
	{"id": "Ireland", "text": "Ireland", "color": "red"},
	{"id": "Italy", "text": "Italy", "color": "red"},
	{"id": "Japan", "text": "Japan", "color": "red"},
	{"id": "Jordan", "text": "Jordan", "color": "red"},
	{"id": "Korea (Rep.)", "text": "Korea (Rep.)", "color": "red"},
	{"id": "Macao, China", "text": "Macao, China", "color": "red"},
	{"id": "Malaysia", "text": "Malaysia", "color": "red"},
	{"id": "Mexico", "text": "Mexico", "color": "red"},
	{"id": "Morocco", "text": "Morocco", "color": "red"},
	{"id": "Netherlands", "text": "Netherlands", "color": "red"},
	{"id": "Norway", "text": "Norway", "color": "red"},
	{"id": "Poland", "text": "Poland", "color": "red"},
	{"id": "Portugal", "text": "Portugal", "color": "red"},
	{"id": "Romania", "text": "Romania", "color": "red"},
	{"id": "Russian Federation", "text": "Russian Federation", "color": "red"},
	{"id": "Saudi Arabia", "text": "Saudi Arabia", "color": "red"},
	{"id": "Singapore", "text": "Singapore", "color": "red"},
	{"id": "South Africa", "text": "South Africa", "color": "red"},
	{"id": "Spain", "text": "Spain", "color": "red"},
	{"id": "Sweden", "text": "Sweden", "color": "red"},
	{"id": "Switzerland", "text": "Switzerland", "color": "red"},
	{"id": "Thailand", "text": "Thailand", "color": "red"},
	{"id": "Tunisia", "text": "Tunisia", "color": "red"},
	{"id": "Turkey", "text": "Turkey", "color": "red"},
	{"id": "United Arab Emirates", "text": "United Arab Emirates", "color": "red"},
	{"id": "United Kingdom", "text": "United Kingdom", "color": "red"},
	{"id": "United States", "text": "United States", "color": "red"},
	{"id": "Viet Nam", "text": "Viet Nam", "color": "red"},
	{"id": "Zimbabwe", "text": "Zimbabwe", "color": "red"}
]

function removeTooltip_1() {
  if (tooltip_1) tooltip_1.style('display', 'none');
  if (tooltipLine_1) tooltipLine_1.attr('stroke', 'none');
}

function drawTooltip_1() {
  const year = Math.floor((x.invert(d3.mouse(tipBox_1.node())[0]) + 5) / 10) * 10;
  
  states_1.sort((a, b) => {
    return b.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
  })  
  
  tooltipLine_1.attr('stroke', 'black')
    .attr('x1', x(year))
    .attr('x2', x(year))
    .attr('y1', 0)
    .attr('y2', height);
  
  tooltip_1.html(year)
    .style('display', 'block')
    .style('left', d3.event.pageX + 20)
    .style('top', d3.event.pageY - 20)
    .selectAll()
    .data(states_1).enter()
    .append('div')
    .style('color', d => d.color)
    .html(d => d.name + ': ' + d.history.find(h => h.year == year).population);
}

function initRange() {
	// Define margins, dimensions, and some line colors
	width = $("#chart_1").width() - margin.left - margin.right;
	height = $("#chart_1").height() - margin.top - margin.bottom;

	// Define the scales and tell D3 how to draw the line
	x = d3.scaleLinear().domain([1910, 2010]).range([0, width]);     
	y = d3.scaleLinear().domain([0, 40000000]).range([height, 0]);
}

function drawGraph_1() {
	d3.select('#chart_1').selectAll("*").remove();
	const chart = d3.select('#chart_1').append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	tooltipLine_1 = chart.append('line');
	
	// Add the axes and a title
	const xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
	const yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));
	chart.append('g').call(yAxis); 
	chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
	chart.append('text').html('State Population Over Time').attr('x', $("#chart_1").width()/3);
	  
	const line = d3.line().x(d => x(d.year)).y(d => y(d.population));
	
	// Load the data and draw a chart
	d3.json('state-populations.json', d => {
	  states_1 = d;

	  chart.selectAll()
		.data(states_1.filter(function(d){ return d.show; }))
		.enter().append('path')
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', 2)
		.datum(d => d.history)
		.attr('d', line);
	  
	  // chart.selectAll()
		// .data(states_1.filter(function(d){ return d.show; }))
		// .enter().append('text')
		// .html(d => d.name)
		// .attr('fill', d => d.color)
		// .attr('alignment-baseline', 'middle')
		// .attr('x', width)
		// .attr('dx', '.5em')
		// .attr('y', d => y(d.currentPopulation)); 
	  
	  tipBox_1 = chart.append('rect')
		.attr('width', width)
		.attr('height', height)
		.attr('opacity', 0)
		.on('mousemove', drawTooltip_1)
		.on('mouseout', removeTooltip_1);
	})
}

$(document).ready(function() {
	$('#country-filter').select2({
		data: countries,
		multiple: true,
		maximumSelectionLength: 5,
		debug: true,
		dropdownAutoWidth: true,
		placeholder: "Select up to 5 country to display",
		allowClear: true,
	});
	
	initRange();
	tooltip_1 = d3.select('#tooltip_1');
	
	drawGraph_1();
});

function countryFilterChangeHandler() {
	names = $('#country-filter').val();
	names = names === null ? [] : names;
	data = countries.filter(function(d) {return names.includes(d.id);})
	
	color = d3.select("#country-color")
		.selectAll("p")
		.data(data)
		.text(function(d,i) {return (i+1) + ". " + d.id;})
		.style("color", function(d) {return d.color;});

	color.enter().append("p")
		.text(function(d,i) { return (i+1) + ". " + d.id; })
		.style("color", function(d) {return d.color;});
		
	color.exit().remove();
}

$('#country-filter').on('select2:select', function (e) {countryFilterChangeHandler();});
$('#country-filter').on('select2:unselect', function (e) {countryFilterChangeHandler();});

window.onresize = function(event) {
	$('#country-filter').select2({
		data: countries,
		multiple: true,
		maximumSelectionLength: 5,
		debug: true,
		placeholder: "Select up to 5 country to display",
		allowClear: true,
	});
	initRange();
    drawGraph_1();
};
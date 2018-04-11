const margin = {top: 40, right: 40, bottom: 30, left: 40};
const line = d3.line().x(d => x(d.year)).y(d => y(d.population));

var height, width, x, y;
var chart_1;
var states_1, tipBox_1;
var tooltip_1, tooltipLine_1;

countries_filter = [
	{"id": "Argentina", "text": "Argentina", "color": "red", "show": false},
	{"id": "Australia", "text": "Australia", "color": "red", "show": false},
	{"id": "Austria", "text": "Austria", "color": "red", "show": false},
	{"id": "Bahrain", "text": "Bahrain", "color": "red", "show": false},
	{"id": "Belgium", "text": "Belgium", "color": "red", "show": false},
	{"id": "Brazil", "text": "Brazil", "color": "red", "show": false},
	{"id": "Canada", "text": "Canada", "color": "red", "show": false},
	{"id": "China", "text": "China", "color": "red", "show": false},
	{"id": "Croatia", "text": "Croatia", "color": "red", "show": false},
	{"id": "Czech Republic", "text": "Czech Republic", "color": "red", "show": false},
	{"id": "Denmark", "text": "Denmark", "color": "red", "show": false},
	{"id": "Dominican Rep.", "text": "Dominican Rep.", "color": "red", "show": false},
	{"id": "Egypt", "text": "Egypt", "color": "red", "show": false},
	{"id": "Finland", "text": "Finland", "color": "red", "show": false},
	{"id": "France", "text": "France", "color": "red", "show": false},
	{"id": "Germany", "text": "Germany", "color": "red", "show": false},
	{"id": "Greece", "text": "Greece", "color": "red", "show": false},
	{"id": "Hong Kong, China", "text": "Hong Kong, China", "color": "red", "show": false},
	{"id": "Hungary", "text": "Hungary", "color": "red", "show": false},
	{"id": "India", "text": "India", "color": "red", "show": false},
	{"id": "Indonesia", "text": "Indonesia", "color": "red", "show": false},
	{"id": "Ireland", "text": "Ireland", "color": "red", "show": false},
	{"id": "Italy", "text": "Italy", "color": "red", "show": false},
	{"id": "Japan", "text": "Japan", "color": "red", "show": false},
	{"id": "Jordan", "text": "Jordan", "color": "red", "show": false},
	{"id": "Korea (Rep.)", "text": "Korea (Rep.)", "color": "red", "show": false},
	{"id": "Macao, China", "text": "Macao, China", "color": "red", "show": false},
	{"id": "Malaysia", "text": "Malaysia", "color": "red", "show": false},
	{"id": "Mexico", "text": "Mexico", "color": "red", "show": false},
	{"id": "Morocco", "text": "Morocco", "color": "red", "show": false},
	{"id": "Netherlands", "text": "Netherlands", "color": "red", "show": false},
	{"id": "Norway", "text": "Norway", "color": "red", "show": false},
	{"id": "Poland", "text": "Poland", "color": "red", "show": false},
	{"id": "Portugal", "text": "Portugal", "color": "red", "show": false},
	{"id": "Romania", "text": "Romania", "color": "red", "show": false},
	{"id": "Russian Federation", "text": "Russian Federation", "color": "red", "show": false},
	{"id": "Saudi Arabia", "text": "Saudi Arabia", "color": "red", "show": false},
	{"id": "Singapore", "text": "Singapore", "color": "red", "show": false},
	{"id": "South Africa", "text": "South Africa", "color": "red", "show": false},
	{"id": "Spain", "text": "Spain", "color": "red", "show": false},
	{"id": "Sweden", "text": "Sweden", "color": "red", "show": false},
	{"id": "Switzerland", "text": "Switzerland", "color": "red", "show": false},
	{"id": "Thailand", "text": "Thailand", "color": "red", "show": false},
	{"id": "Tunisia", "text": "Tunisia", "color": "red", "show": false},
	{"id": "Turkey", "text": "Turkey", "color": "red", "show": false},
	{"id": "United Arab Emirates", "text": "United Arab Emirates", "color": "red", "show": false},
	{"id": "United Kingdom", "text": "United Kingdom", "color": "red", "show": false},
	{"id": "United States", "text": "United States", "color": "red", "show": false},
	{"id": "Viet Nam", "text": "Viet Nam", "color": "red", "show": false},
	{"id": "Zimbabwe", "text": "Zimbabwe", "color": "red", "show": false}
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
	chart_1 = d3.select('#chart_1').append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	tooltipLine_1 = chart_1.append('line');
	
	// Add the axes and a title
	const xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
	const yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));
	chart_1.append('g').call(yAxis); 
	chart_1.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
	chart_1.append('text').html('State Population Over Time').attr('x', $("#chart_1").width()/3);
	
	drawLines_1();
}

function drawLines_1() {
	// Load the data and draw a chart_1
	d3.json('data/state-populations.json', d => {
	  	states_1 = d;

	  	paths = chart_1.append("g").selectAll("path")
			.data(states_1.filter(function(d){return d.show;}))

		// Update Existing
		paths.attr('fill', 'none')
			.attr('stroke', d => d.color)
			.attr('stroke-width', 2)
			.datum(d => d.history)
			.attr('d', line);

		// Add new
		paths.enter().append("path")
			.attr('fill', 'none')
			.attr('stroke', d => d.color)
			.attr('stroke-width', 2)
			.datum(d => d.history)
			.attr('d', line);
		
		// Remove excess
		paths.exit().remove();

	  	tipBox_1 = chart_1.append('rect')
			.attr('width', width)
			.attr('height', height)
			.attr('opacity', 0)
			.on('mousemove', drawTooltip_1)
			.on('mouseout', removeTooltip_1);
	})
}

$(document).ready(function() {
	$('#country-filter').select2({
		data: countries_filter,
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
	data = countries_filter.filter(function(d) {return names.includes(d.id);})
	
	joined = d3.select("#country-color")
		.selectAll(".legend_div")
		.data(data)
	joined.select("p")
		.text(function(d,i) {return (i+1) + ". " + d.id;})
	joined.select("input")
		.attr("id", function(d,i) {return "legend_color_" + i;})
		.each(function(d,i) {
			$("#legend_color_"+i).spectrum("set", d.color);
			$("#legend_color_"+i).off('change.spectrum')
				.on('change.spectrum', function(e, color) {d.color = color;});
		})

	enter = joined.enter()
		.append("div")
		.attr("class", "legend_div")
	enter.append("p")
		.text(function(d,i) { return (i+1) + ". " + d.id; })
	enter.append("input")
		.attr("type", "text")
		.attr("id", function(d,i) {return "legend_color_" + i;})
		.each(function(d,i) {
			d.show = true
			$("#legend_color_"+i).spectrum({
				color: d.color,
			});
			$("#legend_color_"+i).on('change.spectrum', function(e, color) {d.color = color;});
		})
	
	exit = joined.exit()
	exit.each(function(d,i) {
			$("#legend_color_"+i).spectrum("destroy");
			d.show = false
		})
	exit.remove()
}

$('#country-filter').on('select2:select', function (e) {countryFilterChangeHandler();});
$('#country-filter').on('select2:unselect', function (e) {countryFilterChangeHandler();});

window.onresize = function(event) {
	$('#country-filter').select2({
		data: countries_filter,
		multiple: true,
		maximumSelectionLength: 5,
		debug: true,
		placeholder: "Select up to 5 country to display",
		allowClear: true,
	});
	initRange();
    drawGraph_1();
};
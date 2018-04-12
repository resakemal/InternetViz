const margin = {top: 40, right: 40, bottom: 30, left: 40};
const line = d3.line().x(d => x(d.year)).y(d => y(d.population));

var height, width, x, y;
var chart_1;
var states_1, tipBox_1;
var tooltip_1, tooltipLine_1;

countries_filter = [
	{"id": "Argentina", "text": "Argentina"}, {"id": "Australia", "text": "Australia"}, {"id": "Austria", "text": "Austria"}, {"id": "Bahrain", "text": "Bahrain"}, {"id": "Belgium", "text": "Belgium"}, {"id": "Brazil", "text": "Brazil"}, {"id": "Canada", "text": "Canada"}, {"id": "China", "text": "China"}, {"id": "Croatia", "text": "Croatia"}, {"id": "Czech Republic", "text": "Czech Republic"}, {"id": "Denmark", "text": "Denmark"}, {"id": "Dominican Rep.", "text": "Dominican Rep."}, {"id": "Egypt", "text": "Egypt"}, {"id": "Finland", "text": "Finland"}, {"id": "France", "text": "France"}, {"id": "Germany", "text": "Germany"}, {"id": "Greece", "text": "Greece"}, {"id": "Hong Kong, China", "text": "Hong Kong, China"}, {"id": "Hungary", "text": "Hungary"}, {"id": "India", "text": "India"}, {"id": "Indonesia", "text": "Indonesia"}, {"id": "Ireland", "text": "Ireland"}, {"id": "Italy", "text": "Italy"}, {"id": "Japan", "text": "Japan"}, {"id": "Jordan", "text": "Jordan"}, {"id": "Korea (Rep.)", "text": "Korea (Rep.)"}, {"id": "Macao, China", "text": "Macao, China"}, {"id": "Malaysia", "text": "Malaysia"}, {"id": "Mexico", "text": "Mexico"}, {"id": "Morocco", "text": "Morocco"}, {"id": "Netherlands", "text": "Netherlands"}, {"id": "Norway", "text": "Norway"}, {"id": "Poland", "text": "Poland"}, {"id": "Portugal", "text": "Portugal"}, {"id": "Romania", "text": "Romania"}, {"id": "Russian Federation", "text": "Russian Federation"}, {"id": "Saudi Arabia", "text": "Saudi Arabia"}, {"id": "Singapore", "text": "Singapore"}, {"id": "South Africa", "text": "South Africa"}, {"id": "Spain", "text": "Spain"}, {"id": "Sweden", "text": "Sweden"}, {"id": "Switzerland", "text": "Switzerland"}, {"id": "Thailand", "text": "Thailand"}, {"id": "Tunisia", "text": "Tunisia"}, {"id": "Turkey", "text": "Turkey"}, {"id": "United Arab Emirates", "text": "United Arab Emirates"}, {"id": "United Kingdom", "text": "United Kingdom"}, {"id": "United States", "text": "United States"}, {"id": "Viet Nam", "text": "Viet Nam"}, {"id": "Zimbabwe", "text": "Zimbabwe"}
]

countries = [
	{"id": "Argentina", "color": "red", "show": false},
	{"id": "Australia", "color": "red", "show": false},
	{"id": "Austria", "color": "red", "show": false},
	{"id": "Bahrain", "color": "red", "show": false},
	{"id": "Belgium", "color": "red", "show": false},
	{"id": "Brazil", "color": "red", "show": false},
	{"id": "Canada", "color": "red", "show": false},
	{"id": "China", "color": "red", "show": false},
	{"id": "Croatia", "color": "red", "show": false},
	{"id": "Czech Republic", "color": "red", "show": false},
	{"id": "Denmark", "color": "red", "show": false},
	{"id": "Dominican Rep.", "color": "red", "show": false},
	{"id": "Egypt", "color": "red", "show": false},
	{"id": "Finland", "color": "red", "show": false},
	{"id": "France", "color": "red", "show": false},
	{"id": "Germany", "color": "red", "show": false},
	{"id": "Greece", "color": "red", "show": false},
	{"id": "Hong Kong, China", "color": "red", "show": false},
	{"id": "Hungary", "color": "red", "show": false},
	{"id": "India", "color": "red", "show": false},
	{"id": "Indonesia", "color": "red", "show": false},
	{"id": "Ireland", "color": "red", "show": false},
	{"id": "Italy", "color": "red", "show": false},
	{"id": "Japan", "color": "red", "show": false},
	{"id": "Jordan", "color": "red", "show": false},
	{"id": "Korea (Rep.)", "color": "red", "show": false},
	{"id": "Macao, China", "color": "red", "show": false},
	{"id": "Malaysia", "color": "red", "show": false},
	{"id": "Mexico", "color": "red", "show": false},
	{"id": "Morocco", "color": "red", "show": false},
	{"id": "Netherlands", "color": "red", "show": false},
	{"id": "Norway", "color": "red", "show": false},
	{"id": "Poland", "color": "red", "show": false},
	{"id": "Portugal", "color": "red", "show": false},
	{"id": "Romania", "color": "red", "show": false},
	{"id": "Russian Federation", "color": "red", "show": false},
	{"id": "Saudi Arabia", "color": "red", "show": false},
	{"id": "Singapore", "color": "red", "show": false},
	{"id": "South Africa", "color": "red", "show": false},
	{"id": "Spain", "color": "red", "show": false},
	{"id": "Sweden", "color": "red", "show": false},
	{"id": "Switzerland", "color": "red", "show": false},
	{"id": "Thailand", "color": "red", "show": false},
	{"id": "Tunisia", "color": "red", "show": false},
	{"id": "Turkey", "color": "red", "show": false},
	{"id": "United Arab Emirates", "color": "red", "show": false},
	{"id": "United Kingdom", "color": "red", "show": false},
	{"id": "United States", "color": "red", "show": false},
	{"id": "Viet Nam", "color": "red", "show": false},
	{"id": "Zimbabwe", "color": "red", "show": false}
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
	
	$( "#year-range-filter" ).slider({
		range: true,
		min: 2000,
		max: 2016,
		step: 1,
		values: [ 2000, 2016 ],
		slide: function( event, ui ) {
			$( "#year-range-label" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
		}
    })
	.each(function() {
		var vals = 2016 - 2000;
		for (var i = 0; i <= vals; i+=2) {
			year = i < 10 ? "'0" + i : "'" + i
			var el = $('<label>' + year + '</label>').css('left', (i/vals*100) + '%');
			$("#year-range-filter").append(el);
		}
	})
    $( "#year-range-label" ).val( 
		$("#year-range-filter").slider("values", 0) +" - "+ $("#year-range-filter").slider("values", 1) 
	);
	
	initRange();
	tooltip_1 = d3.select('#tooltip_1');
	
	drawGraph_1();
});

function countryFilterChangeHandler() {
	names = $('#country-filter').val();
	names = names === null ? [] : names;
	data = countries.filter(function(d) {return names.includes(d.id);})
	
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
				showPaletteOnly: true,
				togglePaletteOnly: true,
				togglePaletteMoreText: 'more',
				togglePaletteLessText: 'less',
				palette: [
					["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
					["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
					["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
					["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
					["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
					["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
					["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
					["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
				]
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
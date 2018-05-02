const margin = {top: 40, right: 40, bottom: 30, left: 40};
const line_1 = d3.line().x(d => x(d.year)).y(d => y_1(d.val));
const line_2 = d3.line().x(d => x(d.year)).y(d => y_2(d.val));
const line_3 = d3.line().x(d => x(d.year)).y(d => y_3(d.val));
const line_4 = d3.line().x(d => x(d.year)).y(d => y_4(d.val));
const line_main = d3.line().x(d => x_main(d.year)).y(d => y_main(d.val));

const LINE_STROKE = 1
const colorPalette = [
	["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
	["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
	["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
	["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
	["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
	["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
	["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
	["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
]
				
var height, width, height_main, width_main, x, x_main, y_1, y_2, y_3, y_4, y_main;
var xAxis, xAxis_main, yAxis_1, yAxis_2, yAxis_3, yAxis_4, yAxis_main;
var chart_1, chart_2, chart_3, chart_4, main_chart;
var states, tipBox_1, tipBox_2, tipBox_3, tipBox_4;
var tooltip, tooltipLine_1, tooltipLine_2, tooltipLine_3, tooltipLine_4;
var yearStart = 2000;
var yearEnd = 2016;

var countries_filter = [
	{"text": "Africa", "children" : [
		{"id": "Morocco", "text": "Morocco"}, 
		{"id": "South Africa", "text": "South Africa"}, 
		{"id": "Tunisia", "text": "Tunisia"}, 
		{"id": "Zimbabwe", "text": "Zimbabwe"}
	]},
	{"text": "Europe", "children" : [
		{"id": "Austria", "text": "Austria"}, 
		{"id": "Belgium", "text": "Belgium"}, 
		{"id": "Croatia", "text": "Croatia"}, 
		{"id": "Czech Republic", "text": "Czech Republic"}, 
		{"id": "Denmark", "text": "Denmark"}, 
		{"id": "Finland", "text": "Finland"}, 
		{"id": "France", "text": "France"}, 
		{"id": "Germany", "text": "Germany"}, 
		{"id": "Greece", "text": "Greece"}, 
		{"id": "Hungary", "text": "Hungary"}, 
		{"id": "Ireland", "text": "Ireland"}, 
		{"id": "Italy", "text": "Italy"}, 
		{"id": "Netherlands", "text": "Netherlands"}, 
		{"id": "Norway", "text": "Norway"}, 
		{"id": "Poland", "text": "Poland"}, 
		{"id": "Portugal", "text": "Portugal"}, 
		{"id": "Romania", "text": "Romania"}, 
		{"id": "Russian Federation", "text": "Russian Federation"}, 
		{"id": "Spain", "text": "Spain"}, 
		{"id": "Sweden", "text": "Sweden"}, 
		{"id": "Switzerland", "text": "Switzerland"}, 
		{"id": "Turkey", "text": "Turkey"}, 
		{"id": "United Kingdom", "text": "United Kingdom"}, 
	]},
	{"text": "Asia", "children" : [
		{"id": "Bahrain", "text": "Bahrain"}, 
		{"id": "China", "text": "China"}, 
		{"id": "Egypt", "text": "Egypt"}, 
		{"id": "Hong Kong, China", "text": "Hong Kong, China"}, 
		{"id": "India", "text": "India"}, 
		{"id": "Indonesia", "text": "Indonesia"}, 
		{"id": "Japan", "text": "Japan"}, 
		{"id": "Jordan", "text": "Jordan"}, 
		{"id": "Korea (Rep.)", "text": "Korea (Rep.)"}, 
		{"id": "Macao, China", "text": "Macao, China"}, 
		{"id": "Malaysia", "text": "Malaysia"}, 
		{"id": "Saudi Arabia", "text": "Saudi Arabia"}, 
		{"id": "Singapore", "text": "Singapore"}, 
		{"id": "Thailand", "text": "Thailand"},
		{"id": "United Arab Emirates", "text": "United Arab Emirates"}, 
		{"id": "Viet Nam", "text": "Viet Nam"}, 
	]},
	{"text": "North America", "children" : [
		{"id": "Canada", "text": "Canada"}, 
		{"id": "Dominican Rep.", "text": "Dominican Rep."}, 
		{"id": "United States", "text": "United States"}, 
	]},
	{"text": "South America", "children" : [
		{"id": "Argentina", "text": "Argentina"}, 
		{"id": "Brazil", "text": "Brazil"}, 
		{"id": "Mexico", "text": "Mexico"}, 
	]},
	{"text": "Oceania", "children" : [
		{"id": "Australia", "text": "Australia"}, 
	]}
]

var countries = [
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
	{"id": "Zimbabwe", "color": "red", "show": false},
	{"id": "Average", "color": "red", "show": true}
];


function load_data() {
	$.ajaxSetup({
	    async: false
	});

	$.getJSON("data/telephone.json", function(json) {
	    for (i = 0; i < countries.length; i++) {
	    	per_country = json[countries[i].id];
	    	data_array = [];
	    	for (var y in per_country) {
	    		entry = {};
	    		entry.year = parseInt(y);
	    		entry.val = per_country[y];
	    		if (entry.val != "")
	    			data_array.push(entry);
	    	}
		    countries[i].data_telp = data_array;		   
 		}
	});

	$.getJSON("data/broadband.json", function(json) {
	    for (i = 0; i < countries.length; i++) {
	    	per_country = json[countries[i].id];
	    	data_array = [];
	    	for (var y in per_country) {
	    		entry = {};
	    		entry.year = parseInt(y);
	    		entry.val = per_country[y];
	    		if (entry.val != "")
	    			data_array.push(entry);
	    	}
		    countries[i].data_broad = data_array;
		}
	});

	$.getJSON("data/mobile.json", function(json) {
	    for (i = 0; i < countries.length; i++) {
	    	per_country = json[countries[i].id];
	    	data_array = [];
	    	for (var y in per_country) {
	    		entry = {};
	    		entry.year = parseInt(y);
	    		entry.val = per_country[y];
	    		if (entry.val != "")
	    			data_array.push(entry);
	    	}
		    countries[i].data_mobile = data_array;
		}
	});

	$.getJSON("data/internet_user.json", function(json) {
	    for (i = 0; i < countries.length; i++) {
	    	per_country = json[countries[i].id];
	    	data_array = [];
	    	for (var y in per_country) {
	    		entry = {};
	    		entry.year = parseInt(y);
	    		entry.val = per_country[y];
	    		if (entry.val != "")
	    			data_array.push(entry);
	    	}
		    countries[i].data_internet = data_array;
		}
	});
}


function initRange() {
	// Define margins, dimensions, and some line colors
	width = $("#chart_1").width() - margin.left - margin.right;
	height = $("#chart_1").height() - margin.top - margin.bottom;
	width_main = $("#main_chart").width() - margin.left - margin.right;
	height_main = $("#main_chart").height() - margin.top - margin.bottom;


	// Define the scales and tell D3 how to draw the line
	x = d3.scaleLinear().domain([yearStart, yearEnd]).range([0, width]);
	x_main = d3.scaleLinear().domain([yearStart, yearEnd]).range([0, width_main]);     
	y_1 = d3.scaleLinear().domain([0, 100]).range([height, 0]);
	y_2 = d3.scaleLinear().domain([0, 40]).range([height, 0]);
	y_3 = d3.scaleLinear().domain([0, 200]).range([height, 0]);
	y_4 = d3.scaleLinear().domain([0, 100]).range([height, 0]);
	y_main = d3.scaleLinear().domain([0, 200]).range([height_main, 0]);

	// Define x and y axis for charts
	xAxis = d3.axisBottom(x).tickFormat(d3.format('.4')).ticks(Math.ceil((yearEnd-yearStart)/3));
	xAxis_main = d3.axisBottom(x_main).tickFormat(d3.format('.4')).ticks(Math.ceil((yearEnd-yearStart)/3));
	yAxis_1 = d3.axisLeft(y_1).tickFormat(d3.format('.2s')).ticks(5);
	yAxis_2 = d3.axisLeft(y_2).tickFormat(d3.format('.2s')).ticks(2);
	yAxis_3 = d3.axisLeft(y_3).tickFormat(d3.format('.2s')).ticks(10);
	yAxis_4 = d3.axisLeft(y_4).tickFormat(d3.format('.2s')).ticks(5);
	yAxis_main = d3.axisLeft(y_main).tickFormat(d3.format('.2s')).ticks(20);
}


function removeTooltip() {
  if (tooltip) tooltip.style('display', 'none');

  if (tooltipLine_1) tooltipLine_1.attr('stroke', 'none');
  if (tooltipLine_2) tooltipLine_2.attr('stroke', 'none');
  if (tooltipLine_3) tooltipLine_3.attr('stroke', 'none');
  if (tooltipLine_4) tooltipLine_4.attr('stroke', 'none');
}

function drawTooltip(tipBox, tooltipLine, dataName) {
	const year = Math.round((x.invert(d3.mouse(tipBox.node())[0])));
  
  states.sort((a, b) => {
  	if(b[dataName].find(h => h.year == year) == undefined)
  		b_val = -1;
  	else 
  		b_val = b[dataName].find(h => h.year == year).val;

  	if(a[dataName].find(h => h.year == year) == undefined)
  		a_val = -1;
  	else 
  		a_val = a[dataName].find(h => h.year == year).val;
    
    return b_val - a_val;
  })  
  
  tooltipLine.attr('stroke', 'black')
    .attr('x1', x(year))
    .attr('x2', x(year))
    .attr('y1', 0)
    .attr('y2', height);
  
  tooltip.html(year)
    .style('display', 'block')
    .style('left', d3.event.pageX + 20)
    .style('top', d3.event.pageY - 20)
    .selectAll()
    .data(states).enter()
    .append('div')
    .style('color', d => d.color)
    .html(d =>{
    	if (d[dataName].find(h => h.year == year) == undefined)
    		d_val = "NaN"
    	else
    		d_val = d[dataName].find(h => h.year == year).val
    	return d.id + ': ' + d_val;
    });
}

function drawTooltip_1() {
	drawTooltip(tipBox_1, tooltipLine_1, "data_telp");
}

function drawTooltip_2() {
	drawTooltip(tipBox_2, tooltipLine_2, "data_broad");
}

function drawTooltip_3() {
	drawTooltip(tipBox_3, tooltipLine_3, "data_mobile");
}

function drawTooltip_4() {
	drawTooltip(tipBox_4, tooltipLine_4, "data_internet");
}

function drawGraph() {
	// Chart 1
	d3.select('#chart_1').selectAll("*").remove();
	chart_1 = d3.select('#chart_1').append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	tooltipLine_1 = chart_1.append('line');
	
	// Add the axes and a title
	chart_1.append('g').call(yAxis_1); 
	chart_1.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
	chart_1 = chart_1.append('g');

	// Chart 2
	d3.select('#chart_2').selectAll("*").remove();
	chart_2 = d3.select('#chart_2').append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	tooltipLine_2 = chart_2.append('line');
	
	// Add the axes and a title
	chart_2.append('g').call(yAxis_2); 
	chart_2.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
	chart_2 = chart_2.append('g');

	// Chart 3
	d3.select('#chart_3').selectAll("*").remove();
	chart_3 = d3.select('#chart_3').append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	tooltipLine_3 = chart_3.append('line');
	
	// Add the axes and a title
	chart_3.append('g').call(yAxis_3); 
	chart_3.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
	chart_3 = chart_3.append('g');

	// Chart 4
	d3.select('#chart_4').selectAll("*").remove();
	chart_4 = d3.select('#chart_4').append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	tooltipLine_4 = chart_4.append('line');
	
	// Add the axes and a title
	chart_4.append('g').call(yAxis_4); 
	chart_4.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
	chart_4 = chart_4.append('g');

	// Main Chart
	d3.select('#main_chart').selectAll("*").remove();
	main_chart = d3.select('#main_chart').append('g')
	  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
	
	// Add the axes and a title
	main_chart.append('g').call(yAxis_main); 
	main_chart.append('g').attr('transform', 'translate(0,' + height_main + ')').call(xAxis_main);
	main_chart = main_chart.append('g');

	drawLines();
}

function drawLines() {
	states = countries.filter(function(d){return d.show;});

	// Chart 1
	paths = chart_1.selectAll("path")
		.data(states);

	// Update Existing
	paths.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_telp.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_1);

	// Add new
	paths.enter().append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_telp.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_1);
	
	// Remove excess
	paths.exit().remove();

  	tipBox_1 = chart_1.append('rect')
		.attr('width', width)
		.attr('height', height)
		.attr('opacity', 0)
		.on('mousemove', drawTooltip_1)
		.on('mouseout', removeTooltip);

	// Chart 2
	paths = chart_2.selectAll("path")
		.data(states);

	// Update Existing
	paths.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_broad.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_2);

	// Add new
	paths.enter().append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_broad.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_2);
	
	// Remove excess
	paths.exit().remove();

  	tipBox_2 = chart_2.append('rect')
		.attr('width', width)
		.attr('height', height)
		.attr('opacity', 0)
		.on('mousemove', drawTooltip_2)
		.on('mouseout', removeTooltip);

	// Chart 3
	paths = chart_3.selectAll("path")
		.data(states);

	// Update Existing
	paths.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_mobile.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_3);

	// Add new
	paths.enter().append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_mobile.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_3);
	
	// Remove excess
	paths.exit().remove();

  	tipBox_3 = chart_3.append('rect')
		.attr('width', width)
		.attr('height', height)
		.attr('opacity', 0)
		.on('mousemove', drawTooltip_3)
		.on('mouseout', removeTooltip);

	// Chart 4
	paths = chart_4.selectAll("path")
		.data(states);

	// Update Existing
	paths.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_internet.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_4);

	// Add new
	paths.enter().append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_internet.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_4);
	
	// Remove excess
	paths.exit().remove();

  	tipBox_4 = chart_4.append('rect')
		.attr('width', width)
		.attr('height', height)
		.attr('opacity', 0)
		.on('mousemove', drawTooltip_4)
		.on('mouseout', removeTooltip);

	// Main cCart
	joined = main_chart.selectAll(".line_group")
		.data(states)
		.each(function(d,i) {
			console.log("Joined " + d.id)
		});

	// Update Existing
	joined.selectAll("*").remove();
	joined.append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.attr('stroke-linecap', "round")
		.attr('stroke-dasharray', "2, 2")
		.datum(d => d.data_telp.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_main);
		
	joined.append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.attr('stroke-dasharray', "15, 15")
		.datum(d => d.data_broad.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_main);
		
	joined.append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.attr('stroke-linecap', "round")
		.attr('stroke-dasharray', "20,10,5,5,5,10")
		.datum(d => d.data_mobile.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_main);
		
	joined.append("path")
		.attr('fill', 'none').attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_internet.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_main);

	// Add new
	enter = joined.enter()
		.append("g")
		.attr("class", "line_group")
		.each(function(d,i) {
			console.log("Entered " + d.id)
		})

	enter.append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.attr('stroke-linecap', "round")
		.attr('stroke-dasharray', "2, 3")
		.datum(d => d.data_telp.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_main);

	enter.append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.attr('stroke-dasharray', "15, 15")
		.datum(d => d.data_broad.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_main);

	enter.append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.datum(d => d.data_mobile.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_main);

	enter.append("path")
		.attr('fill', 'none')
		.attr('stroke', d => d.color)
		.attr('stroke-width', LINE_STROKE)
		.attr('stroke-linecap', "round")
		.attr('stroke-dasharray', "20,10,5,5,5,10")
		.datum(d => d.data_internet.filter(function(d){return d.year >= yearStart && d.year <= yearEnd;}))
		.attr('d', line_main);
	
	// Remove excess
	exit = joined.exit()
		.each(function(d,i) {
			console.log("Exited " + d.id)
		});
	exit.selectAll("*").remove();
	exit.remove();
}


function updateColor() {
	drawLines();
}
function updateRange() {
	initRange()
	drawGraph();
}
function updateCountry() {
	drawLines();
}


function countryFilterChangeHandler() {
	names = $('#country-filter').val();
	names = names === null ? [] : names;
	data = countries.filter(function(d) {return names.includes(d.id) || d.id == "Average";})

	joined = d3.select("#country-color")
		.selectAll(".legend_div")
		.data(data, function(d) { return d.id })
	joined.select("p")
		.text(function(d,i) {return (i+1) + ". " + d.id;})
	joined.select("input")
		.attr("id", function(d,i) {return "legend_color_" + i;})
		.each(function(d,i) {
			d.show = true;
			$("#legend_color_"+i).spectrum("set", d.color);
			$("#legend_color_"+i)
				.off('change.spectrum move.spectrum')
				.on('change.spectrum move.spectrum', function(e, color) {
					if (d.color != color) {
						d.color = color;
						updateColor();
					}
				});
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
				palette: colorPalette
			});
			$("#legend_color_"+i).on('change.spectrum move.spectrum', function(e, color) {
				if (d.color != color) {
					d.color = color;
					updateColor();
				}
			});
		})
	
	exit = joined.exit()
	exit.each(function(d,i) {
		$("#legend_color_"+i).spectrum("destroy");
		d.show = false
	})
	exit.remove()
	
	updateCountry();
}

function yearFilterChangeHandler(event, ui) {
	$( "#year-range-label" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
	yearStart = ui.values[0];
	yearEnd = ui.values[1];
	updateRange();
}

function initFilter() {
	$('#country-filter').select2({
		data: countries_filter,
		multiple: true,
		maximumSelectionLength: 5,
		debug: true,
		dropdownAutoWidth: true,
		placeholder: "Select up to 5 country to display",
		allowClear: true,
	});
	
	$('#country-filter').on('select2:select', function (e) {countryFilterChangeHandler();});
	$('#country-filter').on('select2:unselect', function (e) {countryFilterChangeHandler();});

	$( "#year-range-filter" ).slider({
		range: true,
		min: 2000,
		max: 2016,
		step: 1,
		values: [ 2000, 2016 ],
		slide: function( event, ui ) {
			if(ui.values[1] - ui.values[0] < 6){
                return false;
            } else {
                yearFilterChangeHandler(event, ui); 
            }  
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
	
}


$(document).ready(function() {
	load_data();
	initFilter();
	initRange();
	
	tooltip = d3.select('#tooltip');
	drawGraph();
	
	countryFilterChangeHandler();
});

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
	
    drawGraph();
};
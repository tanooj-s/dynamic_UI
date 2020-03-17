import React from 'react';
import * as d3 from 'd3';
import './../App.css';




class D3Graph extends React.Component {
	constructor(props) {
		super(props)
		this.createChart = this.createChart.bind(this)
		this.drag = this.drag.bind(this)
		this.color = this.color.bind(this)

		// this.myConfig = this.myConfig.bind(this)
	}


	componentDidMount() {
		this.createChart()
		this.color()
	}

	createChart() {
		const width = 300;
		const height = 120;



		var trades = []
		// this.props.data.trades.forEach(trade => trades.push({ company: trade.OwnsSymbol, volume: trade.Volume }))
		var colors = d3.scaleOrdinal(d3.schemeCategory10);
		var radius = 15
		var employer = this.props.data.securities[0].WorksFor;
		var broker = this.props.data.securities[0].TradeMemberName;
		var client = this.props.data.securities[0].ClientName

	// 	let nodes = [
	// 		{
	// 			id: client,
	// 			type: 'client'
	// 		},
	// 		{
	// 			id: employer,
	// 			type: 'company'
	// 		},
	// 		{
	// 			id: broker,
	// 			type: 'broker'
	// 		},
	// 	]
	// 	// make sure only unique companies are added
    // for (var i = 0; i < trades.length;i++) {
    //   var is_present = false;
    //   for (var j = 0; j < nodes.length;j++) {
    //     if (nodes[j].id == trades[i].company) {
    //       is_present = true
    //     }
    //   }
    //   if (is_present === false) {
    //       nodes.push({ id: trades[i].company, type: 'company' })
    //   }
    // }
    // console.log(nodes)

	// 	let links = [
	// 		{
	// 			source: client,
	// 			target: employer,
	// 			type: "works_for",
	// 			id: 0
	// 		},
	// 		{
	// 			source: broker,
	// 			target: client,
	// 			type: "brokers_for",
	// 			id: 1
	// 		},
	// 	]
	// 	for (var i = 0; i < trades.length; i++) {
    //   links.push( {
    //     source: client,
    //     target: trades[i].company,
    //     type: "trade",
    //     volume: trades[i].volume/1000, // can use this to modify stroke width
    //     id: i + 2
    //   })
    // }
    // console.log(links)


		let nodes = [
			{ id: 1, type: 'Trading Member', name: 'Zerodha' },
			{ id: 2, type: 'Client', name: 'Viral Sanghavi' },
			{ id: 3, type: 'PAN', name: 'AMCPR8080R' },
			{ id: 4, type: 'Client', name: 'Ravi Saxena' },
			{ id: 5, type: 'Company', name: 'ITC' },
		]

		let links = [
			{ source: 1, target: 2, linkage: "Is_Broker" },
			{ source: 2, target: 3, linkage: "Has_PAN" },
			{ source: 4, target: 3, linkage: "Has_PAN" },
			{ source: 4, target: 5, linkage: "KMP_OF" },
		]

		//const links = this.props.data.links.map(d => Object.create(d));
		//const nodes = this.props.data.nodes.map(d => Object.create(d));
		const graph = d3.select(this.refs.graph)

		const simulation = d3.forceSimulation(nodes)
			.force("link", d3.forceLink(links).id(d => d.id))
			.force("charge", d3.forceManyBody().strength(-100))

			.force("x", d3.forceX())
			.force("y", d3.forceY())
			.force("center", d3.forceCenter(width / 2, height / 2));

		const svg = graph.append("svg")
			.attr("viewBox", [0, 0, width, height])
			// zoom feature
			// .call(d3.zoom().on("zoom", function () {
			// 	svg.attr("transform", d3.event.transform)
			// }))
			;

		const link = svg.append("g")
			.selectAll("line")
			.data(links)
			.join("line")
			.attr("stroke-width", 1)
			.attr("marker-end", "url(#arrowhead)")
			.style("stroke", function (d) {
				if (d.linkage == "Has_PAN") {
					return "red"
				}
				//  else if (d.linkage == "brokers_for") {
				// 	return "#1d2d7e"}
			 else {
					return "#dddddd"
				}

			});

		var linkText = svg.selectAll("line")
			.append("text")
			.data(links)
			.text(function (d) { return d.linkage == "visible" ? "edge" : ""; })
			.attr("x", function (d) { return (d.source.x + (d.target.x - d.source.x) * 0.5); })
			.attr("y", function (d) { return (d.source.y + (d.target.y - d.source.y) * 0.5); })
			.attr("dy", ".25em")
			.attr("text-anchor", "middle");

		// const text1 = svg.append("g")
		// 	.attr("class", "text1")
		// 	.selectAll("text1")
		// 	.data(links)
		// 	.enter().append("text1")
		// 	.text(d => d.linkage)
		// 	.style('font-size', 3)
		// link.append("title")
		// 	.text(d => d.linkage);

		svg.append("svg:defs").selectAll("marker")
			.data(["arrowhead"]) // Different link/path types can be defined here
			.enter().append("svg:marker") // This section adds in the arrows
			.attr("id", String)
			.attr("viewBox", "0 -5 10 10")
			.attr("refX", 18)
			.attr("refY", 0)
			.attr("markerWidth", 5)
			.attr("markerHeight", 7)
			.attr("orient", "auto")
			.append("svg:path")
			.attr("d", "M0,-5L10,0L0,5");


		const node = svg.append("g")
			.attr("stroke", "yellow")
			// .style("fill", function (d) { return '#1f77b4'; })
			.attr("stroke-width", 0.1)
			.selectAll("circle")
			.data(nodes)
			.join("circle")
			.attr("r", function (d) {
				if (d.type == 'Client') {
          return 5
        }
        else {
          return 5
        }
			})
			.style("fill", function(d) {
        if (d.type == 'Client') {
          return '#2db660'
        }
        else if (d.type == 'PAN') {
          return '#1d2d7e'
        }
        else if (d.type == 'Company') {
          return '#1b72b4'
        }
      })
			.call(this.drag(simulation));


		node.append("svg:title")
			.text(function (d) {
				return d.name;
			})
			.style('text-anchor', 'middle')
			.style('cursor', 'pointer')
			.style("fill", "#555555")
			.style("font-family", "Arial")
			.style("font-size", 9)
			.attr("stroke-width", 0)
			.attr('x', 6)
			.attr('y', 3);

		// Text to nodes
		const text = svg.append("g")
			.attr("class", "text")
			.selectAll("text")
			.data(nodes)
			.enter().append("text")
			.text(d => d.type + ": " + d.name)
			.style('font-size', '3px')
			.style("font-family", "Arial")
			.style("fill", "#333333")
			
		// text for links
		const link_text = svg.append("g")
			.attr("class", "text")
			.selectAll("text")
			.data(links)
			.enter().append("text")
			.text(d => d.linkage)
			.style("font-size", '3px')
			.style("font-family", "Arial")
			.style("fill","#555555")

		simulation.on("tick", () => {
			link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y);

			node

				.attr("cx", function (d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
				.attr("cy", function (d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });

			text.attr("x", d => d.x - 9) //position of the lower left point of the text
				.attr("y", d => d.y + 9); //position of the lower left point of the text

			link_text
				.attr("x", function (d) { return (d.source.x + (d.target.x - d.source.x) * 0.5); })
				.attr("y", function (d) { return (d.source.y + (d.target.y - d.source.y) * 0.5); });
			// text1.attr("x", d => d.x - 8) //position of the lower left point of the text
			// 	.attr("y", d => d.y + 10); //position of the lower left point of the text
		});



		// { invalidation.then(() => console.log("invalidated.")); }
		return svg.node();
	}

	color(d) {
		const scale = d3.scaleOrdinal(d3.schemeCategory10);
		return d => scale(d.group);
	}

	drag(simulation) {

		function dragstarted(d) {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(d) {
			d.fx = d3.event.x;
			d.fy = d3.event.y;
		}

		function dragended(d) {
			if (!d3.event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}




		return d3.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended);
	}


	render() {
		return (<div>

			<h2 className="d3Graph-title">Client Linkage</h2>
			<div ref='graph' className="d3-graph"></div>
		</div>
		)
	}
}

export default D3Graph
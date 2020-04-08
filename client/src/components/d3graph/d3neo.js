import { mapToArray, promptAlert, setupNeo4jLoginForAjax, removeAlert } from '../d3graph/d3js-example-neo4j.js'
import React from 'react'
import * as d3 from 'd3';
import { Button } from 'reactstrap';
// import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import $ from 'jquery';
import './d3.css'



class D3Neo extends React.Component {
    constructor(props) {
        super(props)

        this.curr = ''
        this.queries = {
            // query for kmp who trade in company they work for
            q1: "MATCH (n)-[r:works_for]-(m) WHERE n.designation <> 'Regular Employee' WITH n,r,m MATCH (n)-[e:executed]-(t)-[p:part_of]-(m) RETURN n,r,m,e,p,t",
            // query for people who make trades in the same company, should be parameterized by company
            q2: "MATCH (c1:Client)-[e1:executed]->(t1)-[p1:part_of]->(company:Company)<-[p2:part_of]-(t2)<-[e2:executed]-(c2:Client) WITH c1, c2, company MERGE (c1)-[cot1:cotrader]->(company)<-[cot2:cotrader]-(c2) RETURN c1, c2, cot1, cot2, company LIMIT 100",
            // query for people who trade through the same brokerage
            // Fixed this query | adding variables for rels and adding limit worked, removing the limit it throws error
            q3: "MATCH (c1:Client)-[r:trades_through]->(b:Brokerage)<-[r1:trades_through]-(c2:Client) RETURN c1, c2, r,r1,b limit 1000 "
        }
        this.createChart = this.createChart.bind(this)
    }

    componentDidMount() {
        this.createChart()
    }


    createChart() {
        var que = (this.queries)
        //######################### const #########################
        var graphWidth = 1024;
        var graphHeight = 450;

        var neo4jAPIURL = 'http://localhost:7474/db/data/transaction/commit';
        var neo4jLogin = 'neo4j';
        var neo4jPassword = '12345';

        var circleSize = 30;
        var textPosOffsetY = 5;
        var arrowWidth = 5;
        var arrowHeight = 5;


        var collideForceSize = circleSize * 1.5;
        var linkForceSize = 150;
        //######################### variable #########################
        var nodeItemMap = {};
        var linkItemMap = {};


        var d3Simulation = null;
        var circles;
        var circleText;
        var lines;
        var lineText;
        var iconLock;
        var iconCross;


        var collideForceSize = circleSize * 1.5;
        var linkForceSize = 150;

        var iconPosOffset = { 'lock': [-40, -50], 'cross': [18, -50] };

        var linkTypeMapping = { 'OUT_ADD': '+', 'OUT_SUB': '-', 'IN_AND': 'AND', 'IN_OR': 'OR' };

        var lockIconSVG = 'm18,8l-1,0l0,-2c0,-2.76 -3.28865,-5.03754 -5,-5c-1.71135,0.03754 -5.12064,0.07507 -5,4l1.9,0c0,-1.71 1.39,-2.1 3.1,-2.1c1.71,0 3.1,1.39 3.1,3.1l0,2l-9.1,0c-1.1,0 -2,0.9 -2,2l0,10c0,1.1 0.9,2 2,2l12,0c1.1,0 2,-0.9 2,-2l0,-10c0,-1.1 -0.9,-2 -2,-2zm0,12l-12,0l0,-10l12,0l0,10z';

        var crossIconSVG = 'M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z';

        var boxSVG = 'M0 0 L23 0 L23 23 L0 23 Z';

        var drag_handler = d3.drag()
            .on('start', drag_start)
            .on('drag', drag_move)
            .on('end', drag_end);

        var itemColorMap = {};
        var colorScale = d3.scaleOrdinal(d3.schemeSet2);
        var zoom_handler = d3.zoom()
            .filter(function () {
                //Only enable wheel zoom and mousedown to pan
                return (d3.event.type == 'wheel' | d3.event.type == 'mousedown');
            })
            .on('zoom', zoom_actions);

        function unfreezeItms() {
            var nodeItmArray = d3Simulation.nodes();
            if (nodeItmArray != null) {
                nodeItmArray.forEach(function (nodeItm) {
                    if (nodeItm.fx != null) {
                        nodeItm.fx = null;
                        nodeItm.fy = null;
                    }
                });
            }
        }

        function drag_start(d) {
            d3Simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function drag_move(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function drag_end(d) {
            if (!d3.event.active && d3Simulation != null)
                d3Simulation.alphaTarget(0);
        }

        function zoom_actions() {
            d3.select('#resultSvg').select('g').attr('transform', d3.event.transform);
        }

        function initGraph() {
            var svg = d3.select('#resultSvg');
            var zoomGLayer = svg.append('g');

            var centerX = graphWidth / 2;
            var centerY = graphHeight / 2;

            svg.attr('width', graphWidth)
                .attr('height', graphHeight)
                .attr("class","svg");


            zoomGLayer.append('g').attr('id', 'circle-group').attr('transform', 'translate(' + centerX + ',' + centerY + ')');
            zoomGLayer.append('g').attr('id', 'text-group').attr('transform', 'translate(' + centerX + ',' + centerY + ')');
            zoomGLayer.append('g').attr('id', 'path-group').attr('transform', 'translate(' + centerX + ',' + centerY + ')');
            zoomGLayer.append('g').attr('id', 'path-label-group').attr('transform', 'translate(' + centerX + ',' + centerY + ')');
            zoomGLayer.append('g').attr('id', 'control-icon-group').attr('transform', 'translate(' + centerX + ',' + centerY + ')');

            zoom_handler(svg);
        }

        function stopSimulation() {
            if (d3Simulation != null) {
                d3Simulation.stop()
                    .on('tick', null);
                d3Simulation = null;
            }
        }

        function tick() {
            lines.attr('d', drawLine);
            lineText.attr('transform', transformPathLabel);
            circles.attr('transform', transform);
            circleText.attr('transform', transform);

            iconLock.attr('transform', function (d) { return transformIcon(d, 'lock'); });
            iconCross.attr('transform', function (d) { return transformIcon(d, 'cross'); });
        }

        function transformIcon(d, type) {
            var sourceX = d.x + iconPosOffset[type][0];
            var sourceY = d.y + iconPosOffset[type][1];
            return 'translate(' + sourceX + ',' + sourceY + ')';
        }

        function transformPathLabel(d) {
            var sourceX = d.source.x + ((d.target.x - d.source.x) / 2);
            var sourceY = d.source.y + ((d.target.y - d.source.y) / 2);
            return 'translate(' + sourceX + ',' + sourceY + ')';
        }

        function transform(d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        }

        function drawLine(d) {
            var deltaX, deltaY, dist, cosTheta, sinTheta, sourceX, sourceY, targetX, targetY;

            deltaX = d.target.x - d.source.x;
            deltaY = d.target.y - d.source.y;
            dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            cosTheta = deltaX / dist;
            sinTheta = deltaY / dist;
            sourceX = d.source.x + (circleSize * cosTheta);
            sourceY = d.source.y + (circleSize * sinTheta);
            targetX = d.target.x - (circleSize * cosTheta);
            targetY = d.target.y - (circleSize * sinTheta);

            //Not use marker as IE does not support it and so embed the arrow in the path directly
            var arrowLeftX, arrowLeftY, arrowRightX, arrowRightY;

            arrowLeftX = targetX - (arrowHeight * sinTheta) - (arrowWidth * cosTheta);
            arrowLeftY = targetY + (arrowHeight * cosTheta) - (arrowWidth * sinTheta);
            arrowRightX = targetX + (arrowHeight * sinTheta) - (arrowWidth * cosTheta);
            arrowRightY = targetY - (arrowHeight * cosTheta) - (arrowWidth * sinTheta);

            return 'M' + sourceX + ' ' + sourceY + ' L' + targetX + ' ' + targetY
                + ' M' + targetX + ' ' + targetY + ' L' + arrowLeftX + ' ' + arrowLeftY
                + ' L' + arrowRightX + ' ' + arrowRightY + ' Z';
        }

        function clearProperties() {
            $('#propertiesBox').empty();
        }

        function showProperties(d) {
            clearProperties();

            var propertiesText = 'id: ' + d.id;
            //For nodes
            if (d.labels != null)
                propertiesText += ', labels: ' + d.labels.join(', ');
            //For links
            if (d.type != null)
                propertiesText += ', type: ' + d.type;

            $.map(d.properties, function (value, key) {
                propertiesText += ', ' + key + ': ' + value;
            });

            $('#propertiesBox').append($('<h4></h4>').text(propertiesText));
        }

        function replaceLinkTypeName(d) {
            var linkTypeName = linkTypeMapping[d.type];
            if (linkTypeName == null)
                return d.type;
            return linkTypeName;
        }

        function generateCircleClasses(d) {
            if (d.properties != null && d.properties.cyclic == '1')
                return 'Cyclic ' + d.labels.join(' ');
            return d.labels.join(' ');
        }

        function removeNode(d) {
            delete nodeItemMap[d.id];
            $.map(linkItemMap, function (value, key) {
                if (value.startNode == d.id || value.endNode == d.id)
                    delete linkItemMap[key];
            });
        }

        function updateGraph() {
            var d3LinkForce = d3.forceLink()
                .distance(linkForceSize)
                .links(mapToArray(linkItemMap))
                .id(function (d) { return d.id; });

            d3Simulation = d3.forceSimulation()
                //.force('chargeForce', d3.forceManyBody())//.strength(-300)
                .force('collideForce', d3.forceCollide(collideForceSize))
                .nodes(mapToArray(nodeItemMap))
                .force('linkForce', d3LinkForce);

            circles = d3.select('#circle-group').selectAll('circle')
                .data(d3Simulation.nodes(), function (d) { return d.id; })
                .attr('fill', function (d) { return getColorBrighter(getItemColor(d)) });
            circleText = d3.select('#text-group').selectAll('text')
                .data(d3Simulation.nodes(), function (d) { return d.id; });
            lines = d3.select('#path-group').selectAll('path')
                .data(d3LinkForce.links(), function (d) { return d.id; });
            lineText = d3.select('#path-label-group').selectAll('text')
                .data(d3LinkForce.links(), function (d) { return d.id; });

            iconLock = d3.select('#control-icon-group').selectAll('g.lockIcon')
                .data([], function (d) { return d.id; });
            iconCross = d3.select('#control-icon-group').selectAll('g.crossIcon')
                .data([], function (d) { return d.id; });

            iconLock.exit().remove();
            iconCross.exit().remove();

            circles.exit().remove();
            circles = circles.enter().append('circle')
                .attr('r', circleSize)
                .attr('fill', getItemColor).attr('stroke', function (d) { return getColorDarker(getItemColor(d)); })
                // .attr('stroke', function (d) { return getColorDarker(getItemColor(d)); })
                .attr('title', function (d) { return d.labels.join('-'); })
                .attr('class', function (d) { return generateCircleClasses(d); })
                .call(drag_handler)
                .on('mouseover', function (d) {
                    showProperties(d);
                })
                .on('dblclick', function (d) {
                    d.fx = d.x;
                    d.fy = d.y;
                    submitQuery(d.id);
                })
                .on('click', function (d) {
                    iconLock = d3.select('#control-icon-group').selectAll('g.lockIcon')
                        .data([d], function (d) { return d.id; });
                    iconCross = d3.select('#control-icon-group').selectAll('g.crossIcon')
                        .data([d], function (d) { return d.id; });

                    iconLock.exit().remove();
                    iconLock.remove();
                    iconCross.exit().remove();
                    iconCross.remove();

                    var iconLockEnter = iconLock.enter().append('g')
                        .attr('class', 'lockIcon')
                        .attr('transform', function (d) {
                            return transformIcon(d, 'lock');
                        })
                        .on('click', function (d) {
                            d.fx = null;
                            d.fy = null;

                            iconLock.remove();
                            iconCross.remove();
                        });
                    iconLockEnter.append('path').attr('class', 'overlay').attr('d', boxSVG);
                    iconLockEnter.append('path').attr('d', lockIconSVG);

                    var iconCrossEnter = iconCross.enter().append('g')
                        .attr('class', 'crossIcon')
                        .attr('transform', function (d) {
                            return transformIcon(d, 'cross');
                        })
                        .on('click', function (d) {
                            removeNode(d);
                            updateGraph();
                        });
                    iconCrossEnter.append('path').attr('class', 'overlay').attr('d', boxSVG);
                    iconCrossEnter.append('path').attr('d', crossIconSVG);

                    iconLock = iconLockEnter
                        .merge(iconLock);
                    iconCross = iconCrossEnter
                        .merge(iconCross);
                })
                .merge(circles);

            circleText.exit().remove();
            circleText = circleText.enter().append('text')
                .attr('y', textPosOffsetY)
                .attr('text-anchor', 'middle')
                .text(function (d) {
                    if (d.properties.name != null) {
                        return d.properties.name
                    }
                    // for displaying labels if not visible
                    else {
                        return d.labels
                    }
                })
                .merge(circleText);

            lines.exit().remove();
            lines = lines.enter().append('path')
                //.attr('marker-end', 'url(#end-arrow)')
                .attr('title', function (d) { return d.type; })
                .attr('class', function (d) { return d.type; })
                .on('mouseover', function (d) {
                    showProperties(d);
                })
                .merge(lines);

            lineText.exit().remove();
            lineText = lineText.enter().append('text')
                .attr('y', textPosOffsetY)
                .attr('text-anchor', 'middle')
                .text(function (d) { return replaceLinkTypeName(d); })
                .merge(lineText);

            d3Simulation
                .on('tick', tick);
        }
        function submitQuery(nodeID) {
            removeAlert();

            var queryStr = null;

            if (nodeID == null || !nodeID) {
                queryStr = $.trim($('#queryText').val());
                if (queryStr == '') {
                    promptAlert($('#graphContainer'), 'Error: query text cannot be empty !', true);
                    return;
                }
                if ($('#chkboxCypherQry:checked').val() != 1)
                    queryStr = 'match (n) where n.name =~ \'(?i).*' + queryStr + '.*\' return n';
            }
            else if ($('#q1').click() == true)
                queryStr = que.q2
            else
                queryStr = 'match (n)-[j]-(k) where id(n) = ' + nodeID + ' return n,j,k';


            stopSimulation();

            if (nodeID == null || !nodeID) {
                nodeItemMap = {};
                linkItemMap = {};
            }

            var jqxhr = $.post(neo4jAPIURL, '{"statements":[{"statement":"' + queryStr + '", "resultDataContents":["graph"]}]}',
                function (data) {
                    //console.log(JSON.stringify(data));
                    if (data.errors != null && data.errors.length > 0) {
                        promptAlert($('#graphContainer'), 'Error: ' + data.errors[0].message + '(' + data.errors[0].code + ')', true);
                        return;
                    }

                    if (data.results != null && data.results.length > 0 && data.results[0].data != null && data.results[0].data.length > 0) {
                        var neo4jDataItmArray = data.results[0].data;
                        neo4jDataItmArray.forEach(function (dataItem) {
                            //Node
                            if (dataItem.graph.nodes != null && dataItem.graph.nodes.length > 0) {
                                var neo4jNodeItmArray = dataItem.graph.nodes;
                                neo4jNodeItmArray.forEach(function (nodeItm) {
                                    if (!(nodeItm.id in nodeItemMap))
                                        nodeItemMap[nodeItm.id] = nodeItm;
                                });
                            }
                            //Link
                            if (dataItem.graph.relationships != null && dataItem.graph.relationships.length > 0) {
                                var neo4jLinkItmArray = dataItem.graph.relationships;
                                neo4jLinkItmArray.forEach(function (linkItm) {
                                    if (!(linkItm.id in linkItemMap)) {
                                        linkItm.source = linkItm.startNode;
                                        linkItm.target = linkItm.endNode;
                                        linkItemMap[linkItm.id] = linkItm;
                                    }
                                });
                            }
                        });

                        console.log('nodeItemMap.size:' + Object.keys(nodeItemMap).length);
                        console.log('linkItemMap.size:' + Object.keys(linkItemMap).length);

                        updateGraph();
                        return;
                    }

                    //also update graph when empty
                    updateGraph();
                    promptAlert($('#graphContainer'), 'No record found !', false);
                }, 'json');

            jqxhr.fail(function (data) {
                promptAlert($('#graphContainer'), 'Error: submitted query text but got error return (' + data + ')', true);
            });
        }

        // Function for stored queries will make it one function later
        function storedQuery(nodeID) {
            removeAlert();

            var queryStr = null;
            if ($('#q1').val() != 0)
                queryStr = que.q1
            else if ($('#q2').val() != 0)
                queryStr = que.q2;
            else if ($('#q3').val() != 0)
                queryStr = que.q3;


            stopSimulation();

            if (nodeID == null || !nodeID) {
                nodeItemMap = {};
                linkItemMap = {};
            }

            var jqxhr = $.post(neo4jAPIURL, '{"statements":[{"statement":"' + queryStr + '", "resultDataContents":["graph"]}]}',
                function (data) {
                    //console.log(JSON.stringify(data));
                    if (data.errors != null && data.errors.length > 0) {
                        promptAlert($('#graphContainer'), 'Error: ' + data.errors[0].message + '(' + data.errors[0].code + ')', true);
                        return;
                    }

                    if (data.results != null && data.results.length > 0 && data.results[0].data != null && data.results[0].data.length > 0) {
                        var neo4jDataItmArray = data.results[0].data;
                        neo4jDataItmArray.forEach(function (dataItem) {
                            //Node
                            if (dataItem.graph.nodes != null && dataItem.graph.nodes.length > 0) {
                                var neo4jNodeItmArray = dataItem.graph.nodes;
                                neo4jNodeItmArray.forEach(function (nodeItm) {
                                    if (!(nodeItm.id in nodeItemMap))
                                        nodeItemMap[nodeItm.id] = nodeItm;
                                });
                            }
                            //Link
                            if (dataItem.graph.relationships != null && dataItem.graph.relationships.length > 0) {
                                var neo4jLinkItmArray = dataItem.graph.relationships;
                                neo4jLinkItmArray.forEach(function (linkItm) {
                                    if (!(linkItm.id in linkItemMap)) {
                                        linkItm.source = linkItm.startNode;
                                        linkItm.target = linkItm.endNode;
                                        linkItemMap[linkItm.id] = linkItm;
                                    }
                                });
                            }
                        });

                        console.log('nodeItemMap.size:' + Object.keys(nodeItemMap).length);
                        console.log('linkItemMap.size:' + Object.keys(linkItemMap).length);

                        updateGraph();
                        return;
                    }

                    //also update graph when empty
                    updateGraph();
                    promptAlert($('#graphContainer'), 'No record found !', false);
                }, 'json');

            jqxhr.fail(function (data) {
                promptAlert($('#graphContainer'), 'Error: submitted query text but got error return (' + data + ')', true);
            });
        }


        function getItemColor(d) {
            if (!(d.labels[0] in itemColorMap))
                itemColorMap[d.labels[0]] = colorScale(d.labels[0]);
            return itemColorMap[d.labels[0]];
        }

        function getColorBrighter(targetColor) {
            return d3.rgb(targetColor).brighter(0.3).toString();
        }

        function getColorDarker(targetColor) {
            return d3.rgb(targetColor).darker().toString();
        }

        //Page Init
        $(function () {
            setupNeo4jLoginForAjax(neo4jLogin, neo4jPassword);

            initGraph();

            $('#queryText').keyup(function (e) {
                if (e.which == 13) {
                    submitQuery();
                }
            });

            $('#btnSend').click(function () { submitQuery() });
            // select the query depending on the button need to push it to the submit query
            $('#q1, #q2,#q3').click(function () {
                if (this.id == 'q1') {
                    $('#q2').val(0)
                    $('#q3').val(0)
                    $('#q1').val(1)

                }
                else if (this.id == 'q2') {
                    $('#q1').val(0)
                    $('#q2').val(1)
                    $('#q3').val(0)


                }
                else if (this.id == 'q3') {
                    $('#q1').val(0)
                    $('#q2').val(0)
                    $('#q3').val(1)

                }
                storedQuery()
            })




            $('#chkboxCypherQry').change(function () {
                if (this.checked)
                    $('#queryText').prop('placeholder', 'Cypher');
                else
                    $('#queryText').prop('placeholder', 'Node Name');
            });
        });


    }
    render() {
        return (
            <div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-12 col-md-12 form-inline">

                            <input type="text" className="form-control form-control-sm" size="40px" id="queryText" placeholder="Search Field" />
                            <button type="button" className="btn btn-outline-primary btn-sm" id="btnSend">

                                <i className="fa fa-check" aria-hidden="true"></i> Send &nbsp;
                             </button> &nbsp;
                            <button type="button" className="btn btn-outline-primary btn-sm" id="q1" value="0">

                                <i className="fa fa-check" aria-hidden="true"></i> KMP Traders &nbsp;
                            </button> &nbsp;
                            <button type="button" className="btn btn-outline-primary btn-sm" id="q2" value="0">

                                <i className="fa fa-check" aria-hidden="true"></i> Employee Traders&nbsp;
                            </button> &nbsp;
                            <button type="button" className="btn btn-outline-primary btn-sm" id="q3" value="0">

                                <i className="fa fa-check" aria-hidden="true"></i> Same Brokerage&nbsp;
</button> &nbsp;
                            <input className="form-check-input" type="checkbox" id="chkboxCypherQry" value="1" />
                            <label className="form-check-label" htmlFor="chkboxCypherQry">Use Cypher Query</label>

                        </div>
                    </div>
                </div>

                <hr />

                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-12 col-md-12" id="graphContainer">
                            <svg id="resultSvg"></svg>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12 col-md-12">
                            <div id="propertiesBox">
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default D3Neo
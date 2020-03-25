import React from 'react';
import * as d3 from 'd3';
import './../App.css';

class D3GraphNeo extends React.Component {

    constructor() {
        this.createChart = this.createChart.bind(this)
    }

    componentDidMount() {
        this.createChart()
    }

    createChart() {
        var graphWidth = 1024;
        var graphHeight = 450;
        const neo4jAPIURL = 'http://localhost:7474/db/data/transaction/commit';
        const neo4jLogin = 'neo4j';
        const neo4jPassword = '12345';
        var circleSize = 30;
        var textPosOffsetY = 5;
    
        var collideForceSize = circleSize * 1.5;
        var linkForceSize = 150;
        var nodeItemMap = {};
        var linkItemMap = {};
    }



    
    render() {
        return (
            <div id="resultSvg">

            </div>
        )
    }

}

export default D3GraphNeo
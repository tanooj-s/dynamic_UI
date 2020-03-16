import React from 'react'
import '../../node_modules/popoto/dist/popoto.min.css'
import './../App.css';
import * as d3 from 'd3';
import * as popoto from 'popoto'

class PopotoGraph extends React.Component {

    constructor(props) {
        super(props)
        this.popotoConfig = this.popotoConfig.bind(this)
    }


    componentDidMount() {
        this.popotoConfig();
    }

    popotoConfig() {
        // Demo Neo4j database settings hosted on GrapheneDb
        popoto.rest.CYPHER_URL = "http://localhost:7474/db/data/transaction/commit";
        popoto.rest.AUTHORIZATION = "Basic " + btoa("neo4j:12345");
        // Define the list of label provider to customize the graph behavior:
        // Only two labels are used in Neo4j movie graph example: "Movie" and "Person"
        popoto.provider.node.Provider = {
            "Client": {
                "returnAttributes": ["name"],
                "constraintAttribute": "name",
                "autoExpandRelations": true, // automatically expand nodes in graph
            },
            "Company": {
                "returnAttributes": ["name"],
                "constraintAttribute": "name",
                "autoExpandRelations": true,
            },
            "Contact": {
                "returnAttributes": [""],
                "constraintAttribute": "",
                "autoExpandRelations": true,
            },
            "Account": {
                "returnAttributes": ["number"],
                "constraintAttribute": "",
                "autoExpandRelations": true,
            },
            "Address": {
                "returnAttributes": ["location"],
                "constraintAttribute": "",
                "autoExpandRelations": true,
            },
            "Phone": {
                "returnAttributes": ["number"],
                "constraintAttribute": "",
                "autoExpandRelations": true,
            },
            "Email": {
                "returnAttributes": ["id"],
                "constraintAttribute": "",
                "autoExpandRelations": true,
            },
            "Bank": {
                "returnAttributes": ["name"],
                "constraintAttribute": "",
                "autoExpandRelations": true,
            },

        };

        popoto.query.COLLECT_RELATIONS_WITH_VALUES = true;

        // "Movie": {
        //     "returnAttributes": ["title", "released", "tagline"],
        //     "constraintAttribute": "title"
        // },
        // "Person": {
        //     "returnAttributes": ["name", "born"],
        //     "constraintAttribute": "name",
        //     // Customize result display for Person nodes:
        //     "displayResults": function (pResultElmt) {
        //         // Here D3.js mechanisms is used to generate HTML code.
        //         // By default Popoto.js generates a <p> element for each result.
        //         // pResultElmt parameter is the <p> element selected with D3.js
        //         // So for "Person" result nodes two elements are generated:
        //         // An <h3> element containing the person name
        //         pResultElmt.append("h3")
        //             .text(function (result) {
        //                 return result.attributes.name;
        //             });
        //         // A <span> element with the computed age from born attribute
        //         pResultElmt.filter(function (result) {
        //             // Filter on attribute having born attribute value
        //             return result.attributes.born;
        //         }).append("span").text(function (result) {
        //             return "Age: " + (new Date().getFullYear() - result.attributes.born);
        //         });
        //     }
        // }

        // popoto.provider.link.Provider = {
        // /*customize the text displayed in relationships */
        //     "getTextValue": function (link) {
        //         if (link.type === popoto.graph.link.LinkTypes.RELATION || link.type === popoto.graph.link.LinkTypes.SEGMENTS) {

        //             var targetName = "";
        //             if (link.type === popoto.graph.link.LinkTypes.SEGMENT) {
        //                 targetName = " " + popoto.provider.node.getTextValue(link.target);
        //             }
        //             switch (link.label) {
        //                 case "OWNS_SHARES":
        //                     return "volume" + targetName;
        //                 case "WORKS_FOR":
        //                     return "" + targetName;
        //                 default : //could probably just use this 
        //                     return link.label + targetName;
        //             } 
        //         }
        //     }
        // };


        // Change the number of displayed results:
        popoto.result.RESULTS_PAGE_SIZE = 50;
        // Add a listener on returned result count to update count in page
        popoto.result.onTotalResultCount(function (count) {
            d3.select("#rescount").text(function (d) {
                return "(" + count + ")";
            })
        });
        // Add a listener on new relation added
        popoto.graph.on(popoto.graph.Events.GRAPH_NODE_RELATION_ADD, function (relations) {
            var newRelation = relations[0];
            // Collapse all expanded choose nodes first to avoid having value node in selection.
            popoto.graph.node.collapseAllNode();
            var linksToRemove = popoto.dataModel.links.filter(function (link) {
                // All other links starting from same source node except new one.
                return link !== newRelation && link.source === newRelation.source;
            });
            linksToRemove.forEach(function (link) {
                var willChangeResults = popoto.graph.node.removeNode(link.target);
                popoto.result.hasChanged = popoto.result.hasChanged || willChangeResults;
            });
            popoto.update();
        });
        // Start the generation using parameter as root label of the query.
        popoto.start(
            {
                label: 'Client',
                value: { name: this.props.data.profile[0].ClientName },

            }
        );
    }


    render() {

        return (
            <div className="graph-container">
                {/* Navbar */}
          <section className="ppt-section-main">
                    <nav id="popoto-taxonomy" className="ppt-taxo-nav">

                    </nav>

                    <div id="popoto-graph" className="ppt-div-graph">
                    </div>



                    <div className="ppt-section-header">
                        RESULTS <span id="rescount" className="ppt-count"></span>
                    </div>

                    <div id="popoto-results" className="ppt-container-results">
                    </div>

                </section>
            </div>
        )
    }
}


export default PopotoGraph
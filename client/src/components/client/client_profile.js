import React from 'react';
import '../../App.css';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn, MdDateRange, MdFlag } from 'react-icons/md'
import { FaAddressCard } from 'react-icons/fa'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

import HorizontalBarChart from '../chart/horizontal-barchart.js'
import ClientPieChart from '../chart/client-piechart.js'
import LineChart from '../chart/linechart.js'
import TradeData from '../chart/tradedata';
import NclAlerts from '../chart/alert';
import M2MClient from '../chart/M2MChart';
import SecurityBalance from '../chart/fundnsec';
import TradeData1 from '../chart/TradeData1';
import ShareholdingVolume from '../chart/shareholding_volume';
import Sebi from "../chart/Sebi";
import SebiNCL from "../chart/SebiNCL";


class ClientProfile extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="bprofile">
                <div className="p-3 my-2 rounded client-profiling">
                    <div className="client-detail">

                        <Card className="client-card" id='client-card'>
                            <div className="client-body">
                                <CardTitle className="client-title">
                                    <strong> {this.props.data.profile[0].ClientName}</strong><hr className="seperator-client" />
                                </CardTitle>

                                <div className="contact-details">
                                    <CardText className="pan"><FaAddressCard className="icons" />PAN:{this.props.data.profile[0].PAN}    <span title="Duplicate PAN" class="tooltiptext"><MdFlag className="icons-flag" /></span></CardText>

                                    <CardText className="phone"><MdDateRange />DOB 06:02:1998</CardText>
                                    <CardText className="email"><MdEmail className="icons" />{this.props.data.profile[0].Email}</CardText>
                                    <CardText className="phone"> <MdPhone className="icons" /> 91 {this.props.data.profile[0].Phone}</CardText>
                                </div>


                            </div>
                        </Card>


                        <Card className="client-card2" id="client-card2">

                            <div className="contact-details2">

                                <CardText className="ucc"><strong className="company-name">Address</strong>
                                </CardText>
                                <CardText> {this.props.data.profile[0].Address} <span className="vertical-line"></span></CardText>

                                <CardText className="tmcode"><strong>Bank Name:</strong> {this.props.data.profile[0].BankName}
                                    <br /> <strong>Account Number:</strong> {this.props.data.profile[0].AccountNumber}
                                    {/* {this.props.data.profile[0].TMCode} */}
                                </CardText>
                                {/* <CardText className="tmcode">
                                {this.props.data.profile[0].TMCode}
                                </CardText> */}

                            </div>

                        </Card>
                        <Card className="client-card3" id="client-card3">

                            <div className="fund-details">
                                <CardTitle className="funds-title"><strong></strong></CardTitle>
                                {/* <CardText className="phone">End of Day Fund Balance: {this.props.data.profile[0].EODFundBalance}</CardText> */}
                                <CardText><strong>Demat A/c:</strong>{this.props.data.profile[0].DematAccountNo}</CardText>
                                <CardText><strong>Client Category:</strong>{this.props.data.profile[0].ClientCategory}</CardText>
                                <CardText><strong>Trade Member Name:</strong>{this.props.data.profile[0].TradeMemberName}</CardText>
                                <CardText><strong>Depository Name:</strong>{this.props.data.profile[0].DepositoryName}</CardText>
                                <CardText><strong>Beneficiary Name:</strong>{this.props.data.profile[0].BeneficiaryName}</CardText>
                                {/* <CardText className="address">NSE Fund Balance: {this.props.data.profile[0].FundBalanceNSE}</CardText> */}
                            </div>

                        </Card>
                    </div>

                    <div className="data-row-1">
                        <TradeData1 data={this.props.data.trades} />
                    </div>

                    <div className="data-row-2">
                        <div className="pledged">
                            <SecurityBalance data={this.props.data.pledged} />
                        </div>
                        <div className="daily">
                            <ShareholdingVolume data={this.props.data.trades} />
                        </div>
                        <div className="m2mclient" >
                            <M2MClient data={this.props.data.m2m} />
                        </div>
                    </div>

                    <div className="data-row-3">
                        <div className="nclalerts">
                            <NclAlerts data={this.props.data.alerts} />
                        </div>

                        <div className="nclalerts">
                            <Sebi data={this.props.data.alerts} />
                        </div>

                        <div className="nclalerts1">
                            <SebiNCL data={this.props.data.alerts} />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default ClientProfile;

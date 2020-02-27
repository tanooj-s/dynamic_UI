import React from 'react';
import '../../App.css';
import { Toast } from 'reactstrap';
import Logo from '../person.jpg'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

function ClientProfile(props) {

    return (
        <div className="bprofile">
            <div className="p-3 my-2 rounded profiling">
                <Card>

                    <CardBody className="person-body">
                        <CardTitle className="person-title">
                            <strong> {props.data[0].ClientName}</strong>
                        </CardTitle>
                    </CardBody>
                    <CardBody className="person-body">
                        <div>
                            <CardTitle className="contact-title"><strong>Details </strong></CardTitle>
                            <CardText className="phone"> <MdPhone /> 91 {props.data[0].Phone}</CardText>
                            <CardText className="email"><MdEmail />{props.data[0].Email}</CardText>
                            <CardText className="pan">PAN: {props.data[0].PAN}</CardText>
                            <CardText className="pan">UCC: {props.data[0].UCC}</CardText>
                            <CardText className="pan">TMCode: {props.data[0].TMCode}</CardText>
                            <CardTitle className="funds-title"><strong>Fund Details</strong></CardTitle>
                            <CardText className="phone">End of Day Fund Balance: {props.data[0].EODFundBalance}</CardText>
                            <CardText className="address">NSE Fund Balance: {props.data[0].FundBalanceNSE}</CardText>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}

export default ClientProfile;

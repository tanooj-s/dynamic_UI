import React from 'react';
import '../../App.css';
import { Toast } from 'reactstrap';
import Logo from '../person.jpg'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

function BProfile (props) {

    return (
        <div className="bprofile">
            <div className="p-3 my-2 rounded">
                <Card>
                    <CardBody className="person-body">
                        <CardTitle className="person-title"> <img src={Logo} />{props.data[0].Name}</CardTitle>
                        <CardText className="phone"> Phone Number Here</CardText>
                        <CardText className="email">Email ID Here</CardText>
                        <CardText className="address">{props.data[0].Address}</CardText>
                    </CardBody>
                    <CardText>
                        <small className="text-muted">{props.data[0].Segments}</small>
                    </CardText>
                </Card>
            </div>
        </div>
    );
}


export default BProfile;

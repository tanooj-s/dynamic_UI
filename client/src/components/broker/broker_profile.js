import React from 'react';
import '../../App.css';
import { Toast } from 'reactstrap';
import Logo from '../person.jpg'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

class BProfile extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (

            <div className="bprofile">
                <div className="p-3 my-2 rounded">
                    <Card>
                        <CardBody className="person-body">
                            <CardTitle className="person-title"> <img src={Logo} />Broker Name Here</CardTitle>

                            <CardText className="phone"> Phone Number Here</CardText>
                            <CardText className="email">Email ID Here</CardText>
                            <CardText className="address">Address Here</CardText>

                        </CardBody>
                        <CardText>
                            <small className="text-muted">About Company Here</small>
                        </CardText>
                    </Card>
                </div>
            </div>

        );
    }
}



// render navbars as different classes within this file
// add this.handleClick to each of them


export default BProfile;

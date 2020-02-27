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


function BProfile(props) {

    return (
        <div className="brokerprofile">
            <div className="p-3 my-2 rounded bprofiling">
                <Card>
                    <CardBody className="person-body">
                        <CardTitle className="Broker-title"><strong> {props.data[0].Name}
                        </strong>
                        </CardTitle>
                    </CardBody>

                    <CardText className="About-company">
                        <CardTitle className="about-title"><strong>Segments</strong></CardTitle>
                        {props.data[0].Segments}
                    </CardText>

                    <CardBody className="person-body">

                        <div>
                            <CardTitle className="contact-title"><strong>Details </strong></CardTitle>
                            <CardText className="phone"> <strong>Sebi Registration Number: </strong>{props.data[0].SEBIRegistrationNo}</CardText>
                            <CardText className="address"><MdLocationOn /> {props.data[0].Address}</CardText>
                        </div>
                    </CardBody>

                </Card>


                <div className='section'>
                    <Card className="profile2">
                        <CardTitle className="person-title"> <img src={Logo} /></CardTitle>
                        <div className="body-icons">
                            <FaFacebookF className="fb" />
                            <FaLinkedinIn className="lk" />
                            <MdEmail className="em" />
                        </div>
                        <CardText className="company-type"> <strong> Member Id:</strong> {props.data[0].MemberID}</CardText>
                    </Card>
                </div>
            </div>
        </div>
        // <div className="p-3 my-2 rounded">
        //     <Card>
        //         <CardBody className="person-body">
        //             <CardTitle className="person-title"> <img src={Logo} />{props.data[0].Name}</CardTitle>

        //             <CardText className="address">{props.data[0].Address}</CardText>
        //         </CardBody>
        //         <CardText>
        //             <small className="text-muted">{props.data[0].Segments}</small>
        //         </CardText>
        //     </Card>
        // </div>
        // </div>
    );
}


export default BProfile;

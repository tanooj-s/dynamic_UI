import React from 'react';
import '../../App.css';

import Logo from '../person.jpg'
import {
    Card, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'

function CompanyProfile(props) {

    return (
        <div className="bprofile">
            <div className="p-3 my-2 rounded profiling">
                <Card>

                    <CardBody className="person-body">

                        <CardTitle className="person-title"><strong> {props.data.profile[0].Name}
                        </strong>
                        </CardTitle>
                    </CardBody>

                    <CardText className="About-company">
                        <CardTitle className="about-title"><strong>About</strong></CardTitle>
                        <small className="text-muted">{props.data.profile[0].About}</small>
                    </CardText>

                    <CardBody className="person-body">

                        <div>
                            <CardTitle className="contact-title"><strong>Contact Details </strong></CardTitle>
                            <CardText className="phone"> <MdPhone /> 91 {props.data.profile[0].Phone}</CardText>
                            <CardText className="address"><MdLocationOn /> {props.data.profile[0].Address}</CardText>
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
                        <CardText className="company-type"> <strong> Company Type:</strong> {props.data.profile[0].Type}</CardText>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default CompanyProfile;

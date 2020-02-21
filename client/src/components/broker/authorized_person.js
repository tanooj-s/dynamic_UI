import React from 'react';
import '../../App.css';
import Logo from '../../components/person.jpg'
import { Table } from 'reactstrap';

class AP extends React.Component {
    render() {
        return (

            <div className="AP">
                <Table hover >
                    <thead>
                        <tr>
                            <th></th>
                            <th>AP Name</th>
                            <th>MemberID</th>
                            <th>Type of Member</th>
                            <th>Segments</th>
                            <th>PAN</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Address</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" alt="Prop_Img" /></th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" alt="Prop_Img" /></th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" alt="Prop_Img" /></th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" alt="Prop_Img" /></th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" alt="Prop_Img" /></th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" alt="Prop_Img" /></th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </div>

        );
    }
}



// render navbars as different classes within this file
// add this.handleClick to each of them


export default AP;

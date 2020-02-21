import React from 'react';
import '../../App.css';
import { Table } from 'reactstrap';
import Logo from '../../components/person.jpg'

class KMP extends React.Component {

    constructor() {
        super()
    }

    render() {
        return (

            <div className="KMP">
                <Table hover>
                    <thead>
                        <tr className="kmp-table">
                            <th></th>
                            <th>KMP Name</th>
                            <th>MemberID</th>
                            <th>Designation	PAN</th>
                            <th>Phone</th>
                            <th>Email</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" /></th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" /></th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" /></th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" /></th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" /></th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <th scope="row"><img src={Logo} className="profile-img" /></th>
                            <td>Larry</td>
                            <td>the Bird</td>
                            <td>@twitter</td>
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


export default KMP;

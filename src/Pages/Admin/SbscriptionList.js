import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import Table from 'react-bootstrap/Table';
import axiosInstance from '../../Baseurl';
import '../../Components/Creator/creatorpodcastlist.css'
function SbscriptionList() {
    const [subscriptionList, setsubscriptionList] = useState([])

    useEffect(() => {
        axiosInstance
            .post("/viewCreators")
            .then((response) => {
                setsubscriptionList(response.data.data);
                console.log(response.data.data);
            })
            .catch((error) => {
                console.error("Error submitting data: ", error);
            });


    }, []);


  return (
    <div className='row mt-5 pt-5'>
    <div className='col-1 mt-5 py-5 px-4'><AdminSidebar /></div>
    <div className='col-10'>< div style={{
        margin: "8px", padding: "14px",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    }}>   <h3 className='text-success'>Subscription List</h3>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>profile</th>
                    <th> Name</th>
                    <th> Mobile</th>
                    <th>Email ID</th>
                    <th> DOB</th>
                    <th> Gender</th>
                    <th> country
                    </th> <th> City</th>

                </tr>
            </thead>
            {
                subscriptionList.map((item, index) => (
                    <tbody>
                        <tr>
                            <td>{ }</td>
                            <td>{item.firstname}{item.lastname}</td>
                            <td>{item.mobile}</td>
                            <td>{item.email}</td>
                            <td>{item.dob}</td>
                            <td>{item.gender}</td>
                            <td>{item.country}</td>
                            <td>{item.city}</td>

                        </tr>
                    </tbody>
                ))
            }

        </Table>
    </div></div>
</div>
  )
}

export default SbscriptionList
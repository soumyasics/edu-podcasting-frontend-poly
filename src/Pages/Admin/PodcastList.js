import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../Components/Admin/AdminSidebar'
import Table from 'react-bootstrap/Table';
import axiosInstance from '../../Baseurl';
import topimg from "../../Assest/Slice 3.png"
import { Link, useNavigate } from 'react-router-dom'

function PodcastList({ url }) {

    const [podcastlist, setPodcastList] = useState([]);

    useEffect(() => {
        axiosInstance
            .post("/getAllPodcast")
            .then((response) => {
                setPodcastList(response.data.data);
                console.log(response.data.data, "podcast");
            })
            .catch((error) => {
                console.error("Error submitting data: ", error);
            });


    }, []);
    const Navigate = useNavigate()
    const viewpodcastByAdmin = (podcastid) => {
        Navigate('/adminviewepisode/' + podcastid)
    }

    return (
        <div className='row mt-5 pt-5 adminbg'>
            <div className='col-1 mt-5 py-5 px-4'><AdminSidebar /></div>
            <div className='col-10'>< div style={{
                margin: "8px", padding: "14px",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}>            <h3 className='text-success'>Podcast List</h3>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>podcast name</th>
                            <th>creatorname</th>
                            <th> Description</th>
                            <th>View Podcast</th>
                            <th> Price</th>
                        </tr>
                    </thead>
                    {
                        podcastlist.map((item, index) => (
                            <tbody>
                                <tr>
                                    <td>{item.podcastname}</td>
                                    <td>{item.creatorname}</td>
                                    <td>{item.description}</td>
                                    <td><button onClick={() => viewpodcastByAdmin(item._id)} className='episodebtn'>View Podcast</button></td>
                                    <td>{item.price}</td>
                                </tr>
                            </tbody>
                        ))
                    }

                </Table>
            </div></div>
        </div>
    )
}

export default PodcastList
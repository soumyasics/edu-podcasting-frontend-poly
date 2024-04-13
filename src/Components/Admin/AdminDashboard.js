import React, { useState, useEffect } from "react";
import topimg from "../../Assest/dash.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Sidebar from './AdminSidebar';
import axiosInstance from "../../Baseurl";
import { useNavigate } from "react-router-dom";


function AdminDashboard() {
  const [ListenerCount, setListenerCount] = useState(0);
  const [creatorCount, setCreatorCount] = useState(0);
  const [podcastcount, setPodcastCount] = useState(0);
  const navigate=useNavigate()


  const ListenerCollectionCount = async () => {
    try {
      const response = await axiosInstance.post(
        "listenercollection"
      ); // Replace with your backend URL
      setListenerCount(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const CreatorCollectionCount = async () => {
    try {
      const response = await axiosInstance.post(
        "creatorCollection"
      ); // Replace with your backend URL
      setCreatorCount(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const PodcastCollectionCount = async () => {
    try {
      const response = await axiosInstance.post(
        "podcastcollection"
      ); // Replace with your backend URL
      setPodcastCount(response.data.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("admin") == null) {
      navigate("/adminlogin");
    } 
  }, []);
  
  useEffect(() => {
    ListenerCollectionCount()
    CreatorCollectionCount()
    PodcastCollectionCount()
  }, [])
  return (
    <div className="adminbg" >
      <img src={topimg} alt="img" className="topimg"></img>
      <div className="row ">
        <div className="col-2"><Sidebar /></div>
        <div className="col-8 text-center m-5"><h4 className="m-4">podcast statistics</h4>
          <div className="container">
            <div className="adminbg row">
              <div className="col-4">
                <Card style={{ width: "18rem" }}> <h6>Total Listeners</h6>
                  <h1>{ListenerCount}</h1>
                </Card>
              </div>
              <div className="col-4">
                <Card style={{ width: "18rem" }}>
                 <h6>Total Creators</h6><h1> {creatorCount}</h1>
                </Card>
              </div>
              <div className="col-4">
                <Card style={{ width: "18rem" }}>
                 <h6>Total Podcasts</h6> <h1>{podcastcount}</h1>
                </Card>
              </div>
            </div>
            <div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;

{/* <p className="text-center">Recent Updates</p>
          <div className="row">
            <div className="col-5">
              <div className="row">
                <div className="col">1</div>
                <div className="col">5</div>
              </div>
            </div>
            <div className="col-7">
              <div className="row">
                <div className="col">1</div>
                <div className="col">5</div>
              </div></div>
          </div> */}
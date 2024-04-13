import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Baseurl";
import { useParams, Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import AddReview from "./AddReview";

import { IoMdStar } from "react-icons/io";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


function ListenerViewEpisode(props) {
  const { role } = props
  const {url}=props
  // console.log(url,"url");

  // const url = 'http://localhost:4000/'
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState([]);
  // const [podcastId, setPodcastId] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [review, setReview] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    getpodcastById()
    EpisodesById()
    ViewpodcastByID()

    
  }, []);

const getpodcastById=()=>{
  axiosInstance
  .post("/getPodcastByPodcastId", {
    id: id.split(",")[0],
  })
  .then((response) => {
    setPodcast(response.data.data);
    console.log(response.data.data);
  })
  .catch((error) => {
    // console.log("Error submitting data: ", error);
  });
}
  // const AddReview = (id) => {
  //   navigate("/addreview/" + id)
  // }

const EpisodesById=()=>{
  axiosInstance
  .post("/getEpisodedOfPodcast", {
    id: id.split(",")[0],
  })
  .then((response) => {
    // console.log("episode", response.data.data);
    setEpisodes(response.data.data);
  })
  .catch((error) => {
    // console.log("Error submitting data: ", error);
  });
}
const ViewpodcastByID=()=>{
  axiosInstance
  .post("/getreviewodpodcast", {
    id: id.split(",")[0],
  })
  .then((response) => {
    console.log("review", response);
    setReview(response.data.data);
  })
  .catch((error) => {
    console.log("Error submitting data: ", error);
  });

}

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const subscribe = () => {
    navigate(`/paymentform/${id.split(",")[0]}`)
  }

  const [feedback, setFeedback] = useState("")

  const handlereview = (e) => {

    setFeedback(e.target.value)
  }

  const submitfeedback = (podcastid,creatorid,podcastname) => {

    const listenerid = localStorage.getItem("listenerid")
    const listenername = localStorage.getItem("listenername")
    console.log(feedback, podcastid, listenerid, listenername,creatorid,podcastname);
    // listenerreview
    const data = { feedback, podcastid, listenerid, listenername ,creatorid,podcastname}
    console.log(data,"data");
    axiosInstance
      .post("/listenerreview", data)
      .then((response) => {
        console.log(response, "y");
        document.getElementById("getresult").innerHTML=(response.data.msg);
        ViewpodcastByID()
        handleClose()
        // navigate('/creatorprofile')
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("listenerid") == null) {
      navigate("/");
    } 
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-5">
          {podcast.map((item) => (
            <Card
              className="row"
              style={{
                width: "100%",
                height: "fit-content",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              }}
            >
              <div>
                <img
                  style={{
                    width: "100%",
                    height: "300px",
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    margin: "0px",
                  }}
                  src={url + item.coverimage.filename}
                  alt="img"
                  className="listenerprofileimg"
                ></img>
              </div>

              <div className="col-6 p-4">
                <h3>{item.podcastname}</h3>

                <div style={{ width: "100%" }}>
                  <audio controls>
                    <source
                      src={item.audio ? url + item.audio.filename : ""}
                      type="audio/mpeg"
                    />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                <div className="">
                  <h6 className="card-text col">{item.creatorname}</h6>
                  <h6>Discription {item.description}</h6>
                  {role != "detailPage" ? <button onClick={handleShow} className="episodebtn"><Link className="text-light">Add Review
                  </Link>
                  </button> : ""}

                  {role == "detailPage" ? (<button onClick={subscribe} className="episodebtn">subscribe</button>) : ''}

                </div>

              </div>
              <div className="col-12 mt-5">
                <h6>Here's what our happy customers are saying...</h6>
                {
                  review.length > 0 ?
                    review.map((item) => (

                      <ul class="list-group list-group-flush">
                        <li class="list-group-item"> <span class="badge text-bg-success rounded-pill"><IoMdStar /></span><h6>{item.listenername}</h6>
                          <p>{item.feedback}</p>
                          <hr></hr>
                        </li>
                      </ul>
                    ))
                    : <div className="fs-5 text-center text-success">feedback empty </div>
                }
              </div>


              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Add feedback</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlTextarea1"
                      onChange={handlereview}
                    >
                      <Form.Control as="textarea" rows={3} />
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <div id="getresult" className="text-success text-center"></div>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={() => submitfeedback(item._id,item.creatorId,item.podcastname)}>
                    Submit
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card>
          ))}
        </div>
        <div className="col-6 ">
          <div
            className="col-6 p-2"
            style={{
              width: "100%",
              height: "fit-content",
              margin: "8px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            }}
          >
            {episodes.length ? (
              episodes.map((item) => (
                <Card
                  key={item._id}
                  className="col-6 m-3 mt-3"
                  style={{
                    width: "95%",
                    height: "fit-content",
                    padding: "8px",
                  }}
                >
                  <p>{item.episodetitle}</p>
                  <div className="row">
                    <div className="col-3">
                      <p>Episode {item.episodecount}</p>
                    </div>
                    <div className="col-6">
                      {role != "detailPage" ? (
                        <audio controls style={{ width: "150%" }}>
                          <source
                            src={item.audio ? url + item.audio.filename : ""}
                            type="audio/mpeg"
                          />
                          Your browser does not support the audio element.
                        </audio>
                      ) : <p>Audio Disabled! please subscribe to play audio</p>}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <h6 className="text-center text-success">currently no episode available</h6>)}
          </div>
        </div>

      </div>



    </div>)

}

export default ListenerViewEpisode;


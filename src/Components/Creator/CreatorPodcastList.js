import React, { useState, useEffect } from "react";
import axiosInstance from "../../Baseurl";
import { FaPlus } from "react-icons/fa6";
import './creatorpodcastlist.css';
import { useNavigate } from "react-router-dom";
import { IoMdHeart } from "react-icons/io";

function CreatorPodcastList({ data }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  const navigate=useNavigate()

  const [creatorpodcast, setCreatorpodcast] = useState([]);
  useEffect(() => {
    var podcastEndPoint = data.role == 'creator' ? "/getAllPodcastByCreator" : "/getAllpodcast"
    axiosInstance
      .post(podcastEndPoint, {
        id: localStorage.getItem("creatorid"),
        lisnterId: localStorage.getItem("listenerid")
      })
      .then((response) => {
        console.log(response.data.data, "ajeena");
        setCreatorpodcast(response.data.data, "ajeena");
      })
      .catch((error) => {
        console.error("Error submitting data: ", error);
      });
    console.log(creatorpodcast, "ll");
  }, []);
 console.log(creatorpodcast,"podcast");
  const gotoEpisode=(id)=>{
    navigate(`/creatorepisodes/${id}`)
  }
  const gotoPayment=(id)=>{
    navigate(`/paymentform/${id}`)
  }
  const gotoDetailsPage=(id)=>{
    navigate(`/episodedetailpage/${id}`)
  }
  
  const addToWishlist=(id)=>{
    axiosInstance
    .post('/addToWishlist', {
      listnerId: localStorage.getItem("listenerid"),
      podcastId: id
    })
    .then((response) => {
      if (response.data.status == 400) {
        alert('already in wishlist');
      } else {
        alert('saved to wishlist');
        navigate("/listenerWhishlist")
      }
      console.log(response, "ajeena");
    })
    .catch((error) => {
      console.error("Error submitting data: ", error);
    });  }

  return (
    <div className="podcast_list_main">
      <div class="container ">
      <h5 className="text-dark mt- pt-5">podcasts</h5>
        <div class="row row-cols-1 row-cols-md-4 g-4 mt-3">
          {creatorpodcast.length>0 ? (
            creatorpodcast.map((a) => (
                <div  className="card col-3" id="podcastlist_card">
                  <div class="podcastlist_card_img">
                    <img
                    src={data.url + a.coverimage.filename}
                    class="card-img-top"
                      id="adminclub"
                      alt="..."
                    />
                  </div>
                  <div class="podcastlist_card_content">
                    <h4 class="card-title mt-3 mb-2t">{a.podcastname}</h4>
                    <h6 class="card-text col">{a.creatorname}</h6>
                    <h6 class="card-text" style={{height:"110px"}}>{a.description}</h6>
                    <h6 class="card-text">{a.price}</h6>
                    {data.role === 'creator' ? '' : <button className="episodebtn" onClick={()=>gotoPayment(a._id)} >Subscribe</button>}
                    {data.role === 'creator' ? '' : <button className="episodebtn" onClick={()=>gotoDetailsPage(a._id)} >View Details</button>}
                    {data.role === 'creator'?<div className="text-center m-3"><button classname="episodebtn" onClick={()=>gotoEpisode(a._id + ',' + a.podcastname)} className="episodebtn">Go to Episode
                      <FaPlus  />
                    </button></div>:""}
                    <div className="audiodisplay">
                    {data.role === 'creator' ? '' : <button  className="whishlistbtn ms-5" onClick={()=>addToWishlist(a._id)} ><IoMdHeart/></button>}

                  <audio controls className="w-100">
                    <source src={a.audio ? data.url + a.audio.filename : ''} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
                  </div>
                  
                </div>
              )
          )) : (
            <div className="text-sucess">
              <h4 className="text-success text-center">No podcast found</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatorPodcastList;

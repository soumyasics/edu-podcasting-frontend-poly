import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Baseurl";
import { useParams } from "react-router-dom";

function ListenerViewEpisode() {
  const url='http://localhost:4000/'
  const navigate = useNavigate();
  const [podcast, setPodcast] = useState([]);
  // const [podcastId, setPodcastId] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    console.log(id);
    axiosInstance
      .post("/getPodcastByPodcastId", {
        id: id.split(",")[0],
      })
      .then((response) => {
        setPodcast(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log("Error submitting data: ", error);
      });

    axiosInstance
      .post("/getEpisodedOfPodcast", {
        id: id.split(",")[0],
      })
      .then((response) => {
        console.log("episode", response.data.data);
        setEpisodes(response.data.data);
      })
      .catch((error) => {
        console.log("Error submitting data: ", error);
      });
  }, []);

  const AddEpisode = (id) => {
    navigate(`/creatorepisodadd/${id}`);
  };

  const handleEpisodeEdit = (id) => {
    var data = id + "," + podcast[0].podcastname;
    navigate(`/creatoreditepisode/${data}`);
  };
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
                <div className="text-center">
                  <h6 class="card-text col">{item.creatorname}</h6>
                  <h6>Discription {item.description}</h6>
                </div>
              </div>
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
            {episodes.map((item) => (
              <Card
                className="col-6 m-3 mt-3"
                style={{
                  width: "95%",
                  height: "fit-content",
                  padding: "8px",
                }}
              >
                <p>{item.episodetitle}</p>
                <div class="row">
                  <div className="col-3">
                    <p>Episode {item.episodecount}</p>
                  </div>

                  <div className="col-6">
                    <audio controls style={{ width: "150%" }}>
                      <source
                        src={item.audio ? url + item.audio.filename : ""}
                        type="audio/mpeg"
                      />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListenerViewEpisode;
import React from "react";
import "./Landingpage.css";
import img from "../../Assest/Group 1.png";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import podcast from "../../Assest/CARD (1).png";
import { Link } from "react-router-dom";


function LandingPage(props) {

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <div className="landingpage_heading">
              <h1>Educate, Empower,</h1>
              <h1>Elevate</h1>
            </div>
            <div className="mb-4">
              Dive into a World of Knowledge with EduSphere
            </div>
            <p>
              "Welcome to edusphere, where curiosity meets expertise! Embark on
              an enlightening journey with our educational podcast, curated for
              passionate learners, eager to explore the depths of knowledge.
              Immerse yourself in thought-provoking discussions, expert
              interviews, and captivating stories that unravel the mysteries of
              science, history, technology, and beyond. Join our community of
              inquisitive minds, and let's redefine learning together. Tune in
              and transform your curiosity into wisdom !"
            </p>
            {
              props.data == 'listenerhome' ?

                <div className="mt-5">
                  <button className="seelatestpodcast text-decoration-none"><Link className="text-light text-decoration-none" to="/listenersubscription" >Latest podcast</Link></button>
                  <button className="btn border border-dark rounded-pill px-5 ms-3">
                    <Link className="text-dark text-decoration-none" to="/listenersubscription">Subscribe</Link>
                  </button>
                </div> :<div> <h6>welcome to podast world !</h6><button className="seelatestpodcast text-decoration-none"><Link className="text-light text-decoration-none" to="/ListenerLogin" > Get Started</Link></button></div>
            }
          </div>
          <div className="col-6">
            <img className="landingpage_img" src={img} alt="img" />
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Footer from "../../Pages/Listener/Footer";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../Baseurl";
import { toast } from "react-toastify";
import { BsArrowClockwise } from "react-icons/bs";
import { useParams, Link } from 'react-router-dom';

function Paymentform() {
  const [cardholdername, setCardholdername] = useState("");
  const [creaditcardnumber, setCredictcardnumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [CVV, setCVV] = useState("");


  const enteredDateObj = new Date(expirationDate);
  const currentDate = new Date();

  const { id } = useParams();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (cardholdername.length > 3) {
      if (creaditcardnumber.length == 16) {
        if (enteredDateObj > currentDate) {
          if (CVV.length == 3) {
            try {
              const result = await axiosInstance.post("/subscribePodcast", {
                listenerid: localStorage.getItem("listenerid"),
                podcastid: id,
                paymentstatus: true
              });
              if (result.data.status == 400) {
                alert('Already subscribed');
                navigate('/listenersubscription')
              } else {
                if (result.data.status == 200) {
                  alert('Payment Sucess');
                  navigate('/listenersubscription')
                }
              }

              console.log(result)
            } catch (err) {
              console.log("Error:", err);
              if (err.response && err.response.data && err.response.data.message) {
                document.getElementById("alertuser").innerHTML =
                  err.response.data.message;
              } else {
                document.getElementById("alertuser").innerHTML =
                  "An error occurred. Please try again.";
              }
            }
          } else {
            alert("must have 3 numbers")
          }
        } else {
          alert("please select future date")
        }

      } else {
        alert("card number must have 16 number")
      }

    } else {
      alert('enter cardholder name');
    }

  }
  return (
    <div>
      <div className="paymentmain">
        <div className="row">
          <div className="col">
            <div className="listenerlogin_form">
              <form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="cardholdername"
                    value={cardholdername}
                    onChange={(e) => setCardholdername(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="number"
                    placeholder="creaditcardnumber"
                    value={creaditcardnumber}
                    onChange={(e) => setCredictcardnumber(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="month"

                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                  />
                </Form.Group><Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Control
                    type="text"
                    placeholder="CVV"
                    value={CVV}
                    onChange={(e) => setCVV(e.target.value)}
                  />
                </Form.Group>
                <div id="alertuser"></div>
                <div>
                  <button type="button" onClick={handlePayment} className="listenerloginbtn mb-2 p-1">
                    proceed to payment
                  </button>{" "}
                </div>
                <div>
                  <button type="button"
                    className="listenercancelbtn p-1"
                    variant="secondary"
                  >
                    <Link  className="text-dark text-decoration-none" to="/listenerhome">Cancel
                    </Link>
                  </button>{" "}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paymentform;

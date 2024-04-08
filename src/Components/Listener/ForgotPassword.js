import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import "./landingnav.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../Baseurl';

function ForgotPassword() {
  const [resetpass, setResetpass] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const changefn = (e) => {
    const { name, value } = e.target;
    setResetpass((preData) => ({ ...preData, [name]: value }));
    setErrors((preErrors) => ({ ...preErrors, [name]: "" }));
  };
  let formValid = true;

  const submitfn = (e) => {
    e.preventDefault();

    let errors = {};
    if (!resetpass.email.trim()) {
      formValid = false;
      errors.email = "Email is required";
    }
    if (!resetpass.password.trim()) {
      formValid = false;
      errors.password = "Password is required";
    } else if (resetpass.password.length < 5) {
      errors.password = "Password should be atleast 6 characters";
    }

    if (resetpass.confirmpassword !== resetpass.password) {
      formValid = false;
      errors.confirmpassword = "Password not matched";
    }

    if (!resetpass.confirmpassword.trim()) {
      formValid = false;
      errors.confirmpassword = "Confirm Password is required";
    }

    setErrors(errors);

    if (formValid) {
      axiosInstance
        .post("/listenerforgotpassword", resetpass)
        .then((res) => {
          console.log("data", res);

          if (res.data.status == 200) {
            alert(res.data.msg);
            // navigate("/sign_in");
          } else if (res.data.status == 500) {
            alert(res.data.msg);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    } else {
      console.log("form", formValid);
    }
  };


  return (
    <div className="creatorforgot_main">
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6">
          <h6 className="pt-5 mt-5 text-center">Change password</h6>
          <div className="listenerlogin_form">
            <form type="Submit" onSubmit={submitfn}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="email" placeholder="Email Address" name='email' onChange={changefn}
                />{errors.email && (
                  <div className="text-danger errortext">{errors.email}</div>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="password" name='password' placeholder="new password" onChange={changefn}
                />{errors.password && (
                  <div className="text-danger errortext">{errors.password}</div>
                )}
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control type="password" name='confirmpassword' placeholder="Confirm password" onChange={changefn}
                />{errors.confirmpassword && (
                  <div className="text-danger errortext">{errors.confirmpassword}</div>
                )}
              </Form.Group>

              <div>
                <button type="submit" className="listenerloginbtn mb-2 p-1">Confirm</button>{' '}</div>
              <div>
                <button type="reset" className="listenercancelbtn p-1" variant="secondary">Cancel</button>{' '}</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;

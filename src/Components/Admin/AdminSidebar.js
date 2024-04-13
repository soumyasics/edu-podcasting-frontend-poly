import React ,{useEffect} from "react";
import { IoHomeSharp } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import { MdVideoLibrary } from "react-icons/md";
import { RiSearchLine } from "react-icons/ri";
import { RiLogoutCircleRLine  } from "react-icons/ri";
import {Link,useNavigate} from 'react-router-dom'
import { BsFileMusicFill } from "react-icons/bs";

function AdminSidebar() {
const navigate=useNavigate()

  const handlelogout=(e)=>{
    e.preventDefault()
    alert("admin logout sucessfully")
    localStorage.removeItem("admin")
    localStorage.removeItem("token")
    navigate("/adminhome")

  }
  useEffect(() => {
    if (localStorage.getItem("admin") == null) {
      navigate("/adminlogin");
    } 
  }, []);
  
  return (
    <div className="sidebar">
    <div className="container-fluid">
      <div className="sidebarelements">
        {" "}
        <Link to="/admindashboard"><IoHomeSharp className="text-dark" /></Link>
      </div>
      <div className="sidebarelements">
        {" "}
        <Link to="/podcastlist"><FaMicrophone className="text-dark" /></Link>

      </div>
      <div className="sidebarelements">
        {" "}
        <Link to="/creatorlist"><HiUsers className="text-dark" /></Link>

      </div>
      {/* <div className="sidebarelements"> 
        {" "}
        <Link to="/subscriptionList"><MdVideoLibrary className="text-dark" /></Link>

      </div>*/}
      <div className="sidebarelements">
        {" "}
        <div > <RiLogoutCircleRLine onClick={handlelogout} className="text-dark" /></div>
      </div>
    </div></div>
  );
}

export default AdminSidebar;

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../Baseurl';
import { useParams } from 'react-router-dom';
import { IoMdStar } from 'react-icons/io';

function ViewReview() {
  const [review, setReview] = useState([]); // Initialize review state as an empty array
  const { id } = useParams();

  useEffect(() => {
    axiosInstance
      .post('/getReviewaById', {
        id: id.split(',')[0],
      })
      .then((response) => {
        console.log('review', response);
        setReview(response.data.data);
      })
      .catch((error) => {
        console.log('Error submitting data: ', error);
      });
  }, []);
  useEffect(() => {
    if (localStorage.getItem("creatorid") == null) {
      navigate("/");
    } 
  }, []);

  return (
    <div className='container'>
      <div className='col-12 mt-5'>
        <h6>Here's what your happy customers are saying...</h6>
        {review.length > 0 ? (
          review.map((item) => (
            <ul className='list-group list-group-flush' key={item._id}>
              <li className='list-group-item'>
                <span className='badge text-bg-success rounded-pill'>
                  <IoMdStar />
                </span>
                <h6>{item.listenername}</h6>
                <h6>For Your {item.podcastname} Series</h6>
                <p>{item.feedback}</p>
                <hr />
              </li>
            </ul>
          ))
        ) : (
          <div className='fs-5 text-center text-success'>Feedback empty</div>
        )}
      </div>
    </div>
  );
}

export default ViewReview;

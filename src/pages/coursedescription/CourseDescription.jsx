import React, { useEffect, useState } from 'react';
import './coursedescription.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loading from '../../components/loading/Loading'; 
import { UserData } from '../../context/UserContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className='course-description'>
              <div className="course-header">
                <img src={`${server}/${course.image}`} alt="" className='course-image' />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} weeks</p>
                </div>
              </div>

              <p>{course.description}</p>
              <p>Let's get started with the course at ${course.price}</p>

              {user && user.subscription.includes(course._id) ? (
                <button onClick={() => navigate(`/course/study/${course._id}`)} className='common-btn'>
                  Study
                </button>
              ) : (
                <div style={{ marginTop: "1rem" }}>
                  <PayPalScriptProvider options={{ "client-id": "AZ5YQFwfbjyLxGvvkNYxm5NKf2zO1o_RC64eCMZMyQuKLFJb-7oJ2XJgLR-1aP8-LyQkmk9ogoehMzCR", currency: "USD" }}>
                    <PayPalButtons
                      style={{ layout: "vertical" }}
                      createOrder={async () => {
                        const token = localStorage.getItem("token");
                        const { data } = await axios.post(
                          `${server}/api/courses/checkout/${params.id}`,
                          {},
                          { headers: { token } }
                        );

                        const redirectUrl = new URL(data.forwardLink);
                        return redirectUrl.searchParams.get("token"); // PayPal Order ID
                      }}
                      onApprove={async (data, actions) => {
                        const token = localStorage.getItem("token");
                        try {
                          await axios.post(
                            `${server}/api/verification/${course._id}`,
                            {
                              paymentId: data.paymentID,
                              PayerID: data.payerID,
                              userId: user._id,
                              courseId: course._id,
                            },
                            { headers: { token } }
                          );

                          await fetchUser();
                          await fetchCourses();
                          await fetchMyCourse();

                          toast.success("Payment successful!");
                          navigate(`/course/study/${course._id}`);
                        } catch (err) {
                          toast.error("Payment verification failed.");
                        }
                      }}
                      onError={(err) => {
                        toast.error("Payment failed. Please try again.");
                        console.error(err);
                      }}
                    />
                  </PayPalScriptProvider>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
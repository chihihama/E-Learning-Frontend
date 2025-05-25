import React, { useEffect } from "react";
import "./paymentsuccess.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { server } from "../../main";

const PaymentSuccess = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentId = query.get("paymentId");
    const PayerID = query.get("PayerID");
    const courseId = query.get("courseId");
    const userId = query.get("userId");
    const token = localStorage.getItem("token");

    if (paymentId && PayerID && courseId && userId) {
      axios.post(`${server}/api/verification/${courseId}`, {
        paymentId,
        PayerID,
        courseId,
        userId,
      }, {
        headers: { token },
      }).then((res) => {
        toast.success("Payment successful!");
        navigate(`/course/study/${courseId}`);
      }).catch((err) => {
        toast.error("Verification failed");
        navigate("/");
      });
    }
  }, [location, navigate]);

  return (
    <div className="payment-success-page">
      <div className="success-message">
        <h2>Verifying your payment...</h2>
        <p>Please wait while we confirm your course subscription.</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
export default function Home() {
  const session = useSession();
  const [advertisor, setAdvertisor] = useState([]);
  useEffect(() => {
    const getUserItems = async () => {
      if (session.data) {
        const data = await axios
          .post("/api/user/gethistory", {
            email: session.data.user.email_address,
          })
          .catch((reason) => {
            console.log(reason.response.data);
          });
        console.log(data.data);
        setAdvertisor(data.data);
      }
    };
    getUserItems();
  }, [session]);
  return (
    <>
      {advertisor && (
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {advertisor.map((item) => (
              <div
                key={item[0].id}
                className={
                  item[0].id === advertisor[0][0].id
                    ? "carousel-item active"
                    : "carousel-item"
                }
              >
                <img
                  src={item[0].imageurl}
                  className="d-block w-100"
                  alt="Ad"
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      )}
    </>
  );
}

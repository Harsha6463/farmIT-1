import React from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';
import './Contact.css';
import API from '../API';

const ContactUs = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!email || !phone || !message || !fullName) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await API.post("/auth/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          mobileNumber: phone,
          subject: `Contact from ${fullName}`,
          message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Message sent successfully!");
        e.target.reset(); 
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <section className="py-3 py-md-5 py-xl-8" style={{ backgroundColor: 'white', paddingLeft: '30px', paddingRight: '30px' }}>
        <div>
          <div className="row justify-content-md-center">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7 col-xxl-6">
              <h2 className="mb-4 display-5 text-center" style={{ color: 'black' }}>Need Help</h2>
              <p style={{ color: "black" }} className=" mb-5 text-center lead fs-4">
                Our team is available to provide prompt and helpful responses to all inquiries. You can reach us via phone, email, or by filling out the contact form below.
              </p>
              <hr className="w-50 mx-auto mb-5 mb-xl-9 border-dark-subtle" />
            </div>
          </div>
        </div>

        <div>
          <div className="row">
            <div className="col-12">
              <div className="card border border-dark rounded shadow-sm overflow-hidden">
                <div className="card-body p-0">
                  <div className="row gy-3 gy-md-4 gy-lg-0">
                    <div
                      className="col-12 col-lg-6 bsb-overlay background-position-center background-size-cover text-white"
                      style={{
                        '--bsb-overlay-opacity': 0.5,
                        '--bsb-overlay-bg-color': 'rgba(0, 0, 0, 1)',
                        backgroundColor: 'black',
                        backgroundImage: "url('./assets/contact2.jpg')",
                        animation: 'fadeInBackground 3s ease-in-out',
                        position: 'relative'
                      }}
                    >
                      <div className="row align-items-lg-center justify-content-center h-100">
                        <div className="col-11 col-xl-10">
                          <div className="contact-info-wrapper py-4 py-xl-5">
                            <h2 style={{ color: "white" }} className="display-3 fw-bold mb-4">Get in touch</h2>
                            <p style={{ color: "#fff" }} className="lead fs-4 opacity-75 mb-4 mb-xxl-5">
                              We're always on the lookout to work with new clients. If you're interested in working with us, please get in touch in one of the following ways.
                            </p>
                            <div className="d-flex mb-4 mb-xxl-5">
                              <div className="me-4 text-primary">
                                <FaMapMarkerAlt size={36} />
                              </div>
                              <div>
                                <h4 style={{ color: "white", fontSize: "2.25rem", textAlign: "left" }}>Address</h4>
                                <address style={{ color: "white", fontSize: "20px" }} className="link-white mb-0 fs-4 opacity-75"> Plat-No:123-23,Cyber-Towers, Hi-Tech City, HYD</address>
                              </div>
                            </div>
                            <div className="row mb-4 mb-xxl-5">
                              <div className="col-12 col-xxl-6">
                                <div className="d-flex mb-4 mb-xxl-0">
                                  <div className="me-4 text-primary">
                                    <FaPhone size={36} />
                                  </div>
                                  <div>
                                    <h4 style={{ color: "white", fontSize: "2.25rem", textAlign: "left" }}>Phone</h4>
                                    <p className="mb-0 fs-5">
                                      <p style={{ color: "white" }} className="link-white link-opacity-75 link-opacity-100-hover text-decoration-none" href="+91 9390034150">+91 9390034150</p>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-xxl-6">
                                <div className="d-flex mb-0">
                                  <div className="me-4 text-primary">
                                    <FaEnvelope size={36} />
                                  </div>
                                  <div>
                                    <h4 style={{ color: "white", fontSize: "2.25rem", textAlign: "left" }}>Email</h4>
                                    <p className="mb-0 fs-5">
                                      <p style={{ color: "white" }} className="link-white link-opacity-75 link-opacity-100-hover text-decoration-none" href="vardhan6463@gmail.com">vardhan6463@gmail.com</p>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 col-lg-6">
                      <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                          <h2 className="h1 mb-3 display-4">Contact Form</h2>
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-12">
                                <label htmlFor="fullName" className="form-label fw-bold text-start">Full Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" id="fullName" placeholder="👤 Your Full Name" required />
                              </div>
                              <div className="col-12 col-md-6">
                                <label htmlFor="email" className="form-label fw-bold text-start">📧 Email <span className="text-danger">*</span></label>
                                <div className="input-group">
                                  <input type="email" className="form-control" id="email" name="email" required placeholder="📧 Enter your email" />
                                </div>
                              </div>
                              <div className="col-12 col-md-6">
                                <label htmlFor="phone" className="form-label fw-bold text-start"> Phone Number</label>
                                <div className="input-group">
                                  <input type="text" className="form-control" id="phone" placeholder="📱 Your Phone Number" />
                                </div>
                              </div>
                              <div className="col-12">
                                <label htmlFor="message" className="form-label fw-bold text-start">💬 Message <span className="text-danger">*</span></label>
                                <textarea className="form-control" id="message" rows="4" required placeholder=" Your message..."></textarea>
                              </div>
                              <div className="col-12 mt-3">
                                <button type="submit" className="btn btn-primary btn-lg w-100 h-100">Send Message</button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;

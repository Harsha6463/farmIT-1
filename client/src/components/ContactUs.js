
import React, { useState } from 'react';
import './Contact.css';
import API from '../API';
import { toast } from 'react-toastify';

const ContactUs = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
       toast.error("Please fill in both the subject and message.");
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const response = await API.post(`/contactus/${userId}`, {
        subject,
        message,
      });

      if (response.status === 200) {
         toast.success("Message sent successfully! Please check your email for confirmation.");
        setSubject('');
        setMessage('');
      } else {
         toast.error(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Server error. Please try again later.");
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
                        <h2 className="h1 mb-3 text-light">Get in touch</h2>
                        <p className="lead fs-4 text-light opacity-75 mb-4 mb-xxl-5">We're always on the lookout to work with new clients. If you're interested in working with us, please get in touch in one of the following ways.</p>
                        <div className="d-flex mb-4 mb-xxl-5">
                          <div  style={{marginLeft:"10px"}}className="me-4 text-primary">
                            <svg  xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-geo" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z" />
                            </svg>
                          </div>
                          <div>
                            <h3 style={{color:"white"}} className="mb-3 text">Address</h3>
                            <address style={{color:"white"}} >Plat-No:123-23,Cyber-Towers, Hi-Tech City, HYD</address>
                          </div>
                        </div>
                        <div className="row mb-4 mb-xxl-5">
                          <div className="col-12 col-xxl-6">
                            <div className="d-flex mb-4 mb-xxl-0">
                              <div style={{marginLeft:"10px"}} className="me-4 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-telephone-outbound" viewBox="0 0 16 16">
                                  <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511zM11 .5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V1.707l-4.146 4.147a.5.5 0 0 1-.708-.708L14.293 1H11.5a.5.5 0 0 1-.5-.5z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="mb-3 text-light">Phone</h3>
                                <p tyle={{color:"white"}} > +91 9390034150</p>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-xxl-6">
                            <div className="d-flex">
                              <div className="me-4 text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zM1 4v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1z"/>
                                </svg>
                              </div>
                              <div>
                                <h3 className="mb-3 text-light">Email</h3>
                                <p style={{color:"white"}} > farmit@farmconnect.com</p>
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
                                <label htmlFor="subject" className="form-label fw-bold text-start">Subject <span className="text-danger">*</span></label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="subject"
                                  value={subject}
                                  onChange={(e) => setSubject(e.target.value)}
                                  placeholder="👤 Subject"
                                  required
                                />
                              </div>
                              <div className="col-12">
                                <label htmlFor="message" className="form-label fw-bold text-start">💬 Message <span className="text-danger">*</span></label>
                                <textarea
                                  className="form-control"
                                  id="message"
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  rows="4"
                                  required
                                  placeholder="Your message..."
                                />
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
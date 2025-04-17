import React, { useState } from 'react';
import './Contact.css';
import API from '../API';

const ContactUs = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !message) {
      setErrorMessage("Please fill in both the subject and message.");
      return;
    }

    try {
      const userId = localStorage.getItem('userId');

      const response = await API.post(`/contactus/${userId}`, {
        subject,
        message,
      });

      if (response.status === 200) {
        setSuccessMessage("Message sent successfully! Please check your email for confirmation.");
        setSubject('');
        setMessage('');
      } else {
        setErrorMessage(response.data.message || "Something went wrong.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setErrorMessage("Server error. Please try again later.");
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
                          {errorMessage && <p className="text-danger">{errorMessage}</p>}
                          {successMessage && <p className="text-success">{successMessage}</p>}
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

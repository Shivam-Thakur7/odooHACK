import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  function formSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    fetch("https://getform.io/f/amdkwqmb", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
    .then((response) => {
      console.log(response);
      document.getElementById('form').reset();
    })
    .catch((error) => console.log(error));
  }

  useEffect(() => {
    const form = document.getElementById("form");
    form.addEventListener("submit", formSubmit);
  }, []);

  return (
    <section className="py-20 bg-[#FAFAF0] font-sans text-[#234B28]">
      <div className="container mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Get in Touch
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#234B28]/80 text-lg max-w-2xl mx-auto"
          >
            Have questions or want to learn more? We're here to help. 
            Reach out to us through the form below or contact us directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {[
              {
                icon: <FaEnvelope className="text-xl text-[#90EE90]" />,
                title: "Email",
                info: "support@CivicSense.com"
              },
              {
                icon: <FaPhone className="text-xl text-[#90EE90]" />,
                title: "Phone",
                info: "+91 7508267254"
              },
              {
                icon: <FaMapMarkerAlt className="text-xl text-[#90EE90]" />,
                title: "Location",
                info: "Chitkara University\nPunjab"
              }
            ].map(({ icon, title, info }, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-[#E5E5DC] shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-[#90EE90]/10 flex items-center justify-center">
                    {icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{title}</h3>
                    <p className="whitespace-pre-line text-[#234B28]/80">{info}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl p-8 border border-[#E5E5DC] shadow"
          >
            <form method="POST" acceptCharset="UTF-8" id="form" className="space-y-6">
              {["name", "email", "subject"].map((field, i) => (
                <div key={i}>
                  <label htmlFor={field} className="block text-sm font-medium mb-2 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    id={field}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[#FAFAF0] border border-[#E5E5DC] text-[#234B28] focus:outline-none focus:ring-2 focus:ring-[#90EE90]/50 transition duration-300"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#FAFAF0] border border-[#E5E5DC] text-[#234B28] focus:outline-none focus:ring-2 focus:ring-[#90EE90]/50 transition duration-300"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-[#90EE90] text-white px-8 py-4 rounded-xl font-medium shadow hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <FaPaperPlane className="text-lg" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
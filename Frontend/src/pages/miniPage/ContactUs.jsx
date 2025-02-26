import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactUs = () => {
  const form = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(form.current);
    formData.append("date", new Date().toLocaleString());

    emailjs
      .sendForm(
        import.meta.env.VITE_SERVICE_ID,
        import.meta.env.VITE_TEMPLATE_ID,
        form.current,
        { publicKey: import.meta.env.VITE_PUBLIC_KEY }
      )
      .then(
        (response) => {
          console.log("✅ Email Sent Successfully:", response);
          setIsLoading(false);
          toast.success("Message sent successfully! 🎉", { position: "top-right", autoClose: 3000 });
          form.current.reset();
        },
        (error) => {
          console.error("❌ Email Sending Failed:", error);
          setIsLoading(false);
          toast.error("Failed to send message. ❌", { position: "top-right", autoClose: 3000 });
        }
      );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 px-6">
      <form
        ref={form}
        onSubmit={handleSubmit}
        className="bg-white p-8 md:p-10 rounded-2xl shadow-xl w-full max-w-lg transition-all duration-300 hover:shadow-2xl"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">📩 Contact Us</h2>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="user_username"
            placeholder="John Doe"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="user_email"
            placeholder="john@gmail.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
          <textarea
            name="user_message"
            rows="5"
            placeholder="Write your message..."
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-300 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className={`w-full bg-indigo-600 text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed animate-pulse" : "hover:bg-indigo-800"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send Message"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default ContactUs;

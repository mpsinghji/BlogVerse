import React from "react";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#111] to-[#111] backdrop-blur-xl border-b border-slate-700/30 fixed w-full z-50">

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-300 bg-clip-text text-transparent">
                BlogVerse
              </span>
            </div>
            <p className="text-slate-400/80 text-sm">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Asperiores quos officiis cum quaerat consequuntur nam sunt aut
              molestias, ut nostrum eos enim eum doloremque et voluptas! Itaque
              unde fuga consequatur.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold bg-white bg-clip-text text-transparent">
              Explore
            </h4>
            <ul className="space-y-2">
              {[
                  { name: "Home", path: "/" },
                { name: "About Us", path: "/about-us" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Contact", path: "/contact-us" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.path}
                    className="text-slate-400/80 hover:text-purple-300 transition-colors duration-300 text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold bg-white bg-clip-text text-transparent">
              Connect
            </h4>
            <div className="flex space-x-4">
              {[
                {
                  icon: FaTwitter,
                  color: "#1DA1F2",
                  link: "https://x.com/mpsinghji",
                },
                {
                  icon: FaGithub,
                  color: "#FFF",
                  link: "https://github.com/mpsinghji",
                },
                {
                  icon: FaLinkedin,
                  color: "#0077B5",
                  link: "https://www.linkedin.com/in/manpreetsingh2004/",
                },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-800/40 backdrop-blur-sm border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-110"
                >
                  <social.icon
                    className="w-6 h-6"
                    style={{ color: social.color }}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold bg-white bg-clip-text text-transparent">
              Stay Updated
            </h4>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-slate-800/40 backdrop-blur-sm rounded-lg border border-slate-700/30 focus:border-purple-500/60 px-4 py-2 text-slate-100 placeholder-slate-400 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white rounded-lg transition-all duration-300"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-700/30 mt-12 pt-8 text-center">
          <p className="text-slate-400/80 text-sm">
            © {new Date().getFullYear()} BlogVerse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

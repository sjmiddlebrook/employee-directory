import PropTypes from "prop-types";
import React from "react";
import Header from "./header";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white justify-between">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-auto">
            {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

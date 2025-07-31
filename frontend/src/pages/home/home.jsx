// App.js
import React from "react";
import { SearchProvider } from '../../../context/SearchContext';
import Navbar from "../../components/navbar/navbar";
// import Store from "../../components/Store/Store";

import Ustore from "../ustore/ustore";


function Home() {
  return (
    <SearchProvider>
    <div>

     <Navbar/>
     {/* <CartProvider>  */}
     
     {/* </CartProvider>  */}

     {/* <Store/> */}

      {/* Header Section */}
      <header className="bg-light py-5">
        <div className="container text-center">
          <h1 className="display-4">Welcome to My Website</h1>
          <p className="lead">
            This is a simple hero unit for calling attention to featured content.
          </p>
          <a href="#" className="btn btn-primary btn-lg">
            Learn More
          </a>
        </div>
      </header>
      <Ustore/>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5 className="card-title">Feature One</h5>
                  <p className="card-text">
                    Some quick example text to build on the feature.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5 className="card-title">Feature Two</h5>
                  <p className="card-text">
                    Some quick example text to build on the feature.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="card border-0 shadow">
                <div className="card-body">
                  <h5 className="card-title">Feature Three</h5>
                  <p className="card-text">
                    Some quick example text to build on the feature.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-4">
  <div className="container text-center">
    <p className="mb-0">
     
      &copy; 2024 Lilo. All Rights Reserved.
    </p>
  </div>
</footer>

    </div>
    </SearchProvider>
  );
}

export default Home;




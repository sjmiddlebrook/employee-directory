import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

function Overview() {

  return (
    <Layout>
      <SEO
        title="Overview"
      />

      <section className="text-center">
        <h1 className="inline-block p-3 my-4 text-2xl md:text-4xl font-bold">
          Employee Explorer
        </h1>
        <div>
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
              </div>
              <input id="employeeSearchInput"
                     className="form-input block w-full rounded-none rounded-l-md pl-10 py-4 transition ease-in-out duration-150 sm:leading-5"
                     placeholder="Employee Name" />
            </div>
            <button
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-900 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
              <span>Search</span>
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default Overview;

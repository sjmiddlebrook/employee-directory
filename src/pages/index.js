import React, {useState} from "react";
import { navigate } from '@reach/router';
import Layout from "../components/layout";
import SEO from "../components/seo";
import {getEmployeeData} from "../utils/utils";

function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState(null);

  function handleSearch() {
    if (searchValue === '') {
      setSearchResults([]);
      return;
    }

    getEmployeeData(searchValue)
      .then(employeeData => {
        if (employeeData === undefined) {
          setSearchResults([]);
        } else {
          setSearchResults([employeeData]);
        }
      })
      .catch(() => setSearchResults([]));
  }

  function employeeClickHandler(employeeData) {
    navigate(`/overview?name=${employeeData.name}`, { state: employeeData });
  }

  const EmployeeList = () => {
    if (searchResults.length === 0) {
      return (
        <div className="text-gray-700 pt-8">
          <p>No employees found</p>
        </div>
      );
    }

    return (
      <div className="bg-white overflow-hidden sm:rounded-md mt-6">
        <h2 className="text-gray-500">Search Results</h2>
        <ul>
          {searchResults.map(({name, title, directSubordinates}) => {
            return (
              <li key={name} className="rounded-md border border-gray-300 my-4">
                <button
                   onClick={() => employeeClickHandler({name, title, directSubordinates})}
                   className="block w-full hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                  <div className="px-4 py-4 flex items-center sm:px-6">
                    <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div>
                        <div className="text-md leading-5 font-medium text-gray-700 truncate">
                          {name}
                        </div>
                      </div>
                    </div>
                    <div className="ml-5 flex-shrink-0">
                      <svg className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd"
                              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                              clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <Layout>
      <SEO
        title="Home"
      />
      <section className="text-center">
        <h1 className="inline-block p-3 my-4 text-2xl md:text-4xl font-bold text-gray-700">
          Employee Explorer
        </h1>
        <div>
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd"
                        d="M10 9C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3C8.34315 3 7 4.34315 7 6C7 7.65685 8.34315 9 10 9ZM3 18C3 14.134 6.13401 11 10 11C13.866 11 17 14.134 17 18H3Z"/>
                </svg>
              </div>
              <input id="searchInput"
                     className="form-input text-gray-700 block w-full rounded-none rounded-l-md pl-10 py-4 transition ease-in-out duration-150 sm:leading-5"
                     onChange={e => setSearchValue(e.target.value)}
                     placeholder="Employee Name"/>
            </div>
            <button
              className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-r-md text-gray-700 bg-gray-50 hover:text-gray-900 hover:bg-white focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
              onClick={handleSearch}
            >
              <span>Search</span>
            </button>
          </div>
        </div>
        {
          searchResults !== null ?
            <EmployeeList/>
            : null
        }
      </section>
    </Layout>
  );
}

export default Home;

import React, {useEffect, useState} from "react";
import queryString from "query-string";
import Layout from "../components/layout";
import SEO from "../components/seo";
import PropTypes from 'prop-types';
import {getAllSubordinates, getEmployeeData} from "../utils/utils";
import {navigate} from "@reach/router";

function Overview({location}) {
  // get url parameters
  const parsed = queryString.parse(location.search);

  const [subordinates, setSubordinates] = useState(null);
  // if no name in query param then employeeName will be undefined
  const [employeeName, setEmployeeName] = useState(parsed.name);
  // state data will be available if visiting overview page from the home page
  const [employeeData, setEmployeeData] = useState(location.state);

  useEffect(() => {
      if (employeeName !== undefined && employeeData === null) {
        // case where new employee name is entered in the url query param directly
        getEmployeeData(employeeName)
          .then(returnData => {
            if (returnData === undefined || returnData.directSubordinates === undefined) {
              // no subordinates
              setSubordinates([]);
            } else {
              getAllSubordinates(returnData.directSubordinates)
                .then(allSubordinates => {
                  setSubordinates(allSubordinates);
                })
                .catch(() => { setSubordinates([]) });
            }
          })
          .catch(() => setSubordinates(null));
      } else {
        if (employeeData.directSubordinates === undefined) {
          setSubordinates([]);
        } else {
          getAllSubordinates(employeeData.directSubordinates)
            .then(allSubordinates => {
              setSubordinates(allSubordinates);
            });
        }
      }
    }, [employeeName],
  );

  function employeeClickHandler(name) {
    navigate(`/overview?name=${name}`, {state: null});
    setEmployeeName(name);
    setEmployeeData(null);
  }

  const EmployeeOverview = () => {
    if (subordinates === undefined || subordinates.length === 0) {
      return (
        <div className="text-gray-700 pt-8">
          <h2>No subordinates for employee <strong>{employeeName}</strong></h2>
        </div>
      );
    }

    return (
      <div className="bg-white overflow-hidden sm:rounded-md mt-6">
        <h2 className="text-gray-700">Subordinates of employee <strong>{employeeName}</strong>:</h2>
        <ul>
          {subordinates.map((name) => {
            return (
              <li key={name} className="rounded-md border border-gray-300 my-4">
                <button
                  className="block w-full"
                  onClick={() => employeeClickHandler(name)}>
                <div className="text-gray-700 py-2">
                  <p>{name}</p>
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
        title="Overview"
      />
      <section className="text-center">
        <h1 className="inline-block p-3 my-4 text-2xl md:text-4xl font-bold text-gray-700">
          Employee Overview
        </h1>
        <div>
          {
            subordinates !== null ?
              <EmployeeOverview />
              : null
          }
        </div>
      </section>
    </Layout>
  );
}

Overview.propTypes = {
  location: PropTypes.object
};

export default Overview;

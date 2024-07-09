import React from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumbs } from "@material-tailwind/react";

import PropTypes from "prop-types";

const BreadcrumbsWithIcon = ({ name }) => {
  const location = useLocation();
  const pathname = location.pathname.split("/");
  pathname.shift();
  const last = pathname.pop();
  return (
    <Breadcrumbs>
      <a href="/" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>
      {pathname.map((item, index) => {
        // Construct the path for each breadcrumb
        const pathTo = `/${pathname.slice(0, index + 1).join("/")}`;
        return (
          <a key={index} href={pathTo} className="opacity-60 uppercase">
            <span>{item}</span>
          </a>
        );
      })}
      <a href={location.pathname} className="uppercase">
        {last}
      </a>
    </Breadcrumbs>
  );
};

BreadcrumbsWithIcon.propTypes = {
  name: PropTypes.string,
};
export default BreadcrumbsWithIcon;

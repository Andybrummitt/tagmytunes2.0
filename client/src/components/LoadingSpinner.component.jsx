import React from 'react';
import BarLoader from "react-spinners/BarLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const LoadingSpinner = ({loading}) => {
  return (
    <BarLoader loading={loading} cssOverride={override} size={150} />
  )
}

export default LoadingSpinner;
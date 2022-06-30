import React from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";

const LoadingSpinner = ({loading}) => {
  return (
    <ScaleLoader color={"#FFFFFF"} loading={loading} size={150} />
  )
}

export default LoadingSpinner;
import React from 'react';
import MoonLoader from "react-spinners/MoonLoader";

const LoadingSpinner = ({loading}) => {
  return (
    <MoonLoader speedMultiplier={0.5} loading={loading} size={150} />
  )
}

export default LoadingSpinner;
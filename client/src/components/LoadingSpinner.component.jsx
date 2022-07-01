import React from 'react';
import { ScaleLoader } from "react-spinners";

const LoadingSpinner = ({loading}) => {
  return (
    <ScaleLoader color={"#FFFFFF"} loading={loading} width={8} height={50} />
  )
}

export default LoadingSpinner;
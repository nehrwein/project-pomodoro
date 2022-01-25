import React from 'react';
import { useSelector } from "react-redux";

const LoadingIndicator = () => {
  const loading = useSelector((state) => state.ui.loading)
  return <>{loading && <div>loading !!!</div>}</>;
};

export default LoadingIndicator;

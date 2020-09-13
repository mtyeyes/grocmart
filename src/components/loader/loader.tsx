import React, { useEffect, useState } from 'react';
import './loader.styl';

import useFetchJson from '../../hooks/use-fetch-json';

type Props = {
  loaderSize?: number,
  transferData: (requestResult: any) => void,
  requests: { [key: string]: string },
}

const Loader: React.FC<Props> = ({ loaderSize, transferData, requests, children }) => {
  const [loadingState, setloadingState] = useState('loading');
  const [requestResult, setResult] = useState({});

  for (const [requestId, linkToResourse] of Object.entries(requests)) {
    const request = useFetchJson(linkToResourse);
    useEffect(() => {
      if (request.isLoading === false) {
        (request.isError) ? setloadingState('error') : setResult((prevResult)=>{return {...prevResult, [requestId]: request.data}});
      }
    }, [request]);
  }
  useEffect(() => {
    if (Object.keys(requests).length === Object.keys(requestResult).length) {
      if (loadingState !== 'error') {
        transferData(requestResult);
        setloadingState('success');
      }
    }
  }, [requestResult]);

  let radiusSize, marginSize;
  if (loaderSize) {
    radiusSize = `${loaderSize}px`;
    marginSize = `${loaderSize * 0.6}`;
  } else {
    radiusSize = '10px';
    marginSize = '6px';
  }
  const style = {
    margin: `0 ${marginSize}`,
    width: radiusSize,
    height: radiusSize,
  };


  const loaderRender = (loadingState: string) => {
    switch(loadingState) {
    case 'loading':
      return (
        <div className="loader">
          <div className="loader__shape" style={style} />
          <div className="loader__shape" style={style}/>
          <div className="loader__shape" style={style}/>
        </div>
      );
    case 'error':
      return (
        <div className="loader loader--error">
          <p className="loader__error-text">Error getting data</p>
        </div>
      );
    case 'success':
      return (
        <>
          {children}
        </>
      );
    }
  };

  return (
    <>
      {loaderRender(loadingState)}
    </>
  );
};

export default Loader;
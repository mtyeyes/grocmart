import React, { useEffect, useState, ReactNode } from 'react';
import './loader.styl';

import { StateKeys } from '../../store/index';
import useFetchAndCacheJson from '../../hooks/use-fetch-and-cache-json';
import useLoadState from '../../hooks/use-load-state';
import { PATH } from '../../app';

type Props<T extends object, K extends keyof T> = PropsOnlyStateRequests | PropsOnlyResourceRequests<T, K> | PropsStateAndResourceRequests<T, K>;

type PropsOnlyStateRequests = {
  customColor?: 'white' | undefined,
  children: ReactNode,
  requests: {
    stateRequests: StateKeys[]
  }
}

type PropsOnlyResourceRequests<T extends object, K extends keyof T> = {
  customColor?: 'white' | undefined,
  children: ReactNode,
  requests: {
    resourceRequests: K[]
  },
  transferRequestedResources: (requestsResults: T) => void
}

type PropsStateAndResourceRequests<T extends object, K extends keyof T> = {
  customColor?: 'white' | undefined,
  children: ReactNode,
  requests: {
    stateRequests: StateKeys[],
    resourceRequests: K[]
  },
  transferRequestedResources: (requestsResults: T) => void
}


const fiveMinutes = 300000;

const Loader = <T extends object, K extends keyof T>(props: Props<T, K>) => {
  const { requests, children, customColor } = props;
  const loadState = useLoadState();
  const [loadingState, setloadingState] = useState('loading');
  const [stateRequestsResults, setStateRequestsResults] = useState({} as object);
  const [resourcesRequestsResults, setResourcesRequestsResults] = useState({} as T);

  const fetchRequest = (requestId: keyof T | string, requestType: 'stateRequests' | 'resourceRequests') => {
    const request = useFetchAndCacheJson(`${PATH}mocks/${requestId}.json`, fiveMinutes);
    useEffect(() => {
      if (request.isLoading === false) {
        if(request.isError) { setloadingState('error') } else {
          (requestType === 'stateRequests')
            ? setStateRequestsResults(prevState => { return {...prevState, [requestId]: request.data} })
            : setResourcesRequestsResults(prevState => { return {...prevState, [requestId]: request.data} });
        }
      }
    }, [request]);
  };

  const fetchRequests = () => {
    if('stateRequests' in requests) {
      requests.stateRequests.forEach( requestId => fetchRequest(requestId, 'stateRequests') );
    }
    if('resourceRequests' in requests) {
      requests.resourceRequests.forEach( requestId => fetchRequest(requestId, 'resourceRequests') );
    }
  };

  fetchRequests();

  useEffect(() => {
    const allStateRequestsCompleted = !('stateRequests' in requests) || requests.stateRequests.length === Object.keys(stateRequestsResults).length;
    const allResourceRequestsCompleted = !('resourceRequests' in requests) || requests.resourceRequests.length === Object.keys(resourcesRequestsResults).length;

    if (allStateRequestsCompleted && allResourceRequestsCompleted && loadingState !== 'error') {
      loadState(stateRequestsResults);
      if ('transferRequestedResources' in props) {props.transferRequestedResources!(resourcesRequestsResults)}
      setloadingState('success');
    }
  }, [stateRequestsResults, resourcesRequestsResults]);


  const loaderRender = (loadingState: string) => {
    switch(loadingState) {
    case 'loading':
      return (
        <div className={(customColor !== undefined) ? `loader loader--${customColor}` : 'loader'}>
          <div className="loader__shape" />
          <div className="loader__shape" />
          <div className="loader__shape" />
        </div>
      );
    case 'error':
      return (
        <div className={(customColor !== undefined) ? `loader loader--${customColor} loader--error` : 'loader loader--error'}>
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
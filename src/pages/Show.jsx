import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cast from '../Components/show/Cast';
import Details from '../Components/show/Details';
import Seasons from '../Components/show/Seasons';
import ShowMainData from '../Components/show/ShowMainData';
import { apiGet } from '../misc/config';
import { InfoBlock, ShowPageWrapper } from './Show.Style';

const reducer = (prevState, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS': {
      return { ...prevState, isLoading: false, show: action.show, error: null };
    }
    case 'FETCH_FAILED': {
      return { ...prevState, isLoading: false, error: action.erorr };
    }

    default:
      return prevState;
  }
};

const initialState = {
  show: null,
  isLoading: true,
  erorr: null,
};

function Show() {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`).then(results => {});
    let isMounted = true;

    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(results => {
        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', show: results });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({ type: 'FETCH_FAILED', error: err.message });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }
  if (error) {
    return <div>Error Occured: {error}</div>;
  }

  return (
    <ShowPageWrapper>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      ></ShowMainData>
      <InfoBlock>
        <h2>
          Details
          <Details
            status={show.status}
            netowkr={show.network}
            premiere={show.premiere}
          ></Details>
        </h2>
        <h2>
          Seasons
          <Seasons seasons={show._embedded.seasons}></Seasons>
        </h2>
        <h2>
          Cast
          <Cast cast={show._embedded.cast}></Cast>
        </h2>
      </InfoBlock>
    </ShowPageWrapper>
  );
}

export default Show;

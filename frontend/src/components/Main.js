import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../utils/constants';
import thoughts from '../reducers/thoughts';
import user from '../reducers/user';

const Main = () => {
  const thoughtsItems = useSelector((store) => store.thoughts.items);
  const accessToken = useSelector((store) => store.user.accessToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login');
    }
  }, [accessToken, navigate]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: accessToken,
      },
    };

    fetch(API_URL('thoughts'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(thoughts.actions.setItems(data.response));
          dispatch(thoughts.actions.setError(null));
        } else {
          dispatch(thoughts.actions.setItems([]));
          dispatch(thoughts.actions.setError(data.response));
        }
      });
  }, [accessToken, dispatch]);

  return (
    <div>
      <h1>Protected happy thoughts:</h1>
      {thoughtsItems.map((item) => (
        <div key={item._id}>{item.message}</div>
      ))}
      <button onClick={() => dispatch(user.actions.setAccessToken(null))}>Log out</button>
    </div>
  );
};

export default Main;
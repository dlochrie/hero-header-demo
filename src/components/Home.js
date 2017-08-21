import React from 'react';
import {
  Link,
} from 'react-router-dom';

const Home = () => (
  <div>
    <h2>Home</h2>
    <ul>
      <li>
        <Link to={'/variants/fs-video'}>Full Screen Video!</Link>
      </li>
      <li>
        <Link to={'/variants/fs-image'}>Full Screen Image!</Link>
      </li>
      <li>
        <Link to={'/variants/nothing'}>Nothing!</Link>
      </li>
    </ul>
  </div>
);

export default Home;

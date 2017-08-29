import React from 'react';
import { Col, Row } from 'reactstrap';

import VerticalPlaylist from '../containers/VerticalPlaylist';

import './SidePlaylist.css';

const FSVideo = () => (
  <Row>
    <Col className="mx-auto" md="10">
      <div className="sidePlaylist">
        <VerticalPlaylist />
      </div>
    </Col>
  </Row>
);

export default FSVideo;

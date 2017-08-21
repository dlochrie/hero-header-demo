import React from 'react';
import { Col, Row } from 'reactstrap';

const NoHeader = () => (
  <div>
    <Row>
      <Col sm={{ size: '10', offset: 1 }} xs="12">
        <h1><em>No Header</em></h1>
      </Col>
    </Row>
  </div>
);

export default NoHeader;

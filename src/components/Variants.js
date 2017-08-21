import React from 'react';
import { Col, Row } from 'reactstrap';
import ReactRouterPropTypes from 'react-router-prop-types';

import FSImage from './FSImage';
import FSVideo from './FSVideo';
import NoHeader from './NoHeader';
import TopChannelInfiniteList from '../containers/TopChannelInfiniteList';

const variants = {
  'fs-video': <FSVideo />,
  'fs-image': <FSImage />,
  nothing: <NoHeader />,
};

const Variants = ({ match }) => {
  const homeVariant = match.params.variantId;
  const homeVariantContent = variants[homeVariant];

  return (
    <div>
      <Row>
        <Col sm={{ size: '12' }}>{homeVariantContent}</Col>
      </Row>
      <Row>
        <Col sm={{ size: '12' }}>
          <TopChannelInfiniteList />
        </Col>
      </Row>
    </div>
  );
};

Variants.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
};

export default Variants;

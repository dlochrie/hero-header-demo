import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import { embedSourcePath, thumbPathLg, webPromoURL } from '../common/constants';

import './VerticalPlaylist.css';

class VerticalPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliders: [],
      currentPage: [],
      currentVideo: {},
    };
  }

  componentDidMount() {
    fetch(webPromoURL)
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            sliders: responseJson.items,
            currentVideo: responseJson.items[0],
            currentPage: responseJson.items.slice(1, 4),
          });
        });
  }

  render() {
    const items = this.state.currentPage;
    const currentVideo = this.state.currentVideo;
    const src = `${embedSourcePath}${currentVideo.id}`;

    return (
      <Row className="verticalPlaylist">
        <Col sm="9" xs="12">
          <iframe
            title="Home Page Promo Video"
            src={src}
            frameBorder="0"
            allowFullScreen
          />
        </Col>
        <Col sm="3" xs="12">
          <Row>
            {items && items.length ?
              items.map(item => (
                <Col xs="12" key={item.id}>
                  <img
                    src={`${thumbPathLg}${item.id}`}
                    alt={item.name}
                    className="playlist-img"
                  />
                  <h5>{item.name}</h5>
                </Col>
              ))
              : null}
          </Row>
        </Col>
      </Row>
    );
  }
}

export default VerticalPlaylist;

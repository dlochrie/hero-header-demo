import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import { embedSourcePath, thumbPathLg, webPromoURL } from '../common/constants';

import './VerticalPlaylist.css';

const startIndex = 0;
const endIndex = 3;

class VerticalPlaylist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      currentPage: [],
      currentVideo: {},
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch(webPromoURL)
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            videos: responseJson.items,
            currentVideo: 0,
            currentPage: responseJson.items.slice(startIndex, endIndex),
          });
        });
  }

  getPage() {
    const { currentVideo, videos } = this.state;
    const newIndex = videos.length === currentVideo + 1 ? 0 : currentVideo + 1;
    const currentPage = videos.slice(newIndex + startIndex, newIndex + endIndex);

    let cursor = 1;
    while (currentPage.length < 3) {
      currentPage.push(videos[cursor]);
      cursor += 1;
    }

    this.setState({
      currentVideo: newIndex,
      currentPage,
    });
  }

  handleClick() {
    this.getPage();
  }

  render() {
    const items = this.state.currentPage;
    const currentVideo = this.state.videos[this.state.currentVideo];
    let src = '';
    if (currentVideo) {
      src = `${embedSourcePath}${currentVideo.id}`;
    }

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
              items.map((item, index) => (
                <Col xs="12" key={item.id}>
                  <div
                    className={index === 0 ? 'verticalPlaylist__item--current' : 'verticalPlaylist__item'}
                    onClick={this.handleClick}
                    role="presentation"
                  >
                    <img
                      src={`${thumbPathLg}${item.id}`}
                      alt={item.name}
                      className="playlist-img"
                    />
                    {index === 0 ? (<h4>Now Playing</h4>) : ''}
                    <h5>{item.name}</h5>
                  </div>
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

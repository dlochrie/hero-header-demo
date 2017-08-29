import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Slider from 'react-slick';

import { channelPath, thumbPathSm } from '../common/constants';

import './ChannelsSlider.css';

const sliderSettings = {
  adaptiveHeight: true,
  centerPadding: 10,
  dots: false,
  infinite: true,
  lazyLoad: true,
  responsive: [
    { breakpoint: 576, settings: { slidesToShow: 1 } },
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 1440, settings: { slidesToShow: 3 } },
    { breakpoint: 10000, settings: { slidesToShow: 5 } },
  ],
  speed: 500,
  slidesToScroll: 1,
  swipe: true,
  swipeToSlide: true,
};

class ChannelsSlider extends Component {
  static propTypes = {
    channelId: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      channelData: {},
    };
  }

  componentDidMount() {
    const { channelId } = this.props;
    const startTime = new Date().getTime();

    fetch(`${channelPath}${channelId}.json`)
        .then(response => response.json())
        .then((responseJson) => {
          const fetchTime = new Date().getTime() - startTime;
          this.setState({
            channelData: responseJson,
            fetchTime,
          });

          const parentEl = document.getElementById(channelId);
          const imgs = parentEl ? parentEl.querySelectorAll('img') : [];
          let loadedImgs = 0;
          imgs.forEach((img) => {
            img.addEventListener('load', () => {
              loadedImgs += 1;
              if (loadedImgs === imgs.length) {
                this.node.innerSlider.adaptHeight();
              }
            });
          });
        });
  }

  render() {
    const channelData = this.state.channelData || {};
    const fetchTime = this.state.fetchTime * 0.001;
    const roundedFetchTime = Math.round(fetchTime * 100) / 100;

    return (
      <Row className="justify-content-md-center">
        <Col sm="10" xs="12">
          {channelData.items && channelData.items.length ?
            <div id={this.props.channelId} className="channels-slider">
              <h2 className="channels-slider__h2">{channelData.info.name}</h2>
              <h4>{roundedFetchTime} seconds.</h4>
              <Slider {...sliderSettings} ref={(node) => { this.node = node; }}>
                {channelData.items.map(item => (
                  <div key={item.id}>
                    <img
                      src={`${thumbPathSm}${item.id}`}
                      alt={item.name}
                      className="channels-slider__img"
                    />
                  </div>
                ))}
              </Slider>
            </div>
            : null}
        </Col>
      </Row>
    );
  }
}

export default ChannelsSlider;

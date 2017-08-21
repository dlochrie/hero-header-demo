import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Slider from 'react-slick';

import { thumbPathLg, webPromoURL } from '../common/constants';

import './PromoSlider.css';

const sliderSettings = {
  adaptiveHeight: true,
  centerPadding: 10,
  dots: false,
  infinite: true,
  lazyLoad: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipe: true,
  swipeToSlide: true,
};

class PromoSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliders: [],
    };
  }

  componentDidMount() {
    fetch(webPromoURL)
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            sliders: responseJson.items,
          });
        });
  }

  render() {
    const promos = this.state.sliders;

    return (
      <Row>
        <Col sm={{ size: '10', offset: 1 }} xs="12">
          {promos && promos.length ?
            <Slider {...sliderSettings} ref={(node) => { this.node = node; }}>
              {promos.map(item => (
                <div className="promo-slider" key={item.id}>
                  <img
                    src={`${thumbPathLg}${item.id}`}
                    alt={item.name}
                    className="promo-slider__img"
                  />
                  <h4>{item.name}</h4>
                </div>
              ))}
            </Slider>
            : null}
        </Col>
      </Row>
    );
  }
}

export default PromoSlider;

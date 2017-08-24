import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Slider from 'react-slick';

import { embedSourcePath, webPromoURL } from '../common/constants';

import './PromoSlider.css';

class PromoSlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliders: [],
    };

    this.sliderSettings = {
      adaptiveHeight: true,
      centerPadding: 10,
      dots: false,
      infinite: true,
      lazyLoad: true, // THIS MUST BE TRUE, OR ELSE WE LOAD A LOOOOT OF VIDEOS AT ONCE.
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipe: true,
      swipeToSlide: true,
      afterChange: this.setSource.bind(this),
    };
  }

  componentDidMount() {
    fetch(webPromoURL)
        .then(response => response.json())
        .then((responseJson) => {
          const videos = responseJson.items.map((video) => {
            const src = `${embedSourcePath}${video.id}?autoplay=true`;
            return {
              id: video.id,
              src,
              iframe: <iframe
                title={video.name}
                frameBorder="0"
                allowFullScreen
              />,
            };
          });

          this.setState({ videos });

          // We dynamically set each iframe as the slide is loaded (to prevent multiple
          // simultaneous videos).
          this.setSource();
        });
  }

  setSource(index = 0) {
    const videos = this.state.videos;
    const parentEl = document.querySelector('.promo-slider');
    const slideEls = parentEl.querySelectorAll('.slick-slide');
    slideEls.forEach((slideEl) => {
      const iframe = slideEl.querySelector('iframe');
      if (slideEl.classList.contains('slick-active')) {
        iframe.src = videos[index].src;
      } else if (iframe) {
        iframe.removeAttribute('src');
      }
    });
  }

  render() {
    const videos = this.state.videos;

    return (
      <Row>
        <Col sm={{ size: '10', offset: 1 }} xs="12">
          <div className="promo-slider">
            {videos && videos.length ?
              <Slider {...this.sliderSettings} ref={(node) => { this.node = node; }}>
                {videos.map(item => (
                  <div key={item.id}>
                    <div id="hero-movie">{item.iframe}</div>
                  </div>
                ))}
              </Slider>
              : null}
          </div>
        </Col>
      </Row>
    );
  }
}

export default PromoSlider;

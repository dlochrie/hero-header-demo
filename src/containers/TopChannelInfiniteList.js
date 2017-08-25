import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Waypoint from 'react-waypoint';

import ChannelsSlider from './ChannelsSlider';
import { topChannelURL } from '../common/constants';

import './TopChannelInfiniteList.css';

class TopChannelInfiniteList extends Component {
  static getNextPage(channel) {
    return (
      <ChannelsSlider channelId={channel.id} key={channel.id} />
    );
  }

  constructor(props) {
    super(props);

    this.handleScrollEnter = this.handleScrollEnter.bind(this);
    this.handleScrollLeave = this.handleScrollLeave.bind(this);

    this.state = {
      available: [],
      channels: [],
    };
  }

  componentDidMount() {
    fetch(topChannelURL)
        .then(response => response.json())
        .then((responseJson) => {
          // Load the first 3 channels - this should fill even the largest screen.
          const channelsList = responseJson.items || [];
          const initialChannels = channelsList.splice(0, 3)
              .map(channel => TopChannelInfiniteList.getNextPage(channel));

          this.setState({
            channels: initialChannels,
            available: channelsList,
          });

          this.handleScrollEnter();
        });
  }

  handleScrollEnter() {
    this.loadMoreChannels();
  }

  handleScrollLeave() {
    this.loadMoreChannels();
  }

  loadMoreChannels() {
    const { available, channels } = this.state;

    if (available && available.length) {
      const currentChannel = available.shift();
      const updatedChannels = channels.concat(TopChannelInfiniteList.getNextPage(currentChannel));
      this.setState({
        channels: updatedChannels,
      });
    }
  }

  renderItems() {
    return this.state.channels;
  }

  renderWaypoint() {
    const available = this.state.available;
    return (
      <Waypoint
        onEnter={this.handleScrollEnter}
        onLeave={this.handleScrollLeave}
      >
        <div>
          <Row>
            <Col xs="12">
              <div className="top-channel-infinite-list__waypoint-loading">{ available.length ? 'Loading' : null }</div>
            </Col>
          </Row>
        </div>
      </Waypoint>
    );
  }

  render() {
    return (
      <div>
        {this.renderItems()}
        <div className="top-channel-infinite-list__waypoint">
          {this.renderWaypoint()}
        </div>
      </div>
    );
  }
}

export default TopChannelInfiniteList;

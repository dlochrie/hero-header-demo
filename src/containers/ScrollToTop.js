import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }),
  }

  static defaultProps = {
    children: [],
    location: {
      pathname: '',
    },
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default withRouter(ScrollToTop);

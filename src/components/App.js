import React from 'react';
import { Container } from 'reactstrap';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Home from './Home';
import Navigation from '../containers/Navigation';
import ScrollToTop from '../containers/ScrollToTop';
import Variants from './Variants';

import './App.css';

const App = () => (
  <Router basename="/hero-header-demo">
    <ScrollToTop>
      <Navigation />
      <Container fluid>
        <Route exact path="/" component={Home} />
        <Route path="/variants/:variantId" component={Variants} />
      </Container>
    </ScrollToTop>
  </Router>
  );

export default App;

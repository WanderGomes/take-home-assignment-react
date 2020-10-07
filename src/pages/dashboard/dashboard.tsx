import * as React from 'react';
import Navbar from '../../components/navbar/navbar';
import Simulation from './simulation/simulation';

import './dashboard.scss';

class Dashboard extends React.Component {

  render = () => {
    return (
      <section className="tk-dashboard">
        <Navbar />
        <Simulation />
      </section>
    );
  };
}

export default Dashboard;

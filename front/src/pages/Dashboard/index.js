import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import { Container, Widgets, Widget } from './styles';
import ChartTopMonths from './ChartTopMonths';
import ChartInstallaledCapacity from './ChartInstallaledCapacity';

function Dashboard() {
  const [installations, setInstallations] = useState(0);
  const [mostExpensive, setMostExpensive] = useState({});

  useEffect(() => {
    async function loadInstallationsCount() {
      const response = await api.get('/installations/count');

      setInstallations(response.data);
    }

    loadInstallationsCount();
  }, []);

  useEffect(() => {
    async function loadMostExpensive() {
      const response = await api.get('/installations/most-expensive');

      setMostExpensive(response.data);
    }

    loadMostExpensive();
  }, []);

  return (
    <Container>
      <ChartInstallaledCapacity />

      <Widgets>
        <Widget color="one">
          <header>
            <strong>Number of installations</strong>

            <aside>
              <span>State</span>
              <strong>{installations.state}</strong>
            </aside>
          </header>

          <strong>{installations.count}</strong>
        </Widget>

        <Widget color="two">
          <header>
            <strong>Most expensive installation</strong>

            <aside>
              <span>Zip Code</span>
              <strong>{mostExpensive.zip_code}</strong>
            </aside>
          </header>

          <strong>$ {mostExpensive.cost}</strong>
        </Widget>

        <Widget color="three">
          <header>
            <strong>Top 3 months</strong>
          </header>

          <ChartTopMonths height={80} />
        </Widget>
      </Widgets>
    </Container>
  );
}

export default Dashboard;

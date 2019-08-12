import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

import api from '../../services/api';

import { Container, Widgets, Widget } from './styles';
import { topMonthsConfig } from './chartsConfig';

function Dashboard() {
  const [installations, setInstallations] = useState(0);
  const [mostExpensive, setMostExpensive] = useState({});
  const [topMonths, setTopMonths] = useState([]);

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

  useEffect(() => {
    async function loadTopMonths() {
      const response = await api.get('/installations/top-months');

      const data = response.data
        .map(row => ({
          order: Number(`${row.year}${row.month}`),
          x: `${row.year}/${row.month}`,
          y: row.count,
        }))
        .sort((a, b) => {
          if (a.order < b.order) return -1;
          if (a.order > b.order) return 1;

          return 0;
        });

      setTopMonths([{ data }]);
    }

    loadTopMonths();
  }, []);

  return (
    <Container>
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

          <Chart
            type="line"
            height={80}
            options={topMonthsConfig}
            series={topMonths}
          />
        </Widget>
      </Widgets>
    </Container>
  );
}

export default Dashboard;

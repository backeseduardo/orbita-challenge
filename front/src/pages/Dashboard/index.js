import React from 'react';

import { Container, Widgets, Widget } from './styles';

function Dashboard() {
  return (
    <Container>
      <header>
        <strong>Dashboard</strong>

        <span>Hello Eduardo Backes</span>
      </header>

      <Widgets>
        <Widget color="one">
          <header>
            <strong>Number of installations</strong>

            <aside>
              <span>State</span>
              <strong>CA</strong>
            </aside>
          </header>

          <strong>44217</strong>
        </Widget>

        <Widget color="two">
          <header>
            <strong>Most expensive installation</strong>

            <aside>
              <span>Zip Code</span>
              <strong>SAN DIEGO - CA</strong>
            </aside>
          </header>

          <strong>$ 676260.1317</strong>
        </Widget>

        <Widget color="three">
          <header>
            <strong>Top 3 months in installation numbers</strong>
          </header>

          <strong>2016/03 - 1338</strong>
          <strong>2016/04 - 1001</strong>
          <strong>2016/09 - 1005</strong>
        </Widget>
      </Widgets>
    </Container>
  );
}

export default Dashboard;

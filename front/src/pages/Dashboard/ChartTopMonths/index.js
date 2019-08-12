import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';

import api from '../../../services/api';

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    sparkline: {
      enabled: true,
    },
  },
  colors: ['#fff'],
  dataLabels: {
    enabled: true,
    style: {
      fontSize: '16px',
    },
  },
  grid: {
    borderColor: '#535A6C',
    padding: {
      top: 10,
      right: 10,
      bottom: 10,
      left: 10,
    },
  },
  stroke: {
    curve: 'smooth',
  },
  tooltip: {
    theme: 'dark',
    y: {
      title: {
        formatter: () => {
          return null;
        },
      },
    },
  },
};

export default function ChartTopMonths({ height }) {
  const [topMonths, setTopMonths] = useState([]);

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
    <>
      <Chart type="line" height={height} options={options} series={topMonths} />
    </>
  );
}

ChartTopMonths.propTypes = {
  height: PropTypes.number,
};

ChartTopMonths.defaultProps = {
  height: 100,
};

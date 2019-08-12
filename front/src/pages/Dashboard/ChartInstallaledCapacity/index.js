import React, { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

import api from '../../../services/api';

const options = {
  chart: {
    foreColor: '#fff',
    toolbar: {
      show: false,
    },
    zoom: {
      enable: false,
    },
  },
  dataLabels: {
    enabled: false,
    style: {
      fontSize: '16px',
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
  title: {
    text: 'Installed capacity',
    align: 'left',
    margin: 0,
    style: {
      fontSize: '20px',
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    labels: {
      style: {
        fontSize: '12px',
      },
    },
    tooltip: {
      enabled: false,
    },
  },
  legend: {
    show: false,
  },
};

export default function ChartInstallaledCapacity() {
  const [installedCapacity, setInstalledCapacity] = useState([]);

  useEffect(() => {
    async function loadTopMonths() {
      const response = await api.get('/installations/installed-capacity');

      const data = response.data
        // .filter(row => Number(row.year) > 2010)
        .map(row => ({
          x: row.year,
          y: row.system_size,
        }));

      setInstalledCapacity([{ data }]);
    }

    loadTopMonths();
  }, []);

  return (
    <>
      <Chart
        type="line"
        height={350}
        options={options}
        series={installedCapacity}
      />
    </>
  );
}

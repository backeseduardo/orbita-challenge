export const topMonthsConfig = {
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

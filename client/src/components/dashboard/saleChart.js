import React, { useEffect, useRef, useContext } from 'react';
import Chart from 'chart.js';
import { Header } from 'semantic-ui-react';
import { Datacontext } from '../context/context';

function SaleChart() {
  const chartRef = useRef(undefined);
  const myContext = useContext(Datacontext);
  const { sale_for_chart: sale } = myContext.userData;

  useEffect(() => {
    if (sale) {
      const labels = sale.shopIncomes.map((income) => income.monthName.slice(0, 3));
      const income = sale.shopIncomes.map((income) => income.income);
      const ctx = chartRef.current.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: sale.shopName,
              backgroundColor: ['#64DB8F', '#55A5FF', '#E66C4F', '#0C163D', '#F4C500', '#E26B00', '#F6D200', '#791FFF', '#64DB8F', '#F09D00', '#55A5FF', '#22259F'],
              data: income,
            },
          ],
          options: {
            responsive: true,
            maintainAspectRatio:false,
          },
        },
      });
      return () => {
        chart.destroy();
      };
    }
  }, [sale]);
  return (
    <div className="chart">
      {!sale && <Header as="h1">Don't have any sale record to show</Header>}
      {typeof sale === 'object' && <canvas ref={chartRef} />}
    </div>
  );
}

export default SaleChart;

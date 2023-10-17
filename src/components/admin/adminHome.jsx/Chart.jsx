import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { fetchAmounts } from '../../../api/AdminApi';

function Chart() {
  const [areaChartData, setAreaChartData] = useState({
    options: {
    },
    series: [],
  });

  useEffect(() => {
    fetchAmounts()
      .then((data) => {

        if (data.plansData) {
          const plansData = data.plansData;

          const employerSeries = plansData.map((employerPlans, employerIndex) => {
            return {
              name: `Employer ${employerIndex + 1}`,
              data: Array(12).fill(0).map((_, monthIndex) => {
                return employerPlans.reduce((total, plan) => {
                  const planMonth = new Date(plan.date).getMonth();
                  return total + (planMonth === monthIndex ? parseInt(plan.amount, 10) : 0);
                }, 0);
              }),
            };
          });

          const updatedChartData = { ...areaChartData };
          updatedChartData.series = employerSeries;
          setAreaChartData(updatedChartData);
        } else {
          console.error('plansData is not available in the response');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='space-x-1 bg-slate-100 rounded-2xl p-2'>
      <div className="charts-card">
        <h2 className="chart-title">Sales Orders(Year)</h2>
        <ReactApexChart
          options={areaChartData.options}
          series={areaChartData.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
}

export default Chart;

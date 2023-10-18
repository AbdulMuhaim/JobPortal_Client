import {useEffect} from 'react';
import Chart from 'chart.js/auto';
import { fetchPlanCounts } from '../../../api/AdminApi';

function PieChart() {

  useEffect(() => {
    fetchPlanCounts()
      .then((data) => {

        const dataPie = {
          labels: ['Plan 1999', 'Plan 3999', 'Plan 9999'],
          datasets: [
            {
              label: 'Purchased Employers Count',
              data: [data['1999'], data['3999'], data['9999']],
              backgroundColor: ['#CCCCCC', '#70A1D7', '#8ED46D'], // Customize colors as needed
              hoverOffset: 4,
            },
          ],
        };

        const configPie = {
          type: 'pie',
          data: dataPie,
          options: {},
        };

        new Chart(document.getElementById('chartPie'), configPie);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="shadow-lg bg-slate-100 w-full h-96 mb-6 p-5 rounded-lg overflow-hidden bg">
      <div className=" px-5 ">Employer Plans</div>
      <canvas className="p-1 mx-auto " id="chartPie"></canvas>
    </div>
  );
}

export default PieChart;

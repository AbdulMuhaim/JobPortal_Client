// import { useEffect } from 'react';
// import Chart from 'chart.js/auto';

// function PieChart() {
//   useEffect(() => {
//     const dataPie = {
//       labels: ["Plan 1999", "Plan 3999", "Plan 9999"],
//       datasets: [
//         {
//           label: "Purchased Employers Count",
//           data: [300, 50, 100],
//           backgroundColor: [
//             "rgb(66, 133, 244)",  // Blue
//             "rgb(76, 175, 80)",   // Green
//             "rgb(255, 235, 59)",  // Yellow
//           ],
//           hoverOffset: 4,
//         },
//       ],
//     };
//     const configPie = {
//       type: "pie",
//       data: dataPie,
//       options: {},
//     };
//     const chartPie = new Chart(document.getElementById("chartPie"), configPie);

//     return () => {
//       chartPie.destroy();
//     };
//   }, []);

//   return (
//     <div className="shadow-lg bg-slate-100 w-full h-96 mb-6 p-5 rounded-lg overflow-hidden bg">
//       <div className=" px-5 ">Pie chart</div>
//       <canvas className="p-1 mx-auto " id="chartPie"></canvas>
//     </div>
//   );
// }

// export default PieChart;


import { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { fetchPlanCounts } from '../../../api/AdminApi';

function PieChart() {
  const [planCounts, setPlanCounts] = useState({ '1999': 0, '3999': 0, '9999': 0 });

  useEffect(() => {
    fetchPlanCounts()
      .then((data) => {
        setPlanCounts(data);

        const dataPie = {
          labels: ['Plan 1999', 'Plan 3999', 'Plan 9999'],
          datasets: [
            {
              label: 'Purchased Employers Count',
              data: [data['1999'], data['3999'], data['9999']],
              backgroundColor: ['#FF5733', '#33FF57', '#3333FF'], // Customize colors as needed
              hoverOffset: 4,
            },
          ],
        };

        const configPie = {
          type: 'pie',
          data: dataPie,
          options: {},
        };

        const chartPie = new Chart(document.getElementById('chartPie'), configPie);
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

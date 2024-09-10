import React, { useRef, useEffect } from 'react';  
import { Bar, Pie } from 'react-chartjs-2';  
import {  
  Chart as ChartJS,  
  CategoryScale,  
  LinearScale,  
  BarElement,  
  ArcElement,  
  Title,  
  Tooltip,  
  Legend,  
} from 'chart.js';  

ChartJS.register(  
  CategoryScale,  
  LinearScale,  
  BarElement,  
  ArcElement,  
  Title,  
  Tooltip,  
  Legend  
);  

const Charts = () => {  
  const barChartRef = useRef(null);  
  const pieChartRef = useRef(null);  

  const barData = {  
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],  
    datasets: [  
      {  
        label: 'Claims Processed',  
        backgroundColor: 'rgba(75, 192, 192, 0.6)',  
        data: [120, 190, 300, 500, 200, 300, 450, 600],  
      },  
    ],  
  };  

  const pieData = {  
    labels: ['Active', 'Pending', 'Rejected'],  
    datasets: [  
      {  
        label: 'Policy Status',  
        backgroundColor: ['#4BC0C0', '#FF6384', '#FFCE56'],  
        data: [60, 25, 15],  
      },  
    ],  
  };  

  useEffect(() => {  
    const barChart = barChartRef.current;  
    const pieChart = pieChartRef.current;  

    return () => {  
      if (barChart) {  
        barChart.destroy();  
      }  
      if (pieChart) {  
        pieChart.destroy();  
      }  
    };  
  }, []);  

  return (  
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h4 className="text-lg font-semibold mb-4">Claims Processed</h4>
      <Bar ref={barChartRef} data={barData}  />
    </div>
    <div className="bg-white p-6 rounded-lg shadow-md ">
      <h4 className="text-lg font-semibold mb-4">Policy Status</h4>
      <Pie ref={pieChartRef} data={pieData}  />
    </div>
  </div>
  );  
};  

export default Charts;
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import useListOfTasks from "../../hooks/useListOfTasks";
import { ChartOptions, TooltipItem } from "chart.js/auto";
import styles from "./index.module.css";

const DoughnutChart = () => {
  const { isLoading, tasks } = useListOfTasks();

  // Filtrarea countStatus pentru a elimina valorile zero
  const countStatus = {
    pending: tasks.filter((task) => task.status === "pending").length,
    "In Progress": tasks.filter((task) => task.status === "in_progress").length,
    Completed: tasks.filter((task) => task.status === "completed").length,
    "On Hold": tasks.filter((task) => task.status === "on_hold").length,
    Cancelled: tasks.filter((task) => task.status === "cancelled").length,
  };

  const filteredStatus = Object.entries(countStatus).filter(
    ([, value]) => value > 0
  );
  
  const data = {
    labels: filteredStatus.map(([key]) => key), // Etichete filtrate
    datasets: [
      {
        data: filteredStatus.map(([, value]) => value), // Date filtrate
        backgroundColor: [
          "#b65d09",
          "#19b665",
          "#036915",
          "#2d518b",
          "#931818",
        ],
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"doughnut">) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  if(tasks.length === 0) {
    return null
  }
  return (
    <>
      {isLoading ? (
        <p>Loading Chart...</p>
      ) : (
        <div className={styles.donought_chart}>
          <Doughnut data={data} options={options} />
        </div>
      )}
    </>
  );
};

export default DoughnutChart;

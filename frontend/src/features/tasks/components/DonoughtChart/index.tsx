import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import useListOfTasks from "../../hooks/useListOfTasks";
import { ChartOptions, TooltipItem } from "chart.js/auto";
import styles from "./index.module.css";

const DoughnutChart = () => {
  const { tasks } = useListOfTasks();

  const countStatus = {
    pending: {
      count: tasks.filter((task) => task.status === "pending").length,
      bg_color: "#b65d09",
    },
    in_progress: {
      count: tasks.filter((task) => task.status === "in_progress").length,
      bg_color: "#19b665",
    },
    completed: {
      count: tasks.filter((task) => task.status === "completed").length,
      bg_color: "#036915",
    },
    on_hold: {
      count: tasks.filter((task) => task.status === "on_hold").length,
      bg_color: "#2d518b",
    },
    cancelled: {
      count: tasks.filter((task) => task.status === "cancelled").length,
      bg_color: "#931818",
    },
  };

  // Filtrarea statusurilor care au count > 0
  const filteredStatus = Object.entries(countStatus).filter(
    ([, value]) => value.count > 0
  );

  /** Chart data config */
  const data = {
    labels: filteredStatus.map(([key]) => key), 
    datasets: [
      {
        data: filteredStatus.map(([, value]) => value.count),
        backgroundColor: filteredStatus.map(([, value]) => value.bg_color), 
      },
    ],
  };

  /** Chart options */
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

  /** Early return when no tasks */
  if (tasks.length === 0) {
    return;
  }

  return (
    <div className={styles.donought_chart}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;

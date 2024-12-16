import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import useListOfTasks from "../../hooks/useListOfTasks";
import { ChartOptions, TooltipItem } from "chart.js/auto";
import styles from "./index.module.css";
import { formatStatusLabel } from "../../../../helpers";

/**
 * DoughnutChart Component
 * 
 * This component displays a doughnut chart using the `react-chartjs-2` library. 
 * It visualizes the distribution of task statuses, such as "pending", 
 * "in progress", "completed", "on hold", and "cancelled".
*/
const DoughnutChart = () => {
  const { tasks } = useListOfTasks();

  /** Count the number of tasks for each status and assign a corresponding background color */
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

  /** Filter for existing / active statuses of tasks */
  const activeStatuses = Object.entries(countStatus).filter(
    ([, value]) => value.count > 0
  );

  /** Chart data config */
  const data = {
    labels: activeStatuses.map(([key]) => formatStatusLabel(key)), 
    datasets: [
      {
        data: activeStatuses.map(([, value]) => value.count),
        backgroundColor: activeStatuses.map(([, value]) => value.bg_color), 
      },
    ],
  };

  /** Chart options */
  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false, // Ensure that aspect ratio is not maintained
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

  /** Early return when there are no tasks */
  if (tasks.length === 0) {
    return;
  }

  return (
    <div className={styles.doughnut_chart} data-testid="chart">
      <Doughnut data={data} options={options}/>
    </div>
  );
};

export default DoughnutChart;

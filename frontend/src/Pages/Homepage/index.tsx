import ListOfTasks from "../../features/tasks";
import DoughnutChart from "../../features/tasks/components/DonoughtChart";
import TaskFilters from "../../features/tasks/components/TaskFilters";
import styles from "./index.module.css";

export default function Homepage() {
  return (
    <div className={styles.grid_layout_homepage}>
      <div className={styles.content_left}>
        <TaskFilters />
        <DoughnutChart />
      </div>
      <ListOfTasks />
    </div>
  );
}

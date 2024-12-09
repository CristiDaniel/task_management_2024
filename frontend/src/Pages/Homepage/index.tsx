import ListOfTasks from '../../features/tasks';
import TaskFilters from '../../features/tasks/components/TaskFilters';
import styles from './index.module.css';


export default function Homepage() {

  return (
    <div className={styles.grid_layout_homepage}>
      <TaskFilters />
      <ListOfTasks />
    </div>
  );
  
}

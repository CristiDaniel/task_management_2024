import TaskFilters from '../features/tasks/components/TaskFilters';
import ListOfTasks  from '../features/tasks/ListOfTasks';
import styles from './Homepage.module.scss';
export default function Homepage() {

  return (
    <div className={styles.grid_layout_homepage}>
      <TaskFilters />
      <ListOfTasks />
    </div>
  );
}

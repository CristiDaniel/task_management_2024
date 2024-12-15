import { useLocation } from "react-router-dom";

import styles from "./index.module.css";
import useListOfTasks from "../../hooks/useListOfTasks";
import CheckboxFilter from "./components/CheckboxFilter";
import useQueryParams from "../../hooks/useQueryParams";

/**
 * Component for rendering task filters.
 * Allows sorting, filtering by status, and filtering by priority.
 */
export default function TaskFilters() {
  const { countPriority, countStatus, isLoading } = useListOfTasks();
  const { deleteQueryParam, setQueryParam } = useQueryParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const currentOrder = queryParams.get("order") || "date_added_desc";

  const handleOnChangeOrder = (value: string) => {
    if (value === "date_added_desc") {
      deleteQueryParam("order");
    } else {
      setQueryParam("order", value);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.filters}>
      <div className={styles.filter_item_select}>
        <label htmlFor="order">Sort by</label>
        <select
        data-testid="options"
          id="order"
          value={currentOrder}
          onChange={(e) => handleOnChangeOrder(e.target.value)}
        >
          <option value="date_added_desc">Newest First</option>
          <option value="date_added_asc">Oldest First</option>
          <option value="title_asc">Title (A - Z)</option>
          <option value="title_desc">Title (Z - A)</option>
        </select>
      </div>

      <CheckboxFilter
        data={countPriority}
        label="Priority"
        queryValue="priority"
      />
      <CheckboxFilter data={countStatus} label="Status" queryValue="status" />
    </div>
  );
}

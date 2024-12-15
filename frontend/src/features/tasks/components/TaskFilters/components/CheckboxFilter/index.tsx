import styles from "./index.module.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import useQueryParams from "../../../../hooks/useQueryParams";
import { ICheckboxFilter } from "../../../../interfaces";
import { formatStatusLabel } from "../../../../../../helpers";

/**
 * This component renders a filter UI with checkboxes for the user to filter items based on specific criteria.
 
 * Features:
 * - Dynamically filters and displays only options with non-zero counts.
 * - Keeps track of selected options using local state (`queryValue`).
 * - Updates query parameters in the URL based on the selected options.
 * - Hides the entire filter group if there is only one or zero valid options.
 */

const CheckboxFilter = (props: ICheckboxFilter) => {
    const {setQueryParam, deleteQueryParam} = useQueryParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const urlQueryValue = (queryParams.get(props.queryValue)?.split(",") ||
    []);

    const [queryValue, setQueryValue] = useState(urlQueryValue);

    const filterItems = Object.keys(props.data).filter(key => props.data[key] !== 0);
  
    const handleCheck = (value: string) => {
      const newPriority = queryValue.includes(value)
        ? queryValue.filter((p) => p !== value)
        : [...queryValue, value];
  
      setQueryValue(newPriority);
  
      if (newPriority.length > 0) {
        setQueryParam(props.queryValue, newPriority.join(","));
      } else {
        deleteQueryParam(props.queryValue);
      }
    };

if(filterItems.length <=1) {
  return null;
}

  return (
    <div className={styles.filter_item}>
      <label>Filter by {props.label}</label>
      {Object.keys(props.data).map((key) =>
        props.data[key] !== 0 ? (
          <div className={styles.priority_filter_item} key={key}>
            <input
              type="checkbox"
              name={key}
              value={key}
              checked={queryValue.includes(key)}
              onChange={(e) => handleCheck(e.target.value)}
            />
            <label htmlFor={key}>
              {formatStatusLabel(key)} <span>({props.data[key]})</span>
            </label>
          </div>
        ) : null
      )}
    </div>
  );
  
};

export default CheckboxFilter;

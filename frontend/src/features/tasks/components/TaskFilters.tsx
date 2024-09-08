import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

export default function TaskFilters() {
  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const currentOrder = queryParams.get('order') || 'date_added_desc';
  const currentStatus = queryParams.get('completed') || '';

  // Handle changing the order
  const handleOnChangeOrder = (value: string) => {
    if(value === 'date_added_desc') {
        deleteQueryParam('order')
    } else {
        setQueryParam('order', value);
    }
  };

  // Handle changing the status
  const handleOnChangeStatus = (value: string) => {
    if (value === '') {
      // If the selected value is empty, remove the 'completed' query param
      deleteQueryParam('completed');
    } else {
      // Otherwise, set the query param to the selected value
      setQueryParam('completed', value);
    }
  };

  function setQueryParam(key: string, value: any) {
    queryParams.set(key, value);

    const newUrl = `${location.pathname}?${queryParams.toString()}`;

    navigate(newUrl);
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  }
  function deleteQueryParam(key: string) {
    queryParams.delete(key);

    const newUrl = `${location.pathname}?${queryParams.toString()}`;

    navigate(newUrl);
    queryClient.invalidateQueries({ queryKey: ['tasks'] });
  }

  return (
    <div>
      <div>
        <label htmlFor="order">Sort by</label>
        <select id="order" value={currentOrder} onChange={(e) => handleOnChangeOrder(e.target.value)}>
          <option value="date_added_desc">Newest First</option>
          <option value="date_added_asc">Oldest First</option>
          <option value="title_asc">Title (A - Z)</option>
          <option value="title_desc">Title (Z - A)</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="status">Status</label>
        <select value={currentStatus} id="status" name="status" onChange={(e) => handleOnChangeStatus(e.target.value)}>
          <option value="">All</option>
          <option value="yes">Completed</option>
          <option value="no">Incompleted</option>
        </select>
      </div>
    </div>
  );
}

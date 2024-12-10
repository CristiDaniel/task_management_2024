import { useState } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import styles from './index.module.css';
import useListOfTasks from '../../hooks/useListOfTasks';
import { ITaskPriority } from '../../interfaces';

/**
 * Component for rendering task filters.
 * Allows sorting, filtering by status, and filtering by priority.
 */
export default function TaskFilters() {
  const {countPriority} = useListOfTasks();
  const countLowPriorityTasks = countPriority.low;
  const countMediumPriorityTasks = countPriority.medium;
  const countHighPriorityTasks = countPriority.high;

  const queryClient = useQueryClient();
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const currentOrder = queryParams.get('order') || 'date_added_desc';
  const currentStatus = queryParams.get('completed') || '';

  const urlPriority = (queryParams.get('priority')?.split(',') || []) as ITaskPriority[];
  const [priority, setPriority] = useState<ITaskPriority[]>(urlPriority);

  /** Handle change order */ 
  const handleOnChangeOrder = (value: string) => {
    if (value === 'date_added_desc') {
      deleteQueryParam('order');
    } else {
      setQueryParam('order', value);
    }
  };

  /** Handle change status */ 
  const handleOnChangeStatus = (value: string) => {
    if (value === '') {
      deleteQueryParam('completed');
    } else {
      setQueryParam('completed', value);
    }
  };

  /** Handle change priority */ 
  const handleOnChangePriority = (value: ITaskPriority) => {
    const newPriority = priority.includes(value)
      ? priority.filter(p => p !== value) 
      : [...priority, value];

    setPriority(newPriority);

    if (newPriority.length > 0) {
      setQueryParam('priority', newPriority.join(','));
    } else {
      deleteQueryParam('priority');
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
    <div className={styles.filters}>
      <div className={styles.filter_item_select}>
        <label htmlFor="order">Sort by</label>
        <select id="order" value={currentOrder} onChange={(e) => handleOnChangeOrder(e.target.value)}>
          <option value="date_added_desc">Newest First</option>
          <option value="date_added_asc">Oldest First</option>
          <option value="title_asc">Title (A - Z)</option>
          <option value="title_desc">Title (Z - A)</option>
        </select>
      </div>
      
      <div className={styles.filter_item_select}>
        <label htmlFor="status">Status</label>
        <select value={currentStatus} id="status" name="status" onChange={(e) => handleOnChangeStatus(e.target.value)}>
          <option value="">All</option>
          <option value="yes">Completed</option>
          <option value="no">Incompleted</option>
        </select>
      </div>

      <div className={styles.filter_item}>
        <label>Priority</label>
        <div className={styles.priority_filter_item}>
          <input
            type="checkbox"
            name="low"
            value="low"
            checked={priority.includes('low')}
            onChange={(e) => handleOnChangePriority(e.target.value as ITaskPriority)}
          />
          <label htmlFor="low">Low <span>({countLowPriorityTasks})</span></label>
        </div>
        <div className={styles.priority_filter_item}>
          <input
            type="checkbox"
            name="medium"
            value="medium"
            checked={priority.includes('medium')}
            onChange={(e) => handleOnChangePriority(e.target.value as ITaskPriority)}
          />
          <label htmlFor="medium">Medium <span>({countMediumPriorityTasks})</span></label>
        </div>
        <div className={styles.priority_filter_item}>
          <input
            type="checkbox"
            name="high"
            value="high"
            checked={priority.includes('high')}
            onChange={(e) => handleOnChangePriority(e.target.value as ITaskPriority)}
          />
          <label htmlFor="high">High <span>({countHighPriorityTasks})</span></label>
        </div>
      </div>
    </div>
  );
}

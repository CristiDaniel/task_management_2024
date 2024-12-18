import { QueryClientProvider } from "@tanstack/react-query";
import { vi } from "vitest";
import TaskFilters from ".";
import { queryClient } from "../../../../main";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import * as TaskService from "../../services/taskService.ts";
import userEvent from "@testing-library/user-event";

vi.mock("../../services/taskService.ts");

const MockedTaskService = vi.mocked(TaskService);
const TaskFiltersContainer = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <TaskFilters />
    </QueryClientProvider>
  </Router>
);

describe("TaskFilters", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  })

  
  it("it should update select html element value", async () => {

    render(<TaskFiltersContainer />);
    await waitFor(() => {
      
      expect(screen.getByTestId("options", { exact: false })).toBeInTheDocument();

    })
    
  expect(screen.getByTestId("options")).toHaveValue("date_added_desc");

  await userEvent.selectOptions(screen.getByTestId("options"), "date_added_asc");

  expect(screen.getByTestId("options")).toHaveValue("date_added_asc");

})

it('should not render checkbox filters when there are no tasks', async() => {
  MockedTaskService.countPriorityTasks.mockResolvedValueOnce(
    {
        "low": 0,
        "medium": 0,
        "high": 0
    }
)
MockedTaskService.countStatusTasks.mockResolvedValueOnce(
  {
    "pending": 0,
    "in_progress": 0,
    "completed": 0,
    "on_hold": 0,
    "cancelled": 0
  }
)
  render(<TaskFiltersContainer />)


await waitFor(()=> {
  expect(screen.queryByText("Filter by Priority", {exact: false})).not.toBeInTheDocument()  
  expect(screen.queryByText("Filter by Status", {exact: false})).not.toBeInTheDocument()  
})
})

it('should not render checkbox filters when all tasks have the same priority and status', async() => {
  MockedTaskService.countPriorityTasks.mockResolvedValueOnce(
    {
        "low": 5,
        "medium": 0,
        "high": 0
    }
)
MockedTaskService.countStatusTasks.mockResolvedValueOnce(
  {
    "pending": 5,
    "in_progress": 0,
    "completed": 0,
    "on_hold": 0,
    "cancelled": 0
  }
)
  render(<TaskFiltersContainer />)


await waitFor(()=> {
  expect(screen.queryByText("Filter by Priority", {exact: false})).not.toBeInTheDocument()  
  expect(screen.queryByText("Filter by Status", {exact: false})).not.toBeInTheDocument()  
})
})

it('should render checkbox filters based on enpoint data received', async() => {
  MockedTaskService.countPriorityTasks.mockResolvedValueOnce(
    {
        "low": 3,
        "medium": 2,
        "high": 0
    }
)
MockedTaskService.countStatusTasks.mockResolvedValueOnce(
  {
    "pending": 3,
    "in_progress": 2,
    "completed": 0,
    "on_hold": 0,
    "cancelled": 0
  }
)
  render(<TaskFiltersContainer />)


await waitFor(()=> {
  expect(screen.queryByText("Filter by Priority", {exact: false})).toBeInTheDocument()  
  expect(screen.queryByText("Low (3)", {exact: false})).toBeInTheDocument()  
  expect(screen.queryByText("Medium (2)", {exact: false})).toBeInTheDocument()  
  
  expect(screen.queryByText("Filter by Status", {exact: false})).toBeInTheDocument()  
  expect(screen.queryByText("Pending (3)", {exact: false})).toBeInTheDocument()  
  expect(screen.queryByText("In Progress (2)", {exact: false})).toBeInTheDocument()  
})
})
})
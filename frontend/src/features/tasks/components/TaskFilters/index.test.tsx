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

it('should render checkbox filters based on enpoint data received', async() => {
  MockedTaskService.countPriorityTasks.mockResolvedValueOnce(
    {
        "low": 3,
        "medium": 2,
        "high": 0
    }
)
  render(<TaskFiltersContainer />)


await waitFor(()=> {
  expect(screen.getByText("Low", {exact: false})).toBeInTheDocument()  
})
})

it('should not render checkbox filters when tasks has no different priorities', async () => {
  MockedTaskService.countStatusTasks.mockResolvedValueOnce(
    {
      "pending": 4,
      "in_progress": 0,
      "completed": 0,
      "on_hold": 0,
      "cancelled": 0
    }
  )
  render(<TaskFiltersContainer />)

  await waitFor(() => {
    expect(screen.queryByText("Filter by Status", {exact: false})).not.toBeInTheDocument()  
    // expect(screen.queryByTestId("chart")).toBeInTheDocument()  
    screen.debug()
  })
})


})
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import DoughnutChart from "./index.tsx";
import * as TaskService from "../../services/taskService.ts";
import { MemoryRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../../main.tsx";

vi.mock("../../services/taskService.ts");

const MockedTaskService = vi.mocked(TaskService);

const DoughnutChartContainer = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <DoughnutChart />
    </QueryClientProvider>
  </Router>
);

describe("DoughnutChart Component", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not render the chart when tasks does not exist", async () => {
    MockedTaskService.fetchListOfTasks.mockResolvedValue([
    ]);

    render(<DoughnutChartContainer />);

    await waitFor(() => {

      expect(screen.queryByTestId("chart")).not.toBeInTheDocument();
    })
  });
  it("should render the chart when tasks exist", async () => {
    MockedTaskService.fetchListOfTasks.mockResolvedValue([
      {
        "id": 48,
        "title": "Task Test",
        "created_at": "2024-12-15T19:31:00.428197Z",
        "status": "pending",
        "priority": "low"
      },
    ]);

    render(<DoughnutChartContainer />);

    await waitFor(() => {

      expect(screen.queryByTestId("chart")).toBeInTheDocument();
    })
  });

});

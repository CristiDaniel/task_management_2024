import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import AddTaskForm from ".";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../../main";

import * as TaskService from '../../services/taskService';
import {vi} from  'vitest';

beforeEach(() => {
  vi.clearAllMocks();
});

vi.mock('../../services/taskService');
const MockedEndpoint = TaskService;

const AddTaskFormContainer = () => (
  <QueryClientProvider client={queryClient}>
    <AddTaskForm />
  </QueryClientProvider>
);

describe("AddTaskForm", () => {
  it("should upate the input value on typing", async () => {
    render(<AddTaskFormContainer />);
    await userEvent.type(screen.getByPlaceholderText("Task Title"), "test");
    expect(screen.getByPlaceholderText("Task Title")).toHaveValue("test");
  });

  it("should call enpoint with proper request data when input has value", async () => {
    render(<AddTaskFormContainer />);
    await userEvent.type(screen.getByPlaceholderText("Task Title"), "test");
    await userEvent.click(screen.getByText("Add Task"))
    expect(MockedEndpoint.addTask).toHaveBeenCalledWith({priority: 'low', title: 'test'});
  });

  it('should not call the api when the input is empty', async () => {
    render(<AddTaskFormContainer/>)
    await userEvent.click(screen.getByText("Add Task"))
    expect(screen.getByPlaceholderText("Task Title")).toHaveValue("")
    expect(MockedEndpoint.addTask).not.toHaveBeenCalled()
  })
});

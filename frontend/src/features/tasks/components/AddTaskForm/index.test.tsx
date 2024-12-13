import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import AddTaskForm from ".";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../../../main";

const AddTaskFormContainer = () => (
  <QueryClientProvider client={queryClient}>
    <AddTaskForm />
  </QueryClientProvider>
);

describe("AddTaskForm", () => {
  it("should upate the input value on typing", async () => {
    render(<AddTaskFormContainer />);
    // const input = screen.getByPlaceholderText("Task Title");
    // await userEvent.type(input, "gaga");
    await waitFor(() => {
        expect( screen.getByTestId("tr")).toBeInTheDocument();
    })
  });
});

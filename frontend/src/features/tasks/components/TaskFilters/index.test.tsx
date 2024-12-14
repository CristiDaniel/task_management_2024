import { QueryClientProvider } from "@tanstack/react-query";
import { beforeEach, vi } from "vitest";
import TaskFilters from ".";
import { queryClient } from "../../../../main";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
    vi.clearAllMocks();
})

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom"); // Importul original
    return {
      ...actual, // Păstrează toate exporturile reale
      useLocation: vi.fn(), // Mock doar pentru useLocation sau alte hook-uri
    };
  });
  

const TaskFiltersContainer = () => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter>
    <Routes>
        <Route element={<TaskFilters />}/>
    </Routes>
      
        </MemoryRouter>
    </QueryClientProvider>
  );

describe("TaskFilters", () => {
    

    it('should render element', async() => {
        render(<TaskFiltersContainer />)

    })
})


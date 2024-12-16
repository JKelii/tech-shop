import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { HitsScrollArea } from "../HitsScrollArea";
import { Searchbar } from "../Searchbar";

import type { HitProps } from "../Hit";

vi.mock("../Hit.tsx", () => ({
  Hit: ({ hit }: HitProps) => (
    <div>
      <p>{hit.name}</p>
      <p>{hit.price}</p>
    </div>
  ),
}));

describe("Searchbar test", () => {
  it("should navigate with tab and keys", async () => {
    render(<Searchbar />);
    const searchbar = screen.getByRole("button", { name: "Search items..." });

    await userEvent.click(searchbar);

    screen.getByPlaceholderText("Search for products");

    await userEvent.tab();

    await waitFor(() => {
      expect(screen.getByText("Xiaomi 13 Pro")).toBeInTheDocument();
    });

    await userEvent.tab();

    await userEvent.keyboard("{enter}");

    expect(screen.getByText("Xiaomi")).toBeInTheDocument();
  });
});

import { describe } from "node:test";
import Page from "../page";
import { render } from "@testing-library/react";

describe("Testing Product Page", () => {
  test("check first level heading", async () => {
    await render(<Page params={{ slug: "mug" }} />);
  });
});

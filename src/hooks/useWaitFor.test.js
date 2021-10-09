import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import useWaitFor from "./useWaitFor";

test("Wait and match state", async () => {
  let state = {};
  const expected = {
    logged: true,
    username: "admin",
  };

  const { result, rerender } = renderHook(() => useWaitFor(state, expected));
  setTimeout(() => {
    state = { ...expected };
    rerender();
  }, 100);
  await waitFor(() => {
    expect(result.current).toBeTruthy();
  });
});

test("Wait and NOT match state", async () => {
  let state = {};
  const expected = {
    logged: true,
    username: "admin",
  };

  const { result, rerender } = renderHook(() => useWaitFor(state, expected));
  setTimeout(() => {
    state = { ...expected, logged: false };
    rerender();
  }, 100);
  await waitFor(() => {
    expect(result.current).toBeDefined();
    expect(result.current).toBeFalsy();
  });
});

test("Waiting time is out", async () => {
  let state = {};
  const expected = {
    logged: true,
    username: "admin",
  };

  const { result, rerender } = renderHook(() => useWaitFor(state, expected));
  setTimeout(() => {
    state = { ...expected };
    rerender();
  }, 1000);
  await waitFor(() => {
    expect(result.current).toBeDefined();
    expect(result.current).toBeFalsy();
  });
});

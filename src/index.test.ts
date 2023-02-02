import { act, renderHook } from "@testing-library/react-hooks";
import useIntervalHook from "./";

jest.useFakeTimers({
  doNotFake: [
    "setInterval",
    "clearInterval",
    "setTimeout",
    "nextTick",
    "setTimeout",
    "clearImmediate",
    "setImmediate",
    "clearTimeout",
  ],
});

describe("Hook should work", () => {
  const interval = 1000;
  const callback = jest.fn();
  // test("callbacks should not be called in the begining", async () => {
  //   renderHook(() => useIntervalHook({ callback, interval }));
  //   expect(callback).toHaveBeenCalledTimes(0);
  // }, 3000);
  // test("callbacks should be called after interval", async () => {
  //   const { result, waitForNextUpdate, unmount } = renderHook(() =>
  //     useIntervalHook({ callback, interval })
  //   );
  //   act(() => {
  //     jest.advanceTimersByTime(interval + 1);
  //   });
  //   await waitForNextUpdate();
  //   expect(result.current.timeLapse).toBe(interval);
  //   expect(callback).toHaveBeenCalledTimes(1);
  // }, 3000);

  // test("pause and activate should work", async () => {
  //   const { result, waitForNextUpdate } = renderHook(() =>
  //     useIntervalHook({ callback, interval, deactivedAtFirst: true })
  //   );
  //   act(() => {
  //     jest.advanceTimersByTime(interval + 1);
  //   });
  //   await waitForNextUpdate();
  //   expect(result.current.timeLapse).toBe(interval);
  //   expect(callback).toHaveBeenCalledTimes(0);
  //   act(() => {
  //     result.current.activate();
  //     jest.advanceTimersByTime(interval + 1);
  //   });
  //   await waitForNextUpdate();
  //   expect(result.current.timeLapse).toBe(interval * 2);
  //   expect(callback).toHaveBeenCalledTimes(1);
  // }, 30000);

  test("stopped timer should not trigger callback", async () => {
    const { result, waitForNextUpdate, waitFor } = renderHook(() =>
      useIntervalHook({ callback, interval })
    );
    act(() => {
      jest.advanceTimersByTime(interval + 1);
    });
    await waitForNextUpdate();
    expect(result.current.timeLapse).toBe(interval);
    expect(callback).toHaveBeenCalledTimes(1);
    act(() => {
      result.current.stop();
      jest.advanceTimersByTime(interval * 10 + 1);
    });
    // expect(result.current.timeLapse).toBe(interval);
    expect(callback).toHaveBeenCalledTimes(1);
  }, 5000);
});

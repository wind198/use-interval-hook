/**
 * TODO: This hook should run a callback on specific interval
 * TODO: This hook should allow delay an amount of time before start running callback
 * TODO: This hook should allow to start in deactived state(not run callback) until user activate it
 * TODO: This hook should allow pause and resume its execution
 * TODO: This hook should be able to run immediately on mount
 */

import { useCallback, useEffect, useRef, useState } from "react";

type IUseIntervalHookProps = {
  interval: number;
  callback: (...args: any[]) => void | Promise<void>;
  delay?: number;
  deactivedAtFirst?: boolean;
  shouldRunImmediately?: boolean;
};
export default function useIntervalHook(props: IUseIntervalHookProps) {
  const { callback, interval, deactivedAtFirst, delay, shouldRunImmediately } =
    props;

  const [isPaused, setIsPaused] = useState(!!deactivedAtFirst);

  const activate = useCallback(() => {
    setIsPaused(false);
  }, []);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const timerRef = useRef<NodeJS.Timer>();

  const [timeLapse, setTimeLapse] = useState(0);

  const stop = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }
    if (!timeLapse && !shouldRunImmediately) {
      return;
    }
    callback();
  }, [timeLapse, shouldRunImmediately]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLapse((c) => c + interval);
    }, interval);

    timerRef.current = timer;

    return () => {
      stop();
    };
  }, []);

  return {
    pause,
    activate,
    stop,
    timeLapse,
  };
}

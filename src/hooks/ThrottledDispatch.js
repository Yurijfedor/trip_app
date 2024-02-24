import { useDispatch } from "react-redux";
import { throttle } from "lodash";

const useThrottledDispatch = (action, delay) => {
  const dispatch = useDispatch();
  const throttledAction = throttle(dispatch, delay);

  return (args) => throttledAction(action(args));
};

export default useThrottledDispatch;

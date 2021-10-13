import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { isEqual } from "lodash";

/**
 * React hook wait for state changed as expected
 *
 * @param {boolean|number|string|object|array} subject
 * @param {boolean|number|string|object|array} expect
 * @param {number} [timeoutMilliseconds=500] - time after which stop waiting
 * @returns {boolean}
 */
function useWaitFor(subject, expect, timeoutMilliseconds = 500) {
  const [isExpected, setIsExpected] = useState(undefined);
  const [isTimeOut, setIsTimeOut] = useState(false);

  useEffect(() => {
    if (isTimeOut) return;
    if (isEqual(subject, expect)) {
      setIsExpected(true);
      return;
    }
    const timer = setTimeout(() => setIsTimeOut(true), timeoutMilliseconds);

    return () => clearTimeout(timer);
  }, [subject, expect, timeoutMilliseconds, isTimeOut]);

  useEffect(() => {
    if (!isTimeOut) return;
    setIsExpected(false);
  }, [isTimeOut]);

  return isExpected;
}

const types = [
  PropTypes.bool,
  PropTypes.number,
  PropTypes.string,
  PropTypes.object,
  PropTypes.array,
];

useWaitFor.propTypes = {
  subject: PropTypes.oneOfType(types).isRequired,
  expect: PropTypes.oneOfType(types).isRequired,
  timeoutMilliseconds: PropTypes.number,
};

export default useWaitFor;

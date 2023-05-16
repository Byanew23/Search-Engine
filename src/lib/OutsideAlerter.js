import React, { useRef, useEffect } from "react";

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

export const OutsideAlerter = (props) => {
  const wrapper = useRef(null);
  useOutsideAlerter(wrapper, props.callback);

  return (
    <span
      ref={wrapper}
      style={{ zIndex: "2", width: "100%", position: "relative" }}>
      {props.children}
    </span>
  );
};

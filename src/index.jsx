import React, { useState, useMemo, useRef, useLayoutEffect, useCallback } from 'react';
import t from 'prop-types';
import { useSprings, animated, to } from 'react-spring';
import { useGesture } from 'react-use-gesture';

const clamp = (pos, low, high) => {
  const mid = Math.max(pos, low);
  return Math.min(mid, high);
};

const swap = (arr, from, to) => {
  const copy = [...arr];
  const [index] = copy.splice(from, 1);
  copy.splice(to, 0, index);
  return copy;
};

const SpringList = ({ row, onDragEnd, children }) => {
  const view = useMemo(() => {
    return row
      ? { width: 'width', height: 'height', index: 0, sizes: ['scrollWidth', 'scrollHeight'] }
      : { width: 'height', height: 'width', index: 1, sizes: ['scrollHeight', 'scrollWidth'] };
  }, [row]);

  const [widthVal, setWidthVal] = useState(0);
  const [heightVal, setHeightVal] = useState(0);

  const animatedDiv = useRef(null);
  const order = useRef();
  if (!order.current) order.current = children.map((_, index) => index);

  const mapSprings = useCallback(
    (orderList = order.current, down, originalIndex, newWidth) => {
      return (index) =>
        down && index === originalIndex
          ? {
              active: 'true',
              [view.width]: newWidth,
              [view.height]: 0,
              zIndex: 1,
              immediate: (key) => key === 'active' || key === view.width || key === 'zIndex',
            }
          : {
              active: '',
              [view.width]: widthVal * orderList.indexOf(index),
              [view.height]: 0,
              zIndex: 0,
              immediate: false,
            };
    },
    [view.height, view.width, widthVal]
  );

  const [springs, api] = useSprings(children.length, mapSprings());

  const bind = useGesture({
    onDrag({ args: [originalIndex], down, movement }) {
      const offset = movement[view.index];
      if (offset === 0) return;

      const curIndex = order.current.indexOf(originalIndex);
      const newWidth = widthVal * curIndex + offset;
      const nextIndex = clamp(Math.round(newWidth / widthVal), 0, children.length - 1);
      const newOrder = swap(order.current, curIndex, nextIndex);

      api.start(mapSprings(newOrder, down, originalIndex, newWidth));
      if (!down) order.current = newOrder;
    },
    onDragEnd() {
      onDragEnd?.(order.current);
    },
  });

  useLayoutEffect(() => {
    const [newWidth, newHeight] = view.sizes.map((key) => animatedDiv.current[key]);

    if (widthVal !== newWidth || heightVal !== newHeight) {
      setWidthVal(newWidth);
      setHeightVal(newHeight);
    } else {
      api.start(mapSprings());
    }
  }, [api, heightVal, mapSprings, view.sizes, widthVal]);

  return (
    <div
      className="spring-list"
      style={{
        position: 'relative',
        [view.width]: widthVal * children.length,
        [view.height]: heightVal,
      }}
    >
      {springs.map(({ active, width, height, zIndex }, index) => {
        return (
          <animated.div
            ref={animatedDiv}
            className="spring-item"
            data-active={active.to((s) => s)}
            {...bind(index)}
            key={index}
            style={{
              position: 'absolute',
              zIndex,
              transform: to([width, height], (x, y) => `translate3d(${x}px, ${y}px, 0)`),
            }}
          >
            {children[index]}
          </animated.div>
        );
      })}
    </div>
  );
};

SpringList.defaultProps = {
  row: false,
  onDragEnd: undefined,
  children: [],
};

SpringList.propTypes = {
  row: t.bool,
  onDragEnd: t.func,
  children: t.array,
};

export default SpringList;

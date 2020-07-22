import React, { useState, useMemo, useRef, useLayoutEffect } from 'react';
import t from 'prop-types';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';

/**
 * utils
 */
const clamp = (pos, low, high) => {
  const mid = pos <= high ? pos : high;
  return mid >= low ? mid : low;
};

const move = (arr, from, to) => {
  const copy = [...arr];
  const out = copy.splice(from, 1)[0];
  copy.splice(to, 0, out);
  return copy;
};

/**
 * SpringList
 */
const SpringList = ({ row, onDragEnd, children }) => {
  const axisKey = useRef(row ? 0 : 1);

  const xy = useRef(row ? 'width' : 'height');
  const yx = useRef(row ? 'height' : 'width'); // another attr
  const [xySize, setXySize] = useState(0);
  const yxSize = useRef(0); // another val

  const animatedRef = useRef(null);
  const hasKey = useRef(children[0]?.key !== undefined);
  const getKey = useMemo(() => (item) => (hasKey.current ? item.key : item), []);
  const keyOrder = useRef(children.map((item) => getKey(item)));

  const onDragEndCb = useMemo(() => {
    if (typeof onDragEnd === 'function') {
      return { onDragEnd: () => onDragEnd(keyOrder.current) };
    }
    return undefined;
  }, [onDragEnd]);

  /**
   * useSprings
   */
  const mapSpring = useMemo(() => {
    if (children.length !== keyOrder.current.length) {
      if (children.length > keyOrder.current.length) {
        if (row) {
          keyOrder.current.push(getKey(children[children.length - 1]));
        } else {
          children.some((item, index) => {
            const key = getKey(item);
            if (keyOrder.current.includes(key)) return false;

            const btnKey = index > 0 ? getKey(children[index - 1]) : 0;
            const btnIndex = keyOrder.current.indexOf(btnKey);
            keyOrder.current.splice(btnIndex + 1, 0, key);
            return true;
          });
        }
      } else {
        const newKeys = children.map((item) => getKey(item));
        keyOrder.current.some((key, index) => {
          if (newKeys.includes(key)) return false;

          keyOrder.current.splice(index, 1);
          return true;
        });
      }
    }

    return (keyList = keyOrder.current, down, activeKey, activePos) => (index) => {
      const key = getKey(children[index]);

      if (down && key === activeKey) {
        return {
          active: 'true',
          [xy.current]: activePos,
          [yx.current]: 0,
          zIndex: 1,
          immediate: (n) => n === 'active' || n === xy.current || n === 'zIndex',
        };
      }

      return {
        active: '',
        [xy.current]: xySize * keyList.indexOf(key),
        [yx.current]: 0,
        zIndex: 0,
        immediate: false,
      };
    };
  }, [children, getKey, row, xySize]);

  const [springs, setSprings] = useSprings(children.length, mapSpring());

  /**
   * useGesture
   */
  const bind = useGesture({
    onDrag({ args: [activeKey], down, movement }) {
      const offset = movement[axisKey.current];
      if (offset === 0) return;

      const prev = keyOrder.current.indexOf(activeKey);
      const activePos = xySize * prev + offset;
      const next = clamp(Math.round(activePos / xySize), 0, children.length - 1);
      const newOrder = move(keyOrder.current, prev, next);

      setSprings(mapSpring(newOrder, down, activeKey, activePos));
      if (!down) keyOrder.current = newOrder;
    },
    ...onDragEndCb,
  });

  /**
   * useLayoutEffect
   */
  const initSizeDone = useRef(false);
  useLayoutEffect(() => {
    if (initSizeDone.current) return;
    if (!animatedRef.current) return;

    if (row) {
      const { scrollWidth, scrollHeight } = animatedRef.current;

      if (xySize !== scrollWidth || yxSize.current !== scrollHeight) {
        setXySize(scrollWidth);
        yxSize.current = scrollHeight;
      } else {
        initSizeDone.current = true;
        setSprings(mapSpring());
      }
    } else {
      const { scrollHeight, scrollWidth } = animatedRef.current;

      if (xySize !== scrollHeight || yxSize.current !== scrollWidth) {
        setXySize(scrollHeight);
        yxSize.current = scrollWidth;
      } else {
        initSizeDone.current = true;
        setSprings(mapSpring());
      }
    }
  }, [mapSpring, row, setSprings, xySize]);

  return (
    <div
      className="spring-list"
      style={{
        position: 'relative',
        [xy.current]: xySize * children.length,
        [yx.current]: yxSize.current,
      }}
    >
      {springs.map(({ active, width, height, zIndex }, index) => {
        const item = children[index];
        const key = getKey(item);

        return (
          <animated.div
            {...bind(key)}
            ref={animatedRef}
            key={key}
            className="animated-item"
            data-active={active.interpolate((s) => s)}
            style={{
              position: 'absolute',
              zIndex,
              transform: interpolate([width, height], (x, y) => `translate3d(${x}px, ${y}px, 0)`),
            }}
          >
            {item}
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

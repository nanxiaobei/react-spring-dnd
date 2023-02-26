import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { animated, to, useSprings } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';

const clamp = (pos: number, low: number, high: number) => {
  const mid = Math.max(pos, low);
  return Math.min(mid, high);
};

const swap = (arr: number[], a: number, b: number) => {
  const copy = [...arr];
  const [index] = copy.splice(a, 1);
  copy.splice(b, 0, index);
  return copy;
};

export type SpringListProps = {
  row?: boolean;
  onDragEnd?: (orderList: number[]) => void;
  children: ReactNode[];
};

const SpringList = (props: SpringListProps) => {
  const { row = false, onDragEnd, children = [] } = props;

  const view = useMemo(() => {
    return row
      ? {
          width: 'width',
          height: 'height',
          index: 0,
          sizes: ['scrollWidth', 'scrollHeight'],
        }
      : {
          width: 'height',
          height: 'width',
          index: 1,
          sizes: ['scrollHeight', 'scrollWidth'],
        };
  }, [row]);

  const [widthVal, setWidthVal] = useState(0);
  const [heightVal, setHeightVal] = useState(0);

  const animatedDiv = useRef<HTMLDivElement>(null as unknown as HTMLDivElement);
  const order = useRef<number[]>(undefined as unknown as number[]);
  if (!order.current) {
    order.current = children.map((_, index) => index);
  }

  const mapSprings = useCallback(
    (
      orderList: number[] = order.current,
      down?: boolean,
      originalIndex?: number,
      newWidth?: number
    ) => {
      return (index: number) =>
        down && index === originalIndex
          ? {
              active: 'true',
              [view.width]: newWidth,
              [view.height]: 0,
              zIndex: 1,
              immediate: (key: string) =>
                key === 'active' || key === view.width || key === 'zIndex',
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
    onDrag: ({ args: [originalIndex], down, movement }) => {
      const offset = movement[view.index];
      if (offset === 0) {
        return;
      }

      const curIndex = order.current.indexOf(originalIndex);
      const newWidth = widthVal * curIndex + offset;
      const nextIndex = clamp(
        Math.round(newWidth / widthVal),
        0,
        children.length - 1
      );
      const newOrder = swap(order.current, curIndex, nextIndex);

      api.start(mapSprings(newOrder, down, originalIndex, newWidth));
      if (!down) {
        order.current = newOrder;
      }
    },
    onDragEnd: () => {
      onDragEnd?.(order.current);
    },
  });

  useLayoutEffect(() => {
    const [newWidth, newHeight] = view.sizes.map(
      (key) => animatedDiv.current[key as keyof HTMLDivElement]
    );

    if (widthVal !== newWidth || heightVal !== newHeight) {
      setWidthVal(newWidth as number);
      setHeightVal(newHeight as number);
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
      {springs.map((spring, index) => {
        const { active, width, height, zIndex } = spring as {
          active: { to: <T>(cb: (s: T) => T) => T };
          width: number;
          height: number;
          zIndex: number;
        };

        return (
          <animated.div
            ref={animatedDiv}
            className="spring-item"
            data-active={active.to<string | boolean>((s) => s)}
            {...bind(index)}
            key={index}
            style={{
              position: 'absolute',
              zIndex,
              transform: to(
                [width, height],
                (x, y) => `translate3d(${x}px, ${y}px, 0)`
              ),
              touchAction: 'none',
            }}
          >
            {children[index]}
          </animated.div>
        );
      })}
    </div>
  );
};

export default SpringList;

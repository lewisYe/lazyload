import React, { useLayoutEffect, useRef, useState } from 'react';

import throttle from './throttle';

interface LazyLoadProps {
  children: React.ReactNode;
  height?: number;
  className?: string;
  styles?: object;
}

const defaultBoundingClientRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
};

const LazyLoad = (props: LazyLoadProps) => {
  const { children, height, className, styles = {} } = props;
  const [isVisible, setIsVisible] = useState(false);
  const lazyloadRef = useRef(null);

  const originalCheck = () => {
    const node = lazyloadRef.current;
    let top, height;
    try {
      ({ top, height } = node?.getBoundingClientRect());
    } catch (e) {
      ({ top, height } = defaultBoundingClientRect);
    }
    const windowInnerHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const visible = top <= windowInnerHeight && top + height >= 0;
    setIsVisible(visible);
  };

  const checkIsVisible = () => {
    const node = lazyloadRef.current;
    
    if (window.IntersectionObserver) {
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].intersectionRatio <= 0) return;
          setIsVisible(true);
        },
      );
      intersectionObserver.observe(node!);
      return;
    }
    originalCheck();
    document.addEventListener('scroll', throttle(originalCheck, 500));
    return () => {
      document.removeEventListener('scroll', throttle(originalCheck, 500));
    };
  };
  useLayoutEffect(() => {
    const next = checkIsVisible();
    return () => {
      next?.();
    };
  }, []);

  return (
    <div ref={lazyloadRef} style={{ ...styles, height }} className={className}>
      {isVisible ? children : null}
    </div>
  );
};

interface LazyLoadImgProps {
  defaultSource: string;
  width?: number;
  height?: number;
  source?: string[];
  styles?: object;
}

const LazyLoadImg = (props: LazyLoadImgProps) => {
  const {
    defaultSource,
    source = [],
    width,
    height,
    styles = {},
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const lazyloadRef = useRef(null);

  const originalCheck = () => {
    const node = lazyloadRef.current;
    let top, height;
    try {
      ({ top, height } = node?.getBoundingClientRect());
    } catch (e) {
      ({ top, height } = defaultBoundingClientRect);
    }
    const windowInnerHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const visible = top <= windowInnerHeight && top + height >= 0;
    setIsVisible(visible);
  };

  const checkIsVisible = () => {
    const node = lazyloadRef.current;
    
    if (window.IntersectionObserver) {
      const intersectionObserver = new IntersectionObserver(
        (entries) => {
          if (entries[0].intersectionRatio <= 0) return;
          setIsVisible(true);
        },
      );
      intersectionObserver.observe(node!);
      return;
    }
    originalCheck();
    document.addEventListener('scroll', throttle(originalCheck, 500));
    return () => {
      document.removeEventListener('scroll', throttle(originalCheck, 500));
    };
  };
  useLayoutEffect(() => {
    const next = checkIsVisible();
    return () => {
      next?.();
    };
  }, []);

  return (
    <div ref={lazyloadRef} style={{ ...styles, width, height }}>
      {isVisible ? (
        <picture>
          {source.map((v, i) => (
            <source key={i} srcSet={v} />
          ))}
          <img src={defaultSource} style={{ ...styles, width, height }} />
        </picture>
      ) : null}
    </div>
  );
};

LazyLoad.Img = LazyLoadImg;

export default LazyLoad;

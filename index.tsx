import React, { useLayoutEffect, useRef, useState } from 'react';

interface LazyLoadProps {
  children: React.ReactNode;
  height?: number;
  className?: string;
  styles?: object;
  scrollContainer?: string;
}

const defaultRoot = document.querySelector('html');

const LazyLoad = (props: LazyLoadProps) => {
  const { children, height, className, styles = {}, scrollContainer } = props;
  const [isVisible, setIsVisible] = useState(false);
  const lazyloadRef = useRef(null);

  const checkIsVisible = () => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio <= 0) return;
        setIsVisible(true);
      },
      {
        root: scrollContainer
          ? document.querySelector(`${scrollContainer}`)
          : defaultRoot,
      },
    );
    intersectionObserver.observe(lazyloadRef.current!);
  };
  useLayoutEffect(() => {
    checkIsVisible();
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
  scrollContainer?: string;
}

const LazyLoadImg = (props: LazyLoadImgProps) => {
  const {
    defaultSource,
    source = [],
    width,
    height,
    styles = {},
    scrollContainer,
  } = props;
  const [isVisible, setIsVisible] = useState(false);
  const lazyloadRef = useRef(null);

  const checkIsVisible = () => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio <= 0) return;
        setIsVisible(true);
      },
      {
        root: scrollContainer
          ? document.querySelector(`${scrollContainer}`)
          : defaultRoot,
      },
    );
    intersectionObserver.observe(lazyloadRef.current!);
  };
  useLayoutEffect(() => {
    checkIsVisible();
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

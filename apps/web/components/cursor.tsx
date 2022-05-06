import React, {
  memo,
  useEffect,
  useRef,
  useState,
  startTransition,
} from "react";

const Cursor = () => {
  const [touchEvents, setTouchEvents] = useState(false);
  const cursorRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (touchEvents) return;
    let placeX = 0;
    let placeY = 0;

    const moveHandler = (e) => {
      if (!cursorRef.current) return;
      const { clientX, clientY } = e;
      const mouseX = clientX;
      const mouseY = clientY;
      placeX = mouseX - cursorRef.current.clientWidth;
      placeY = mouseY - cursorRef.current.clientHeight / 2;
    };
    const move = () => {
      cursorRef.current.style.transform = `translate3d(${placeX}px, ${placeY}px, 0)`;
    };
    const interval = setInterval(move, 10); // delay
    document.addEventListener("mousemove", moveHandler);

    // On hover

    const mouseOverHandler = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest("[role='link']")
      )
        cursorRef.current.classList.add("cursor-link-hover");
    };
    const mouseOutHandler = () => {
      cursorRef.current.classList.remove("cursor-link-hover");
    };

    document.addEventListener("mouseover", mouseOverHandler);
    document.addEventListener("mouseout", mouseOutHandler);

    const unsubscribe = () => {
      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseover", mouseOverHandler);
      document.removeEventListener("mouseout", mouseOutHandler);
    };

    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, [touchEvents]);

  useEffect(() => {
    startTransition(() => {
      setTouchEvents(isTouchEnabled());
    });

    if (!isTouchEnabled()) return;
    if (!("visualViewport" in window)) return;

    const handler = () => {
      setTouchEvents(isTouchEnabled);
    };
    window.visualViewport.addEventListener("resize", handler);
    return () => {
      window.visualViewport.removeEventListener("resize", handler);
    };
  }, []);

  return (
    <>
      <div id="cursor" className="fixed top-0 left-0 z-50" ref={cursorRef}>
        <div className="clickity font-space-mono absolute font-bold top-4 left-1/2 -translate-x-1/2">
          CLICKITY
        </div>
      </div>
      <style jsx>
        {`
          .clickity {
            display: none;
            pointer-events: none;
            white-space: nowrap;
          }

          div.cursor-link-hover .clickity {
            display: block;
          }
        `}
      </style>
    </>
  );
};

export default memo(Cursor);

function isTouchEnabled() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (navigator as any).msMaxTouchPoints > 0
  );
}

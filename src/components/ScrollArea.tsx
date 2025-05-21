import React, { ReactNode, useEffect, useRef } from "react";

interface ScrollAreaProps {
  children: ReactNode;
  height: number;
}

const ScrollArea: React.FC<ScrollAreaProps> = ({ children, height }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <div ref={scrollRef} style={{ height: `${height}px`, overflowY: 'auto' }}>
      {children}
    </div>
  );
};

export default ScrollArea
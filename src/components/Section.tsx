import React, { ReactNode } from "react";

interface SectionProps {
  title?: string;
  subTitle?: string;
  children: ReactNode;
  backgroundColor?: string;
}

const Section: React.FC<SectionProps> = ({
  title,
  subTitle,
  children,
  backgroundColor = 'rgba(255, 255, 255, 0.8)',
}) => {
  const sectionStyle = {
    backgroundColor,
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    margin: '20px 0',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    webkitBackdropFilter: 'blur(10px)',
  };

  const dividerStyle = {
    height: '1px',
    backgroundColor: '#dee2e6',
    background: '#919191',
    marginBottom: '25px',
  };

  return (
    <div style={sectionStyle}>
      {title && <div className="section-title-header mb-2">{title}</div>}
      {title && <div style={dividerStyle}></div>}
      {children}
    </div>
  );
};

export default Section;

import React from 'react';
import { Button, Offcanvas } from 'react-bootstrap';

export interface FooterButton {
  label: string;
  onClick: () => void;
  variant?: string;
}

interface Props {
  show: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  footerButtons?: FooterButton[];
}

const QuickViewBase: React.FC<Props> = ({ show, title, onClose, children, footerButtons = [] }) => {
  return (
    <Offcanvas show={show} onHide={onClose} placement="end" style={{ width: '600px' }}>
      <Offcanvas.Header closeButton className="border-bottom pb-2 mb-3">
        <Offcanvas.Title as="h5" className="fw-semibold text-dark" style={{ fontSize: '1.25rem' }}>
          {title}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column">
        <div className="flex-grow-1">{children}</div>
        {footerButtons.length > 0 && (
          <>
            <hr className="my-3" />
            <div className="d-flex justify-content-end">
              {footerButtons.map((button, index) => (
                <Button key={index} variant={button.variant || 'primary'} onClick={button.onClick} className={index > 0 ? 'ms-2' : ''}>
                  {button.label}
                </Button>
              ))}
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default QuickViewBase;

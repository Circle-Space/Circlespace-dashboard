import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "react-bootstrap";

interface Props {
  children: React.ReactNode;
  size?: "sm" | "lg" | "xl";
  show: boolean;
  isSubmitDisabled?: boolean;
  onHide: () => void;
  title: string;
  subTitle?: string;
  onCancel: () => void;
  onSubmit: () => void;
  centered?: boolean
  primaryButtonText: string;
  secondaryButtonText: string;
  className?: string;
  fullscreen?: boolean;
}

const ModalBase = ({ 
  children, 
  size = 'lg', 
  show, 
  isSubmitDisabled = false,
  onHide, 
  title, 
  subTitle,
  onCancel, 
  onSubmit,
  centered = false,
  primaryButtonText,
  secondaryButtonText,
  className,
  fullscreen,
}: Props) => {
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    if (show) {
      setSpinner(false);
    }
  }, [show]);


  return (
    <Modal
      className={className}
      centered={centered}
      size={size}
      show={show}
      onHide={onHide}
      fullscreen={fullscreen || undefined}
    
    >
      <Modal.Header closeButton>
        <div style={{ textAlign: "left" }}>
          <Modal.Title style={{ marginBottom: "5px" }}>{title}</Modal.Title>
          {subTitle && <div style={{ marginTop: "5px" }}>{subTitle}</div>}
        </div>

      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>

        <Button variant="primary" onClick={() => {
          setSpinner(true);
          onSubmit();
        }}
          disabled={isSubmitDisabled}>
          {spinner ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              <span className="sr-only">.....</span> Processing...
            </>
          ) : (
            primaryButtonText
          )}
        </Button>

        <Button variant="secondary" onClick={onCancel}>
          {secondaryButtonText}
        </Button>

      </Modal.Footer>
    </Modal>  
  )
}

export default ModalBase
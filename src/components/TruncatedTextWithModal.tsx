import React, { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';

const TruncatedTextWithModal: React.FC<{ text: string; maxLength: number; title: string }> = ({ text, maxLength, title }) => {
  const [showModal, setShowModal] = useState(false);

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;

    let truncated = text.substr(0, maxLength);
    let lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex === -1) {
      // If there are no spaces, just cut at maxLength
      return truncated + '...';
    }

    // Cut at the last complete word
    return truncated.substr(0, lastSpaceIndex) + '...';
};
    
  const truncatedText = truncateText(text, maxLength);

  return (
    <>
      <span onClick={() => setShowModal(true)} style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
        {truncatedText}
      </span>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>{text}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TruncatedTextWithModal;
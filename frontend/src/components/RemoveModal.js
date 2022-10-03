import React from 'react';
import {Button, Modal} from 'react-bootstrap';

export const RemoveModal = ({showModal, handleClose, handleDelete, descriptionBtn}) => {
  return (
      <Modal show={showModal} onHide={handleClose} centered>
          <Modal.Header closeButton>
              <Modal.Title className="text-center">Warring</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to remove the {descriptionBtn}?</Modal.Body>
          <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Close
              </Button>
              <Button variant="dark" onClick={() => handleDelete()}>
                  Delete {descriptionBtn}
              </Button>
          </Modal.Footer>
      </Modal>
  )
}
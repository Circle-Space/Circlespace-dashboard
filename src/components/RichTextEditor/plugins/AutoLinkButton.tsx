import { TOGGLE_LINK_COMMAND, $isLinkNode } from '@lexical/link';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getNearestNodeFromDOMNode, $getSelection, $isElementNode, $isRangeSelection, COMMAND_PRIORITY_CRITICAL, COMMAND_PRIORITY_NORMAL, ElementNode, KEY_MODIFIER_COMMAND, LexicalEditor, RangeSelection, SELECTION_CHANGE_COMMAND } from 'lexical';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useRef, useState } from 'react';
import { getSelectedNode } from '../utils/getSelectedNode';
import { sanitizeUrl } from '../utils/sanitizeUrl';
import { Button, Modal } from 'react-bootstrap';
import { isValidUrl } from '../utils/isValidUrl';
import { $findMatchingParent } from '@lexical/utils';

function AutoLinkButton(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor);
  const [isLink, setIsLink] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [linkLink, setLinkLink] = useState<string>("");
  const [isValidLink, setIsValidLink] = useState<boolean>(false);
  const [currentLink, setCurrentLink] = useState<string>("");

  useEffect(() => {
    setActiveEditor(editor);
  }, [editor])

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    const node = getSelectedNode(selection as RangeSelection);
    const maybeLinkNode = $findMatchingParent(node, $isElementNode);
    if ($isLinkNode(maybeLinkNode)) {
      setIsLink(true);
      const link = maybeLinkNode.getURL();
      setLinkLink(link);
    } else {
      setIsLink(false);
      setLinkLink("");
    }
  }, [activeEditor]);

  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === 'KeyK' && (ctrlKey || metaKey)) {
          event.preventDefault();
          return activeEditor.dispatchCommand(
            TOGGLE_LINK_COMMAND,
            sanitizeUrl('https://'),
          );
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL,
    );
  }, [activeEditor, isLink]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, $updateToolbar]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showModal]);

  const onClick = (): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        setShowModal(true);
      }
    });
  }

  const onAddLink = (link: string): void => {
    if (isValidUrl(link)) {
      const sanitizedLink = sanitizeUrl(link);
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizedLink);
        }
      });
      setShowModal(false);
      setIsValidLink(true);
    } else {
      setIsValidLink(false);
    }
  }
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setLinkLink(value);
    setIsValidLink(isValidUrl(value));
  }
  return <div>
    <button
      title='Click to insert Link'
      className={`btn ${(isLink ? 'rte-format-button-selected' : 'rte-format-button')}`}
      onClick={() => { onClick() }}
    >
      <FontAwesomeIcon icon={faLink} />
    </button>
    <Modal
      centered
      size="sm"
      show={showModal}
    >
      <Modal.Body>
        Link
        <br />
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onAddLink(linkLink);
          }}
        >
          <input
            ref={inputRef}
            type="url"
            style={{ width: "100%" }}
            value={linkLink}
            onChange={handleInputChange}
          />
          {!isValidLink && (
            <p style={{ color: "red" }}>Please enter a valid URL</p>
          )}
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Add
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setShowModal(false);
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  </div>;
}

export default AutoLinkButton;

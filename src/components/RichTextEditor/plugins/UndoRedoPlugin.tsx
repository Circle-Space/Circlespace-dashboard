import React from "react";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { REDO_COMMAND,UNDO_COMMAND } from 'lexical';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft, faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";

type UndoRedoTag = 'undo' | 'redo';
type UndoRedoTitle = 'Click to undo last action' | 'Click to redo last undo';
type UndoRedoIconType = any;
function UndoRedoPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const undoRedoTags: UndoRedoTag[] = [ 'undo', 'redo'];
  const undoRedoTitles: UndoRedoTitle[] = [ 'Click to undo last action', 'Click to redo last undo'];
  const undoRedoIcons: UndoRedoIconType[] = [ faArrowRotateLeft, faArrowRotateRight ];
  const onClick = (tag: UndoRedoTag): void => {
    if(tag === "undo") {
      editor.dispatchCommand(UNDO_COMMAND, undefined);
      return
    }
    editor.dispatchCommand(REDO_COMMAND, undefined);
  }
  return (
    <div>
      {undoRedoTags.map((tag, tagIndex) => (
        <button 
          title={undoRedoTitles[tagIndex]} 
          className="btn" 
          onClick={() => { onClick(tag) }} key={tag}>
            <FontAwesomeIcon 
              fontSize={20} 
              icon={undoRedoIcons[tagIndex]} 
              color="#1F2225"
            />
          </button>
      ))}
    </div>
  );
}

export default UndoRedoPlugin;
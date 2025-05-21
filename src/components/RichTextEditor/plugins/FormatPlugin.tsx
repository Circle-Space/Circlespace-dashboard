import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_CRITICAL, FORMAT_TEXT_COMMAND, SELECTION_CHANGE_COMMAND } from 'lexical';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faItalic, faBold, faUnderline } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from 'react';

type FormatTag = 'bold' | 'italic' | 'underline';
type FormatTitle = 'Click to make selected text bold' | 'Click to make selected text italic' | 'Click to make selected text underlined';
type FormatIcon = any;

function FormatPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const headingTags: FormatTag[] = ['bold', 'italic', 'underline'];
  const headingTitltes: FormatTitle[] = ['Click to make selected text bold', 'Click to make selected text italic', 'Click to make selected text underlined'];
  const headingIcons: FormatIcon[] = [faBold, faItalic, faUnderline];

  const updateActiveFormats = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, []);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        updateActiveFormats();
        return false;
      },
      COMMAND_PRIORITY_CRITICAL,
    );
  }, [editor, updateActiveFormats]);

  const onClick = (tag: FormatTag): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, tag);
        updateActiveFormats();
      }
    });
  }

  return (
    <div>
      {headingTags.map((tag, tagIndex) => (
        <button
          title={headingTitltes[tagIndex]}
          className={`btn ${tag === 'bold' ? (isBold ? 'rte-format-button-selected' : 'rte-format-button') : tag === 'italic' ? (isItalic ? 'rte-format-button-selected' : 'rte-format-button') : tag === 'underline' ? (isUnderline ? 'rte-format-button-selected' : 'rte-format-button') : ''}`}
          onClick={() => { onClick(tag) }}
          key={tag}
        >
          <FontAwesomeIcon icon={headingIcons[tagIndex]} />
        </button>
      ))}
    </div>
  )
}

export default FormatPlugin;

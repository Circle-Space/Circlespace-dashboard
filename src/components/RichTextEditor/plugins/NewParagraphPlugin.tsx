import { $getSelection, $isRangeSelection, INSERT_PARAGRAPH_COMMAND, } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createHeadingNode } from "@lexical/rich-text"
import { $setBlocksType } from "@lexical/selection";
import { mergeLists } from '@lexical/list/formatList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faParagraph } from "@fortawesome/free-solid-svg-icons";

type ParagraphTag = 'p';
function NewParagraphPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const paragraphTags: ParagraphTag[] = [ 'p']
  const onClick = (): void => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        editor.dispatchCommand(INSERT_PARAGRAPH_COMMAND, undefined);
      }
    });
  }
  return <div>{paragraphTags.map((tag) => (
    <button title="Click to insert a new paragraph" className="btn" onClick={() => { onClick(tag) }} key={tag}><FontAwesomeIcon icon={faParagraph} /></button>
  ))}</div>;
}

export default NewParagraphPlugin;
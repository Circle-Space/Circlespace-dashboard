import React from "react"
import { EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isListItemNode } from "@lexical/list";

function OnChangePlugin(props: { onChange: (editorState: EditorState) => void }): null {
    const [editor] = useLexicalComposerContext()
    const { onChange } = props;
    React.useEffect(() => {
      return editor.registerUpdateListener(({ editorState }) => {
        onChange(editorState);
      })
    }, [onChange, editor]);
    return null
  }
  
  export default OnChangePlugin;
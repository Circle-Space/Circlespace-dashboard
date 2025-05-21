import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface Props {
  editorConfig: string;
}

export const UpdateInitialEditorStatePlugin = ({ editorConfig }: Props) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const editorState = editor.parseEditorState(editorConfig);
    editor.setEditorState(editorState);
  }, [editorConfig]);

  return null;
};

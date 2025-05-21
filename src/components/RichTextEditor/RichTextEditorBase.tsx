import { useEffect, useState } from 'react';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { SelectOption } from '../../types/SelectOption';
import { VariableDecoratorNode } from './nodes/VariableDecoratorNode';
import AutoLinkButton from './plugins/AutoLinkButton';
import AutoLinkMatchers from './plugins/AutoLinkMatchers';
import ColorPicker from './plugins/ColorPicker';
import FontDropDown from './plugins/FontDropdown';
import FormatDropdown from './plugins/FormatDropdown';
import FormatPlugin from './plugins/FormatPlugin';
import Highlighter from './plugins/Highlighter';
import OnChangePlugin from './plugins/OnChangePlugin';
import TextAlignDropDown from './plugins/TextAlignDropdown';
import UndoRedoPlugin from './plugins/UndoRedoPlugin';
import { UpdateInitialEditorStatePlugin } from './plugins/UpdateInitialEditorStatePlugin';
import VariableDropdown from './plugins/VariableDropdown';

interface Props {
  editorConfig: string; // initial configuration options
  undoRedoOptions?: boolean; // redo / undo controls
  formatDropdown?: boolean; // heading, normal, ordered, and unordered lists
  variableDropdown?: boolean; // variables
  availableVariables?: SelectOption[]; // array of variables available
  fontSizeDropdown?: boolean; // font size
  fontFamilyDropdown?: boolean; // font family
  textAlignmentDropdown?: boolean; // text alignment
  highlighterPlugin?: boolean; // only allows yellow highlight of selected text
  formatPlugin?: boolean; // bold, underline, and italics
  autoLinkPlugin?: boolean; // allows creation of hyperlinks
  fontColorPicker?: boolean; // color picker to choose font color for selected text
  bgColorPicker?: boolean; // color picker to choose background color for selected text
  onChange?: (newContent: any) => void; // allows access to rich text editor content
  disabled?: boolean; // allows editor to be disabled
  toolbar?: boolean; // show toolbar
  richTextClassName?:string;
}

const theme = {
  text: {
    bold: "rte-bold",
    italic: "rte-italic",
    underline: "rte-underline",
    fontFamily: {
      Arial: "rte-font-family-arial",
      "Courier New": "rte-font-family-courier-new",
      Georgia: "rte-font-family-georgia",
      "Times New Roman": "rte-font-family-times-new-roman",
      "Trebuchet MS": "rte-font-family-trebuchet-ms",
      VideoPlaybackQualityerdana: "rte-font-family-verdana",
    },
  },
};

const CAN_USE_DOM: boolean =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined";

// If using this for error checking the editor, i would put this function
// inside the Editor component
// function onError(error: Error): void {
//   console.error(error);
// }

type EmailTemplate = string;

// Would prefer this be a complete model of its own and then stringify for intitialConfig
const postSubmissionEmail: EmailTemplate = `
  {"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Post Paris,","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Thank you for your submissions for an REA Resource during XYZ Dates. We have approved your request and have assigned John Doe. We will be reaching out to John Doe to provide next steps for travel and introduction to your team. Please work with John Doe to ensure a smooth transition leading up to Day 1. Please reach out if you have any questions.","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"Best,","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1},{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"EUR Coordinator","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}
`;

export default function RichTextEditorBase({
  editorConfig,
  undoRedoOptions,
  formatDropdown,
  variableDropdown,
  availableVariables,
  fontSizeDropdown,
  fontFamilyDropdown,
  textAlignmentDropdown,
  highlighterPlugin,
  formatPlugin,
  autoLinkPlugin,
  fontColorPicker,
  bgColorPicker,
  onChange,
  disabled,
  toolbar,
  richTextClassName,
}: Props): JSX.Element {
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [fontSize, setFontSize] = useState<string>("15px");
  const [color, setColor] = useState<string>("");
  const [textAlign, setTextAlign] = useState<string>("");
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [isSmallWidthViewport, setIsSmallWidthViewport] =
    useState<boolean>(false);
  const [showToolbar, setShowToolbar] = useState<boolean>(true);

  if (toolbar === undefined) {
    toolbar = true;
  }
  if (disabled === undefined) {
    disabled = false;
  }

  useEffect(() => {
    if (
      !undoRedoOptions &&
      !formatDropdown &&
      !variableDropdown &&
      !fontSizeDropdown &&
      !fontFamilyDropdown &&
      !textAlignmentDropdown &&
      !highlighterPlugin &&
      !formatPlugin &&
      !autoLinkPlugin &&
      !fontColorPicker &&
      !bgColorPicker
    ) {
      setShowToolbar(false);
    } else {
      setShowToolbar(true);
    }
  }, [
    undoRedoOptions,
    formatDropdown,
    variableDropdown,
    fontSizeDropdown,
    fontFamilyDropdown,
    textAlignmentDropdown,
    highlighterPlugin,
    formatPlugin,
    autoLinkPlugin,
    fontColorPicker,
    bgColorPicker,
  ]);

  useEffect(() => {
    const updateViewPortWidth = () => {
      const isNextSmallWidthViewport =
        CAN_USE_DOM && window.matchMedia("(max-width: 1025px)").matches;

      if (isNextSmallWidthViewport !== isSmallWidthViewport) {
        setIsSmallWidthViewport(isNextSmallWidthViewport);
      }
    };
    updateViewPortWidth();
    window.addEventListener("resize", updateViewPortWidth);

    return () => {
      window.removeEventListener("resize", updateViewPortWidth);
    };
  }, [isSmallWidthViewport]);

  useEffect(() => {
    if (!toolbar) {
      setShowToolbar(false);
    }
  }, [toolbar]);

  const initialConfig = {
    editorState: editorConfig,
    namespace: "Editor",
    theme,
    editable: disabled ? !disabled : true,
    onError(error: any) {
      throw error;
    },
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      AutoLinkNode,
      LinkNode,
      VariableDecoratorNode,
    ],
  };
  
  return (
    <LexicalComposer initialConfig={{ ...initialConfig, theme }}>
      {showToolbar ? (
       <div className={`rich-text-toolbar-wrapper mb-4 pb-3 ${richTextClassName}`}> 
          {undoRedoOptions && <UndoRedoPlugin />}
          {formatDropdown &&  (
            <div className="me-3">
              <FormatDropdown />
            </div>
          )}
          {variableDropdown && (
            <div className="me-3">
              <VariableDropdown availableVariables={availableVariables || []} />
            </div>
          )}
          {fontSizeDropdown && (
            <div className="me-3">
              <FontDropDown
                style={"font-size"}
                value={fontSize}
                onChange={(value) => setFontSize(value || "15px")}
              />
            </div>
          )}
          {fontFamilyDropdown && (
            <div className="me-3">
              <FontDropDown
                style={"font-family"}
                value={fontFamily}
                onChange={(value) => setFontFamily(value || "Arial")}
              />
            </div>
          )}
          {textAlignmentDropdown && (
            <div className="me-3">
              <TextAlignDropDown
                value={textAlign}
                onChange={(value) => setTextAlign(value || "left")}
              />
            </div>
          )}
          {highlighterPlugin && <Highlighter />}
          {fontColorPicker && (
            <ColorPicker
              style={"color"}
              value={color}
              onChange={(value) => setColor(value || "#000000")}
            />
          )}
          {bgColorPicker && (
            <ColorPicker
              style={"background-color"}
              value={color}
              onChange={(value) => setColor(value || "#ffffff")}
            />
          )}
          {autoLinkPlugin && <LinkPlugin />}
          {formatPlugin && (
            <>
              <FormatPlugin />
              <AutoLinkButton />
              <AutoLinkMatchers />
            </>
          )}
        </div>
      ) : <></>}
      <RichTextPlugin
        contentEditable={
          disabled ? (
            <ContentEditable className={`rich-text-content-read ${richTextClassName}`} />
          ) : (
            <ContentEditable className={`rich-text-content-editable ${richTextClassName}`} />
          )
        }
        placeholder={
          <div className="rich-text-placeholder">Enter some text...</div>
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <OnChangePlugin
        onChange={(editorState) => {
          //console.log(JSON.stringify(editorState.toJSON()));
          if (onChange) {
            onChange(editorState);
          }
        }}
      />
      <UpdateInitialEditorStatePlugin editorConfig={editorConfig} />
    </LexicalComposer>
  );
}

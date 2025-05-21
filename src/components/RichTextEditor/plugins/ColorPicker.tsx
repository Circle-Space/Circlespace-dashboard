import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_CRITICAL, LexicalEditor, SELECTION_CHANGE_COMMAND } from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faA, faHighlighter } from '@fortawesome/free-solid-svg-icons';

interface ColorPickerProps {
  value?: string;
  style?: string;
  onChange: (color: string) => void;
}

function ColorPicker({ value, style, onChange }: ColorPickerProps) {
  const [editor] = useLexicalComposerContext();
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState('#000000');
  const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor);
  const [fontBgColor, setFontBgColor] = useState<string>("");
  const [fontColor, setFontColor] = useState<string>("");

  useEffect(() => {
    setActiveEditor(editor);
  }, [editor])

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setFontBgColor(
        $getSelectionStyleValueForProperty(selection, 'background-color', '#ffffff'),
      );
      setFontColor(
        $getSelectionStyleValueForProperty(selection, 'color', '#000000'),
      );
    }
  }, [activeEditor]);

  useEffect(() => {
    setColor(style === 'color' ? fontColor : fontBgColor);
  }, [style, fontColor, fontBgColor]);

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


  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (displayColorPicker && event.target instanceof Element && !event.target.closest('.rte-color-picker')) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [displayColorPicker, handleClose]);


  const handleChange = (color: ColorResult) => {
    setColor(color.hex);
    onChange(color.hex);
    handleColorChange(color.hex);
    handleClose();
  };

  const handleColorChange = useCallback(
    (color: string) => {
      if (color && style) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, {
              [style]: color
            });
          }
        });
      }
      if (onChange) {
        onChange(color);
      }
    },
    [editor, style, onChange]
  );

  return (
    <div>
      <div onClick={handleClick} className='rte-color-picker-controller'>
        <FontAwesomeIcon
          icon={style === "color" ? faA : faHighlighter}
          className='rte-color-picker-controller-icon'
        />
        <div className='rte-color-picker-controller-rectangle' style={{ background: color }} />
      </div>
      {displayColorPicker ? (
        <div>
          <div className='rte-color-picker-wrapper' onClick={handleClose} />
          <SketchPicker className='rte-color-picker' color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
}

export default ColorPicker;

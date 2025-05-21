import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_CRITICAL, LexicalEditor, SELECTION_CHANGE_COMMAND } from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHighlighter } from '@fortawesome/free-solid-svg-icons';
import { $getSelectionStyleValueForProperty, $patchStyleText } from '@lexical/selection';

function Highlighter() {
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor);
    const [color, setColor] = useState('#ffffff');
    const [fontBgColor, setFontBgColor] = useState("#ffffff");

    useEffect(() => {
        setActiveEditor(editor);
    }, [editor])

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setFontBgColor(
                $getSelectionStyleValueForProperty(selection, 'background-color', '#ffffff'),
            );
        }
    }, [activeEditor]);

    useEffect(() => {
        setColor(fontBgColor);
    }, [fontBgColor]);

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
        if (color === "#ffff00") {
            handleColorChange("#ffffff");
            setColor("#ffffff");
        } else {
            handleColorChange("#ffff00");
            setColor("#ffff00");
        }
    };

    const handleColorChange = useCallback(
        (color: string) => {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $patchStyleText(selection, {
                        "background-color": color
                    });
                }
            });
        },
        [editor]
    );

    return (
        <div>
            <div onClick={handleClick} className='rte-color-picker-controller'>
                <FontAwesomeIcon
                    icon={faHighlighter}
                    className='rte-color-picker-controller-icon'
                />
                <div className='rte-color-picker-controller-rectangle' style={{ background: color }} />
            </div>
        </div>
    );
}

export default Highlighter;

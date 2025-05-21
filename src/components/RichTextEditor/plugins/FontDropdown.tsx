import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_CRITICAL, LexicalEditor, SELECTION_CHANGE_COMMAND } from "lexical";
import { $getSelectionStyleValueForProperty, $patchStyleText } from "@lexical/selection";
import { useCallback, useEffect, useState } from "react";
import Select from "react-select";

const FONT_SIZE_OPTIONS = [
    { value: "10px", label: "10px" },
    { value: "11px", label: "11px" },
    { value: "12px", label: "12px" },
    { value: "13px", label: "13px" },
    { value: "14px", label: "14px" },
    { value: "15px", label: "15px" },
    { value: "16px", label: "16px" },
    { value: "17px", label: "17px" },
    { value: "18px", label: "18px" },
    { value: "19px", label: "19px" },
    { value: "20px", label: "20px" }
];

const FONT_FAMILY_OPTIONS = [
    { value: "Arial", label: "Arial" },
    { value: "Courier New", label: "Courier New" },
    { value: "Georgia", label: "Georgia" },
    { value: "Times New Roman", label: "Times New Roman" },
    { value: "Trebuchet MS", label: "Trebuchet MS" },
    { value: "Verdana", label: "Verdana" }
];

interface FontDropDownProps {
    value?: string;
    style?: string;
    disabled?: boolean;
    onChange?: (value?: string) => void;
}

function FontDropDown({ value, style, disabled = false, onChange }: FontDropDownProps) {
    const [editor] = useLexicalComposerContext();
    const [activeEditor, setActiveEditor] = useState<LexicalEditor>(editor);
    const [fontFamily, setFontFamily] = useState<string>("");
    const [fontSize, setFontSize] = useState<string>("");

    useEffect(() => {
        setActiveEditor(editor);
    }, [editor])

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            setFontFamily(
                $getSelectionStyleValueForProperty(selection, 'font-family', 'Arial'),
            );
            setFontSize(
                $getSelectionStyleValueForProperty(selection, 'font-size', '15px'),
            );
        }
    }, [activeEditor]);

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

    const handleClick = useCallback(
        (option?: string) => {
            if (option && style) {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        $patchStyleText(selection, {
                            [style]: option
                        });
                    }
                });
            }
            if (onChange) {
                onChange(option);
            }
        },
        [editor, style, onChange]
    );

    const options = style === 'font-size' ? FONT_SIZE_OPTIONS : FONT_FAMILY_OPTIONS;

    return (
        <Select
            isDisabled={disabled}
            options={options}
            onChange={(selectedOption) => handleClick(selectedOption?.value)}
            value={options.find((option) => option.value === (style === 'font-size' ? fontSize : fontFamily))}
            placeholder={(style === 'font-size' ? 'Size' : 'Font')}
            styles={{
                control: (provided) => ({
                    ...provided,
                    width: '100px'
                })
            }}
        />
    );
}

export default FontDropDown;

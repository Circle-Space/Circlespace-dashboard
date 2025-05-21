import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_CRITICAL, FORMAT_ELEMENT_COMMAND, INDENT_CONTENT_COMMAND, LexicalEditor, OUTDENT_CONTENT_COMMAND, SELECTION_CHANGE_COMMAND } from "lexical";
import { $getSelectionStyleValueForProperty } from "@lexical/selection";
import { useCallback, useEffect, useState } from "react";
import Select, { components, OptionProps } from "react-select";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndent, faOutdent, faAlignLeft, faAlignRight, faAlignCenter } from '@fortawesome/free-solid-svg-icons';

const TEXT_ALIGN_OPTIONS = [
    { value: "left", label: "left", icon: faAlignLeft },
    { value: "center", label: "center", icon: faAlignCenter },
    { value: "right", label: "right", icon: faAlignRight },
    { value: "indent", label: "indent", icon: faIndent },
    { value: "outdent", label: "outdent", icon: faOutdent },
];

const { Option } = components;

interface IconOptionProps extends OptionProps<any, any> {
    data: {
        icon: any;
        label: string;
    };
}

const IconOption = (props: IconOptionProps) => (
    <Option {...props}>
        <FontAwesomeIcon icon={props.data.icon} style={{ marginRight: '8px' }} />
        {props.data.label}
    </Option>
);

interface FontDropDownProps {
    value?: string;
    style?: string;
    disabled?: boolean;
    onChange?: (value?: string) => void;
}

function TextAlignmentDropdown({ value, style, disabled = false, onChange }: FontDropDownProps) {
    const [editor] = useLexicalComposerContext();
    const [textAlign, setTextAlign] = useState<string>("");

    const handleClick = useCallback(
        (option?: string) => {
            if (option && option == 'left') {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
            }
            if (option && option == 'center') {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
            }
            if (option && option == 'right') {
                editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
            }
            if (option && option == 'indent') {
                editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
            }
            if (option && option == 'outdent') {
                editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
            }
            setTextAlign("");
        },
        []
    );

    const options = TEXT_ALIGN_OPTIONS;

    return (
        <Select
            isDisabled={disabled}
            options={options}
            onChange={(selectedOption) => handleClick(selectedOption?.value)}
            value={options.find((option) => option.value === textAlign)}
            components={{ Option: IconOption }}
            placeholder="Align"
            styles={{
                control: (provided) => ({
                    ...provided,
                    width: '100px'
                })
            }}
        />
    );
}

export default TextAlignmentDropdown;

import React, { useState } from 'react';
import Select, { components, OptionProps, SingleValue } from "react-select";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
    $getSelection,
    $isRangeSelection,
    $createParagraphNode
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import {
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    insertList
} from '@lexical/list';
import { $createHeadingNode } from '@lexical/rich-text';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeading, faAlignJustify, faListUl, faListOl } from '@fortawesome/free-solid-svg-icons';

interface SelectOption {
    value: string;
    label: string;
}

const options = [
    { value: 'p', label: 'Normal', icon: faAlignJustify },
    { value: 'h1', label: 'Heading 1', icon: faHeading },
    { value: 'h2', label: 'Heading 2', icon: faHeading },
    { value: 'h3', label: 'Heading 3', icon: faHeading },
    { value: 'ul', label: 'Bullet List', icon: faListUl },
    { value: 'ol', label: 'Numbered List', icon: faListOl },
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

function FormatDropdown() {
    const [editor] = useLexicalComposerContext();
    const [selectValue, setSelectValue] = useState<SelectOption | null>();

    const handleSelection = (format: 'p' | 'h1' | 'h2' | 'h3' | 'ol' | 'ul') => {
        if (format === 'p') {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createParagraphNode());
                }
            });
        } else if (format === 'h1' || format === 'h2' || format === 'h3') {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode(format));
                }
            });
        } else if (format === 'ol') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
            insertList(editor, 'number');
        } else if (format === 'ul') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
            insertList(editor, 'bullet');
        }
        setSelectValue(null);
    };
    return (
        <Select
            options={options}
            onChange={(selectedOption: SingleValue<SelectOption>) => {
                if (selectedOption) {
                    handleSelection(selectedOption.value as 'p' | 'h1' | 'h2' | 'h3' | 'ul' | 'ol');
                }
            }}
            placeholder="Format"
            components={{ Option: IconOption }}
            value={selectValue}
            styles={{
                control: (provided) => ({
                    ...provided,
                    width: '150px'
                })
            }}
        />

    );
}

export default FormatDropdown;
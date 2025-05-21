import React, { useState } from "react";
import Select, { ActionMeta, SingleValue } from "react-select";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection, $insertNodes, $getPreviousSelection, $getRoot } from "lexical";
import { SelectOption } from "../../../types/StaticConfig";
import { $createVariableDecoratorNode } from '../nodes/VariableDecoratorNode';

interface VariableDropdownProps {
    availableVariables: SelectOption[];
}

export default function VariableDropdown({ availableVariables }: VariableDropdownProps) {
    const [editor] = useLexicalComposerContext();
    const [selectValue, setSelectValue] = useState<SelectOption | null>();

    const handleVariableSelect = (newValue: SingleValue<SelectOption>, actionMeta: ActionMeta<SelectOption>) => {
        if (!newValue) return;
        editor.update(() => {
            let selection = $getSelection() || $getPreviousSelection;
            if (selection === null) {
                selection = $getRoot().selectEnd();
            }
            if ($isRangeSelection(selection)) {
                const variableNode = $createVariableDecoratorNode(newValue.value, newValue.label);
                $insertNodes([variableNode]);
            }
            setSelectValue(null);
        });
    };

    return (
        <Select
            options={availableVariables}
            onChange={handleVariableSelect}
            placeholder="Variable..."
            value={selectValue}
        />
    );
}
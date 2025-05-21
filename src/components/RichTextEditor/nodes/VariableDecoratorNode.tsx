import { DecoratorNode, EditorConfig, LexicalEditor, LexicalNode, NodeKey } from 'lexical';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

export class VariableDecoratorNode extends DecoratorNode<React.ReactNode> {
    __value: string;
    __label: string;

    static getType(): string {
        return 'ready-variable';
    }

    static clone(node: VariableDecoratorNode): VariableDecoratorNode {
        return new VariableDecoratorNode(node.__value, node.__label, node.__key);
    }

    constructor(value: string, label: string, key?: NodeKey) {
        super(key);
        this.__value = value;
        this.__label = label;
    }

    exportJSON(): any {
        return {
            type: VariableDecoratorNode.getType(),
            version: 1,
            value: this.__value,
            label: this.__label
        };
    }

    static importJSON(serializedNode: any): VariableDecoratorNode {
        return new VariableDecoratorNode(serializedNode.value, serializedNode.label);
    }

    createDOM(): HTMLElement {
        const dom = document.createElement('span');
        dom.style.fontWeight = 'bold';
        return dom;
    }

    updateDOM(prevNode: VariableDecoratorNode, dom: HTMLElement): boolean {
        if (prevNode.__label !== this.__label) {
            dom.textContent = this.__label;
        }
        return false;
    }

    decorate(editor: LexicalEditor, config: EditorConfig): React.ReactNode {
        return <span>{`{${this.__label}}`}</span>;
    }
}

export function $createVariableDecoratorNode(value: string, label: string): VariableDecoratorNode {
    return new VariableDecoratorNode(value, label);
}

export function $isVariableDecoratorNode(node: LexicalNode | null | undefined): node is VariableDecoratorNode {
    return node instanceof VariableDecoratorNode;
}

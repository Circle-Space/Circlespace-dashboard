export type RichTextEditorData = {
    root: {
        children: Child[];
        direction: string;
        format: string;
        indent: number;
        type: string;
        version: number;
    };
};

export type Child = {
    children?: Child[];
    direction: string;
    format: string;
    indent: number;
    type: string;
    version: number;
    text?: string;
    detail?: number;
    mode?: string;
    style?: string;
    value?: number;
    listType?: string;
    tag?: string;
};

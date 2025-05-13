import React from 'react';
import { RichTextEditor } from '@mantine/rte';

export default function RichText({value, onChange}: any) {

    return <RichTextEditor   controls={[
        ['bold', 'italic', 'underline'],
        [ 'orderedList', 'unorderedList', 'h1', 'h2', 'h3'],
        ['sup', 'sub'],
        ['alignLeft', 'alignCenter', 'alignRight'],
    ]} value={value} onChange={onChange} />;
}

import React from 'react'
import { Button, Modal } from 'antd';

type Props = {
    title: string;
    open: boolean;
    onok: () => void;
    width: number;
    onCancel: () => void;
    body: string;
}

const ModelComp: React.FC<Props> = ({ title, open, onok, onCancel, width, body }) => {
    return (
        <Modal title={title} open={open} onOk={onok} width={width} onCancel={onCancel}>
            {body}
        </Modal>
    )
}

export default ModelComp
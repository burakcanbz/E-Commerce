import { Alert } from 'react-bootstrap';

import type { JSX } from "react";

interface MessageProps {
    variant?: string;
    children: React.ReactNode;
} 

const Message = ({ variant, children }: MessageProps): JSX.Element => {
  return (
    <Alert variant={variant}>
        {children}
    </Alert>
  )
}

Message.defaultProps = {
    variant: 'info',
};

export default Message
import React from 'react';
import { Message } from 'semantic-ui-react';

export function FormMessage({ messageName, messageInfo, messageType }) {
  return (
    <Message
      success={messageType === 'success'}
      negative={messageType === 'error'}
    >
      <Message.Header>{messageName}</Message.Header>
      <p>
        {messageInfo}
      </p>
    </Message>
  );
}

export function SaleMessage({ success, error, msg }) {
  return (
    <Message
      success={!!success}
      negative={!!error}
    >
      <Message.Header>
        {success && 'success'}
        {error && 'Error'}
        ;
      </Message.Header>
      <p>{msg}</p>
    </Message>
  );
}

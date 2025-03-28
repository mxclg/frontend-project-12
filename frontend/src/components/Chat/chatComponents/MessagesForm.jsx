import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchMessages } from '../../../slices/fetchData';
import useUser from '../../../hooks/useUser';
import { sendMessage } from '../../../slices/messagesSlice';

const MessagesForm = () => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  const inputRef = useRef(null);
  const currentUsername = useUser();

  useEffect(() => {
    if (currentChannelId) {
      dispatch(fetchMessages(currentChannelId));
    }
  }, [dispatch, currentChannelId]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentChannelId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.trim()) {
      setIsSending(true);
      const newMessage = {
        body: message,
        username: currentUsername,
        channelId: currentChannelId,
      };

      try {
        const { token } = JSON.parse(localStorage.getItem('userId'));
        const response = await fetch('/api/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newMessage),
        });

        const data = await response.json();
        dispatch(sendMessage(data));
      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      } finally {
        setIsSending(false);
      }

      setMessage('');
      inputRef.current.focus();
    }
  };

  return (
    <div className="mt-auto px-5 py-3">
      <Form onSubmit={handleSubmit} className="py-1 border rounded-2">
        <InputGroup>
          <Form.Control
            ref={inputRef}
            type="text"
            placeholder={t('fields.inputMessage')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label={t('fields.newMessage')}
            className="border-0 p-0 ps-2"
          />
          <Button
            type="submit"
            variant="group-vertical"
            className="border-0"
            disabled={isSending || !message.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              width="20"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
              />
            </svg>
            <span className="visually-hidden">{t('buttons.submit')}</span>
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};

export default MessagesForm;

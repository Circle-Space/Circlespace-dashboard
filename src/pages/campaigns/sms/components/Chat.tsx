import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import Avatar from 'react-avatar';
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
} from 'react-bootstrap';
import {
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';

import {
  faArrowUp,
  faCircle,
  faPaperclip,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as signalR from '@microsoft/signalr';

import { apiHubConfig } from '../../../../config';
import useAuth from '../../../../hooks/useAuth';
import useDeviceManagement from '../../../../hooks/useDeviceMangement';
import { PaginationType } from '../../../../types/apiResponse';
import { Campaign } from '../../../../types/campaigns/campaignTypes';
import { MessageUser } from '../../../../types/sms/chat';
import { MessageReqBody } from '../../../devices/types/deviceTypes';
import AddConversationModal from './AddConversationModal';
import ChatMessage from './ChatMessage';
import ChatOptionsDropdown from './ChatOptionsDropdown';
import { SelectOption } from '../../../../types/SelectOption';
import ScrollArea from '../../../../components/ScrollArea';

const isProduction = import.meta.env.VITE_ENV === 'production';

interface ChatMessage {
  id: number;
  position: 'left' | 'right';
  name: string;
  avatar: string;
  time: string;
  content: string;
}

interface Props {
  device: SelectOption | null;
  showModalOpen: boolean;
  setChatIniating: (val: boolean) => void;
  setModalOpen: (val: boolean) => void;
  resetSearch: () => void;
  fetchConversation: (paginationType: PaginationType) => void;
  selectedCampaign: Campaign | null;
  showSidebar?: boolean;
  toggleSidebar?: () => void;
}

const Chat = ({
  device,
  showModalOpen,
  setModalOpen,
  setChatIniating,
  fetchConversation,
  selectedCampaign,
  showSidebar,
  toggleSidebar,
}: Props) => {
  const [activeChat, setActiveChat] = useState<MessageUser>();
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [newConversationDict, setNewConversationDict] = useState<{ [id: string]: boolean }>({});
  const [message, setMessage] = useState('');
  const [rows, setRows] = useState(1);
  const [chatLogToDisplay, setChatLogToDisplay] = useState<MessageUser[]>([]);
  const [showContacts, setShowContacts] = useState(true);

  const { userConversation, sendMessage, handleInboundMessage, devicePagination } = useDeviceManagement();
  const { user } = useAuth();
  const fullName = user ? `${user.FirstName} ${user.LastName}` : '';
  const chatDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatDiv = chatDivRef.current;
    if (chatDiv) {
      chatDiv.scrollTop = chatDiv.scrollHeight;
    }
  }, [activeChat]);

  useEffect(() => {
    if (!device || !selectedCampaign) {
      setChatLogToDisplay([]);
      setActiveChat(undefined);
      setConnection(null);
      return;
    }

    const _chatLog = Object.values(userConversation)
      .flat()
      .filter(conversation => conversation.CampaignId === selectedCampaign.id && conversation.DeviceId === device.value);

    if (_chatLog.length > 0) {
      const newConnection = new signalR.HubConnectionBuilder().withUrl(apiHubConfig.baseUrl).withAutomaticReconnect().build();

      setConnection(newConnection);
      setChatLogToDisplay(_chatLog);

      const dict = _chatLog.reduce((acc, c) => ({ ...acc, [c.Id]: false }), {});

      setNewConversationDict(dict);
      setActiveChat(_chatLog[0]);
      setChatIniating(false);
    } else {
      setChatLogToDisplay([]);
      setActiveChat(undefined);
      setConnection(null);
    }
  }, [device, selectedCampaign]);

  useEffect(() => {
    if (!device || !selectedCampaign) {
      setChatLogToDisplay([]);
      setActiveChat(undefined);
      setConnection(null);
      return;
    }

    const _chatLog = Object.values(userConversation)
      .flat()
      .filter(conversation => conversation.CampaignId === selectedCampaign.id && conversation.DeviceId === device.value);

    if (_chatLog.length > 0) {
      if (!connection && isProduction) {
        const newConnection = new signalR.HubConnectionBuilder().withUrl(apiHubConfig.baseUrl).withAutomaticReconnect().build();
        setConnection(newConnection);
      }

      setChatLogToDisplay(_chatLog);
      const newActiveChat = _chatLog.find(u => u.Id === activeChat?.Id);

      if (newActiveChat) {
        setActiveChat(newActiveChat);
      } else if (_chatLog.length > 0) {
        setActiveChat(_chatLog[0]);
      } else {
        setActiveChat(undefined);
      }
    } else {
      setChatLogToDisplay([]);
      setActiveChat(undefined);
    }
  }, [userConversation]);

  useEffect(() => {
    if (connection && isProduction) {
      startConnection(connection);
      connection.onclose(error => {
        setTimeout(() => startConnection(connection), 2000);
      });

      return () => {
        connection.stop().then(() => console.log('Connection stopped!'));
      };
    }
  }, [connection]);

  useEffect(() => {
    if (connection && isProduction) {
      //console.log('Setting up listeners');
      connection.on('ReceiveMessage', (conversationId, deviceId, results) => {
        const data = results.document;
        ///console.log(`Received message. ConversationId: [${conversationId}] Device ID:[${deviceId}] Data: [${data}]`);
        handleInboundMessage(data, deviceId);
        updateNewConvDict(conversationId, true);
      });

      return () => {
        console.log('Removing listeners');
        connection.off('ReceiveMessage');
      };
    }
  }, [connection]);

  const handleUserClick = (event: React.MouseEvent<Element, MouseEvent>, chat: MessageUser) => {
    event.preventDefault();
    setActiveChat(chat);
  };

  const startConnection = async (connection: signalR.HubConnection) => {
    if (isProduction) {
      try {
        await connection.start();
        console.log('Connected!');
      } catch (err) {
        console.error('Error establishing connection: ', err);
        setTimeout(() => startConnection(connection), 2000);
      }
    } else {
      console.log('Running in development mode. Connection not started.');
    }
  };

  const handleMessageKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    } else if (event.key === 'Enter' && event.shiftKey) {
      setMessage(prevMessage => prevMessage + '\n');
      setRows(prevRow => prevRow + 1);
      event.preventDefault(); // Prevent line break in textarea
    }
  };

  const handleSendMessage = () => {
    const userDevice = user?.Devices.find(d => d.Id === device?.value);
    if (!activeChat || !user || !userDevice || !device) {
      return;
    }

    const reqBody: MessageReqBody = {
      ConversationId: activeChat.Id,
      CampaignId: selectedCampaign?.id,
      UserId: user.Id,
      DeviceName: userDevice.DeviceName,
      DeviceId: device.value,
      MsgTo: activeChat.PhoneNumber,
      Message: message,
    };
    sendMessage(reqBody, device.value);
    setMessage('');

    updateNewConvDict(activeChat.Id, false);
  };

  const updateNewConvDict = (id: string, val: boolean) => {
    const tempDict = { ...newConversationDict };
    tempDict[id] = val;
    setNewConversationDict(tempDict);
  };

  const commandKey: string[] = [
    'AI - Campaign Recommendations - BETA!!',
  ];
  
  return (
    <div>
      <Row>
        <Col md={2} xs={2} className="sidebar-bg-color mb-2 ms-2 me-2">
          <div className="p-2">
            {!selectedCampaign && (
              <h1 className="dashboard-header-text mb-3">{'No Campaigns Available'}</h1>
            )}      
          </div>
          <ListGroup>
            {chatLogToDisplay.map(c => (
              <ListGroup.Item
                key={c.Id}
                action
                className={`contact-item border-0 d-flex justify-content-between align-items-center ${activeChat?.Id === c.Id ? 'active-contact' : ''
                  }`}
                onClick={e => handleUserClick(e, c)}
              >
                <div className="d-flex align-items-center">
                  <Avatar name={c.Name} size="26" round />
                  <div className="ms-3 d-flex flex-column text-chat-contact-name">
                    <strong>{c.Name}</strong>
                    <span className={`text-secondary ${newConversationDict[c.Id] ? 'mb-0' : ''}`}>{c.PhoneNumber}</span>
                  </div>
                  {(c.IsInbound || newConversationDict[c.Id]) && (
                    <div className="d-flex ms-3 mb-0">
                      <FontAwesomeIcon className="chat-online mt-1 me-1" icon={faCircle} />
                    </div>
                  )}
                </div>
                {c.UnreadMessages > 0 && (
                  <Badge bg="success" className="ms-auto">
                    {c.UnreadMessages}
                  </Badge>
                )}
                <ChatOptionsDropdown fetchConversation={fetchConversation} chatId={activeChat?.Id} />
              </ListGroup.Item>
            ))}

            {chatLogToDisplay.length === 0 && <div className="p-3 text-center">No Contacts Found</div>}
          </ListGroup>
        </Col>
        <Col md={6} xs={6} className="d-flex flex-column">
          <div className="d-flex flex-column justify-content-between">
            <Card>
              <Card.Body className="pe-0">
                <ScrollArea height={500}>
                  {activeChat?.Messages.map(m => (
                    <ChatMessage
                      key={m.Id}
                      position={m.Direction === 'Outbound' ? 'left' : 'right'}
                      name={m.Direction === 'Outbound' ? m.AgentName : activeChat.Name}
                      //name={m.Direction === 'Outbound' ? m.AgentName : m.AgentName}
                      avatar={''} // Provide avatar URL if available
                      time={m.CreatedTime}
                    >
                      {m.Content}
                    </ChatMessage>
                  ))}
                </ScrollArea>
              </Card.Body>
            </Card>
            <div>
              <div className="d-flex justify-content-between">
                {devicePagination && devicePagination.CurrentPage > 1 && (
                  <div className="d-flex align-items-center " onClick={() => fetchConversation('PREV')}>
                    <FaArrowLeft className="ms-1" style={{ cursor: 'pointer' }} />
                    <span className="navigation-link underlined" style={{ cursor: 'pointer' }}>
                      Earlier Conversations
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-center flex-grow-1">
                  {devicePagination && devicePagination.TotalPages > 0 ? (
                    <h6>
                      {`Conversation ${(devicePagination.CurrentPage - 1) * devicePagination.ItemsPerPage + 1} - ${Math.min(
                        devicePagination.CurrentPage * devicePagination.ItemsPerPage,
                        devicePagination.TotalItems,
                      )} of ${devicePagination.TotalItems}`}
                    </h6>
                  ) : (
                    <h6>All Conversations Displayed</h6>
                  )}
                </div>

                {devicePagination && devicePagination.CurrentPage < devicePagination.TotalPages && (
                  <div className="d-flex align-items-center" onClick={() => fetchConversation('NEXT')}>
                    <span className="navigation-link underlined" style={{ cursor: 'pointer' }}>
                      More Conversations
                    </span>
                    <FaArrowRight className="ms-1" style={{ cursor: 'pointer' }} />
                  </div>
                )}
              </div>

              {activeChat && activeChat.UserId === user?.Id ? (
                <div className="chat-input d-flex align-items-center p-3">
                  <Button variant="outline-secondary">
                    <FontAwesomeIcon icon={faPaperclip} />
                  </Button>
                  <Form.Control
                    as="textarea"
                    rows={rows}
                    value={message}
                    onKeyDown={handleMessageKeyDown}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="flex-grow-1 mx-2"
                  />
                  <Button variant="outline-secondary" onClick={handleSendMessage}>
                    <FontAwesomeIcon icon={faArrowUp} />
                  </Button>
                </div>
              ) : (
                activeChat && activeChat.UserId !== user?.Id && (
                  <div className="chat-input d-flex align-items-center p-6">
                    <span className="text-danger" style={{ fontSize: '18px' }}>
                      You are not able to chat as you are not the campaign owner.
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </Col>
        <Col md={3}>
          <Card style={{marginTop: 0}}>
              <Card.Body>
                <Card.Title>AI Recommendations (BETA):</Card.Title>
                <ul className="list-unstyled">
                  {commandKey.map((command, index) => (
                    <li key={index}>{command}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
        </Col>
      </Row>

      <AddConversationModal
        showModal={showModalOpen}
        setModalOpen={setModalOpen}
        onCancel={() => {
          setModalOpen(false);
        }}
        deviceId={device?.value}
        campaign={selectedCampaign}
      />
    </div>
  );
};

export default Chat;

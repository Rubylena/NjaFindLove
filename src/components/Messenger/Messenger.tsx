import React, { useEffect, useRef, useState } from 'react'
import './messenger.scss'
import Input from '../Input/Input';
import send from '../../asset/icon/send.svg'
import attach from '../../asset/icon/attach.svg'
import emoji from '../../asset/icon/emoji.svg'
import jane from '../../asset/icon/jane.svg'
import lina from '../../asset/icon/lina.svg'
import mia from '../../asset/icon/mia.svg'
import candy from '../../asset/icon/candy.svg'

interface Contact {
    id: number;
    name: string;
    recentChat: string;
    img: string;
    lastSeen: string;
    unreadCount: number;
    messages: Message[];
}

interface Message {
    id: number;
    content: string;
    sender: "user" | "contact";
}

const Messenger = () => {
    const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [height, setHeight] = useState('40px');

    const chatMessagesRef = useRef<HTMLDivElement>(null);

    const contacts: Contact[] = [
        {
            id: 1, name: "John Doe", recentChat: "Hello, how are you?", lastSeen: 'Last seen 2mins ago', img: jane, unreadCount: 2,
            messages: [
                { id: 1, content: "Hi there!", sender: "contact" },
                { id: 2, content: "I'm good, thanks!", sender: "user" },
            ],
        },
        {
            id: 2, name: "Jane Smith", recentChat: "I'm good, thanks!", lastSeen: 'Last seen 6hours ago', img: lina, unreadCount: 2,
            messages: [{ id: 1, content: "Hello, how are you?", sender: "user" }],
        },
        {
            id: 3, name: "Bob Johnson", recentChat: "What's up?", lastSeen: 'Last seen 5mins ago', img: mia, unreadCount: 0,
            messages: [
                { id: 1, content: "Nothing much, how about you?", sender: "user" },
                { id: 2, content: "Same here!", sender: "contact" },
            ],
        },
        {
            id: 4, name: "Bob Johnson", recentChat: "What's up?", lastSeen: 'Last seen 7hours ago', img: candy, unreadCount: 1,
            messages: [
                { id: 1, content: "Nothing much, how about you?", sender: "user" },
                { id: 2, content: "Same here!", sender: "contact" },
            ],
        },
    ];

    const handleContactClick = (contact: Contact) => {
        setSelectedContact(contact);
        contact.unreadCount = 0;
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setNewMessage(event.target.value);
        setHeight(`${Math.min(event.target.scrollHeight, 200)}px`);
    }

    const handleSendMessage = (event: React.FormEvent) => {
        event.preventDefault();
        if (!selectedContact) {
            return;
        }
        if (newMessage.trim() == '') {
            setNewMessage("");
            setHeight('40px')
            return;
        }
        if (newMessage.trim() !== '') {
            const newMessageId = selectedContact.messages.length + 1;
            const newestMessage: Message = {
                id: newMessageId,
                content: newMessage,
                sender: "user",
            };
            setSelectedContact({
                ...selectedContact,
                messages: [...selectedContact.messages, newestMessage],
            });
            setNewMessage("");
            setHeight('40px')
        }
    };

    function scrollToBottom() {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    useEffect(() => {
        scrollToBottom();
    }, [contacts]);

    return (
        <section className="flex flex-col lg:flex-row bg-tint-pink h-full gap-10 xl:gap-0">
            <div className="lg:w-2/6 border-r border-r-red px-5 pt-10">
                <h2 className='font-medium text-2xl'>Messages</h2>
                {contacts.map((contact) => (
                    <div
                        key={contact.id}
                        className={`flex items-center gap-3 relative py-3 px-5 mt-3 bg-white rounded-full cursor-pointer hover:bg-tint-green ${selectedContact?.id === contact.id ? "bg-[#E5F4D5]" : ""}`}
                        onClick={() => handleContactClick(contact)}
                    >
                        <div className='w-14'>
                            <img src={contact.img} alt={contact.name} className='w-full' />
                        </div>
                        <div className='text-2xl'>
                            <p className="font-semibold">{contact.name}</p>
                            <p className="">{contact.recentChat}</p>
                            {contact.unreadCount > 0 ? <div className="unread-count">{contact.unreadCount}</div> : null}
                        </div>
                    </div>
                ))}
            </div>
            <div className="lg:w-4/6">
                {selectedContact ? (
                    <>
                        <div className="p-5 bg-white flex items-center gap-3">
                            <div className='w-14'>
                                <img src={selectedContact.img} alt={selectedContact.name} className='w-full' />
                            </div>
                            <div>
                                <p className='font-semibold text-4xl'>{selectedContact.name}</p>
                                <p className='opacity-70'>{selectedContact.lastSeen}</p>
                            </div>
                        </div>
                        <div className=" py-5 px-7 max-h-[80%] flex flex-col gap-4 xl:gap-0">
                            <div className='chat-window hide-scroll flex flex-col'
                            >
                                {selectedContact.messages.map((message) => (
                                    <div key={message.id} className={`mt-2 max-w-[80%] ${message.sender}`}>
                                        <div className="message-content">{message.content}</div>
                                    </div>
                                ))}
                                <div ref={chatMessagesRef} />
                            </div>
                            <div className='lg:w-[43%] xl:w-[48%] lg:absolute lg:bottom-10 flex justify-center gap-5 bg-tint-pink'>
                                <form onSubmit={handleSendMessage} className='w-5/6 relative'>
                                    <textarea
                                        value={newMessage}
                                        onChange={handleChange}
                                        className={` hide-scroll w-full resize-none focus:ring-0 border-none rounded-3xl pl-4 pr-8 py-3`}
                                        style={{ height }}
                                        placeholder="Type your message..."
                                    />
                                    <img src={send} alt='send' className='absolute bottom-4 right-2 cursor-pointer w-6' onClick={handleSendMessage} />

                                </form>
                                <div className='flex items-end gap-4 pb-2'>
                                    <img src={attach} alt='attach picture' className='w-6' />
                                    <img src={emoji} alt='emoji' className='w-6' />
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="no-contact-selected h-full">No message selected</div>
                )}
            </div>
        </section>
    )
}

export default Messenger
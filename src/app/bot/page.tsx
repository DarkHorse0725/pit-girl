"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";
import { useChat } from "ai/react";
import axios from "axios";

const ChatBot = () => {
    const { messages, input, handleInputChange, handleSubmit, status, error } =
        useChat({
            api: "/api/openai",
        });

    const DID_AI_KEY = process.env.NEXT_PUBLIC_DID_AI_KEY
    console.log('DID_AI_KEY => ', DID_AI_KEY)
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = chatBodyRef.current;
        if (!container) return;
        container.scrollTop = container.scrollHeight;
        console.log('message => ', messages);
        console.log('error => ', error)
        console.log('status => ', status)
    }, [messages, status]);

    const initTalk = async () => {
        const response = await axios.post(
            "https://api.d-id.com/talks",
            {
                script: {
                    type: "text",
                    input: "hello, This is Thomas, Senior AI developer",
                    provider: {
                        type: "microsoft",
                        voice_id: "en-US-AndrewNeural",
                        voice_config: { style: "Conversation" }
                    }
                },
                source_url: "https://create-images-results.d-id.com/api_docs/assets/noelle.jpeg",
                config: { stitch: true }
            },
            {
                headers: {
                    Authorization: `Basic ${DID_AI_KEY}`,
                },
            }
        );
        console.log('response => ', response.data)

        const responseBytalkID = await axios.get(`https://api.d-id.com/talks/${response.data.id}`, {
            headers: {
                Authorization: `Basic ${DID_AI_KEY}`,
            },
        });

        console.log('responseBytalkID => ', responseBytalkID)
    }

    useEffect(() => {
        initTalk()
    }, [])

    return (
        <div className="flex">
            <div className="p-10">
                <div>
                    <div ref={chatBodyRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex items-start space-x-2 text-xl ${message.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                {/* Message bubble */}
                                <div
                                    className={`px-3 py-2 rounded-md max-w-[70%] break-words text-xl ${message.role === "user"
                                        ? "bg-blue-500 text-white dark:bg-blue-600"
                                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                                        }`}
                                >
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center align-center gap-2">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                        className="flex items-center border-t px-4 py-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                    >
                        <input
                            className="shadow appearance-none border rounded w-[400px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            disabled={status === "streaming"}
                        ></input>
                        <button
                            type="submit"
                            disabled={status === "streaming"}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
            <div>
                <Image src="https://create-images-results.d-id.com/api_docs/assets/noelle.jpeg" width="500" height="500" alt="NFT image" />

            </div>
        </div>
    );
};

export default ChatBot;


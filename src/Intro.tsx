import { useEffect, useState } from "react"

interface ChatMessage {
    message: string
    isMe: boolean
    waitMs: number
}

const chat: ChatMessage[] = [
    {
        message: "Hi Boss, I have refactored the entire code base. =)",
        isMe: true,
        waitMs: 1500,
    },
    {
        message: "So what?",
        isMe: false,
        waitMs: 2000,
    },
    {
        message: "I've updated all the dependencies so we don't have any vulnerabilities.",
        isMe: true,
        waitMs: 3000,
    },
    {
        message: "??",
        isMe: false,
        waitMs: 4000,
    },
    {
        message: "Boss, I've added a button...",
        isMe: true,
        waitMs: 4000,
    },
    {
        message: "Wow, nice! 😀 What does it do? Show me!",
        isMe: false,
        waitMs: 1000,
    }
]

interface IntroProps {
    triggerFinished: () => void
}

const skip = true;

export const Intro = (props: IntroProps) => {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    // react settimtout

    useEffect(() => {
        skip && props.triggerFinished()
        const nextMessage = messages.length < chat.length ? chat[messages.length] : null
        let scroll = document.getElementById("scroll")
        if (scroll) {
            scroll.scrollTo({
                top: scroll.scrollHeight,
                behavior: "smooth",
            })
        }

        if (nextMessage) {
            const timeoutId = setTimeout(() => {
                setMessages([...messages, nextMessage]);
            }, nextMessage.waitMs);
            return () => clearTimeout(timeoutId)
        }
        else {
            const timeoutId = setTimeout(() => {
                props.triggerFinished()
            }, 2500);
            return () => clearTimeout(timeoutId)
        }
    }, [messages])

    return <div style={{
        width: "100vw",
        height: "40vh",
        overflow: "hidden",
    }}>
        <div id="scroll" style={{
            width: "100%",
            maxWidth: "400px",
            height: "100%",
            overflow: "scroll",
            margin: "auto",
            scrollbarWidth: "none",
            // backgroundColor: "lightblue",
        }}>
            <div style={{
                height: "100%",
            }} />
            {messages.map((x, i) => <div
                key={i}
                style={{
                    width: "82%",
                    maxWidth: "300px",
                    marginLeft: x.isMe ? "auto" : "0px",
                    marginRight: x.isMe ? "0px" : "auto",
                    marginTop: "10px",
                    padding: "10px",
                    borderRadius: x.isMe ? "8px 0 12px 8px" : "0 8px 8px 12px",
                    backgroundColor: x.isMe ? "lightgreen" : "lightblue",
                }}>{x.message}</div>)}
        </div>
    </div>
}
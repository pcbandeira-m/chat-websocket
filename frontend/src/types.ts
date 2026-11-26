/**
 * Type definitions for Chat Application
 */

export interface Message {
    id: string
    content: string
    sender: string
    timestamp: string
    isOwn: boolean
}

export interface Conversation {
    id: string
    name: string
    lastMessage: string
    lastUpdate: Date
}

export interface User {
    id: string
    name: string
    avatar?: string
    status: 'online' | 'offline' | 'idle'
}

export interface WebSocketMessage {
    id?: string
    type: 'chat' | 'connection' | 'error'
    data: string
    sender: string
    timestamp: string
}

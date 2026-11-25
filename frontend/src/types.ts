/**
 * Type definitions for Chat Application
 */

export interface Message {
    id: string
    content: string
    sender: string
    timestamp: Date
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
    type: 'message' | 'status' | 'error' | 'connection'
    payload: unknown
    timestamp: string
}

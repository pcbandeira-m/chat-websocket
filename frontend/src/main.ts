/**
 * Chat Application - Main Entry Point
 * Integração WebSocket Nativa com TypeScript
 */

import { ChatWebSocket } from './websocket'
import type { Message, WebSocketMessage } from './types'

class ChatApp {
    private nameInput: HTMLInputElement
    private messageInput: HTMLInputElement
    private sendButton: HTMLButtonElement
    private messagesContainer: HTMLElement
    private userStatusEl: HTMLElement
    private messages: Message[] = []
    private ws: ChatWebSocket

    constructor() {
        this.nameInput = document.getElementById('name-input') as HTMLInputElement
        this.messageInput = document.getElementById('message-input') as HTMLInputElement
        this.sendButton = document.getElementById('send-btn') as HTMLButtonElement
        this.messagesContainer = document.getElementById('messages-container') as HTMLElement
        this.userStatusEl = document.getElementById('user-status') as HTMLElement
        
        this.ws = new ChatWebSocket({
            url: 'ws://localhost:8080/ws',
            reconnectAttempts: 5,
            reconnectDelay: 3000
        })
        
        this.initializeWebSocket()
        this.initializeEventListeners()
    }

    private initializeWebSocket(): void {
        // onopen: Conexão estabelecida
        this.ws.onOpen(() => {
            console.log('WebSocket conectado')
            this.updateUserStatus(true)
        })

        // onmessage: Receber mensagens do servidor
        this.ws.onMessage((msg: WebSocketMessage) => {
            this.handleIncomingMessage(msg)
        })

        // onclose: Conexão fechada
        this.ws.onClose(() => {
            console.log('WebSocket desconectado')
            this.updateUserStatus(false)
        })

        // onerror: Erro na conexão
        this.ws.onError((error: Event) => {
            console.error('Erro WebSocket:', error)
        })

        this.ws.connect().catch(error => {
            console.error('Falha ao conectar:', error)
            this.updateUserStatus(false)
        })
    }

    private initializeEventListeners(): void {
        this.sendButton.addEventListener('click', () => this.sendMessage())
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage()
        })
    }

    private sendMessage(): void {
        const content = this.messageInput.value.trim()
        if (!content || !this.ws.isConnected()) return

        const sender = this.nameInput.value.trim() || 'Anônimo'

        document.getElementById('welcome-message')?.remove()

        // Enviar mensagem via socket.send()
        this.ws.send(content, sender)

        // Renderizar mensagem local imediatamente
        const message: Message = {
            id: `msg-${Date.now()}`,
            content,
            sender,
            timestamp: new Date().toISOString(),
            isOwn: true
        }

        this.messages.push(message)
        this.renderMessage(message)
        this.messageInput.value = ''
        this.messageInput.focus()
    }

    private handleIncomingMessage(msg: WebSocketMessage): void {
        if (msg.type === 'chat') {
            const message: Message = {
                id: `msg-${Date.now()}`,
                content: msg.data,
                sender: msg.sender,
                timestamp: msg.timestamp,
                isOwn: false
            }

            this.messages.push(message)
            this.renderMessage(message)
        }
    }

    private renderMessage(message: Message): void {
        const messageEl = document.createElement('div')
        messageEl.className = `flex ${message.isOwn ? 'justify-end' : 'justify-start'} message-enter`
        
        const bubbleClass = message.isOwn ? 'message-bubble own' : 'message-bubble other'
        messageEl.innerHTML = `
            <div class="${bubbleClass}">
                <div class="font-medium text-xs mb-1 ${message.isOwn ? 'text-white' : 'opacity-75'}">${this.escapeHtml(message.sender)}</div>
                <div>${this.escapeHtml(message.content)}</div>
                <div class="text-xs mt-1 ${message.isOwn ? 'text-white' : 'opacity-50'}">${this.formatTime(message.timestamp)}</div>
            </div>
        `

        this.messagesContainer.appendChild(messageEl)
        this.scrollToBottom()
    }

    private updateUserStatus(connected: boolean): void {
        const statusDot = this.userStatusEl.querySelector('.animate-pulse')
        if (statusDot) {
            statusDot.className = connected ? 'inline-block w-2 h-2 bg-primary rounded-full animate-pulse' : 'inline-block w-2 h-2 bg-red-500 rounded-full'
        }
        
        const statusText = this.userStatusEl.querySelector('span:last-child')
        if (statusText) {
            statusText.textContent = connected ? 'Conectado' : 'Desconectado'
        }
    }

    private scrollToBottom(): void {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }

    private formatTime(dateString: string): string {
        const date = new Date(dateString)
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div')
        div.textContent = text
        return div.innerHTML
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp()
})

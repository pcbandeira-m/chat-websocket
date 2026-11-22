/**
 * Chat Application - Main Entry Point
 */

interface Message {
    id: string
    content: string
    sender: string
    timestamp: Date
    isOwn: boolean
}

interface Conversation {
    id: string
    name: string
    lastMessage: string
    lastUpdate: Date
}

class ChatApp {
    private messageInput: HTMLInputElement
    private sendButton: HTMLButtonElement
    private messagesContainer: HTMLElement
    private newChatInput: HTMLInputElement
    private newChatButton: HTMLButtonElement
    private conversationsContainer: HTMLElement
    private messages: Message[] = []
    private conversations: Conversation[] = []

    constructor() {
        this.messageInput = document.getElementById('message-input') as HTMLInputElement
        this.sendButton = document.getElementById('send-btn') as HTMLButtonElement
        this.messagesContainer = document.getElementById('messages-container') as HTMLElement
        this.newChatInput = document.getElementById('new-chat-input') as HTMLInputElement
        this.newChatButton = document.getElementById('new-chat-btn') as HTMLButtonElement
        this.conversationsContainer = document.getElementById('conversations') as HTMLElement

        this.initializeEventListeners()
        this.loadSampleData()
    }

    private initializeEventListeners(): void {
        this.sendButton.addEventListener('click', () => this.sendMessage())
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage()
        })
        this.newChatButton.addEventListener('click', () => this.createNewConversation())
        this.newChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.createNewConversation()
        })
    }

    private sendMessage(): void {
        const content = this.messageInput.value.trim()
        if (!content) return

        const message: Message = {
            id: `msg-${Date.now()}`,
            content,
            sender: 'Você',
            timestamp: new Date(),
            isOwn: true
        }

        this.messages.push(message)
        this.renderMessage(message)
        this.messageInput.value = ''
        this.messageInput.focus()

        this.simulateResponse()
    }

    private renderMessage(message: Message): void {
        const messageEl = document.createElement('div')
        messageEl.className = `flex ${message.isOwn ? 'justify-end' : 'justify-start'} message-enter`
        
        const bubbleClass = message.isOwn ? 'message-bubble own' : 'message-bubble other'
        messageEl.innerHTML = `
            <div class="${bubbleClass}">
                <div class="font-medium text-xs opacity-75 mb-1">${message.sender}</div>
                <div>${this.escapeHtml(message.content)}</div>
                <div class="text-xs opacity-50 mt-1">${this.formatTime(message.timestamp)}</div>
            </div>
        `

        this.messagesContainer.appendChild(messageEl)
        this.scrollToBottom()
    }

    private simulateResponse(): void {
        setTimeout(() => {
            const response: Message = {
                id: `msg-${Date.now()}`,
                content: '👍 Mensagem recebida! Esta é uma resposta simulada.',
                sender: 'Chat',
                timestamp: new Date(),
                isOwn: false
            }
            this.messages.push(response)
            this.renderMessage(response)
        }, 800)
    }

    private scrollToBottom(): void {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight
    }

    private createNewConversation(): void {
        const name = this.newChatInput.value.trim()
        if (!name) return

        const conversation: Conversation = {
            id: `conv-${Date.now()}`,
            name,
            lastMessage: 'Nova conversa',
            lastUpdate: new Date()
        }

        this.conversations.push(conversation)
        this.newChatInput.value = ''
        this.renderConversationItem(conversation)
        this.selectConversation(conversation.id)
    }

    private renderConversationItem(conv: Conversation): void {
        const convEl = document.createElement('div')
        convEl.className = 'p-3 rounded-lg bg-slate-600/30 hover:bg-primary/20 cursor-pointer transition-colors'
        convEl.innerHTML = `
            <div class="font-medium text-white text-sm">${this.escapeHtml(conv.name)}</div>
            <div class="text-xs text-white/60 mt-1 truncate">${this.escapeHtml(conv.lastMessage)}</div>
        `
        convEl.addEventListener('click', () => this.selectConversation(conv.id))
        this.conversationsContainer.appendChild(convEl)
    }

    private selectConversation(_convId: string): void {
        this.messages = []
        this.messagesContainer.innerHTML = `
            <div class="flex justify-center items-center h-full text-accent/50">
                <div class="text-center">
                    <p class="text-lg mb-2">💬 Conversa iniciada</p>
                    <p class="text-sm">Digite uma mensagem para começar</p>
                </div>
            </div>
        `
    }

    private formatTime(date: Date): string {
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

    private loadSampleData(): void {
        this.conversations = [
            {
                id: 'conv-1',
                name: 'Geral',
                lastMessage: 'Bem-vindo ao chat!',
                lastUpdate: new Date()
            }
        ]
        this.renderConversationItem(this.conversations[0])
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp()
})

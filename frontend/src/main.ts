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

class ChatApp {
    private nameInput: HTMLInputElement
    private messageInput: HTMLInputElement
    private sendButton: HTMLButtonElement
    private messagesContainer: HTMLElement
    private messages: Message[] = []

    constructor() {
        this.nameInput = document.getElementById('name-input') as HTMLInputElement
        this.messageInput = document.getElementById('message-input') as HTMLInputElement
        this.sendButton = document.getElementById('send-btn') as HTMLButtonElement
        this.messagesContainer = document.getElementById('messages-container') as HTMLElement
        this.initializeEventListeners()
    }

    private initializeEventListeners(): void {
        this.sendButton.addEventListener('click', () => this.sendMessage())
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage()
        })
    }

    private sendMessage(): void {
        const content = this.messageInput.value.trim()
        if (!content) return

        const sender = this.nameInput.value.trim() || 'Anônimo'

        document.getElementById('welcome-message')?.remove()

        const message: Message = {
            id: `msg-${Date.now()}`,
            content,
            sender,
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
                <div class="font-medium text-xs mb-1 ${message.isOwn ? 'text-white' : 'opacity-75'}">${this.escapeHtml(message.sender)}</div>
                <div>${this.escapeHtml(message.content)}</div>
                <div class="text-xs mt-1 ${message.isOwn ? 'text-white' : 'opacity-50'}">${this.formatTime(message.timestamp)}</div>
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

}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ChatApp()
})

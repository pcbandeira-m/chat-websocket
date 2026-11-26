/**
 * WebSocket Client for Chat Application - Native Implementation
 * Implementação nativa da API WebSocket do navegador com TypeScript
 */

import type { WebSocketMessage } from './types'

export interface WebSocketConfig {
    url: string
    reconnectAttempts?: number
    reconnectDelay?: number
}

export class ChatWebSocket {
    private ws: WebSocket | null = null
    private url: string
    private reconnectAttempts: number
    private reconnectDelay: number
    private currentAttempt = 0
    private messageHandlers: ((message: WebSocketMessage) => void)[] = []
    private openHandlers: (() => void)[] = []
    private closeHandlers: (() => void)[] = []
    private errorHandlers: ((error: Event) => void)[] = []

    constructor(config: WebSocketConfig) {
        this.url = config.url
        this.reconnectAttempts = config.reconnectAttempts || 5
        this.reconnectDelay = config.reconnectDelay || 3000
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.url)

                // onopen: Evento disparado quando a conexão é estabelecida
                this.ws.onopen = () => {
                    console.log('✓ Conectado ao servidor WebSocket')
                    this.currentAttempt = 0
                    this.openHandlers.forEach(handler => handler())
                    resolve()
                }

                // onmessage: Evento disparado quando uma mensagem é recebida
                this.ws.onmessage = (event: MessageEvent) => {
                    try {
                        const message: WebSocketMessage = JSON.parse(event.data)
                        this.messageHandlers.forEach(handler => handler(message))
                    } catch (error) {
                        console.error('Erro ao parsear mensagem:', error)
                    }
                }

                // onerror: Evento disparado quando ocorre um erro
                this.ws.onerror = (error: Event) => {
                    console.error('Erro WebSocket:', error)
                    this.errorHandlers.forEach(handler => handler(error))
                    reject(error)
                }

                // onclose: Evento disparado quando a conexão é fechada
                this.ws.onclose = () => {
                    console.log('Desconectado do servidor')
                    this.closeHandlers.forEach(handler => handler())
                    this.attemptReconnect()
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    send(data: string, sender: string): void {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket não está conectado')
            return
        }

        const message: WebSocketMessage = {
            type: 'chat' as const,
            data,
            sender,
            timestamp: new Date().toISOString()
        }

        this.ws.send(JSON.stringify(message))
    }

    // Adiciona handler para mensagens recebidas
    onMessage(callback: (message: WebSocketMessage) => void): void {
        this.messageHandlers.push(callback)
    }

    // Adiciona handler para abertura de conexão
    onOpen(callback: () => void): void {
        this.openHandlers.push(callback)
    }

    // Adiciona handler para fechamento de conexão
    onClose(callback: () => void): void {
        this.closeHandlers.push(callback)
    }

    // Adiciona handler para erros
    onError(callback: (error: Event) => void): void {
        this.errorHandlers.push(callback)
    }

    private attemptReconnect(): void {
        if (this.currentAttempt < this.reconnectAttempts) {
            this.currentAttempt++
            console.log(`Tentando reconectar... (${this.currentAttempt}/${this.reconnectAttempts})`)
            setTimeout(() => this.connect().catch(console.error), this.reconnectDelay)
        }
    }

    disconnect(): void {
        if (this.ws) {
            this.ws.close()
            this.ws = null
        }
    }

    isConnected(): boolean {
        return this.ws !== null && this.ws.readyState === WebSocket.OPEN
    }
}

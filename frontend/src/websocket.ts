/**
 * WebSocket Client for Chat Application
 * Exemplo de como conectar ao servidor WebSocket
 */

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
    private listeners: Map<string, (data: unknown) => void> = new Map()

    constructor(config: WebSocketConfig) {
        this.url = config.url
        this.reconnectAttempts = config.reconnectAttempts || 5
        this.reconnectDelay = config.reconnectDelay || 3000
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            try {
                this.ws = new WebSocket(this.url)

                this.ws.onopen = () => {
                    console.log('✓ Conectado ao servidor WebSocket')
                    this.currentAttempt = 0
                    resolve()
                }

                this.ws.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data)
                        this.emit(data.type, data.payload)
                    } catch (error) {
                        console.error('Erro ao parsear mensagem:', error)
                    }
                }

                this.ws.onerror = (error) => {
                    console.error('Erro WebSocket:', error)
                    reject(error)
                }

                this.ws.onclose = () => {
                    console.log('Desconectado do servidor')
                    this.attemptReconnect()
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    send(type: string, payload: unknown): void {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
            console.error('WebSocket não está conectado')
            return
        }

        this.ws.send(
            JSON.stringify({
                type,
                payload,
                timestamp: new Date().toISOString()
            })
        )
    }

    on(type: string, callback: (data: unknown) => void): void {
        this.listeners.set(type, callback)
    }

    off(type: string): void {
        this.listeners.delete(type)
    }

    private emit(type: string, payload: unknown): void {
        const callback = this.listeners.get(type)
        if (callback) {
            callback(payload)
        }
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

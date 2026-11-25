/**
 * Utility functions for Chat Application
 */

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })
}

export const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

export const formatDateTime = (date: Date): string => {
    return `${formatDate(date)} ${formatTime(date)}`
}

export const escapeHtml = (text: string): string => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
}

export const generateId = (prefix: string = 'id'): string => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export const debounce = <T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => fn(...args), delay)
    }
}

export const throttle = <T extends (...args: unknown[]) => unknown>(
    fn: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let lastRun = 0
    return (...args: Parameters<T>) => {
        const now = Date.now()
        if (now - lastRun >= limit) {
            fn(...args)
            lastRun = now
        }
    }
}

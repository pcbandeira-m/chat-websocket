package br.projeto.chat_ws.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import br.projeto.chat_ws.handler.ChatWebSocketHandler;

/**
 * Classe de configuração do endpoint WebSocket nativo no Spring Boot.
 *
 * <p>Não utiliza STOMP ({@code @EnableWebSocketMessageBroker}) nem SockJS ({@code .withSockJS()}),
 * garantindo comunicação direta pelo protocolo padrão {@code ws://}.
 */
@Configuration
@EnableWebSocket // Habilita o suporte nativo a WebSocket no servidor Spring
public class WebSocketConfig implements WebSocketConfigurer {

	/** Rota pública onde os clientes devem abrir a conexão ws:// */
	public static final String WEBSOCKET_ENDPOINT = "/ws/chat";

	private final ChatWebSocketHandler chatWebSocketHandler;

	/**
	 * Injeta o handler customizado responsável por processar conexões e mensagens do chat.
	 */
	public WebSocketConfig(ChatWebSocketHandler chatWebSocketHandler) {
		this.chatWebSocketHandler = chatWebSocketHandler;
	}

	/**
	 * Registra os handlers WebSocket e define as rotas e políticas de origem permitidas.
	 *
	 * @param registry registro usado pelo Spring para mapear rotas WebSocket aos seus handlers
	 */
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry
				// Mapeia o handler customizado diretamente na rota /ws/chat (sem fallback SockJS)
				.addHandler(chatWebSocketHandler, WEBSOCKET_ENDPOINT)
				// Libera conexões de qualquer origem (ex: http://localhost:5173 do Vite) durante o desenvolvimento
				.setAllowedOrigins("*");
	}

}

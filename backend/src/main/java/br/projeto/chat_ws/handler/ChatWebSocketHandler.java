package br.projeto.chat_ws.handler;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 * Handler WebSocket nativo (ws://) responsável pelo ciclo de vida das conexões
 * e pelo broadcast das mensagens de texto recebidas para todos os clientes conectados.
 */
@Component // Registra a classe como um bean do Spring para ser usada no WebSocketConfig
public class ChatWebSocketHandler extends TextWebSocketHandler {

	private static final Logger log = LoggerFactory.getLogger(ChatWebSocketHandler.class);

	/**
	 * Conjunto thread-safe que guarda todas as sessões ativas no servidor.
	 * Cada aba/cliente conectado possui sua própria WebSocketSession.
	 */
	private final Set<WebSocketSession> sessions = ConcurrentHashMap.newKeySet();

	/**
	 * Chamado quando um cliente conclui o handshake ws:// e abre a conexão.
	 */
	@Override
	public void afterConnectionEstablished(WebSocketSession session) {
		sessions.add(session);
		log.info("Conexão aberta: id={} (clientes conectados: {})", session.getId(), sessions.size());
	}

	/**
	 * Chamado sempre que o servidor recebe uma mensagem de texto de um cliente.
	 * Registra no console e reenvia (broadcast) para todos os clientes conectados.
	 */
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) {
		log.info("Mensagem recebida de {}: {}", session.getId(), message.getPayload());
		broadcast(message);
	}

	/**
	 * Chamado quando um cliente fecha a conexão.
	 * Remove a sessão da lista de ativos e registra o encerramento no console.
	 */
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
		sessions.remove(session);
		log.info("Conexão encerrada: id={}, status={} (clientes conectados: {})",
				session.getId(), status, sessions.size());
	}

	/**
	 * Envia uma mensagem para todas as sessões que ainda estão abertas.
	 * O try/catch individual evita que um erro em um cliente impeça o envio aos demais.
	 */
	public void broadcast(TextMessage message) {
		for (WebSocketSession session : sessions) {
			if (!session.isOpen()) {
				sessions.remove(session);
				continue;
			}

			try {
				synchronized (session) {
					session.sendMessage(message);
				}
			} catch (IOException e) {
				log.error("Erro ao enviar mensagem para a sessão {}", session.getId(), e);
			}
		}
	}

}

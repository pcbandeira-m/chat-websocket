package br.projeto.chat_ws;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.net.URI;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import br.projeto.chat_ws.config.WebSocketConfig;

/**
 * Teste de integração simples para verificar o handshake ws:// e o broadcast entre clientes.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class WebSocketConfigIntegrationTest {

	@LocalServerPort
	private int port;

	@Test
	void deveConectarDoisClientesEFazerBroadcast() throws Exception {
		StandardWebSocketClient client = new StandardWebSocketClient();
		CompletableFuture<String> recebidoCliente1 = new CompletableFuture<>();
		CompletableFuture<String> recebidoCliente2 = new CompletableFuture<>();

		WebSocketHttpHeaders headers = new WebSocketHttpHeaders();
		headers.setOrigin("http://localhost:5173");

		URI uri = URI.create("ws://localhost:" + port + WebSocketConfig.WEBSOCKET_ENDPOINT);

		WebSocketSession session1 = client.execute(
				new TextWebSocketHandler() {
					@Override
					protected void handleTextMessage(WebSocketSession session, TextMessage message) {
						recebidoCliente1.complete(message.getPayload());
					}
				},
				headers,
				uri
		).get(5, TimeUnit.SECONDS);

		WebSocketSession session2 = client.execute(
				new TextWebSocketHandler() {
					@Override
					protected void handleTextMessage(WebSocketSession session, TextMessage message) {
						recebidoCliente2.complete(message.getPayload());
					}
				},
				headers,
				uri
		).get(5, TimeUnit.SECONDS);

		assertTrue(session1.isOpen());
		assertTrue(session2.isOpen());

		String mensagem = "{\"sender\":\"Maria\",\"content\":\"Olá!\"}";
		session1.sendMessage(new TextMessage(mensagem));

		assertEquals(mensagem, recebidoCliente1.get(5, TimeUnit.SECONDS));
		assertEquals(mensagem, recebidoCliente2.get(5, TimeUnit.SECONDS));

		session1.close();
		session2.close();
	}

}

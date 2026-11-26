Meta
Desenvolver uma aplicação simples de comunicação em tempo real utilizando WebSocket, capaz de demonstrar a diferença entre o modelo tradicional de requisição-resposta do HTTP e o modelo bidirecional de comunicação contínua.

Ao final da atividade, o aluno deverá ser capaz de:

Estabelecer uma conexão WebSocket entre cliente e servidor;

Enviar e receber mensagens em tempo real;

Compreender o ciclo de vida de uma conexão WebSocket (abertura, envio, recebimento e encerramento);

Tomar decisões sobre como gerenciar múltiplos clientes conectados;

Justificar tecnicamente por que o WebSocket é mais adequado que polling ou REST para determinados cenários.

Regras
Escopo da atividade
Cada grupo deverá implementar um Estudo de caso que utilize de atualizações em Tempo Real.

O sistema deve possuir:

Um servidor WebSocket;

Uma interface web simples (HTML + JavaScript);

Um mecanismo para envio de atualizações;

Atualização automática da interface dos clientes conectados.

Exemplos de notificações:

Novo pedido recebido;

Novo aluno conectado;

Nova mensagem do sistema;

Alerta de monitoramento.

O tema da atualização é livre.

Requisitos mínimos obrigatórios
A implementação deve obrigatoriamente:

Utilizar o protocolo WebSocket (ws://) para comunicação (não serão aceitas libs que deixem o protocolo ws:// transparente);

Possuir ao menos dois clientes conectados simultaneamente;

Permitir envio de mensagens do cliente para o servidor;

Permitir envio de mensagens do servidor para todos os clientes conectados (broadcast);

Exibir visualmente as mensagens recebidas;

Registrar no console do servidor:

abertura de conexão;

recebimento de mensagem;

encerramento de conexão.

Tomada de decisão obrigatória
O grupo deverá decidir e justificar:

Como identificar os clientes conectados;

Como armazenar as conexões ativas;

Como tratar clientes desconectados;

Qual formato de mensagem será utilizado (texto simples ou JSON).

As decisões devem ser descritas brevemente na entrega.

Recomendações 
Recomenda-se utilizar:

Linguagem	Biblioteca	Tipo / Escopo	Principal Característica
Node.js	ws	Servidor / Cliente	Padrão da comunidade, rápida e estável.
Node.js	uWebSockets.js	Servidor	Performance extrema, baseada em C++.
Python	websockets	Servidor / Cliente	Assíncrona (asyncio), moderna e limpa.
Python	websocket-client	Cliente	Síncrona, ideal para scripts e automações.
Go	gorilla/websocket	Servidor / Cliente	Biblioteca mais tradicional, robusta e amplamente utilizada.
Go	nhooyr/websocket	Servidor / Cliente	Moderna, minimalista e com excelente suporte a contextos.
Java / Kotlin	Java-WebSocket	Servidor / Cliente	Pura, sem dependências externas, compatível com Android.
Java / Kotlin	Tyrus	Servidor / Cliente	Implementação de referência oficial da especificação Jakarta WebSocket.
C# (.NET)	System.Net.WebSockets	Servidor / Cliente	Nativa do .NET, integrada ao ecossistema oficial da plataforma.
C# (.NET)	WebSocketSharp	Servidor / Cliente	Muito utilizada em projetos legados e aplicações Unity.
Rust	tungstenite	Servidor / Cliente	Implementação leve e robusta de WebSocket puro.
Rust	tokio-tungstenite	Servidor / Cliente	Integrada ao ecossistema assíncrono Tokio.
C++	uWebSockets	Servidor	Uma das implementações WebSocket mais rápidas do mercado.
C++	Boost.Beast	Servidor / Cliente	Integrada ao Boost.Asio, altamente escalável e flexível.
A interface pode ser minimalista.

Possíveis simplificações
Caso o grupo não conclua a interface completa:

O servidor poderá enviar mensagens automáticas a cada 10 segundos;

O cliente poderá apenas receber mensagens;

As mensagens poderão ser exibidas somente em uma lista HTML simples.

Entretanto, o uso de WebSocket e o broadcast continuam obrigatórios.
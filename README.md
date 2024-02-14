# Chat App Frontend
Este é o frontend do Chat App, um aplicativo de chat em tempo real.

## Principais Tecnologias
- Next.js
- Tailwindcss
- Socket.io

## Instalação
1. Clone o repositório
2. Instale as dependências
```npm install```
3. Configure as variáveis de ambiente.

Todas as variáveis de ambiente possuem valores padrão, mas podem ser alteradas no contexto da aplicação.

Variáveis de ambiente:
- `SERVER_URL`: URL do servidor de backend. Padrão: http://localhost:4000;

5. Inicie o servidor em ambiente de desenvolvimento
```npm run dev```

Observação, é necessário que o backend esteja rodando para que o frontend funcione corretamente.

## Arquitetura
A arquitetura seguida no frontend foi o pattern de arquitetura de componentes, que é a arquitetura padrão do NextJs. A estrutura de pastas do projeto é organizada da seguinte forma:

- `src/`: Código-fonte da aplicação
  - `app/`: Componente principal da aplicação;
  - `components/`: Componentes reutilizáveis;
  - `contexts/`: Contextos da aplicação;
  - `lib/`: Funções e hooks reutilizáveis;
  - `services/`: Serviços de comunicação com o backend;
  - `types/`: Tipos de dados da aplicação;

## Processo de desenvolvimento
A utilização do next como framework foi de grande aprendizado, porém por ser uma framework ao qual não possuo familiaridade, o desenvolvimento foi um pouco mais lento, pois coisas simples custaram mais tempo que o usual. A utilização do tailwindcss foi uma escolha para agilizar o desenvolvimento do frontend.

As minhas principais barreiras foram ter de lidar com a comunicação do server-side com o client-side, o NextJs possui um sistema de renderização server-side único, custou bastante esforço para faze-lo se integrar com o websocket do servidor, pois o NextJs limita certos recursos que só podem ser utilizados por um dos lados (client ou server), como os useContext, que não podem ser utilizados no server-side.

### Features planejadas
Confesso que fui bastante ambicioso com as features planejadas, dado ao meu "know-how" com VueJs, substimei um pouco a curva de aprendizado do NextJs, mas sinto que consegui entregar e aprendar bastante coisa pro pouco tempo que tive para desenvolver o teste.

Features entregues:
- Cadastro de usuários;
- Autenticação de usuários;
- Envio de mensagens;
- Estado de mensagens, se foram lidas, entregues ou não;
- Presença de usuários online;
- Base de expanção de presença de usuários online para mais estados, como "ocupado", "ausente", etc;
- Ordenação de lista de usuários por estado (online primeiro);

Features planejadas:
- Notificações de novas mensagens;
- Autenticação do WebSocket;
- Notificação que redireciona para a conversa quando o usuário recebe uma nova mensagem;
- Testes unitários e de integração;
- Testes E2E;
- Melhorar a responsividade do app;
- Ultima mensagem enviada ou recebida no card de usuário;

## Conclusão
Aprendi bastante com esse teste, e sinto que consegui entregar um bom trabalho, mesmo com as limitações de tempo e da não familiaridade com o NextJs. Foquei bastante em tentar construir uma base sólida para a aplicação (caso ela fosse expandida e escalada no futuro), na manuntenabilidade de código e na organização do projeto. Acredito que o código está bem modularizado e organizado, e que a aplicação está pronta para ser expandida e escalada.

Acesse o backend do Chat App [aqui](https://github.com/Paferreira982/chat-app-server/tree/develop).

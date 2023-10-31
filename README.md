# Subindo o keycloak e configurando os acessos das aplicações.
## Credenciais: 
Portainer:
admin
teste12345678

konga:
admkonga
an7TzwSU1adkOBye

keycloak:
admin
admin
## Configurações iniciais:
1. docker compose up -d
2. Acessar keycloak: http://localhost:8080
3. Criar Realm: "projetox"
4. Criar Clients: nest(Confidential), next(public)
5. Pegar chave gerada no cliente nest e inserir na propriedade "client_secret" em /nest/src/auth/auth/auth.service.ts
6. Copiar a chave RSA em Realm Settings(RS256 SIG Public Key) e colar na propriedade JWT_SECRET nos arquivos EL/Projeto_X_3/nest/.env e EL/Projeto_X_3/next.js/.env.local
7. Recriar os containers app e next no portainer.
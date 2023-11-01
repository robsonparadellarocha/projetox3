# ProjetoX

## Configuração do Ambiente:

* Atenção: Ao rodar o projeto no docker em um ambiente Windows foi visto que o mesmo não encontra o arquivo: "entrypoint.sh", portanto todos os testes estão sendo feitos no docker em um ambiente linux (WSL - Linux virtualizado da Microsoft Store), instalação conforme passo a passo abaixo:

1. Acesse a Microsoft Store(Somente a partir do windows 10)
2. Procure por WSL e instale-o.
3. Após instalação, abra um terminal do windows(cmd) e execute os seguintes comandos:
* Atualizar o WSL com a versão 2004 do Windows 10 ou Windows 11, o WSL já está presente em sua máquina, execute o comando para pegar a versão mais recente do WSL:
```
wsl --update
```
* A versão 1 do WSL pode ser a padrão em sua máquina, execute o comando abaixo para definir como padrão a versão 2:
```
wsl --set-default-version 2
```
* Instale o Ubuntu:
```
wsl --install
```
* Durante a instalação será requisitado um nome para o seu usuário no ubuntu. Ao término da instalação, o terminal deverá entrar no shell do ubuntu virtualizado.
Para acessar os diretórios no VSCode, Clique no canto inferior esquerdo no símbolo: >< e abrirá um dropbox com a opção "Conectar ao WSL".<br>
4. Após Conectado, adicione a pasta ao workspace do VSCode "/home/seuUsuario", crie uma pasta dentro dela com: 
```
mkdir novapasta
```
5. Abra o shell do ubuntu já no vscode e Instale o docker engine com o seguinte passo a passo:
```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```
```
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```
```
apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
* Para verificar se foi Instalado com sucesso:
```
docker run hello-world
```
6. Após instalado o docker engine, entre na pasta criada: 
```
cd /home/seuUsuario/novapasta
```
7. Clone o projeto com: 
```
git clone https://github.com/robsonparadellarocha/projetox3.git
```
8. Entre na pasta com:  
```
cd projetox3
```

## Aplicações dos Containers no Docker Compose:
1. database: Banco Postgres para o Kong: ```http://localhost:5432```
2. kong: API Gateway: ```http://localhost:8000```
3. konga: Interface de Administração do API Gateway: ```http://localhost:1337```
4. adminer: Interface Web para administação dos bancos de dados locais: ```http://localhost:8081```
5. portainer: Interface Web para adminstração dos Containers: ```http://localhost:9000```
6. keycloak: Aplicação de Autorização e Autenticação: ```http://localhost:8080```
7. app: Aplicação Backend em NestJS: ```http://localhost:3000```
8. db: Banco Mysql para o Backend: ```http://localhost:3306```
9. next: Aplicação Frontend em NextJS: ```http://localhost:3001```
* Os containers "kong-migration" e "konga-prepare" são executados somente uma vez e são finalizados(Status: exited) pois são apenas scripts de criação de tabelas no banco postgres.

## Subindo as Aplicações:
1. Edite o arquivo hosts do windows para que o endereço localhost aponte para o gateway do docker engine. O arquivo encontra-se em:<br>
```C:\Windows\System32\drivers\etc\hosts```<br>
Adicione a seguinte linha no final do mesmo:
```
127.0.0.1 host.docker.internal
```
2. Suba os containers com: 
```
docker compose up -d
```
3. Acesse o keycloak em: 
```
http://localhost:8080
```
4. Crie o Realm: "projetox"
5. Crie os Clients: nest(Confidential), next(public)
6. Crie um usuário no menu Users atribuindo nome, email, username, etc. Após criá-lo, vá até a aba Credentials e atribua uma senha para o mesmo desmarcando a opção "Set Temporary'.
7. Copie chave secreta gerada na aba credentials no cliente nest e insira na propriedade "client_secret" em /nest/src/auth/auth/auth.service.ts
8. Copie a chave RSA em Realm Settings(RS256 SIG Public Key) e colar na propriedade JWT_SECRET nos arquivos EL/Projeto_X_3/nest/.env e EL/Projeto_X_3/next.js/.env.local <br>
* Atenção: A chave deve estar entre as strings:<br>
-----BEGIN PUBLIC KEY-----\n```COLARCHAVEAQUI```\n-----END PUBLIC KEY-----
9. Acesse o Portainer em: 
```
http://localhost:9000
```
* Remova os containers "app" e "next". Em seguida vá novamente ao terminal e digite novamente: 
```
docker compose up -d
```
10. Após os containers iniciarem, deverá ser possível testar a autenticação com o keycloak, acessando o endereço: 
```
http://localhost:3001/private
```
* O mesmo redirecionará para a tela de login do keycloak onde ao efetuar login com o usuário criado, a tela deverá exibir: "Autenticado com sucesso com keycloak" onde "sucesso com keycloak" é uma string enviada por uma rota também protegida pelo keycloak do backend em nestJS.
* Para Deslogar pode-se pressionar F12, ir na aba "Application", em "Cookies" e em ```http://localhost:3001```, em seguida, apagar todos os cookies armazenados para este endereço. Para encerrar a sessão no keycloak, pode-se ir no painel de administração do keycloak, em "Sessions" e em "Logout All" no canto superior direito.
11. Para adicionar a autenticação com Google ou qualquer outro provedor de identidade, acesse o menu "Identity Providers" e em "Add Provider" selecione Google ou qualquer outro serviço, então digite as credenciais em "Cliend ID" e "Client Secret". Após Adicionar, a opção de login com google aparecerá na tela de Login. Lembrando que para esta opção funcionar corretamente, a rota da sua aplicação keycloak "localhost:8080" deverá estar exposta a um endereço externo(para teste pode-se utilizar o ngrok). E este endereço externo deve ser adicionado no provedor(Google,etc) como "Valid Redirects URIs" para que o mesmo autorize a requisição da sua aplicação.
12. Qualquer erro gerado pelos containers durante esta etapa de configuração pode ser visualizado no Portainer nos Logs do Container.

## Credenciais: 

* Portainer:<br>
admin <br>
teste12345678 <br>

* konga:<br>
admkonga <br>
an7TzwSU1adkOBye <br>

* keycloak:<br>
admin <br>
admin <br>

* postgres:<br>
admin <br>
admin <br>

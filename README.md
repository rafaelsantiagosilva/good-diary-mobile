<div align="center"><h1> 📓 Good Diary App 📱</h1></div>

O aplicativo do **Good Diary** consiste em um software para a manipulação de registros de notas de um usuário, com temas claro e escuro.

O sistema consiste em um software feito para servir como diário pessoal, onde o usuário pode escrever notas sobre o seu dia, consultá-las, editá-las e excluí-las.

## Ferramentas ✂️

<div style="display: inline-block">
  <img src="https://img.shields.io/badge/React_Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/NativeWind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="NativeWind" />
  <img src="https://img.shields.io/badge/Orval-4F46E5?style=for-the-badge&logo=openapi&logoColor=white" alt="Orval" />
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" />
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black" alt="Prettier" />
</div>

## Configuração Inicial 🛠️

Antes de rodar a aplicação, certifique-se de que o projeto da [API](https://github.com/rafaelsantiagosilva/good-diary-backend) esteja rodando.

Crie um arquivo `.env` na raiz do projeto e preencha as variáveis abaixo:

```conf
EXPO_PUBLIC_API_URL=http://localhost:3000 # URL da API rodando.
# Caso esteja rodando em um celular de fato, utilizar URL com IP da máquina da API.
```

## Telas da Aplicação 📲

### Login

- Função de realizar o login do usuário.

<p align="center" style="display: flex; gap:5px">
  <img src="./docs/screens/light-login.jpeg" width="45%" alt="Tela de Login em Tema Claro" />
  <img src="./docs/screens/dark-login.jpeg" width="45%" alt="Tela de Login em Tema Escuro" />
</p>

### Criar conta

- Função de criar uma conta e logo em seguida realizar o login do usuário.

<p align="center" style="display: flex; gap:5px">
  <img src="./docs/screens/light-create-account.jpeg" width="45%" alt="Tela de Criar Conta em Tema Claro" />
  <img src="./docs/screens/dark-create-account.jpeg" width="45%" alt="Tela de Criar Conta em Tema Escuro" />
</p>

### Home

- Listagem das notas e as possibilidades de:
  - Criação de uma nova
  - Edição de uma nota
  - Exclusão de uma nota

<p align="center" style="display: flex; gap:5px">
  <img src="./docs/screens/light-home.jpeg" width="45%" alt="Tela Principal em Tema Claro" />
  <img src="./docs/screens/dark-home.jpeg" width="45%" alt="Tela Principal em Tema Escuro" />
</p>

### Perfil

- Informações sobre o usuário
- Mudar o tema da aplicação

<p align="center" style="display: flex; gap:5px">
  <img src="./docs/screens/light-profile.jpeg" width="45%" alt="Tela de Perfil em Tema Claro" />
  <img src="./docs/screens/dark-profile.jpeg" width="45%" alt="Tela de Perfil em Tema Escuro" />
</p>

## Comandos ⌨️

### 1. Instalação

```bash
# Instalar dependências
pnpm install
```

### 2. Criar os serviços da API

```bash
# Tenha certeza de ter preenchido o .env adequadamente
pnpm api:generate
```

### 3. Execução

```bash
# Iniciar execução pelo Expo
pnpm start

# Abrir o app em uma máquina Android conectada ou VM
pnpm android

# Abrir o app em uma máquina IOS conectada ou VM
pnpm ios
```

<div align="center"><span style="font-size: 0.7em;">🦇 Feito com 💜</span></div>
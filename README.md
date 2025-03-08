# CadeMeuPet

Aplicativo desenvolvido como requisito para aprovação na Disciplina de Dispositivos Móveis - IFRO.

Este projeto tem como objetivo auxiliar na busca por animais perdidos, fornecendo recursos para cadastrar animais que foram vistos ou desaparecidos, além de exibir tais animais em um mapa interativo.

## <a id="funcionalidades"></a>Funcionalidades

- **Cadastro de Animais Perdidos**: Permite incluir informações sobre o animal desaparecido (nome, tipo, descrição, localização, etc.).
- **Exibição de Animais em Carrossel**: Lista de animais cadastrados, com botão para visualizar a localização no mapa.
- **Visualização em Mapa**: Localiza o animal no mapa com base nas coordenadas fornecidas.
- **Interação com API/Servidor**: O aplicativo se comunica com um servidor Node/Express para efetuar o cadastro e a listagem dos animais.

---

## <a id="requisitos"></a>Requisitos

- **Node.js** (>= 14.x)
- **npm** ou **yarn**
- **Expo CLI** (instalada globalmente ou utilizar via `npx`)

---

## <a id="instalacao-e-execucao"></a>Instalação e Execução

1. **Clonar este repositório**:
   ```bash
   git clone https://github.com/seu-usuario/CadeMeuPet.git
   ```

2. **Instalar dependências:**

    Na pasta raiz do projeto (onde está o app React Native e o arquivo package.json), execute: 
    
    ´´´bash
    npm install
    ´´´

3. **Executar o servidor:**

    Na /server onde se encontra o arquivo server.js, rode:

    ´´´bash
    node server.js
    ´´´

    Verifique se o servidor está rodando na porta configurada (por padrão, 3000).

4. **Executar o aplicativo:**

    Volte à pasta raiz do projeto (onde estão os arquivos do Expo) e execute:
    
    ´´´bash
    npx expo start
    ´´´

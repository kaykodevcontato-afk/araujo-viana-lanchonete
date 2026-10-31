# Araújo Viana | Lanchonete 💗

Landing page responsiva para a **Araújo Viana Lanchonete**, com identidade em rosa-claro, marrom chocolate e creme.

## Funcionalidades

- Navegação adaptada para celular, tablet e computador
- Catálogo de salgados, tortas e bolos
- Filtro de produtos por categoria
- Carrinho interativo com ajuste de quantidades
- Campo para nome e observações
- Copiar a mensagem do pedido ou abri-la no WhatsApp
- Armazenamento do carrinho no navegador do cliente

> **Importante:** este é um site de demonstração. Os produtos são ilustrativos, os preços estão sob consulta e o número de WhatsApp do estabelecimento ainda precisa ser preenchido. Não há recebimento ou confirmação automática de pedidos.

## Como visualizar

Abra `index.html` diretamente no navegador. Também pode usar a extensão Live Server do VS Code.

## Como publicar no GitHub Pages

1. No GitHub, crie um repositório chamado `araujo-viana-lanchonete` (ou outro nome de sua preferência).
2. Use **Add file → Upload files** e envie **o conteúdo extraído deste ZIP**, incluindo `index.html`, `css/`, `js/` e `assets/` (não envie somente o ZIP).
3. Clique em **Commit changes**.
4. Acesse **Settings → Pages**.
5. Em **Build and deployment**, selecione **Deploy from a branch**. Escolha a branch `main` e a pasta **/(root)**, depois **Save**.
6. Quando o GitHub concluir a publicação, o endereço normalmente será `https://SEU-USUARIO.github.io/araujo-viana-lanchonete/` (substitua os valores pelos seus).

**Atenção:** o `index.html` deve permanecer na raiz do repositório, e não dentro de outra pasta. A publicação pode ficar acessível publicamente.

## Personalização

### Número de WhatsApp

Abra `js/script.js` e altere:

```javascript
const WHATSAPP_NUMBER = "";
```

Para o número da lanchonete, use apenas números com código do Brasil `55`, DDD e telefone. Exemplo ilustrativo: `"5587999999999"`.

Se o número estiver vazio, a mensagem será aberta no WhatsApp sem um destinatário definido.

### Cardápio

Edite a constante `PRODUCTS` no começo de `js/script.js`. Os 6 produtos atuais são demonstrativos. Antes de publicar o cardápio oficial, confirme nomes, disponibilidade, fotos, valores e opções de encomenda com o estabelecimento.

### Fonte / logotipo igual ao modelo de referência

A escrita **Araújo Viana** é uma arte original, não uma fonte comercial identificada. Para deixar o resultado fiel à imagem de referência, o site usa os arquivos de lettering com fundo transparente:

- `assets/logo-araujo-viana.png` — logotipo completo com chapéu, nome e “LANCHONETE”, usado na abertura.
- `assets/nome-araujo-viana.png` — nome com a grafia original, usado no cabeçalho e rodapé.

Assim, a aparência da marca **não depende de fontes instaladas no computador ou carregadas da internet**. O restante da interface usa fontes da web com alternativas locais.

Caso já tenha publicado uma versão antiga no GitHub, envie os **dois PNGs novos**, substitua `index.html` e `css/style.css` por estas versões e confirme o commit. Em caso de cache, atualize o site com `Ctrl + F5`.

### Cores e aparência

As regras visuais estão em `css/style.css`. As fotos ficam em `assets/` e podem ser trocadas por imagens reais, mantendo os nomes ou ajustando os caminhos no código.

## Estrutura de arquivos

```text
araujo-viana-lanchonete/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── bolos.jpg
│   ├── salgados.jpg
│   ├── tortas.jpg
│   └── favicon.svg
├── .nojekyll
├── .gitignore
└── README.md
```

## Tecnologia

HTML5, CSS3 e JavaScript puro, sem necessidade de banco de dados ou instalação de dependências.

---

**Créditos:** projeto demonstrativo para Araújo Viana Lanchonete.

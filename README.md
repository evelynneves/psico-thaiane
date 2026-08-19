# Publicar o site

Opções rápidas para publicar este site estático:

- GitHub Pages (recomendado para sites estáticos simples)
- Netlify (arrastar/soltar ou deploy via Git)
- Vercel (deploy via Git)

Passos mínimos com GitHub Pages (execute no seu computador):

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
# crie o repositório remoto no GitHub e substitua a URL abaixo
git remote add origin https://github.com/SEU_USUARIO/SEU_REPO.git
git push -u origin main
```

Depois de empurrar para o GitHub, ative o GitHub Pages nas configurações do repositório:

- Settings → Pages → Source → Deploy from a branch → Branch: `gh-pages` (ou `main` se preferir usar `/docs`)

Ou use o workflow de GitHub Actions incluído para publicar automaticamente para a branch `gh-pages` sempre que houver push em `main`.

Alternativas:
- Netlify: crie uma conta, conecte seu repositório Git e defina o diretório de publicação como `/`.
- Vercel: conecte o repositório e clique em Deploy.

Se quiser, eu posso:

- criar e ajustar o workflow de CI (já disponível em `.github/workflows/deploy.yml`),
- orientar nos comandos para criar o repositório remoto e empurrar o código,
- configurar um domínio personalizado (CNAME).
# Landing page - Thaiane Rodrigues Henrique

Landing page estática em HTML, SCSS/CSS e JavaScript.

## Estrutura

- `index.html`: conteúdo, SEO, metatags e dados estruturados.
- `assets/scss/styles.scss`: fonte dos estilos.
- `assets/css/styles.css`: CSS usado pela página.
- `assets/js/main.js`: menu mobile, ano automático e estado do cabeçalho.
- `assets/images/`: imagens da identidade visual e futuras fotos.

## Como visualizar

Abra `index.html` diretamente no navegador.

## Como compilar o SCSS

Se tiver Sass instalado:

```bash
sass assets/scss/styles.scss assets/css/styles.css
```

## Pendências de conteúdo

- Foto oficial da Thaiane para a seção de apresentação.
- Fotos do consultório para a galeria.
- Email definitivo.
- Link oficial do Instagram do projeto Ponte Terapêutica.
- Logo do projeto Ponte Terapêutica, se existir em arquivo separado.

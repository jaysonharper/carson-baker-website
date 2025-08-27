Optional Tailwind CSS manual setup (do not run automatically):

1. npm install -D tailwindcss postcss autoprefixer
2. npx tailwindcss init -p
3. configure `tailwind.config.cjs` content to include `./index.html` and `./src/**/*.{js,ts}`
4. replace `src/style.css` with Tailwind directives and rebuild

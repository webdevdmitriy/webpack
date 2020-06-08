# Webpack сборка

## Установка

1. Инициализацировать проект. `npm init`
2. Webpack и webpack-cli для использования команд из консоли `npm i -D webpack webpack-cli`

2. Создать вручную файл `webpack.config.js`

## Плагины

1. Dev server. Сервер. Автообновление страницы `npm i -D webpack-dev-server`

2. HTML. Подключение файлов в файле html npm i -D html-webpack-plugin`  
3. Сopy. Копирование файлов`npm i -D copy-webpack-plugin `
4. File loader. Подключение картинок, шрифтов   `npm i -D file-loader` 

4. Mini css. Позволяет вынести css в отдельный файл. `mini-css-extract-plugin` 

4. Clean.  Очищает конечную папку от лишних файлов ``npm i -D clean-webpack-plugin`

5. Сross-env. Для нормального определения переменной process.env.NODE_ENV на любой ОС  `npm i cross-env`

6. Style loader и css loader. Для подключения css файлов. `npm i -D style-loader css-loader` 
7.  Terser. Оптимизирует js. `npm install terser-webpack-plugin --save-dev` 
8. Less loader. Для работы с less. `npm i -D less-loader`
9. Sass loader.  Для работы с  sass.  `npm i -D node-sass sass-loader`
10. Babel. Для поддержики современного синтаксиса js в старых браузерах `npm i -D babel-loader @babel/core @babel/preset-env webpack` 


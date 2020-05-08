# My Webpack Web Starter
This is my starter kit for creating website with Webpack. :whale2:

## About This Environment
The following list is an introduction to the modules in this environment.

```
[ Core Information ]
This environment works with Node.js version 12.3.1 on my Mac.

[ About Architecture ]
Package Manager               : Yarn
Module Bundler                : Webpack4
JavaScript Transpiler         : Babel
JavaScript Framework          : jQuery
JavaScript Linter             : ESLint
JavaScript Linting Regulation : slint:recommended & prettier with my custom option
CSS Pre-processer             : SASS (SCSS)
CSS Framework                 : Bootstrap 4
CSS Architecture              : BEM
CSS Linter                    : Stylelint
CSS Linting Regulation        : stylelint-config-standard & my custom option

[ Optional Modules ]
- Autoprefixser (as option of postcss-loader)
- Extract Text Webpack Plugin (for style separation)
```

## What Can You do with this Kit?
- You can start html cording quickly with localhost.
- You can use JavaScript ES6 Way.
- You can get compiled ES5 JavaScript sources.
- You can use SCSS as style meta language.
- You can get compiled styles that contains styles with backward compatibility.

## How to Use the environment

### Prerequisites
- Command line operation.
- To be installed node.js on your PC.
- To be installed yarn on your PC.

### Installation
You can start coding immediately in the following way.
1. Clone this repository: `git clone git@github.com:sumi37/my-webpack-web-starter.git` (or download)
2. Move directory: `cd my-webpack-web-starter`
3. Install node modules with yarn: `yarn install`
4. Start server: `yarn run serve`
5. View the site at `http://localhost:8080/`

※ If you want to stop server, Please use `ctrl+c` on your shell.

### How to add HTML files
Please add HTML files to under `/public/`.
```
[ Example ]

./public/index.html => http://localhost:8080/
./public/foo.html => http://localhost:8080/foo.html
```

### How to manage Stylesheets
Please add css files as scss to under `/src/scss`.
```
[ Example ]

/src/scss/_foo.scss
/src/scss/foo/_bar.scss
```
And import the file into `/src/scss/index.scss`.
You can use both css style and scss style on scss files.


### How to manage Javascripts
Please add JavaScript files to under `/src/js`.
```
[ Example ]

/src/js/foo.js
/src/js/foo/bar.js
```
And import the file into `/src/js/index.js`.
You can use both es5 style and es6 style on javascript files.

### How to add other asseets
Please add other assets to `/public/**`.
I often use the following regulation for the assets.
```
[ Example ]

// for images
`/public/assets/images/foo.png`
`/public/assets/images/foo/bar.png`

// for fonts
`/public/assets/images/foo.ttf`
`/public/assets/images/foo/bar.ttf`
```


## Build and Reading files
If you want to get bundle files, There is `yarn run dev-build` or `yarn run build` commands.
After run the command, `public/css` and `public/js` folder will get bundle files.

The following is way of loading assets. You have to load bundle file in HTML like this.
```
[ HTML ]

<link rel="stylesheet" href="/assets/stylesheets/bundle.css">
<script src="/assets/javascripts/bundle.js"></script>
```

# How to Design

Please look `My Design Cording Regulation` !  
[Design Cording Regulation Docs](https://github.com/masa-sumimoto/design-cording-regulation-docs)

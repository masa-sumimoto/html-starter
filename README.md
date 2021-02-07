# My Webpack Web Starter
This is my starter kit for creating website with Webpack. :whale2:

## About This Environment
The following list is an introduction to the modules in this environment.

```
[ Core Information ]

Package Manager               : Yarn
Module Bundler                : Webpack5
JavaScript Transpiler         : Babel
JavaScript Framework          : jQuery
JavaScript Linter             : ESLint
JavaScript Linting Regulation : slint:recommended & prettier with my custom option
CSS Pre-processer             : SASS (SCSS)
CSS Framework                 : Bootstrap 4
CSS Architecture              : BEM (& OOCSS)
CSS Linter                    : Stylelint
CSS Linting Regulation        : stylelint-config-standard & my custom option
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
1. Clone this repository: `git clone git@github.com:masa-sumimoto/my-webpack-web-starter.git` (or download)
2. Move directory: `cd my-webpack-web-starter`
3. Install node modules with yarn: `yarn install`
4. Start server: `yarn run serve`
5. View the site at `http://localhost:8080/`

※ If you want to stop server, Please use `ctrl+c` on your shell.

### Edit Files
Please add HTML, SCSS, JavaScript files to under `/src`.  
You can access /src/index.html as http://localhost:8080/


## Build and Reading files
If you want to get bundle files, There is `yarn run dev-build` or `yarn run build` commands. You can get compile files in `dist`.

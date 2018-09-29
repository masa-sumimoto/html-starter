English | [日本語](README_ja.md)  

# Overview
:fish: - :tropical_fish: - :cat2: - :whale2:  

Hello. This is my html cording starter kid.
I often use the kit to markup static HTML before using CMS framework.

If your case includes the following, Please use the kid.

- Use Bootstrap as css library.
- Use jQuery
- Use BEM style
- like Component-oriented

※ If you get good starter kid, I suggest [web starter kid of google](https://github.com/google/web-starter-kit).  
※ It is under construction in some places..

:goat: - :rabbit2: - :octopus: - :cow2:  

## Environment Information
This starter has the following structure.
```
Package management:
- Node.js + Yarn

Module bundler / Task runner:
- Webpack (v4)

Javascript transpiler:
- Babel

Style regulation / utilities:
- SCSS
- Autprefixer

Linter:
- eslint
- stylelint

Cording Libraries:
- jQuery
- Bootstrap4
```

## How to Use

### Installation
You can start coding immediately in the following way.
1. Clone this repository: `git clone git@github.com:sumi37/html-starter.git` (or download)
2. Move directory: `cd cd html-starter`
3. Install node modules with yarn: `yarn install`
4. Start server: `yarn start`
5. View the site at `http://localhost:8080/`

※ If you don't have node.js and yarn, Please install on your PC in advance.
※ If you want to stop server, Please use `ctrl+c` on your shell.

### How to add Html files
Please add html files to under `/public/`.
```
ex:
./public/index.html => http://localhost:8080/
./public/foo.html => http://localhost:8080/foo.html
```
This directory can be used as an area for saving static files.
so For example, it is recommended to save image files like `/public/images/*`


### How to add Stylesheets
Please add css files as scss to under `/src/scss`.
```
ex:
/src/scss/_foo.scss
```
And import the file to `/src/scss/index.scss`.
You can use both css style and scss style on scss files.


### How to add Javascripts
Please add css files to under `/src/js`.
```
ex:
/src/js/foo.js
```
And import the file to `/src/js/index.js`.
You can use both es5 style and es6 style on javascript files.


### Build
If you get static files, There is `yarn run build`.
Please stop server once and enter the command.
`public/css` and `public/js` folder will get bundle files.
You only associate these files with html files as following.
```
<link rel="stylesheet" href="/css/bundle.css">
<script src="/js/bundle.js"></script>
```


## Cording Methods
If you start working with this project template, you will notice that it contains several styles and html tags.
I will introduce my coding method from here on.
If you already have good way, Please delete my codes.

I use a lot of Bootstrap4 components and methods of OOCSS and BEM.
Also, this method assumes the possibility of filling in the codes of others who have different ideas and policies of my teammates.
Sometimes you feel redundant. so Please choose at your option at that time.

### SCSS (CSS) : Overview
My CSS policy has 7 contexts below.
```
1.Libraries
2.Core
3.Containers
4.Primitive Parts
5.Complex Parts
6.Pages
(7.User)
```
These are compailed from 1 to 7.
Please use this sort regulation, It will clarify the role of the design.

以下はscssのエンドポイントとなるindex.scssの記述例です。
これらは上から下に順番にコンパイル・ロードされます。
※`_variables.scss`のみイレギュラーなソート順になっていることについては後述します。

```
// Libraries (& Override Core)
@import 'core/variables';
@import '~bootstrap/scss/bootstrap';

// Core
@import 'core/mixins';
@import 'core/utilities';

// Containers
@import 'containers/page';
@import 'containers/header';
@import 'containers/main';
@import 'containers/footer';

// Primitive Parts
@import 'parts-primitive/tmp-parts';

// Complex Parts
@import 'parts-complex/tmp-ui';

// Page
@import 'pages/tmp-page';
```


#### 1.Libraries
Libraries context is used for external css libraries.
I have added Bootstrap4 to here already.
Please don't touch the libraries code. Also manage the libraries as package as much as possible.

#### 2.Core
These stylesheets manage `variables`, `mixins` and `utility classes`.
Also these include some override and extend class of Bootstrap.

##### `_variables.scss`
WEBサイトにおいてグローバルに利用できる変数を保管します。Bootstrapのvariables.scssで定義されている変数を数多くオーバーライドして利用します。
bootstrapの変数定義には、ほとんどがdefaultフラグを用ます。そのためこのファイルは先読みさせる形となります。

##### `_mixins.scss`
グローバルに利用できるmixinはここにまとめます。


##### `_utilities.scss`
グローバルに利用できるユーティリティクラスを保管します。これらは基本的には!importantフラグが用いられています。
スタイルを強くオーバーライドすることを目的とした破壊的なクラス群です。
Bootstrapのutilitiesに含まれないものを足したり、そのwebサイト独自のユーティリティを定義したりなどします。


#### 3.Containers
WEBサイトを構成する最も上位のレイアウトブロックに関するスタイルを記します。
概ね、ページ全体に_page.scss、サイトヘッダーに_header.scss、サイトフッターに_footer.scss、サイトコンテンツ部分の最上位ブロックに_main.scssなどとscssを対応させ、用います
サイドバーなど、2カラム構成が基本のWEBサイトには_sub.scssなども加え、運用するのも良いと思います。

```
[HTML]

<body class="Page">
  <header class="Header">
  <main class="Main">
  <footer class="Footer">
```

```
[SCSS]

// _page.scss
.Page { }

// _header.scss
.Header { }

// _footer.scss
.Footer { }

// _main.scss
.Main { }
```


#### 4.Primitive Parts
デザイン上、最小単位となるパーツをパーツ単位でstylesheetにして保存します。
`_button.scss`, `_table.scss`, `_heading.scss`などが該当します。


#### 5.Complex Parts
比較的複合的なパーツで、且つ、複数回使用されようなものをパーツ単位でstylesheetにして保存します。
例えば、`_breadcrumbs.scss`, `_pagination.scss` など、一般的なWEBサイトにもよく見られるパーツや
例えば`_food-image-gallery-ui` など、そのwebサイトにおいては何回も登場すると言うパーツにこのコンテキストを利用します。


#### 6.Pages
ページテンプレート単位にスタイルを制御したい時に利用します。共通化されたパーツブは基本的にはBEM記法で書かれたBlockがもつモディファイアによりその大半を表現することが可能です。
ここにはそれらで表現しきれなかったものや、このページにしか存在しない共通化できないパーツのスタイルを記述するのに最適です。

#### 7.User
まず初めにこのコンテクストはできる限り利用しないようにします。
このコンテクストは、「普段は別セクションを担当するエンジニア」「他社の制作関係者」など、このデザインルールに不慣れな人間がコーディングに加わる際を考慮しています。
「User」はこのケースを吸収します。と、言っても実際は単純にCSSのシートを分けるという話だけのことです。
```
[HTML]

<link rel="stylesheet" href="/css/bundle.css">
<link rel="stylesheet" href="/css/user.css">

<div class="foo">This was red. but now, this is blue.</div>
```

通常全てのコンテクストスタイルシートは1枚のcssファイルにバンドルされますが
Userはそこに含まれません。
```
[SCSS in bundle.css]

.foo { color: red; }
```

```
[SCSS in user.css]

.foo { color: blue }
```

ファイルのロード順でもわかるように、user.cssは、bundle.cssをオーバーライドできる存在です。
このようにuser.cssは「一時的なもの」「緊急の作業」「取り急ぎの処置」などの目的にも用いられます。
これは統制の取れていないコードの受け場所として存在するとも言えます。

また1〜6のコンテキストを理解したチームメイトは、コード保守の観点から定期的にuser.css内に書き落とされたコードを、
定期的に正しいレギュレーションの世界に移植してあげルことが望ましいです。

※上記では、便宜上スタイルシートを増やすという形でこのuserの概念を提示しましたが、
これも含めて1枚のスタイルシートにバンドルできる環境がある場合はそれがもっとも好ましいです。

### SCSS (CSS) : リントに関して
linterはstylelintを利用し、stylelint-config-standardを若干変更して利用しています。
`.stylelintrc` より自由にルールを書き換えることが可能です、


コーディングエディタ自身に対応するツールがあるならば、それを利用すると便利です。
例えばAtomの場合は以下のコマンドでpackageをインストールします。
```
apm install linter-stylelint
````


### HTML
※※※※※ ↓以下、製作中↓ ※※※※※

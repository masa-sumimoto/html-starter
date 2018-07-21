# Overview
This is a starter kit when I do html coding myself.
I will share the coding environment and some my method.

:fish: - :tropical_fish: - :cat2: - :whale2: - - - - -
There are good libraries, templates and ideas in the world.
My template is not that good, but it should have a little bit better idea, being aided by these.  
Thanks developers and designers. m(_ _)m
:goat: - :rabbit2: - :octopus: - :cow2: - - - - -

## Environment Information

### About Technologies
This environment includes technologies below.
```
- Node.js
- Babel
- Webpack (v4)
- Scss
```

### About Javascript Libraries
This environment already includes javascript libraries below.
```
- jQuery
- Bootstrap4 (and Popper.js)
```

## Getting Started

### Installation
You can start coding immediately in the following way.
1. Clone this repository: `git clone git@github.com:sumi37/tmp-html-project.git` (or download)
2. Move directory: `cd sumi37-html-project-tmp`
3. Install node modules with yarn: `yarn install`
4. View the site at `http://localhost:8080/`

※ If you don't have node.js and yarn, Please install on your PC in advance.
※ If you want to stop server, Please use `ctrl+c` on your shell.

### Add Html files
Please add html files to under `/public/`.
```
ex:
./public/index.html => http://localhost:8080/
./public/foo.html => http://localhost:8080/foo.html
```
This directory can be used as an area for saving static files.
so For example, it is recommended to save image files like `/public/images/*`


### Add Stylesheets
Please add css files as scss to under `/src/scss`.
```
ex:
/src/scss/_foo.scss
```
And import the file to `/src/scss/index.scss`.
You can use both css style and scss style on scss files.


### Add Javascripts
Please add css files to under `/src/js`.
```
ex:
/src/js/_foo.js
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

### SCSS
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
これら各コンテクストに属するcssは1から7に向けてロードされます。
このヒエラルキ構造をうまく活用することにより目的に即したデザインの定義・オーバーライドを効率よく行います。

以下は具体的にエンドポイントとなるindex.scssの記述例を示しています。
後述で説明しますが、`_utilities.scss`のみイレギュラーなソート順になっていることに注目してください。
```
// Libraries (& Override Core)
@import 'core/variables';
@import '~bootstrap/scss/bootstrap';

// Core
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
Librariesに属するcssは主に外部のライブラリサービスを指します。このテンプレートにはこのコンテクストにはjQueryとBootstrap4がそれに当たります。
尚、これらのファイルは書き換えることを想定していません。

#### 2.Core
基本設定にまつわるファイルです。以下のような重要なファイルがCoreファイルに属します。

##### _variables.scss
WEBサイトにおいてグローバルに利用できる変数を保管します。Bootstrapのbvariables.scssで定義されている変数も数多くオーバーライドして利用します。
bootstrapの変数定義には、ほとんどがdefaultフラグを用いています。そのためこのファイルは先読みさせる形となります。


##### _utilities.scss
グローバルに利用できるユーティリティクラスを保管します。一般的にはスタイルを強くオーバーライドするために用いるものです。
そのため!importキーワードを用います。

#### 3.Containers
WEBサイトを構成する最も上位のレイアウトブロックに関するスタイルを記します。
概ね、サイトヘッダーに_header.scss、サイトフッターに_footer.scss、サイトコンテンツ部分の最上位ブロックに_main.scssを用います。
サイドバーなど2カラムを想定したものであれば、_sub.scssなどとし、利用しても良いと思います。

#### 4.Primitive Parts
デザイン上、最小単位となるパーツをパーツ単位でstylesheetにして保存します。
「_button.scss」「_table.scss」「_heading.scss」などが該当します。


#### 5.Complex Parts
比較的複合的なパーツで、且つ、複数回使用されようなものをパーツ単位でstylesheetにして保存します。
例えば、「_breadcrumbs.scss」「_pagination.scss」など、一般的なWEBサイトにもよく見られるパーツや
「_food-image-gallery-ui」など、そのwebサイトにおいては何回も登場するパーツなどがこのコンテキストには適しています。


#### 6.Pages
ページテンプレート単位にスタイルを制御したい時に利用します。共通化されたパーツブは基本的にはBEM記法で書かれたBlockがもつモディファイアによりその大半を表現することが可能です。
ここにはそれらで表現しきれなかったものや、このページにしか存在しない共通化できないパーツのスタイルを記述するのに最適です。

#### 7.User
この1〜6のコンテクストを十分理解し、そのレギュレーションが正確に共有された制作作業チームの他に、例えばクライアントのインハウスのWEBサイト管理者がいることを想像してください。また、他社の制作会社がプロジェクトの一部の担う場合もあるでしょう。この全員がコードを改変することがあります。このケースは私の経験上では稀なことではありません。
その際に、明確に切り分けられた環境があると便利です。

通常1〜6のコンテクストスタイルシートは1枚のcssファイルにバンドルされますが
このコンテキストはそれを想定していません。そして必ずもっとも強いオーバーライド能力が必要になります。
これを踏まえて表現される形が以下になります。

```
// HTML

<link rel="stylesheet" href="/css/bundle.css">
<link rel="stylesheet" href="/css/user.css">

<div class="page page-top" id="page-top">
  <h1>This is site top page</h1>
  <div class="foo">This was red. but now, this is blue.</div>
</div>
```

```
// SCSS in bundle.css

.foo { color: red; }
```

```
// SCSS in user.css

#page-top .foo { color: blue }
```

ただ、あくまでこのプロジェクトのコーディング業務制作を率いるのがあなたを含むこの環境を理解したチームであることを忘れないでください。
そのためuser.cssは「一時的なもの」「緊急の作業」「取り急ぎの処置」などの目的に用いられる、統制の取れていないコードの受け場所として存在すると考えます。

定期的にuser.css内に書き落とされたコードを、1〜6の正しいレギュレーションの世界に移植することがベターです。（あなたの時間が許される限り）




※※※※※ ↓以下、製作中↓ ※※※※※

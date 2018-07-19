# Overview
This is a starter kit when I do html coding.
I will share the coding environment and my method.


## Environment Information

### About Web Tools
This environment includes tools below.
```
- Node.js
- Babel
- Webpack (v4)
- Scss
```

### About Libraries
This environment has javascript libraries below.
```
- jQuery
- Bootstrap4 (and Popper.js)
```



## Getting Started

1. Clone this repository.
```
git clone git@github.com:sumi37/tmp-html-project.git
```
or download.


2. Install node modules (with yarn).
```
$ cd sumi37-html-project-tmp
$ yarn install
```

3. See the project on your browser.
```
$ yarn start

and open http://localhost:8080/
```



## Cording Tips
上記までの設定で環境自体は準備することが可能です。
ここからは、私の中で形式化しているコーディング作法をご紹介します。

本環境はBootstrapのコンポーネントを大幅に活用することを想定し、且つ、OOCSS・BEMを混合させたスタイルを用います。
また、全く方針が異なる他者がコーディングに介入することも想定しているため、かなり冗長なものになる可能性があります。
取捨選択の元、ご参照ください。


### SCSS
この環境は6つのパーソナルなcss(scss)の作業環境があります。
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


※※※※※ ↓以下、製作中↓ ※※※※※

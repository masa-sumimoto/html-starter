[English](README.md) | 日本語  

# 概要
:fish: - :tropical_fish: - :cat2: - :whale2:  

こんにちは。これは私がでhtmlコーディングを行う際に利用するスターターキットです。
このリポジトリではその環境のシェアとコーディング方法を少し紹介させていただきます。

※少しづつ書き進めています。

:goat: - :rabbit2: - :octopus: - :cow2:  

## 環境について
このスターターキットは以下のもので構成されています。
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


## 使い方

### はじめに
以下の方法でローカル環境にこのスターターキットを展開できます。
1. このリポジトリをクローンする: `git clone git@github.com:sumi37/tmp-html-project.git` (or download)
2. 対象のディレクトリに移動: `cd sumi37-html-project-tmp`
3. node moduleをインストール: `yarn install`
4. サーバを起動: `yarn start`
5. ページを確認: `http://localhost:8080/` にブラウザでアクセスする。

※ PCにnode.jsとyarnを導入していない場合は事前にインストールをしてください。
※ サーバをストップする際は、`ctrl+c` を利用します。

### HTMLの追加の仕方
`/public/`以下に保存してください。

```
例:
./public/index.html => http://localhost:8080/
./public/foo.html => http://localhost:8080/foo.html
```
publicディレクトリは静的なファイルの保存場所として機能します。
例えば画像ファイルなどはな`/public/images/*`どに保存するなどが良いでしょう。


### SCSSの追加の仕方
`/src/scss`以下に保存してください。
```
例:
/src/scss/_foo.scss
```
その上で`/src/scss/index.scss`にimport構文により読み込みを行ってください。
スタイルにはscss, cssのどちらのスタイルを記述しても大丈夫です。


### Javascriptsの追加の仕方
`/src/js`以下に保存してください。
```
例:
/src/js/foo.js
```
その上で`/src/js/index.js`により読み込みを行ってください。
スクリプトはes5, es6のどちらのスタイルで記述しても大丈夫です。


### Build
記述したcssおよびjsのバンドルファイルを入手したい場合は`yarn run build`コマンドを利用します。
サーバを一度ストップし、コマンドを入力してください。
`public/css` と `public/js` フォルダにバンドルファイルが生成されるはずです。
そして、以下のようにこれらのファイルをhtmlに関連づけることでそれらを反映します。
```
<link rel="stylesheet" href="/css/bundle.css">
<script src="/js/bundle.js"></script>
```


## コーディング方法
ここからは私のコーディングレギュレーションの紹介になります。
このスターターキットには既にいくらかhtmlとcssのコードを含みます。
興味がある方は是非、それらを参照の元、このまま読み進めてください。
必要がない方はそれらコードを削除し、改めてコーディングをスタートさせてください。

私はBootstrapのコンポーネント及びOOCSS・BEMを混合させたスタイルでコーディングを行います。
これらは私のチームメイトやコーディング環境を踏まえたものになります。
そのため、冗長な箇所や、煩雑な考えが所々ありますが、取捨選択の上、参考いただけると幸いです。

### SCSS (CSS) : 概要
CSSは7つのコンテクストで考えます。
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
このヒエラルキ構造をうまく活用することにより目的に即したデザインの定義・オーバーライドを効率よく行えます。

以下はscssのエンドポイントとなるindex.scssの記述例を示しています。
これらは上から下に順番にコンパイル・ロードされます。
また`_variables.scss`のみイレギュラーなソート順になっていることに注目してください。（詳しくは後述）

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
Librariesコンテクストに属するcssは一般的に外部のライブラリサービスを指します。このテンプレートに既に組み込まれているものではBootstrap4がそれに当たります。
これら外部ファイルはそのもの自体を直に書き換えることを想定していません。また、これらは可能な限りpackageとして管理します。

#### 2.Core
変数やmixinまた!importantフラグを用いて利用するユーティリティ的な役割のスタイルを管理するファイル群です。
また、そのほとんどがBootstrapのオーバーライドや拡張を基本としています。

##### _variables.scss
WEBサイトにおいてグローバルに利用できる変数を保管します。Bootstrapのvariables.scssで定義されている変数を数多くオーバーライドして利用します。
bootstrapの変数定義には、ほとんどがdefaultフラグを用ます。そのためこのファイルは先読みさせる形となります。

##### _utilities.scss
グローバルに利用できるユーティリティクラスを保管します。これらは基本的には!importantフラグが用いられています。
スタイルを強くオーバーライドすることを目的とした破壊的なクラス群です。

BEMで丁寧にスタイリングされた要素に対し、そのページのためだけのイレギュラーなスタイルを適用するのに適しています。
当然BEMモディファイアを利用して表現することが好ましい場合もありますが、それらはケースバイケースです。
また、マージンやパディングのような周辺要素の影響で印象が刻々と変わる要素に関しては大いに用いる重要性はあるでしょう。


#### 3.Containers
WEBサイトを構成する最も上位のレイアウトブロックに関するスタイルを記します。
概ね、ページ全体に_page.scss、サイトヘッダーに_header.scss、サイトフッターに_footer.scss、サイトコンテンツ部分の最上位ブロックに_main.scssなどとscssを対応させ、用います
サイドバーなど、2カラム構成が基本のWEBサイトには_sub.scssなども加え、運用するのも良いと思います。

```
[HTML]

<body class="page">
  <header class="site-header">
  <main class="site-main">
  <footer class="site-footer"
```

```
[SCSS]

// _page.scss
.page { }

// _header.scss
.site-header { }

// _footer.scss
.site-footer { }

// _main.scss
.site-main { }
```


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
[HTML]

<link rel="stylesheet" href="/css/bundle.css">
<link rel="stylesheet" href="/css/user.css">

<div class="page page-top" id="page-top">
  <h1>This is site top page</h1>
  <div class="foo">This was red. but now, this is blue.</div>
</div>
```

```
[SCSS in bundle.css]

.foo { color: red; }
```

```
[SCSS in user.css]

#page-top .foo { color: blue }
```

ただ、あくまでこのプロジェクトのコーディング業務制作を率いるのがあなたを含むこの環境を理解したチームであることを忘れないでください。
そのためuser.cssは「一時的なもの」「緊急の作業」「取り急ぎの処置」などの目的に用いられる、統制の取れていないコードの受け場所として存在すると考えます。

定期的にuser.css内に書き落とされたコードを、1〜6の正しいレギュレーションの世界に移植することがベターです。（あなたの時間が許される限り）



### SCSS (CSS) : about lint
コーディングのルールには以下のものを利用しています。
```
{
  "extends": "stylelint-config-standard",
  "rules": {
    "at-rule-no-unknown": null
  }
}
```

コーディングエディタに対応するツールがあるならば、それを利用すると便利です。
例えばAtomの場合は以下のコマンドでpackageをインストールします。
```
apm install linter-stylelint
````


### HTML
※※※※※ ↓以下、製作中↓ ※※※※※

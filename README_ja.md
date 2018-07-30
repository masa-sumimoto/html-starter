[English](README.md) | 日本語  

# 概要
:fish: - :tropical_fish: - :cat2: - :whale2:  

こんにちは。これは私がhtmlコーディングを行う際に使用するスターターキットです。
ここではその環境のシェアとコーディング方法をご紹介いたします。

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

### 環境の取得
以下の方法でPC内にこのスターターキットを展開します。
1. このリポジトリをクローンする: `git clone git@github.com:sumi37/html-starter.git` (or download)
2. 対象のディレクトリに移動: `cd html-starter`
3. node moduleをインストール: `yarn install`
4. サーバを起動: `yarn start`
5. ページを確認: `http://localhost:8080/` にブラウザでアクセスする。

※ PCにnode.jsとyarnを導入していない場合は事前にインストールをしてください。  
※ サーバをストップする際は、`ctrl+c` を利用します。

### HTMLの管理の仕方
`/public/`以下にファイルを保存してください。

```
例:
./public/index.html => http://localhost:8080/
./public/foo.html => http://localhost:8080/foo.html
```
publicディレクトリは静的なファイルの保存場所として機能します。
例えば私は画像ファイルは`/public/assets/images/*`などに保存します。


### SCSSの管理の仕方
`/src/scss`以下にファイルを保存してください。
```
例:
/src/scss/_foo.scss
```
その上で`/src/scss/index.scss`にimport構文により読み込みを行ってください。
スタイルにはscss, cssのどちらのスタイルを記述しても大丈夫です。


### Javascriptsの追加の仕方
`/src/js`以下にファイルを保存してください。
```
例:
/src/js/foo.js
```
その上で`/src/js/index.js`により読み込みを行ってください。
スクリプトはes5, es6のどちらのスタイルで記述しても大丈夫です。


### ビルド
記述したcssおよびjsのバンドルファイルを入手したい場合はサーバを一度ストップし、`yarn run build`コマンドを利用します。
`public/css` と `public/js` フォルダにバンドルファイルが生成されるので、
これらをhtmlに読み込んでください。
```
<link rel="stylesheet" href="/css/bundle.css">
<script src="/js/bundle.js"></script>
```


## コーディング方法
ここからは私のコーディング方法の紹介になります。
このスターターキットには既にhtmlとcssのコードがマークアップされています。
ここからはその説明になりますので興味がある方は是非、このまま読み進めてください。
必要がない場合はコードを削除し、コーディングをスタートさせてください。

### コーディングスタイル
私はBootstrapのコンポーネントを利用・拡張を基本に、
加えてOOCSS・BEMを混合させたスタイルでコーディングを行っています。
またチームメイトの意見・案件の性質なども多分に踏まえており、
冗長な点、煩雑な点ございますが取捨選択の上、参考いただけると幸いです。


### SCSS (CSS) : 概要
CSSは7つのコンテクストで考えるようにしています。
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
この取り決めをうまく活用し、より目的に即した場所にデザインを定義します。

以下はscssのエンドポイントとなるindex.scssの記述例です。
これらは上から下に順番にコンパイル・ロードされます。
※`_variables.scss`のみイレギュラーなソート順になっていることについては後述します。

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
Librariesコンテクストに属するcssは外部のライブラリサービスを指します。このキットではBootstrap4がそれに当たります。
外部ファイルはそれ自体を直に書き換えることはしません。また、これらは可能な限りnpmのpackageとして管理します。

#### 2.Core
変数やmixinまた!importantフラグを用いて利用するユーティリティ的な役割のスタイルを管理するファイル群です。
そのほとんどがBootstrapのオーバーライドや拡張を基本としています。
そのWEBサイト特有の決まりごとなどもこちらで管理します。


##### `_variables.scss`
WEBサイトにおいてグローバルに利用できる変数を保管します。Bootstrapのvariables.scssで定義されている変数を数多くオーバーライドして利用します。
bootstrapの変数定義には、ほとんどがdefaultフラグを用ます。そのためこのファイルは先読みさせる形となります。

##### `_utilities.scss`
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
`_button.scss`, `_table.scss`, `_heading.scss`などが該当します。


#### 5.Complex Parts
比較的複合的なパーツで、且つ、複数回使用されようなものをパーツ単位でstylesheetにして保存します。
例えば、`_breadcrumbs.scss`, `_pagination.scss` など、一般的なWEBサイトにもよく見られるパーツや
`_food-image-gallery-ui` など、そのwebサイトにおいては何回も登場するパーツなどがこのコンテキストには適しています。


#### 6.Pages
ページテンプレート単位にスタイルを制御したい時に利用します。共通化されたパーツブは基本的にはBEM記法で書かれたBlockがもつモディファイアによりその大半を表現することが可能です。
ここにはそれらで表現しきれなかったものや、このページにしか存在しない共通化できないパーツのスタイルを記述するのに最適です。

#### 7.User
この1〜6の取り決めを十分理解したチームメイトのみでコーディングを行う場合、このコンテクストは必要ありません。
しかし、普段は別セクションを担当するエンジニアまたは他社の制作関係者、など、このデザインルールに不慣れな人間がコーディングに加わることもあるでしょう。
「User」はこのケースを吸収する考え方です。と、言っても単純にCSSの作業環境を分けるだけです。
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
そのためuser.cssは「一時的なもの」「緊急の作業」「取り急ぎの処置」などの目的にも用いられます。
これは統制の取れていないコードの受け場所として存在するとも言えます。

また1〜6のコンテキストを理解したチームメイトは、コード保守の観点から定期的にuser.css内に書き落とされたコードを、
正しいレギュレーションの世界に移植してあげてください。（時間が許される限り）



### SCSS (CSS) : リントに関して
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

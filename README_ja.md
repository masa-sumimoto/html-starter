[English](README.md) | 日本語  

# 概要編

## はじめに
:smile: :fish: :rooster: :tropical_fish: :cat2: :ox: :pig2: :whale2: :smile:  

こんにちは。これは私が普段HTMLコーディングのために用いるスターターキッドです。
以下の条件に該当する場合、もしかしたらこのキッドをご活用いただけるかもしれません。

- cssライブラリにBootstrapを利用する
- JavascriptライブラリにjQueryを利用する
- cssマークアップにはSCSSを利用する
- cssマークアップにはBEM記法を利用する
- デザインをページ・レイアウト・パーツといった単位で管理したい

また、併せてhtmlコーディングの考え方も後半に少し書いています。

※ 一般的で優れたスターターキットをお探しならば [web starter kid of google](https://github.com/google/web-starter-kit) をオススメします。  
※ 少しづつ書き進めているため内容が完全でない箇所があります。

:smile: :goat: :rabbit2: :leopard: :octopus: :dog2: :panda_face: :cow2: :smile:  

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


# 利用編

## 環境の取得
以下の方法でこのキットをお手元のPC内に展開します。
以下、コマンドラインを利用してください。

1. このリポジトリをクローンする: `git clone git@github.com:sumi37/html-starter.git` (もしくは、ファイルを直接ダウンロードしてください)
2. 対象のディレクトリに移動: `cd html-starter`
3. node moduleをインストール: `yarn install`
4. サーバを起動: `yarn start`
5. ページを確認: `http://localhost:8080/` にブラウザでアクセスする。

※ PCにnode.jsとyarnを導入していない場合は事前にインストールをしてください。  
※ サーバ（webpack-dev-server）をストップする際は、`ctrl + c` を利用します。

## HTMLの管理方法
`/public/`以下にファイルを保存してください。

```
例:

./public/index.html => http://localhost:8080/
./public/foo.html => http://localhost:8080/foo.html
```
またpublicディレクトリは静的なファイルの保存場所として機能します。
例えば私は画像ファイルは`/public/assets/images/*`などに保存します。


## SCSSの管理方法
`/src/scss`以下にファイルを保存してください。
```
例:

/src/scss/_foo.scss
```
その上で`/src/scss/index.scss`内でimport構文を用い、該当ファイルを読み込み込んでください。
スタイルにはscss, cssのどちらのスタイルを記述しても最終的にモジュールがcssにコンパイルします。


## Javascriptsの管理方法
`/src/js`以下にファイルを保存してください。
```
例:
/src/js/hoge.js
```
その上で`/src/js/index.js`内でimport構文を用い、該当のファイルを読み込んでください。
スクリプトはes5, es6のどちらのスタイルで記述しても最終的にモジュールがes5にコンパイルします。


## ビルドとファイル読み込み
記述したcssおよびjsのバンドルファイルを入手したい場合はサーバを一度ストップし、`yarn run build`コマンドを利用します。
その際、`public/css` と `public/js` フォルダにバンドルファイルが生成されます。

またhtmlファイルには以下バンドルファイルを読み込んでおく必要があります。

```
<link rel="stylesheet" href="/css/bundle.css">
<script src="/js/bundle.js"></script>
```

サーバがアクティブな間は、ビルドを実行しなくても最新の状態がブラウザ上で自動で反映されます。

# デザイン編
ここからは私のコーディング方法の紹介になります。
このキッド内には既にhtmlとcssのコードが少しだけマークアップされています。
その説明に興味がある方は是非読み進めてください。
必要のない場合はコードを削除し、自由にコーディングをスタートしましょう！！

※ 今回はWeb Appなどは想定しません。あくまで一般的な非常に静的なWEBページを作成することにフォーカスしています。

## スタイルの概要
私はBootstrapコンポーネントをベースに、拡張・上書きする形でデザインを進めます。
そのためここからはBootstrapの事前知識が必要です。

また、新規に定義するデザインパーツにはBEM設計を用いるようにしています。
これはOOCSS設計に基づくBootstrap4のスタイル方針とは異なります。そのため、やがてコードは混沌としてゆきます。

しかしながらBootstrapはデザインそのものでありながらインフラでもあることを強く意識します。(別物と意識する)  
そして、コンテキスト・コンポーネント単位にデザインを管理する方針を徹底すると意外にこの混沌は些細な事に思えてきます。

では実際にOOCSSとBEMが混在する状況を示します。
以下は、Boostrapの既存のwebパーツであるボタンコンポーネントの例です。
BEMを利用して上書きと拡張を試みてみましょう。

```
[ in bootstrap.css ]

/* これはboostrap.css内にある_buttons.scssのコンパイル後のコード */

.btn {
  display: inline-block;
  ...
}

.btn-primary {
  color: #fff;
  ...
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
}
```

```
[ my-override-button.scss ]

// 別のSCSSファイル内で上書き及びBEMモディファイア拡張

.btn {
  border-radius: 30px; // Override

  &--width_small { ... } // Extend
  &--width_big { ... } // Extend
}

.btn-primary {
  &--width_small { ... } // Extend
  &--width_big { ... } // Extend
}
```

親クラスである`.btn`とそれを継承したクラスである`.btn-primary`の双方にBEM拡張を施しました。

両方のクラス定義をBEMブロックとみなし、ここを起点にBEMモディファイアを定義してゆくというこの方法は、
BEMでOOCSSを完全にマウントしたいのであれば、確かに筋が通っているようにも見えます。
しかしこれはややオーバーです。

ボタンコンポーネントはカラーリング（およびアウトライン表現されたカラーデザイン）という観点でのみOOCSS化されたコンポーネントです。
これを起点にデザインを考えると無駄に拡張性を担保する結果になりかねません。

「カラーリング」というジャンルはBootstrapに一任させ、その他のモディファイアによる拡張は親クラスである`.btn`のみで行うのがほど良いでしょう。

```
[ my-override-button.scss ]

.btn {
  border-radius: 30px; // Override

  &--width_small { ... } // Extend
  &--width_big { ... } // Extend
}

.btn-primary {
  ...
}
```

次に`.btn`を継承したクラスである `.btn-primary`, `.btn-secondary`...では表現しきれないような、新しいボタンデザインを考えてみましょう。
別コンポーネントを定義しても良さそうですが、ここでは同一コンポーネント内でのBEM拡張を徹底してみます。

```
[ my-override-button.scss ]

.btn {
  border-radius: 30px;

  // typeというモディファイア（基礎モディファイア）を新たに定義し、そこに新規ボタンのスタイルを書く
  &--type_table-style {
    display: table;
    ...
  }

  // その他のモディファイアはベースクラス（.btn）もしくは基礎モディファイアのユーティリティとして働く
  &--width_small { ... }
  &--width_big { ... }
}
```

typeモディファイアは私の中では特別なモディファイア名です。
このモディファイアは基礎モディファイアと定義し他のモディファイアと区別します。
(そのためtypeモディファイアは他のモディファイアより必ず先に記述してください。)

そう考えると、このコードは幾分整頓されたものに見えてきます。

それでも心が落ち着かない方は、
以下のように従来通り継承を用いOOCSSで拡張し`.btn-primary`や`.btn-secondary`と同列のものとして扱いましょう。

```
[ my-override-button.scss ]

.btn {
  border-radius: 30px;

  &--width_small { ... }
  &--width_big { ... }
}

// 継承を用いた新規クラス
.btn-table {
  display: table;
  ...
}
```

基クラスである`.btn`にはBEMモディファイアを用いたままですが、概ねOOCSSベースのままのスタイルです。

一例をあげましたが、全てはケースバイケースです。
これでも混沌とした印象を受けた場合、このデザインアイデアのことはすっかり忘れてください。


## スタイルコンテクスト
ここからはデザインの記述場所にコンテクストという言葉を用い、各スタイルをジャンル分けしてゆきましょう。  
私はデザインのアプローチに以下7つのコンテクストを利用します。

```
1.Libraries
2.Core
3.Layouts
4.Primitive Parts
5.Complex Parts
6.Pages
(7.User)
```
これら各コンテクストに属するスタイルは1から7に向けてロードされます。
この取り決めをうまく活用し、より目的に即した場所にデザインを定義してゆきます。

以下はscssのエンドポイントとなるindex.scssの記述例です。
これらは上から下に順番にロードされます。  
※ `_variables.scss`のみイレギュラーなソート順になっていることについては後述します。

```
// Libraries (& Override Core)
@import 'core/variables';
@import '~bootstrap/scss/bootstrap';

// Core
@import 'core/mixins';
@import 'core/utilities';

// Layouts
@import 'layouts/page';
@import 'layouts/header';
@import 'layouts/main';
@import 'layouts/footer';

// Primitive Parts
@import 'parts-primitive/tmp-parts';

// Complex Parts
@import 'parts-complex/tmp-ui';

// Page
@import 'pages/tmp-page';
```


### 1.Libraries
Librariesコンテクストに属するscssは外部のライブラリサービスを指します。このテンプレートに既に組み込まれているものではBootstrap4がそれに当たります。
これら外部リソースはファイルを直接書き換えることはせず、常に別ファイルでオーバーライドする方法を利用します。

### 2.Core
変数やmixinまた!importantフラグを用いて利用するユーティリティ的な役割のスタイルを管理するファイル群です。
また、そのほとんどがBootstrapが既に持つクラスのオーバーライドが基本です。

#### `_variables.scss`
WEBサイトの軸となるグローバルな変数を保管します。
Bootstrapの_variables.scssで定義されている変数を数多くオーバーライドして利用します。
Bootstrapの変数定義には、defaultフラグが利用されています。そのためこのファイルは先読みすることにより各変数を再定義します。

以下は`$spacers`の定義の拡張例です。

```
[ core/_variable.scss ]

$spacer: 1rem;
$grid-gutter-width: 30px;
$grid-gutter-half-width: $grid-gutter-width / 2;
$spacer-cmn: $grid-gutter-half-width;// Alias

$spacers: ();
$spacers: map-merge(
  (
    0: 0,
    1: ($spacer * 0.25),
    2: ($spacer * 0.5),
    3: $spacer,
    4: ($spacer * 2), // Override
    5: ($spacer * 3),
    6: ($spacer * 4),
    7: ($spacer * 5.5),
    8: ($spacer * 7),
    9: ($spacer * 9),
    5px: 5px, // Extend
    10px: 10px, // Extend
    15px: 15px, // Extend
    20px: 20px, // Extend
    25px: 25px, // Extend
    30px: 30px, // Extend
    35px: 35px, // Extend
    cmn: $spacer-cmn, // Extend
  ),
  $spacers
);

```
これは本来Bootstrapの `_variable.scss`で定義されているものですが、
map-merge()内では多くの値を新たにmapしています。

この$spacersで定義したものはBootstrapの`_spacing.scss`内でmarginとpaddingのためのユーティリティクラスを生成するのに利用されます。
そのため以下のようなユーティリティクラスが使用可能です。

```
<div class="m-2 pb-20px"><!--  margin: 0.5rem; padding-bottom: 20px;  --></div>
```

この余白調整はBootstrapではおなじみのもので、メディアクエリとの合わせ技が一般的です。

```
<div class="px-0 px-md-cmn"></div>
```
このdivエレメントは通常左右に15pxの余白を持ちますが、mdサイズ（width 991.98px）を切ると左右余白が0になります。
私はよく、背景色の領域を調整するために`.container`に対しこの手段を用います。


#### `_utilities.scss`
ユーティリティクラスを保管します。これらは基本的には!importantフラグと共に用いられています。
スタイルを強くオーバーライドすることを目的とした破壊的なクラス群です。
Bootstrapのutilitiesに含まれないものを足したり、そのwebサイト独自に必要なユーティリティを定義したりします。


#### `_mixins.scss`
マークアップ中に、何度も登場するデザインパターンは様々なアイデアでまとめることが可能です。
その際、@mixin構文は非常に有効な手段です。
このファイルにはグローバルに利用できる@mixinを用いたデザインパーツを配置します。

### 3.Layouts
WEBサイトを構成する最も基礎となるレイアウトコンテナのスタイルを記します。

- WEBサイト全てのコンテナに共通させたいことを`_page.scss` へ、
- サイトヘッダーのレイアウトや内部のパーツのための記述を`_header.scss`へ、
- サイトフッターのレイアウトや内部のパーツのための記述を`_footer.scss`へ

記述します。

また、併せて、ヘッダーとフッターを除く、サイトコンテンツ部分のラップ要素のために`_main.scss`などといった名前のものを用意します。
これらは「レイアウトラッパー自身のデザイン」及び「内包する要素間の共通のデザインレギュレーション」を定義することのみにとどめます。
（各コンテナに内包されるデザインパーツたちは後述する4〜7のコンテクストで定義します。）

```
[ html ]

<div class="Page">
  <header class="Header">
    <div class="header-foo">...</div>
  </header>
  <main class="Main">
    <div class="foo-parts">...</div>
    <div class="bar-parts">...</div>
  </main>
  <footer class="Footer">
    <div class="site-footer-foo">...</div>
  </footer>
</div>
```

```
[ _page.scss ]

// webサイト全体に関わることを定義する
* { ... }
div { ... }
a { ... }
```

```
[ _header.scss ]

// サイトヘッダー全体に関わることを定義する
.Header { ... }
.Header * { ... }
```

```
[ _footer.scss ]

// サイトフッター全体に関わることを定義する
.Footer { ... }
.Footer * { ... }
```

```
[ _main.scss ]

// メイン（このWEBサイトのコンテンツ部分）全体に関わることを定義する
.Main { ... }
.Main * { ... }
```

ただし、ヘッダーやフッターなど内部要素が、他に重複が見られないであろう比較的特別なパーツに関しては、
このLayoutsコンテキストで定義してしまうことも可です。
以下は、ヘッダーの例です。


```
[ _header.scss ]

// サイトヘッダー全体に関わることを定義する
.Header { ... }
.Header * { ... }

// サイトヘッダー内の子要素（ブロック）に関して定義
.header-logo { ... }
.header-global-nav { ... }
```
また、これらレイアウトを意識したブロックには識別のためクラス名を最初の文字だけアッパーケースにしています。

### 4.Primitive Parts
デザイン上、最小単位となるエレメントをパーツ単位にstylesheetにして切り分けます。`_button.scss`, `_table.scss`, `_heading.scss`などが該当します。
`_button.scss`のようにBootstrapが本来持っているコンポーネントを上書きするケースも頻発します。（主に.mainレイアウトコンテナの中のパーツに対し利用します。）


### 5.Complex Parts
比較的複合的なパーツを切り分けたい時に利用します。
`_food-image-gallery-carousel.scss`や `_for-new-user-modal.scss`のように「carousel」や「modal」などと具体的なパーツの種類を示してあげるとより明確です。
また、`_breadcrumbs.scss`, `_pagination.scss` など、一般的なWEBサイトにもよく登場する複合的なパーツも
このコンテクストで整理するのが良さそうです。
Complex PartsはPrimitive Partsを含むことが可能です。（主に.mainレイアウトコンテナの中のパーツに対し利用します。）

### 6.Pages
「ページ」といった単位でデザインを考えたい時に利用します。
ただし、ほとんどの場合は、Bootstrapの持つコンポーネント及び、1〜5のコンテクスト、そして、後述するBEM記法によるモディファイア表現により、欲求のほとんどが満たされてしまいます。

しかしながらあえてページ単位にデザインをまとめたい場合、また、デザインの方向性が見えないパーツなどをとりあえず配置するにはうってつけの場所です。

HTML5によりDOMエレメントの定義が革新される以前のコーディングを知る方にはこのページ単位にスタイルを定義するという考え方はむしろ馴染みのあるものではないでしょうか。


### 7.User
まず初めにこのコンテクストはできる限り利用しないことが好ましいです。
このコンテクストは、「本デザイン設計を共有できない状態」が生まれた場合にのみ利用します。

仮に、以下のケースを想定します。
```
あなたがWEBサイトを制作しました。
ローンチ後、クライアント先のWEB担当者がサイトをメンテすることになりました。
彼の日常業務は非常に軽微なデザイン（スタイル）の修正や更新です。
大規模な改修業務修正の際には改めて改修作業をあなたがが請け負います。
```

例えばこういった場合の、橋渡しに利用されるのがこのコンテクストです。
実際は単純にCSSのシートを分けるというだけの話です。
```
[ HTML ]

<link rel="stylesheet" href="/css/bundle.css">
<link rel="stylesheet" href="/css/user.css">

<div class="foo">The div was red. The div is blue.</div>
<div class="bar" id="bar">The div was big. The div is small.</div>
```

通常全てのコンテクストスタイルシートは1枚のcssファイルにバンドルされますが
Userはそこに含まれません。
```
[ bundle.css ]

.foo { color: red; }
.bar { width: 100px; }
```

```
[ user.css ]

.foo { color: blue }
#bar { width: 500px; }
```

またファイルのロード順でもわかるように、user.cssは、bundle.cssをオーバーライドできる存在です。
このようにuser.cssは「一時的な取り急ぎの処理」「緊急の作業」といった目的にも有効です。

さらに、1〜6のコンテクストのサンプルコードの中に、IDを用いたスタイルの指定がないことにも注目してください。

このコーディングルールには（使用意図が明確な）utilities.scssに含まれるimport構文を用いたクラス群以外には強力なスタイル指定は存在しません。

これもuserに確保されたデザイン強制力の担保と言えます。  
WEBサイトを一つのサービスと捉えたら1〜6のコンテクストはインフラで7はユーザー定義と言えるでしょう。

※上記では、便宜上スタイルシートを増やすという形でこのuserの概念を表現しましたが、
これも含めて1枚のスタイルシートにバンドルできる環境がある場合はそれが最も好ましいでしょう。


## スタイルの記法

### クラス命名規則について
スタイル名には、最上位コンテナのみ最初の一文字をアッパーケースに、そしてバブケースを用い、その他のものには小文字のケバブケースを利用するようにしています。
ここは正直正解はなく、個人的に読みやすさの点でケバブケースを用いています。
クラスの命名規則は後述するBEMに任せることができるので、比較的、迷うことなく名前が確定します。


### BEMについて
基本的にCSSのclass名にはBEM記法を利用します。
一つのwebパーツのルートとなる要素をBlockとして考え、子要素をElementとし、
Modifierにより、これら要素の利用方法に厚みをつけます。

BEMはこの基本理念を守れば、とりあえずOKだと考えています。
必ず冗長な書き方になってしまうことは避けられないので、
ケースバイケースでアレンジすることをオススメします。

それでは、私の記述方法を要点だけをステップバイステップで説明してゆきます。

下記はmodifierを用いないシンプルな例です。
```
<div class="foo-block">
  <div class="foo-block__elm"></div>
</div>
```

ブロック要素の子要素として用意されたelmはアンダースコア2つを用い連結させます。

スタイルシートでは以下のように、SCSSが提供する入れ子構造を利用し、Block単位に記述します。
```
.foo-block {
  font-size: 16px;
  backraund-color: blue;

  &__elm { color: #fff; }
}
```

&はブロック名を参照します。そのため`&__elm`は`.foo-block__elm`となります。
&記法は賛否が分かれるところですが、ブロック単位にコードを管理する際には非常に有効な方法だと考えています。

さらに以下はfoo-blockの、ある状態をモディファイアにより表現したものです。
```
<div class="foo-block foo-block--state_active">
  <div class="foo-block__elm"></div>
</div>

<div class="foo-block foo-block--state_inactive">
  <div class="foo-block__elm"></div>
</div>
```

この2つのfoo-blockはSCSSを用いることにより以下のように表現ができるでしょう。

```
.foo-block {
  font-size: 16px;
  backraund-color: blue;

  &--state_active { background-color: red; }
  &--state_inactive { background-color: gray; }

  &__elm { color: white; }
}
```

さらに、以下はモディファイアで「状態」を表現することに加え、用いられる場所をcaseという言葉で表現してみました。

```
<div class="foo-block foo-block--state_active foo-block--case_top">
  <div class="foo-block__elm"></div>
</div>

<div class="foo-block foo-block--state_inactive foo-block--case_side-bar">
  <div class="foo-block__elm"></div>
</div>
```

```
.foo-block {
  font-size: 16px;
  backraund-color: blue;

  &--state_active { background-color: red; }
  &--state_inactive { background-color: gray; }

  &--case_top { width: 100%; }
  &--case_side-bar { width: 50%; }

  &__elm { color: white; }
}
```

このように、font-sizeが16pxであること、そしてbackground-colorがblueであることを基とし、
その時々で、形態の違うfoo-blockを作ることができました。

そしてさらに以下は、エレメントに対してもモディファイアを用いた例です。

```
<div class="foo-block foo-block--state_active foo-block--case_top">
  <div class="foo-block__elm foo-block__elm--radius_normal"></div>
</div>

<div class="foo-block foo-block--state_inactive foo-block--case_side-bar">
  <div class="foo-block__elm foo-block__elm--radius_deep"></div>
</div>
```

```
.foo-block {
  font-size: 16px;
  backraund-color: blue;

  &--state_active { background-color: red; }
  &--state_inactive { background-color: gray; }

  &--case_top { width: 100%; }
  &--case_side-bar { width: 50%; }

  &__elm {
    color: white;

    &--radius_normal { border-radius: 3px; }
    &--radius_deep { border-radius: 30px; }
  }
}
```

さらに、以下はエレメントにもactiveかもしくはinactiveかという状態を表現したクラスを付加しました。

```
<div class="foo-block foo-block--state_active foo-block--case_top">
  <div class="foo-block__elm foo-block__elm--state_active"></div>
</div>

<div class="foo-block foo-block--state_inactive foo-block--case_side-bar">
  <div class="foo-block__elm foo-block__elm--state_inactive"></div>
</div>
```

```
.foo-block {
  font-size: 16px;
  backraund-color: blue;

  &--state_active { background-color: red; }
  &--state_inactive { background-color: gray; }

  &--case_top { width: 100%; }
  &--case_side-bar { width: 50%; }

  &__elm {
    color: white;

    &--state_active { background-color: green; }
    &--state_inactive { background-color: black; }
  }
}
```

ただし、単にblock自体がactiveかもしくはinactiveかという事実に追従する形で、エレメントにもモディファイアを付加していたという理由なのであれば、それを明確にした以下のスタイルの方が意味が通りそうです。

```
.foo-block {
  $root: &;
  $active-state: $root + "--state_active";
  $inactive-state: $root + "--state_inactive";  

  font-size: 16px;
  backraund-color: blue;

  &--state_active { background-color: red; }
  &--state_inactive { background-color: gray; }

  &--case_top { width: 100%; }
  &--case_side-bar { width: 50%; }

  &__elm {
    color: white;

    $ative-state & { color: green; }
    $inactive-state & { color: black; }
  }
}
```

その上でHTML上からfoo-block__elmに付加していた、stateモディファイアを削除しましょう。

ここまで見てみると、BEM記法がいかに冗長な書き方であるかということがわかると思いますが、
これの対策の一つとして、ブロック及びモディファイア表現を短縮する方法などもよく見かけます。

以下はモディファイアの記述を省略した例です
```
<div class="foo-block --active --top">
  <div class="foo-block__elm"></div>
</div>

<div class="foo-block --inactive --side-bar">
  <div class="foo-block__elm"></div>
</div>
```

```
.foo-block {
  $root: &;
  $active-state: $root + ".--active";
  $inactive-state: $root + ".--inactive";  

  font-size: 16px;
  backraund-color: blue;

  &.--active { background-color: red; }
  &.--inactive { background-color: gray; }

  &.--top { width: 100%; }
  &.--side-bar { width: 50%; }

  &__elm {
    color: white;

    $ative-state & { color: green; }
    $inactive-state & { color: black; }
  }
}
```

これはモディファイアに与えたスタイルの優先順位がやや強くなりますが、HTMLに記載するクラスがグッとスッキリしました。

しかし、モディファイア名よる名前空間の重要性を感じるシーンもあります。
例えば以下の例では、先ほどのような省略が通用しません。
```
[ 省略前 ]

<div class="foo-block foo-block--width_big foo-block--height_small"></div>
<div class="foo-block foo-block--width_small foo-block--height_small"></div>
```

```
[ 省略後 ]

<div class="foo-block --big --small"></div>
<div class="foo-block --small --small"></div>
```

モディファイア名を工夫すれば良い話ですが、
そもそもの値の衝突を恐るならば、キーの省略を行わない以下の折衷案も魅力的です。
```
<div class="foo-block --width_big --height_small"></div>
<div class="foo-block --width_small --height_small"></div>
```

以上、主にモディファイア中心でしたがBEMの解説でした。


# レイアウト （及びグリッド）

私の中で、HTMLマークアップでの決まりごとはごくわずかです。  
ここではレイアウトの基礎を作るラッパー要素の使用方法についてのみ紹介します。


## 必要最低限のレイアウトについて
複数人でのマークアップを想定した場合、
デザイナー同士で共有すべき最も重要なことはレイアウトブロックの使用方法です。
逆を言うと、ここさえ抑えておけば、デザイナー同士のマークアップの差異はそこまで深刻にはなりません。

以下は、私が考える最低限のレイアウトを表現したものです。

```
[ HTML ]

<section class="Sec Sec--type_foo">
  <div class="container">
    <div class="row">
      <div class="col-12">
        ...
      </div>
    </div>
  </div>
</section>
```

### Sep
`.Sec`は、コンテンツ的なセクションの区切り目を示します。（sectionタグとは必ずしも連動しません。） 
このラッパーはBootstrapが提供するものではありません。 
私は業務上、HTMLの組み込み先にRuby on Railsをよく選択しますが、Sepクラス単位にrenderできるよう設計します。

また、pageコンテクストのスタイルシートでも、Sep毎に項目コメントで区切ることで各エレメントたちのサブコンテクストを整理します。

そのページにおけるコンテンツ、もしくは大きなデザイン的な転換部分にこのラッパーを使うと良いでしょう。

### container
`.container`もしくは`.container-fluid`はBootstrapにおける、レイアウトラッパーです。
このラッパーがWEBサイトのwidth及び左右余白をメディアクエリ毎に管理します。
そのため`.container`を関係者が必ず利用することで、ページで最も重要なレイアウトレギュレーションが守られます。
`.Sep`の中に、複数内包することが可能ですが、基本1対1と、対になることが多いです。

`.container`で得られる横幅よりも幅狭なコンテナが必要なシーンもあるでしょう。
その場合、`.container`の使用をやめるのではなく、必ず`.container`内で調整を行ってください。
いくつかの方法が考えられますが、私はよく直近子要素のrowを以下のように調整します。

```
<div class="row w-75 mx-auto">
```

この要素ウィンドウに対し75%の横幅で左右中央構えに配置されます。

### row
`.row`は`.container`のinner要素であり、その名の通り、行のようにコンテンツを輪切りにします。
縦方向にコンテンツを分割するという用途では`.Sep`、`.container`と同じですが、これらの最小単位のラッパーとして活躍します。
また、内包する`.col-xx`を制御しグリッドシステムを構築します。
`.container`内には複数存在することができ、BEMブロックとして活用することも頻繁にあります。


### col-xx
`.col-xx`は`.row`のinner要素としてグリッドをフレキシブルに表現します。
すなわちレスポンシブ表現の中核を担うグリッドコンテナです。
Bootstrapはwidthを12分割で考えるので、
例えば、4カラムレイアウトを表現したい場合は以下のようなコードになります。

```
<div class="row">
  <div class="col-3">1つ目のカラム</div>
  <div class="col-3">2つ目のカラム</div>
  <div class="col-3">3つ目のカラム</div>
  <div class="col-3">4つ目のカラム</div>
</div>
```

メディアクエリ対応のcolクラスと併用することでその威力が発揮されます。
```
<div class="row">
  <div class="col-6 col-md-3">mdサイズの時は1行目の1つ目のカラム。mdサイズ未満の時は1行目の1つ目のカラム。</div>
  <div class="col-6 col-3">mdサイズの時は1行目の2つ目のカラム。mdサイズ未満の時は1行目の2つ目のカラム。</div>
  <div class="col-6 col-3">mdサイズの時は1行目の3つ目のカラム。mdサイズ未満の時は2行目の1つ目のカラム。</div>
  <div class="col-6 col-3">mdサイズの時は1行目の4つ目のカラム。mdサイズ未満の時は2行目の2つ目のカラム。</div>
</div>
```

このようにレイアウト（及びグリッド）の管理はBootstrapに任せ、
それ以外の部分で有意義なデザインライフを送りましょう。 :smile:


# 最後に
このドキュメントは、社内でのHTMLレギュレーションについての話し合いの過程から、
なんとなく普段の自分の考えをメモ感覚で書き留め始めたのが始まりですが、始まりすぎてえらく長文になってしまいました。

未熟者ゆえ、間違った記載や誤ったアイデアもあると思います。
あくまで、いちコーダーとしての勉強のヒストリー・また備忘録としての意味合い強めで、ここに書き置きしております。m(_ _)m

:cat2:
[English](README.md) | 日本語  

# 概要編

## はじめに
:smile: :fish: :rooster: :tropical_fish: :cat2: :ox: :pig2: :whale2: :smile:  

こんにちは。これは私が普段HTMLコーディングのために用いるスターターキッドです。

私はしばしばこのキッドをCMSフレームワーク業務前の静的コーディングに利用します。
以下の条件に該当する場合、もしかしたらご活用いただけるかもしれません。

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

※ あくまで一般的なWEBページを作成することを想定しています。PWA, SPAを意識したデザイン方法はまた少し違うと考えています。

## コーディングスタイル概要
私はBootstrapのコンポーネントをベースに、拡張・上書きする形でデザインを進めます。
そのためここからはBootstrapへのある程度の事前の理解が必要です。

また、新規に定義するデザインパーツにはBEM設計を用いるようにしています。
これはOOCSS設計に基づくBootstrap4のスタイル方針に反しており、そのため、やがてコードは混沌としてゆきます。

しかし、Bootstrapはデザインそのものでありながらインフラでもあると捉えます。
誤解を恐れず言うと、本コーディング環境はBootstrapによりリセットし、それをBEMコーディンでマウンティングするスタイルです。

しかしながら、安心してください。
コンテキスト・コンポーネント単位にデザインを管理する方針を徹底すると意外にこの混沌は些細な事に思えてきます。

では実際にOOCSSとBEMが混在する状況を見てみましょう。
以下は、Boostrapがもつ既存のwebパーツであるボタンコンポーネントのデザインを別のSCSSファイル内でBEMを利用し上書き拡張しています。

```
[ in bootstrap.css ]

// boostrap.css内にある_buttons.scssのコンパイル後のコード

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

// 別のSCSSファイル内で上書きとBEMのモディファイア拡張

.btn {
  display: block; // Override

  &--width_small { ... } // Extend
  &--width_big { ... } // Extend
}

.btn-primary {
  &--width_small { ... } // Extend
  &--width_big { ... } // Extend
}
```

親クラスである.btnと継承クラスである.btn-primaryの双方にBEM拡張を施しました。
しかしこれはややオーバーです。
完全にBEM定義でOOCSSをマウントする場合はこれら両クラスをBEMブロックとみなし、そこを起点にBEMモディファイアを定義してゆくのは確かに筋が通っている気がします。
しかしながら、ボタンコンポーネントはカラーリング（およびアウトラインされたカラーリングデザイン）という観点でのみOOCSS化されたコンポーネントです。ここを頂点に物事を考えると無駄な拡張性の担保になりかねません。

「カラーリング」というジャンルのデザイン拡張をBootstrapに一任させ、モディファイアによる拡張は親クラスである.btnクラスのみに行うのがほど良いでしょう。

```
[ my-override-button.scss ]

.btn {
  &--width_small { ... } // Extend
  &--width_big { ... } // Extend
}
```

次に.btnを継承したクラスである .btn-primary, .btn-secondary...では表現しきれないボタンデザインを要求されたことを考えます。
別コンポーネントを定義しても良さそうですが、ここでは同一コンポーネント内でのBEM拡張を徹底してみましょう。

```
[ my-override-button.scss ]

.btn {
  &--width_small { ... } // Extend
  &--width_big { ... } // Extend

  // typeというモディファイアを新たに定義し、そこにボタンのスタイルを書く
  &--type_table-style {
    display: table;
    ...
  }
}
```

typeモディファイアは私の中では特別なモディファイアです。
このモディファイアは.btnを継承した .btn-primary, .btn-secondary...クラスと同等の「継承」を意味するものと定義します。

そうすると、このコードは幾分整頓されたものに見えてきます。

心が落ち着かない方は、以下のように従来通り新規継承ボタンをOOCSS拡張で試みてみましょう。

```
[ my-override-button.scss ]

.btn {
  &--width_small { ... } // Extend
  &--width_big { ... } // Extend
}

.btn-table {
  display: table;
  ...
}
```

こちらはモディファイア記述のみ異質に感じますが、大枠はOOCSSを意識したものになっていますね。

一例をあげて見ましたが、全てはケースバイケースで良いと考えています。
最終形である後半2つのコードを見て、混沌とした印象を受けた場合、このデザインアイデアのことはすっかり忘れてください。


## スタイルコンテクスト
ここからはデザインの記述場所にコンテクストという言葉を用い、各スタイルをジャンル分けしてゆきましょう。

私はデザインのアプローチには以下7つのコンテクストに分けて考えるようにしています。

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
この取り決めをうまく活用し、より目的に即した場所にデザインを定義します。

以下はscssのエンドポイントとなるindex.scssの記述例です。
これらは上から下に順番にロードされます。  
※`_variables.scss`のみイレギュラーなソート順になっていることについては後述します。

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
どのWEBページでも利用可能なグローバルな変数を保管します。
もちろんここでもBootstrapのvariables.scssで定義されている変数を数多くオーバーライドして利用します。
bootstrapの変数定義には、defaultフラグが利用されています。そのためこのファイルは先読みさせ、その定義を再構築するようにします。

#### `_utilities.scss`
グローバルに利用できるユーティリティクラスを保管します。これらは基本的には!importantフラグと共に用いられています。
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
また、
ヘッダーとフッターを除く、サイトコンテンツ部分のラップ要素のために`_main.scss`などといった名前のものを用意します。
注意したいことは、これらは「レイアウトラッパー自身のデザイン」及び「内包する要素間の共通のデザインレギュレーション」を定義することが主な役割だという点です。
そのため、各コンテナに内包されるデザインパーツたちは後述する4〜7のコンテクストで定義することが基本です。

ただし、headerやfooterなど他に重複が見られない（であろう）特別なパーツ郡に関しては、このLayoutsコンテキストで定義してしまうことも可です。
以下は、そのイメージです。
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

// サイトヘッダー内のブロックに関して定義
// 4〜7のコンテクストで定義しても良いが他に重複を見ない要素のケースが多いのでこちらに記述
.header-foo { ... }

```

```
[ _footer.scss ]

// サイトフッター全体に関わることを定義する
.Footer { ... }
.Footer * { ... }

// サイトフッター内のブロックに関して定義
// 4〜7のコンテクストで定義しても良いが他に重複を見ない要素のケースが多いのでこちらに記述
.footer-foo { ... }

```

```
[ _main.scss ]

// メイン（このWEBサイトのコンテンツ）全体に関わることを定義する
.Main { ... }
.Main * { ... }

// 内包するパーツは4〜7のコンテクストで定義する方針が良い
```

また、これら最上位のレイアウトブロックには識別のためクラス名を最初の文字だけアッパーケースにしています。


### 4.Primitive Parts
デザイン上、最小単位となるエレメントをパーツ単位にstylesheetにして切り分けます。`_button.scss`, `_table.scss`, `_heading.scss`などが該当します。
Bootstrapが本来持っているコンポーネントを上書きするケースも頻発します。

### 5.Complex Parts
比較的複合的なパーツを切り分けたい時に利用します。
`_food-image-gallery-carousel.scss`や `_for-new-user-modal.scss`のように「carousel」や「modal」などと具体的なパーツの種類を示してあげるとより明確です。
また、`_breadcrumbs.scss`, `_pagination.scss` など、一般的なWEBサイトにもよく登場する複合的なパーツも
このコンテクストで整理するのが良さそうです。
Complex PartsはPrimitive Partsを含むことが可能です。

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
このようにuser.cssは「一時的なもの」「緊急の作業」「取り急ぎの処置」などといった目的にも有効です。

さらに、1〜6のコンテクストのサンプルコードの中に、IDを用いたスタイルの指定がないことにも注目してください。
サンプルには使用意図が明確なutilities.scssに含まれるimport構文を用いたクラス指定以外に強力なスタイル指定は存在しません。
これらもuserに確保された強制力の一つです。WEBサイトを一つのサービスと捉えたら1〜6のコンテクストはインフラで7はユーザー設定と言えるでしょう。

※上記では、便宜上スタイルシートを増やすという形でこのuserの概念を提示しましたが、
これも含めて1枚のスタイルシートにバンドルできる環境がある場合はそれがもっとも好ましいです。


## スタイル記法

### クラス命名規則について
スタイル名には、最上位コンテナのみアッパーケバブケースを用い、その他のものにはケバブケースを利用するようにしています。
ここは正直正解はなく、個人的に読みやすさの点でケバブケースを用いています。
細かな命名規則は後述するBEMに任せることができるので、比較的いつも楽に名前が確定します。


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

Block要素の子要素として用意されたelmはアンダースコア2つを用い連結させます。

スタイルシートでは以下のように、SCSSが提供する入れ子構造を利用し、Block単位に記述します。
```
.foo-block {
  font-size: 16px;
  backraund-color: blue;

  &__elm { color: #fff; }
}
```

&はblock名を参照します。そのため`&__elm`は`.foo-block__elm`となります。
&記法は賛否が分かれるところですが、Block単位にコードを管理する際には非常に有効な方法だと考えています。

さらに以下はfoo-blockの、ある状態をModifierにより表現したものです。
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

さらに、以下はModifierで「状態」を表現することに加え、用いられる場所をcaseという言葉で表現してみました。

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

そしてさらに以下は、Blockに対してもModifierを用いた例です。

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

また、以下はElementにもactiveかもしくはinactiveかという状態を表現した例です。

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

ただし、単にblock自体がactiveかもしくはinactiveかという事実に追従する形で、ElementにもModifierを付加していたという理由なのであれば、
それを明確にした以下のスタイルの方が意味が通りそうです。

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

その上でfoo-block__elmに付加していた、stateモディファイアを削除しましょう。

ここまで見てみると、BEM記法がいかに冗長な書き方であるかということがわかると思いますが、
これの対策の一つとして、Block及びModifier表現を短縮する方法などもよく見かけます。

以下はModifireの記述を省略した例です
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

しかし、モディファイアキーによる名前空間の重要性を感じるシーンも無きにしも非ずです。
例えば以下の例では、先ほどの省略が利用できません。
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

モディファイアバリューの衝突を恐るならば、キーの省略を行わない折衷案も魅力的です。
```
<div class="foo-block --width_big --height_small"></div>
<div class="foo-block --width_small --height_small"></div>
```

以上、主にモディファイア中心でしたがBEMの解説でした。


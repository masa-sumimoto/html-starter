※ このドキュメントは日本語から作成しています。より正確な内容は日本語ドキュメントを参照ください。

English | [日本語](README_ja.md)  

# About this repository

## Overview
:smile: :fish: :rooster: :tropical_fish: :cat2: :ox: :pig2: :whale2: :smile:  

Hi. This is my html cording starter kid.
I often use the kit to markup static HTML before using CMS framework.

If your case includes the following, Please use the kid.

- Use Bootstrap as css library.
- Use jQuery
- Use SCSS
- Use BEM style
- Want to manage the design in units such as page layout, parts.

※ If you get good starter kid, I suggest [web starter kid of google](https://github.com/google/web-starter-kit).  
※ It is under construction in some places.

:smile: :goat: :rabbit2: :leopard: :octopus: :dog2: :panda_face: :cow2: :smile:  

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

# How to Use the environment

## Installation
You can start coding immediately in the following way.
1. Clone this repository: `git clone git@github.com:sumi37/html-starter.git` (or download)
2. Move directory: `cd cd html-starter`
3. Install node modules with yarn: `yarn install`
4. Start server: `yarn start`
5. View the site at `http://localhost:8080/`

※ If you don't have node.js and yarn, Please install on your PC in advance.
※ If you want to stop server, Please use `ctrl+c` on your shell.

## How to add HTML files
Please add html files to under `/public/`.
```
Example:
./public/index.html => http://localhost:8080/
./public/foo.html => http://localhost:8080/foo.html
```
And this directory can be used as an area for saving static files.
so For example, it is recommended to save image files like `/public/images/*`


## How to manage Stylesheets
Please add css files as scss to under `/src/scss`.
```
Example:

/src/scss/_foo.scss
```
And import the file to `/src/scss/index.scss`.
You can use both css style and scss style on scss files.


## How to manage Javascripts
Please add css files to under `/src/js`.
```
Example:

/src/js/foo.js
```
And import the file to `/src/js/index.js`.
You can use both es5 style and es6 style on javascript files.


## Build and Reading files
If you get bundle files, There is `yarn run build`.
Please stop server once and enter the command.
`public/css` and `public/js` folder will get bundle files.

You have to load bundle file in HTML.

```
<link rel="stylesheet" href="/css/bundle.css">
<script src="/js/bundle.js"></script>
```

Also, while the server is active, 
the latest state is automatically reflected in the browser without executing the build.


# How to Design
If you start working with this project template, you will notice that it contains several styles and html tags.
I will introduce my coding method from here on.
If you already have good way, Please delete my codes. and Enjoy cording!!

※ This is for creating basic web pages. Regarding the design method conscious of PWA, SPA, I have another idea.

## Outline of my cording style
Based on the Bootstrap component, I proceed with the design by extending / overwriting.
For that reason some prior understanding to Bootstrap is important.
In addition, I use BEM style for newly defined design parts.
This is contrary to the Bootstrap 4 style policy based on the OOCSS design, so eventually the code will become chaotic.

However, Bootstrap seems to be infrastructure as well as design itself.
so Please don't worry.

The policy of managing the design on a context / component basis helps clarify your code.

OK. Let's see the situation where OOCSS and BEM are actually mixed.
Below, I overwrite and expand the design of the button component which is the existing web part of Boostrap using BEM in another SCSS file.

```
[ in bootstrap.css ]

// _Buttons.scss compiled within bootstrap.css

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

// Override and extend with BEM Modifier in another SCSS file

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

また、さらに.btnを継承したクラスである .btn-primary, .btn-secondary...などが表現できないボタンなども必ず登場します。
ここではBEMでの拡張を徹底してみましょう。

```
[ my-override-button.scss ]

.btn {
  &--width_small { ... } // Extend
  &--width_big { ... } // Extend

  // Difine new type instance button with BEM special modifier
  &--type_table-style {
    display: table;
    ...
  }
}
```

typeモディファイアは特別なモディファイアと事前に自分の中で定義しましょう。またそれらが.btnを継承した .btn-primary, .btn-secondary...クラスと同等のものであるとさらに定義します。そうするとこのコードは幾分整頓されたものに見えてきます。

または、以下のように従来通り新規インスタンスボタンにはOOCSS拡張を試みてみます。

```
[ my-override-button.scss ]

.btn {
  &--foo_bar { ... }
  &--foo_hoge { ... }
}

.btn-table {
  display: table;
  ...
}
```

一例をあげて見ましたが、全てはケースバイケースで良いと考えています。
最終形である後半2つのコードを見て、混沌とした印象を受けた場合、このデザインアイデアのことはすっかり忘れてください。


## Style Contexts
ここからはデザインの記述場所にコンテクストという言葉を用い、各スタイルをジャンル分けしてゆきましょう。

My CSS policy has 7 contexts below.

```
1.Libraries
2.Core
3.Layouts
4.Primitive Parts
5.Complex Parts
6.Pages
(7.User)
```
These are compailed from 1 to 7.
Please use this sort regulation, It will clarify the role of the design.

A description example of endpoint stylesheet is as follows. (index.scss)
Stylesheets are compiled and loaded from top to bottom.
※ `_variables.scss` is only irregular sort position.

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
Libraries context is used for external css libraries.
I have added Bootstrap4 to here already.
Please don't touch the libraries code. Also manage the libraries as package as much as possible.

### 2.Core
These stylesheets manage `variables`, `mixins` and `utility classes`.
Also these include some override and extend class of Bootstrap.

#### `_variables.scss`
The file defines global variables. Also, the file includes overrides of Bootstrap.
Definitions of Bootstrap almost use default flag.
Therefore, this file will be prefetched form.

#### `_mixins.scss`
mixins are effective for organizing duplicate styles.
The file inclueds global mixins.

#### `_utilities.scss`
The file includes global utility classes. The classes usually have `!important` flag.
Bootstrap has many utility classes.
I added something not included in Bootstrap utilities file to here.


### 3.Layouts
Please define the most basic layout container.
Please define about web site regulation to `_page.scss`.
Please define about site header regulation to `_header.scss`.
Please define about site footer regulation to `_footer.scss`.

また、
ヘッダーとフッターを除く、サイトコンテンツ部分のラップ要素のために`_main.scss`などといった名前のものを用意します。
注意したいことは、これらは「自身のレイアウト」及び「内包する要素共通のデザインレギュレーション」を定義することが主な役割だという点です。
そのため、各コンテナに内包されるデザインパーツたちは後述する4〜7のコンテクストで定義することがが可能です。
ただし、headerやfooterなど他に重複が見られないパーツに関しては、このLayoutsコンテキストで定義してしまうことも可です。

The following is this image. 
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

// サイトフッター内のブロックに関して定義
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

また、これら最上位のレイアウトブロックには最初の文字だけアッパーケースを利用することで、
その他のクラス命名表現とに違いをつけています。


### 4.Primitive Parts
デザイン上、最小単位となるエレメントをパーツ単位にstylesheetにして切り分けます。`_button.scss`, `_table.scss`, `_heading.scss`などが該当します。
Bootstrapが本来持っているcomponentを上書きするケースも頻発します。

### 5.Complex Parts
比較的複合的なパーツを切り分けたい時に利用します。
`_food-image-gallery-carousel.scss`や `_for-new-user-modal.scss`のように「carousel」や「modal」などと具体的なパーツの種類を示してあげるとより明確です。
また、`_breadcrumbs.scss`, `_pagination.scss` など、一般的なWEBサイトにもよく登場する複合的なパーツも
このコンテクストで整理するのが良さそうです。
Complex PartsはPrimitive Partsを含むことが可能です。

### 6.Pages
「ページ」といった単位でデザインを考えたい時に利用します。
しかしながら、ほとんどの場合は、Bootstrapの持つコンポーネント及び、1〜5のコンテクスト、そして、後述するBEM記法によるモディファイア表現により、欲求のほとんどが満たされてしまいます。

しかしながらあえてページ単位にデザインをまとめたい場合、また、デザインの方向性が見えないパーツなどをとりあえず配置するにはうってつけの場所です。HTML5によりDOMエレメントの定義が革新される以前のコーディングを知る方にはこの考え方はむしろ馴染みのあるものではないでしょうか。

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


## Styling methods

### クラス命名規則について
スタイル名には、最上位コンテナのみアッパーケバブケースを用い、その他のものにはケバブケースを利用するようにしています。
ここは正直正解はなく、個人的に読みやすさの点でケバブケースを用いています。
細かな命名規則は後述するBEMに任せることができるので、比較的いつも楽に名前が確定します。

### About BEM
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

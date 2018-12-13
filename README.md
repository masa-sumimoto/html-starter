※ このドキュメントは日本語から作成しています。より正確な内容は日本語ドキュメントを参照ください。

English | [日本語](README_ja.md)  

# About this repository

## Overview
:smile: :fish: :rooster: :tropical_fish: :cat2: :ox: :pig2: :whale2: :smile:  

Hi. This is my html cording starter kid.
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

※ I will show way to create general web pages except for designs assuming Web App.


## Style overview
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

/* _Buttons.scss compiled within bootstrap.css */

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

I applied BEM extension to both parent class `.btn` and inheritance class `.btn-primary`.
However, this is a bit extreme.

If we consider these as BEM blocks, to mount OOCSS completely with BEM modifier should be seems like to be correct.
But `Button` is a component that OOCSS was used only in terms of coloring.
Thinking design from the point can be a guarantee of wasteful extensibility.

It is better to depend on Bootstrap to extend the design of the genre "coloring", 
and extend it by modifier only to the parent class `.btn`.

```
[ my-override-button.scss ]

.btn {
  &--width_small { ... } // Extend
  &--width_big { ... } // Extend
}

.btn-primary {
  ...
}
```

Next, Let's consider a button design that can not be expressed by classes (`.btn-primary`, ` .btn-secondary`...) that inherited `.btn`.
Although it seems good to define another component, try BEM extension within the same component.

```
[ my-override-button.scss ]

.btn {
  // Define 'type' modifier as base modifier
  &--type_table-style {
    display: table;
    ...
  }

  // Other modifiers work as utilities for .btn class or type modifire class
  &--width_small { ... }
  &--width_big { ... }
}
```

`type` modifier is a special modifier key for me.
This modifier distinguishes it from other modifiers.
(so Please be sure to mention this before other modifiers.)

Based on this idea, this code appears to be in order.

but, If you are uncomfortable with this concept, please use OOCSS as inheritance button as below.

```
[ my-override-button.scss ]

.btn {
  &--foo_bar { ... }
  &--foo_hoge { ... }
}

// Inherited class
.btn-table {
  display: table;
  ...
}
```

The base class `.btn` still uses the BEM modifier, but this code is basically based on OOCSS.

I think that everything is good on a case by case basis.
If you see the code until the end, if you can not accept it, please completely forget about this design idea.


## Style Contexts

So here we will consider the design in the construct.
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
Please don't touch the libraries code. If your cange the codes, Please use override in other stylesheet. 

### 2.Core
These stylesheets manage `variables`, `mixins` and `utility classes`.
Also these include some override and extend class of Bootstrap.

#### `_variables.scss`
The file defines global variables. Also, the file includes overrides of Bootstrap.
Definitions of Bootstrap almost use default flag.
Therefore, this file will be prefetched form.

The following example is an extension of `$spacers`.

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
This is originally defined in `_variable.scss` of Bootstrap.
I added some defines using `map-merge()`.

margin and padding utility classes are generated using $spacers in `_spacing.scss` of Bootstrap.

So, we can use its the following.

```
<div class="m-2 pb-20px"><!--  margin: 0.5rem; padding-bottom: 20px;  --></div>
```

This gutter adjustment is familiar to Bootstrap, 
and it is used with media queries are common.

```
<div class="px-0 px-md-cmn"></div>
```
The div element has x-padding 15px generally,
and It has no x-padding with less than md size width (991.98px). 


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

And I often use `_main.scss` for site contents parts excluding header and footer.
The file only difined `Own design regulation` and `Common design regulation among included elements`.
( The design parts included in each container are defined in the context of 4 to 7. )

Please look the following. 

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

// Define for web site
* { ... }
div { ... }
a { ... }
```

```
[ _header.scss ]

// Define for only site header container
.Header { ... }
.Header * { ... }
```

```
[ _footer.scss ]

// Define for only site footer container
.Footer { ... }
.Footer * { ... }
```

```
[ _main.scss ]

// Define for only site main wrapper container
.Main { ... }
.Main * { ... }
```

However, with respect to relatively special parts where internal elements such as site header and site footer will not be found duplicates,
It is possible to define in this Layouts context.

The following is an example of a header.

```
[ _header.scss ]

// Define for site header container
.Header { ... }
.Header * { ... }

// Define for elements contained in header container
.header-logo { ... }
.header-global-nav { ... }
```

and, I prefer a way that I add classe name with Uppercase
and, I also prefer a way that add class name with uppercase to first character.

### 4.Primitive Parts
Divide the minimum element into stylesheet in parts unit.
Examples are `_button.scss`,` _table.scss`, `_heading.scss`.
In many cases, it overwrites components owned by Bootstrap like `_button.scss`.
(We mainly use for parts in the .main layout container.)

### 5.Complex Parts
It is used when you want to cut relatively complex parts.
It is clearer to show the specific part types such as "carousel" and "modal" like `_food-image-gallery-carousel.scss` and` _for-new-user-modal.scss`.

Also, there are complex parts that often appear on common web sites such as `_breadcrumbs.scss`,` _pagination.scss`
It seems good to organize in this context.

Complex Parts can include Primitive Parts.
(We mainly use for parts in the .main layout container.)

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
このようにuser.cssは「一時的な取り急ぎの処理」「緊急の作業」といった目的にも有効です。

さらに、1〜6のコンテクストのサンプルコードの中に、IDを用いたスタイルの指定がないことにも注目してください。

このコーディングルールには（使用意図が明確な）utilities.scssに含まれるimport構文を用いたクラス群以外には強力なスタイル指定は存在しません。

これもuserに確保されたデザ イン強制力の担保と言えます。  
WEBサイトを一つのサービスと捉えたら1〜6のコンテクストはインフラで7はユーザー設定と言えるでしょう。

※上記では、便宜上スタイルシートを増やすという形でこのuserの概念を提示しましたが、
これも含めて1枚のスタイルシートにバンドルできる環境がある場合はそれがもっとも好ましいでしょう。


## Style notation

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


# Layout （and Grid）

I always share a little convention with HTML markup.
Let me show the way of using layout wrappers.

## Minimum layout required

To share the way of using layout block is a one of important things when you design with other people.
Please look 
Below is a representation of the minimum layout I think.

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
`.Sec` indicates the content break.
(The section tag is not necessarily used.)

This wrapper is not provided by Bootstrap.
I often choose Ruby on Rails to include HTML, I often design to use `render` for each `.Sec`.

Also I organize subcontexts by separating heading comments each `.Spc` in stylesheet of `Page context`.
It is good to use this wrapper class for contents  or design branch point.


### container
`.container` and `.container-fluid` are Bootstrap layout wrappers.
The wrappers manage x-gutters each media query breakpoints.
Everyone use the wrappers so that the most important design regulations are kept.

`.Sep` can contain multiple `.container`.
However, there are many cases that it contains 1 `.container`.

When you want to use a container with a width smaller than `.container`, don't use other container.
Instead of please adjust inner element width. 

There are several ways. I often adjust the row of the most recent child element as follows.

```
<div class="row w-75 mx-auto">
```
This element be 75% width and got margin-left auto and margin-right auto.

### row
It is the same as `.Sep`,` .container` for use in splitting content in the vertical direction, 
but it works as a wrapper for these minimum units.

It also builds grid system with `.col-xx`.
`.container` can includes multi `.row`s. and It can often be BEM Block.

### col-xx
`.col-xx` expresses the grid flexibly as the inner element of` .row`.
It is a grid container that is the core of responsive design.

Bootstrap thinks width by 12 slices, 
For example, If you want to get 4 column layout, do the following. 

```
<div class="row">
  <div class="col-3">Column 1</div>
  <div class="col-3">Column 2</div>
  <div class="col-3">Column 3</div>
  <div class="col-3">Column 4</div>
</div>
```

By using the col class with media queries options, it get powerfully.

```
<div class="row">
  <div class="col-6 col-md-3">md size: row1 col1 / less than md size: row1 col1</div>
  <div class="col-6 col-3">md size: row1 col2 / less than md size: row1 col2</div>
  <div class="col-6 col-3">md size: row1 col3 / less than md size: row2 col1</div>
  <div class="col-6 col-3">md size: row1 col4 / less than md size: row2 col2</div>
</div>
```

In this way, management of layout (and grid) depends on Bootstrap, 
Let's get a comfortable design life. :smile:


# In the end
This document was starating, from the process of discussion about in-house HTML regulation.
Sorry for my long long document.

I am in the process of study. So my sentences may contain some mistakes and bad ideas.
Therefore, I would appreciate it if you read this as a man's study record.
Thanks.

:cat2:
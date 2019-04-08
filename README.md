※ このドキュメントは日本語から作成しています。より正確な内容は日本語ドキュメントを参照ください。  
※ There is a more sophisticated environment [My Gulp Web Starter](https://github.com/masa-sumimoto/my-gulp-web-starter). Please see also this.  

English | [日本語](README_ja.md)  

# My Webpack Web Starter
This is my starter kid for creating website with Webpack.

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

## Prerequisites
- Command line operation.
- To be installed node.js on your PC.
- To be installed yarn on your PC.

## Installation
You can start coding immediately in the following way.
1. Clone this repository: `git clone git@github.com:sumi37/my-webpack-web-starter.git` (or download)
2. Move directory: `cd my-webpack-web-starter`
3. Install node modules with yarn: `yarn install`
4. Start server: `yarn start`
5. View the site at `http://localhost:8080/`

※ If you want to stop server, Please use `ctrl+c` on your shell.

## How to add HTML files
Please add html files to under `/public/`.
```
[ Example ]

./public/index.html => http://localhost:8080/
./public/foo.html => http://localhost:8080/foo.html
```
And this directory can be used as an area for saving static files.
so For example, it is recommended to save image files like `/public/images/*`


## How to manage Stylesheets
Please add css files as scss to under `/src/scss`.
```
[ Example ]

/src/scss/_foo.scss
```
And import the file to `/src/scss/index.scss`.
You can use both css style and scss style on scss files.


## How to manage Javascripts
Please add css files to under `/src/js`.
```
[ Example ]

/src/js/foo.js
```
And import the file to `/src/js/index.js`.
You can use both es5 style and es6 style on javascript files.


## Build and Reading files
If you get bundle files, There is `yarn run dev-build` or `yarn run build`.
Please stop server once and enter the command.
`public/css` and `public/js` folder will get bundle files.

You have to load bundle file in HTML.

```
[ HTML ]

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


## About Boostrap and BEM
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
[ bootstrap.css ]

/* _Buttons.scss compiled within bootstrap.css */

.btn {
  display: inline-block;
  ...
}

.btn-primary {
  color: #fff;
  ...
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
But `Button` is a component that OOCSS was used only in terms of coloring(color, background-color, border-color).
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
  // No extend
}
```

Next, Let's consider a button design that can not be expressed by classes (`.btn-primary`, ` .btn-secondary`...) that inherited `.btn`.
Although it seems good to define another component, try BEM extension within the same component.

```
[ my-override-button.scss ]

.btn {
  // Define 'type' modifier as base modifier
  &--type_special {
    display: table;
    width: 100%;
    border-size: 10px;
    ...
  }
}
```

`type` modifier is a special modifier key for me.

I have defined it as the same meaning as children classes（`.btn-primary`, `.btn-secondary`）.

Based on this idea, this code appears to be in order.

but, If you are uncomfortable with this concept, please use OOCSS as inheritance button as below.

```
[ my-override-button.scss ]

.btn {
  border-radius: 30px;
}

// Inherited class
.btn-special {
  display: table;
  width: 100%;
  border-size: 10px;
  ...
}
```

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
@import 'parts-primitive/tmp';
@import 'parts-primitive/heading';

// Complex Parts
@import 'parts-complex/tmp';

// Page
@import 'pages/tmp';
@import 'pages/top';
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

#### `_mixins.scss`
mixins is useful if you think you want to modularize overlapping styles.
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
.site-header-logo { ... }
.site-header-global-nav { ... }
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
You can add style parts for a page template.

So You use the space for...

- Design parts for which the context has not been finalized.
- Design parts specialized only for that page.

However you can already add most design pattern with Bootstrap components and context No.1〜5.


### 7.User
First of all, it is preferable not to use this context as much as possible.
This is the content to use when design regulations can not be shared.

We often encounter this situation in the process of contract production.

The case where other companies produce some pages of the web site.  
The case where the client inhouse person adjusts the design after launch.

This also corresponds to cases where regulations are not shared within your company.

Please use this context for this situation.
This is a simple story. Just separate stylesheets.

```
[ HTML ]

<link rel="stylesheet" href="/css/bundle.css">
<link rel="stylesheet" href="/css/user.css">
```

basically all of context stylesheets are bundled as 1 stylesheet. but User stylesheet is not included there. 

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

```
[ HTML ]

<div class="foo">The div was red. The div is blue.</div>
<div class="bar" id="bar">The div was big. The div is small.</div>
```

Also as you can see in the file loading order, user.css can override bundle.css.
In this way, user.css is effective for the purpose of "temporary haste processing" and "urgent work".

Also note that there is no designation of style using ID in sample code of 1 to 6 contexts.
There is no strong style specification in this coding rule except for `_utilities.scss`.

This is one of the design enforcement prepared for `User`. 
If you think of the WEB site as one service, the context of 1 to 6 is infrastructure and 7 is user defined.

※In the above, I presented the concept of this user in the form of increasing the style sheets for convenience,
If you have an environment where you can bundle it in one stylesheet including this, it is most preferable.


## Style notation

### About class naming convention

I have a rule like this.

Rule1. page container and top level contents container are uppercase for the first letter only and lowercase after that.
```
.Header, .Main, .Footer, Sec-foo-bar

※ I will explain about .Sec-xxx-xxx later.
```

Rule2. Use kebab case for general new class name.
```
.foo, .foo-bar
```

In terms of legibility I am using kebab case.
But if the policies are unified in each project, I think that any writing style is acceptable.

I am use Camel Case, such as React, when Javascript development is the focus.


### Basic BEM
I use BEM style for styling.

Please define the root element of the WEB part as `Block`, and the inner elements as `Element`, and the element state as extended by `Modifier`.

Basically I think that it is OK to keep only this.
BEM is often redundant notation.
So please arrange on a case by case basis.

Please look my way step by step.  
The following is a simple example with `Block` and `Elements`.

```
[ HTML ]

<div class="foo-block">
  <div class="foo-block__elm"></div>
</div>
```

Please use 2 underscores for the name of `element` as a child element of `Block`.

In Stylesheet, You can use nested structue for each `Block`.

```
[ Stylesheet ]

.foo-block {
  font-size: 16px;
  backraund-color: blue;

  &__elm { color: #fff; }
}
```

`$` refers to block name. Therefore `&__elm` is` .foo-block__elm`.
I think `$` is a very effective way to manage code on a block basis.

The following sample inclueds modifier information.

```
[ HTML ]

<div class="foo-block foo-block--state_active">
  <div class="foo-block__elm"></div>
</div>

<div class="foo-block foo-block--state_inactive">
  <div class="foo-block__elm"></div>
</div>
```

```
[ Stylesheet ]

.foo-block {
  // Block style
  font-size: 16px;
  backraund-color: blue;

  // Block Modifier style
  &--state_active { background-color: red; }
  &--state_inactive { background-color: gray; }

  // Element style
  &__elm { color: white; }
}
```

これで、
- Blockのためのスタイル。
- （Blockの子要素として定義される）Elementのためのスタイル。
- Block（もしくはElement）の拡張のために定義されるModifierによるスタイル。

これらを一つのスタイルブロックとして定義することができました。


### Modifier context

もう少しModifierを掘り下げてみましょう。
Modifierキーは、付加的なデザインを明示的に表現します。
以下の例では3つのmodifier拡張が行われています。

```
[ HTML ]

<div class="foo-block foo-block--type_normal foo-block--radius_shallow foo-block--state_active">
  <div class="foo-block__elm"></div>
</div>

<div class="foo-block foo-block--type_irregular foo-block--radius_deep foo-block--state_inactive">
  <div class="foo-block__elm"></div>
</div>
```

```
[ Stylesheet ]

.foo-block {
  color: black;
  font-size: 16px;
  padding: 10px;
  width: 100px;

  // 1.Type Modifire
  &--type_wide { padding: 100px; }
  &--type_ { padding: 50px; }

  // 2. State Modifire
  &--state_active { background-color: red; }
  &--state_inactive { background-color: gray; }

  // 3. Individual Modifire
  &--radius_shallow { border-radius: 8px; }
  &--radius_deep { border-radius: 18px; }

  &__elm { color: white; }
}
```

私はModifierにも3種類のコンテクストを使い分けます。

#### 1. Type Modifire
エレメント（BlockもしくはElement）の基本デザインをベースとするが、「個」を尊重したデザインを定義したい場合に用いられるModifierです。

「名詞」で例えるなら一般名詞をベースに固有名詞を定義しているイメージです。  
「人」で例えるなら人をベースにアメリカ人や田中君を定義しているイメージです。

#### 2. State Modifire
状態を表現するために定義されるModifierです。

例えばプルダウンするパーツのデザインを例にとります。

- プルダウンされている状態を「active」な状態と定義する。
- プルダウンが選択できない状態は「disabled」な状態と定義する。
- プルダウンが一時的に非表示になった状態を「hide」な状態と定義する。

これに対応するクラスは以下です。

```
.pulldown--state_active
.pulldown--state_disabled
.pulldown--state_hide
```

これらはJavaScriptによるDOM操作の際、手がかりにするクラスとしても最適です。


#### 3. Individual Modifire
部分的なスタイルを付加定義するためのModifierです。

Coreコンテクストの `_utilities.scss` 内のスタイルと似た意思を感じますが、
コンテクストの違い（書く場所）によって異なった意図や見え方になるはずです。

```
[ Stylesheet ]

// サイズにフォーカスしたModifier
.foo--size_big {
  width: 100%;
  height: 800px;
}

.foo--size_small {
  width: 50%;
  height: 200px;
}

// widthにフォーカスしたModifier
.foo--width_big { width: 100%; }
.foo--width_small { width: 50%; }

// 角丸のみにフォーカスしたModifier
.foo--radius_shallow { border-radius: 18px; }
.foo--radius_deep { border-radius: 8px; }
```

### State Modifire（状態）の考え方
Blockの状態を管理する時、それがどこを起点に起こっていることなのかを考えることは重要です。

以下はBlockにState Modifireを用いた例です。

```
[ HTML ]

<div class="foo-block foo-block--state_active">
  <div class="foo-block__elm"></div>
</div>

<div class="foo-block foo-block--state_inactive">
  <div class="foo-block__elm"></div>
</div>
```

```
[ Stylesheet ]

.foo-block {
  backraund-color: black;

  &--state_active { background-color: red; }
  &--state_inactive { background-color: blue; }

  &__elm { color: white; }
}
```

ここでactive, inactiveという状態表現をElementでも行う必要があったとしましょう。

```
[ HTML ]

<div class="foo-block foo-block--state_active">
  <div class="foo-block__elm foo-block__elm--state_active"></div>
</div>

<div class="foo-block foo-block--state_inactive">
  <div class="foo-block__elm foo-block__elm--state_inactive"></div>
</div>
```

```
[ Stylesheet ]

.foo-block {
  backraund-color: black;

  &--state_active { background-color: red; }
  &--state_inactive { background-color: blue; }

  &__elm {
    color: white;

    &--state_active { color: green; }
    &--state_inactive { color: gray; }
  }
}
```

仮に、BlockとElementが個々に依存関係を持たず状態を変化させる存在であるのならばこれは正しい記述の一例と言えます。

ただし、Block自体がactiveか、もしくはinactiveかという事実に追従する形で連動してElementのスタイルが決まるのであれば、
以下の方がその意図を正しく表現してそうです。

```
[ HTML ]

<div class="foo-block foo-block--state_active">
  <div class="foo-block__elm"></div>
</div>

<div class="foo-block foo-block--state_inactive">
  <div class="foo-block__elm"></div>
</div>
```

```
[ Stylesheet ]

.foo-block {
  // alias
  $root: &;
  $active-state: $root + "--state_active";
  $inactive-state: $root + "--state_inactive";

  backraund-color: black;

  &--state_active { background-color: red; }
  &--state_inactive { background-color: blue; }

  &__elm {
    color: white;

    #{$ative-state} & { color: green; }
    #{$inactive-state} & { color: gray; }
  }
}
```

このように「状態」をデザインで表現する際は特に明確に意図を表現することに気を配ります。

### BEM記法を省略する

ここまで見てみると、BEM記法がいかに冗長な書き方かということが伝わると思いますが、
これの対策の一つとして、Modifierを短縮する方法などが挙げられます。

以下はModifierの記述を省略した例です。

```
[ HTML ]

<div class="foo-block --active --top"></div>

```

```
[ Stylesheet ]

.foo-block {
  &.--active { background-color: red; }
  &.--top { width: 100%; }
}
```

これはModifierに与えたスタイルの強制力がやや強くなりますが、HTMLに記載するクラスがグッとスッキリしました。

しかし、Modifier名よる名前空間の重要性を感じるシーンもあります。
例えば以下の例では、先ほどのような省略が不可能です。

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

Modifier名を工夫すれば良い話ですが、
そもそものModifireの値の衝突を恐るならば、キーの省略を行わない以下の折衷案も魅力的です。
```
<div class="foo-block --width_big --height_small"></div>
<div class="foo-block --width_small --height_small"></div>
```

以上、主にModifier中心でしたがBEMの解説でした。


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

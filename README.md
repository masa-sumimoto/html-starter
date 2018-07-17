# Overview
This is my html working template.



## Information

### About Environment
This environment includes tools below.
```
- Node.js
- Babel
- Webpack (v4)
- Scss
```

### About Liblaries
This environment has libraries below.
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



## Tips
上記までの設定で環境自体は準備することが可能です。
ここからは、私の中で形式化しているコーディング作法をシェアします。

本方式はBootstrapのコンポーネントを大幅に活用することを想定し、且つ、OOCSS・BEMを混合させたスタイルを用います。
また、全く方針が異なる他者がコーディングに介入することも想定しているため、かなり冗長なものになる可能性があります。
取捨選択の元、ご参照ください。


### SCSS
この環境は6つのパーソナルなcss(scss)の作業環境があります。
```
1.Libraries
2.Core
3.Layouts
4.Primitive Parts
5.Complex Parts
6.Pages
(7.User)
```
これら各コンテクストに属するcssは1から6に向けてロードされるため、このヒエラルキ構造をうまく活用することにより目的に即したデザインにおける定義・オーバーライドが効率よく行えます

#### 1.Libraries
Librariesに属するcssは主に外部のライブラリサービスを指します。このテンプレートにはこのコンテクストにはjQueryとBootstrap4がそれに当たります。
尚、これらのファイルは書き換えることを想定していません。

#### 2.Core
基本設定にまつわるファイルです。以下のような重要なファイルがCoreファイルに属します。

##### _variables.scss
グローバルに利用できる変数を保管します。

##### _utilities.scss
グローバルに利用できるユーティリティクラスを保管します。一般的にはスタイルを強くオーバーライドするために用いるものです。
そのため!importキーワードを用います。

#### 3.Layouts
WEBサイトを構成する最も上位のレイアウトブロックに関するスタイルを記します。
概ね、サイトヘッダーに_header.scss、サイトフッターに_footer.scss、サイトコンテンツ部分の最上位ブロックに_main.scssを用います。
サイドバーなど2カラムを想定したものであれば、_sub.scssなどとし、利用しても良いと思います。

#### 4.Primitive Parts

※※※※※ ↓以下、製作中↓ ※※※※※

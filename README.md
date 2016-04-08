![MaterialJS](http://www.cosmicmind.io/MK/Material.png)

# Welcome to MaterialJS Ground Zero

Express your creativity with MaterialJS, an animation and graphics framework for Google's Material Design and Apple's Flat UI in Javascript.

## Communication

- If you **need help**, use [Stack Overflow](http://stackoverflow.com/questions/tagged/cosmicmind). (Tag 'cosmicmind')
- If you'd like to **ask a general question**, use [Stack Overflow](http://stackoverflow.com/questions/tagged/cosmicmind).
- If you **found a bug**, _and can provide steps to reliably reproduce it_, open an issue.
- If you **have a feature request**, open an issue.
- If you **want to contribute**, submit a pull request.

## Changelog

MaterialJS is a growing project and will encounter changes throughout its development. It is recommended that the [Changelog](https://github.com/CosmicMind/MaterialJS/wiki/Changelog) be reviewed prior to updating versions.

## Installation

Using npm.

```bash
npm install @cosmicmind/materialjs
```

Using bower.

```bash
bower install materialjs
```

## Explore

<a name="materialcolor"></a>
#### MaterialColor

MaterialColor is a complete Material Design color library. It uses base color values that expand to a range of lighter and darker shades, with the addition of accents.

![MaterialMaterialColorPalette](http://www.cosmicmind.io/MK/MaterialMaterialColorPalette.png)

You can use CSS to access the colors. For example:

Setting the background color of an element:

```html
<div class="blue">
    <!-- Content -->
</div>
```

Setting the background color to a darker shade.

```html
<div class="blue-grey darken-4">
    <!-- Content -->
</div>
```

Setting the text color to a lighter shade.

```html
<div class="green-text lighten-3">
    <!-- Content -->
</div>
```

Set the border color.

```html
<div class="red-border">
    <!-- Content -->
</div>
```

<a name="materialicon"></a>
#### MaterialIcon

MaterialIcon is a library of Google and CosmicMind icons that are available for use within your web applications.

![MaterialMaterialIcon](http://www.cosmicmind.io/MK/MaterialMaterialIcon.png)

Access icons by setting CSS icon classes.

```html
<a href="#" class="cm-menu"></a>
<a href="#" class="cm-pen"></a>
```

For a complete list of available icons, visit [MaterialIcon](https://github.com/CosmicMind/MaterialJS/wiki/MaterialIcon).

<a name="grid"></a>
#### Grid

Grid is a flexible layout tool using rows and columns. A *row* extends horizontally to the size of its parent's width, while a *column* expands vertically to its parent's height.

![MaterialGrid](http://www.cosmicmind.io/MK/MaterialGrid.png)

```html
<row style="height:100px;" class="pad space">
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
</row>
<row style="height:100px;" class="pad space">
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
</row>
<row style="height:100px;" class="pad space">
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
    <column class="blue blue-text lighten-1 depth-1">1</column>
</row>
```

[Learn More About Grid](https://github.com/CosmicMind/MaterialJS/wiki/Grid).

# License

Copyright (C) 2015 - 2016, Daniel Dahan and CosmicMind, Inc. <http://cosmicmind.io>. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

*   Redistributions of source code must retain the above copyright notice, this     
    list of conditions and the following disclaimer.

*   Redistributions in binary form must reproduce the above copyright notice,
    this list of conditions and the following disclaimer in the documentation
    and/or other materials provided with the distribution.

*   Neither the name of MaterialJS nor the names of its
    contributors may be used to endorse or promote products derived from
    this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

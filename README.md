![MaterialJS](http://www.cosmicmind.io/MK/Material.png)

# Welcome to MaterialJS Ground Zero

An animation and graphics framework for Material Design in CSS & JavaScript.

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
npm install cosmicmind-materialjs
```

Using bower.

```bash
bower install cosmicmind-materialjs
```

## Quick Access  

* [Colors](#colors)
* [Icons](#icons)
* [Grid](#grid)
* [Depth](#depth)
* [Border Radius](#borderradius)
* [Shapes](#shapes)
* [Toolbar](#toolbar)

## Explore

<a id="colors"></a>
#### Colors

Material Color is a complete Material Design color library available within Material. To help with color choices, visit [MaterialColor.io](http://www.materialcolor.io).

![MaterialMaterialColorPalette](http://www.cosmicmind.io/MK/MaterialMaterialColorPalette.png)

##### JSON

To use the JSON library, require the cosmicmind-materialjs package:

```javascript
var materialjs = require('cosmicmind-materialjs');
var colors = materialjs.colors;

// Access the colors.
var rgb = colors.blue.darken4.rgb;
var hex = colors.blue.darken4.hex;
var code = colors.blue.darken4.code;

// Selectors and styles.
var element = colors.blue.darken4.selector.element;
var text = colors.blue.darken4.selector.text;
var border = colors.blue.darken4.selector.border;
```

##### CSS

To use the CSS library, add the material.css file:

```html
<link type="text/css" rel="stylesheet" media="all" href="cosmicmind-materialjs/material.css">
```

Set the background color:

```html
<div class="blue lighten-1">
    <!-- Content -->
</div>
```

Set the text color.

```html
<div class="red-text lighten-3-text">
    <!-- Content -->
</div>
```

Set the border color.

```html
<div class="red-border lighten-3-border">
    <!-- Content -->
</div>
```

[Learn More About Colors](https://github.com/CosmicMind/MaterialJS/wiki/Colors).

<a id="icons"></a>
#### Icons

Material comes with a library of icons that are available for use within your web applications. To help with icon choices, visit [MaterialIcon.io](http://www.materialicon.io).

![MaterialMaterialIcon](http://www.cosmicmind.io/MK/MaterialMaterialIcon.png)

Use icons with buttons.

```html
<button class="cm-menu" />
```

Use icons with anchors.

```html
<a href="#" class="cm-search" />
```

[Learn More About Icons](https://github.com/CosmicMind/MaterialJS/wiki/Icons).

<a id="grid"></a>
#### Grid

Grid is a flexible layout tool using rows and columns. A *row* extends horizontally to the size of its parent's width, while a *column* expands vertically to its parent's height.

![MaterialGrid](http://www.cosmicmind.io/MK/MaterialGrid.png)

Using tags.

```html
<row>
    <column><!-- Content --></column>
    <column><!-- Content --></column>
    <column><!-- Content --></column>
</row>
```

Use classes.

```html
<div class="row">
    <div class="column"><!-- Content --></div>
    <div class="column"><!-- Content --></div>
    <div class="column"><!-- Content --></div>
</div>
```

Add spacing.

```html
<row class="space">
    <column><!-- Content --></column>
    <column><!-- Content --></column>
    <column><!-- Content --></column>
</row>
```

Add padding.

```html
<row class="pad">
    <column><!-- Content --></column>
    <column><!-- Content --></column>
    <column><!-- Content --></column>
</row>
```

[Learn More About Grid](https://github.com/CosmicMind/MaterialJS/wiki/Grid).

<a id="depth"></a>
#### Depth

Use the CSS depth classes to visualize hierarchy on the Z index.

![MaterialDepth](http://www.cosmicmind.io/MK/MaterialDepth.png)

```html
<div class="depth-1"><!-- Content --></div>
<div class="depth-2"><!-- Content --></div>
<div class="depth-3"><!-- Content --></div>
<div class="depth-4"><!-- Content --></div>
<div class="depth-5"><!-- Content --></div>
```

[Learn More About Depth](https://github.com/CosmicMind/MaterialJS/wiki/Depth).

<a id="borderradius"></a>
#### Border Radius

Use the border radius CSS classes to apply rounded corners on elements.

![MaterialBorderRadius](http://www.cosmicmind.io/MK/MaterialBorderRadius.png)

```html
<div class="border-radius-1"><!-- Content --></div>
<div class="border-radius-2"><!-- Content --></div>
<div class="border-radius-3"><!-- Content --></div>
<div class="border-radius-4"><!-- Content --></div>
<div class="border-radius-5"><!-- Content --></div>
```

[Learn More About Border Radius](https://github.com/CosmicMind/MaterialJS/wiki/Border Radius).

<a id="shapes"></a>
#### Shapes

Shape helper classes are available in CSS to simplify making circles and squares.

![MaterialShape](http://www.cosmicmind.io/MK/MaterialShape.png)

```html
<row class="space pad">
      <column class="circle red">
        <div class="content"><!-- Content --></div>
      </column>
      <column class="square pink">
        <div class="content"><!-- Content --></div>
      </column>
      <column class="circle purple">
        <div class="content"><!-- Content --></div>
      </column>
      <!-- ... -->
      <column class="square blue-grey">
        <div class="content"><!-- Content --></div>
      </column>
</row>
```

[Learn More About Shapes](https://github.com/CosmicMind/MaterialJS/wiki/Shapes).

<a id="toolbar"></a>
#### Toolbar

A Toolbar is an effective method to organize your applications flow.

![MaterialToolbar](http://www.cosmicmind.io/MK/MaterialToolbar.png)

```html
<nav class="toolbar fixed cyan depth-5">
    <a href="#" class="cm-menu" />
    <header class="title center white-text">Material</header>
    <a href="#" class="cm-search" />
</nav>
```

[Learn More About Toolbar](https://github.com/CosmicMind/MaterialJS/wiki/Toolbar).

## License

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

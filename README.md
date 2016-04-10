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
npm install materialjs
```

Using bower.

```bash
bower install materialjs
```

## Explore

<a name="materialcolor"></a>
#### MaterialColor

MaterialColor is a complete Material Design color library available in CSS and Javascript. It uses base color values that expand to a range of lighter and darker shades, with the addition of accents.

![MaterialMaterialColorPalette](http://www.cosmicmind.io/MK/MaterialMaterialColorPalette.png)

##### JSON

To use the JSON library, require the materialjs package:

```javascript
var materialjs = require('materialjs');
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
<link type="text/css" rel="stylesheet" media="all" href="materialjs/material.css">
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

[Learn More About MaterialColor](https://github.com/CosmicMind/MaterialJS/wiki/MaterialColor).

<a name="materialicon"></a>
#### MaterialIcon

MaterialIcon is a library of Google and CosmicMind icons that are available for use within your web applications.

![MaterialMaterialIcon](http://www.cosmicmind.io/MK/MaterialMaterialIcon.png)

Use icons with buttons.

```html
<button class="cm-menu" />
```

Use icons with anchors.

```html
<a href="#" class="cm-search" />
```

[Learn More About MaterialIcon](https://github.com/CosmicMind/MaterialJS/wiki/MaterialIcon).

<a name="grid"></a>
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
<row class="row space">
    <column><!-- Content --></column>
    <column><!-- Content --></column>
    <column><!-- Content --></column>
</row>
```

Add padding.

```html
<row class="row pad">
    <column><!-- Content --></column>
    <column><!-- Content --></column>
    <column><!-- Content --></column>
</row>
```

[Learn More About Grid](https://github.com/CosmicMind/MaterialJS/wiki/Grid).

<a name="depth"></a>
#### Depth

Use the CSS depth classes to visualize hierarchy on the Z index.

![MaterialDepth](http://www.cosmicmind.io/MK/MaterialDepth.png)

```html
<div class="depth-0"><!-- Content --></div>
<div class="depth-1"><!-- Content --></div>
<div class="depth-2"><!-- Content --></div>
<div class="depth-3"><!-- Content --></div>
<div class="depth-4"><!-- Content --></div>
<div class="depth-5"><!-- Content --></div>
```

[Learn More About Depth](https://github.com/CosmicMind/MaterialJS/wiki/Depth).

<a name="borderradius"></a>
#### Border Radius

Use the border radius CSS classes to apply rounded corners on elements.

![MaterialBorderRadius](http://www.cosmicmind.io/MK/MaterialBorderRadius.png)

```html
<div class="border-radius-0"><!-- Content --></div>
<div class="border-radius-1"><!-- Content --></div>
<div class="border-radius-2"><!-- Content --></div>
<div class="border-radius-3"><!-- Content --></div>
<div class="border-radius-4"><!-- Content --></div>
<div class="border-radius-5"><!-- Content --></div>
```

[Learn More About Border Radius](https://github.com/CosmicMind/MaterialJS/wiki/Border Radius).

<a name="toolbar"></a>
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

<h1 align="center">tw variants</h1>

<p align="center">
  Tailwind variant grouping without increasing CSS size
</p>

## Introduction

Tailwind doesn't support variant-grouping out of the box because it leads to tons of duplicate CSS being generated as compared to using individual classes (as we can see in this [tweet](https://twitter.com/adamwathan/status/1461519824828473359))

This is because with the grouped syntax like `focus:(font-bold underline)` each group leads to a new CSS selector being generated, and the CSS generated for `focus:font-bold` and `focus:underline` can't be reused.

`tw-variants` overcomes this by expanding this grouped syntax at build time into individual classes. So now when tailwind scans the files, it sees `focus:(font-bold underline)` as `focus:font-bold focus:underline` since it has been expanded before tailwind sees it.

This way you can use grouped-syntax while not having to worry about the css size.

## Installation

```bash
npm install tw-variants
```

Add the babel plugin to your babel config (`.babelrc`) :-

```json
{
  "plugins": ["tw-variants/babel"]
}
```

Add `.tw-variants` to your `.gitignore`. This is where `tw-variants` stores the expanded CSS for tailwind to scan

```
.tw-variants
```

And add the same to the `content` section of your `tailwind.config.js`:-

```js
module.exports = {
  content: [
    // ...
    './.tw-variants',
  ],
  // ...
};
```

## Usage

Just import `tw` from `tw-variants` and use it like a tagged template literal :-

```js
import { tw } from 'tw-variants';

const button = tw`font-semibold border rounded focus:(font-bold underline)`;
```

You can't use `${variable}` inside `tw`, so instead of doing:-

```js
import { tw } from 'tw-variants';

const button = tw`font-semibold border rounded focus:(font-bold underline)`;
const redButton = tw`${button} bg-red-500`;
```

Instead do:-

```js
import { tw } from 'tw-variants';

const button = tw`font-semibold border rounded focus:(font-bold underline)`;
const redButton = `${button} ${tw`bg-red-500`}`;
```

The grouping-syntax `tw-variants` uses is the same as the one used by `twind`. You can view the supported syntax [here](https://twind.dev/handbook/grouping-syntax.html)

## Tailwind CSS IntelliSense

If you're using the "Tailwind CSS IntelliSense" Visual Studio Code extension, you can enable autocompletion inside `tw` by adding the following to your `settings.json`:

```json
{
  "tailwindCSS.experimental.classRegex": ["tw`([^`]*)"]
}
```

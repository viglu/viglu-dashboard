Viglu-Dashboard is a free and open source Bootstrap 5 Admin Dashboard featuring over 100 components, 11 example pages and 3 customized plugins. The dashboard **does not require jQuery** as a dependency meaning that every library and script's are jQuery free.

## Bootstrap 5 and Vanilla JavaScript

Viglu-Dashboard is built using the latest version of Bootstrap 5 and because jQuery is no longer required as a dependency], Viglu-Dashboard has been built using only Vanilla JS.

## 100+ Components

Because it is created using the latest version of Bootstrap 5, every component and element is based on the latest Bootstrap 5 Sass variables and HTML markup. 
Check out the documentation of the components [here]().

## 11 Example pages

We created no less than 11 advanced example pages such as the overview page, transactions, user settings, sign in and sign up and many more.

## Full documentation

Every component, plugin and getting started is thoroughly documented on our [online documentation]().

## Workflow

This product is built using the following widely used technologies:

- Most popular CSS Framework Bootstrap
- Productive workflow tool Gulp
- Awesome CSS preprocessor Sass



## Quick start

1. Download from [Themesberg](https://github.com/viglu/viglu-dashboard) or clone this repository
2. Download the project's zip
3. Make sure you have Node locally installed.
4. Download Gulp Command Line Interface to be able to use gulp in your Terminal.

```
npm install gulp-cli -g
```

5. After installing Gulp, run npm install in the main `viglu/` folder to download all the project dependencies. You'll find them in the `node_modules/` folder.

```
npm install
```

6. Run gulp in the `viglu/` folder to serve the project files using BrowserSync. Running gulp will compile the theme and open `/index.html` in your main browser.

```
gulp
```

While the gulp command is running, files in the `assets/scss/`, `assets/js/` and `components/` folders will be monitored for changes. Files from the `assets/scss/` folder will generate injected CSS.

Hit `CTRL+C` to terminate the gulp command. This will stop the local server from running.

## Theme without Sass, Gulp or npm

If you'd like to get a version of our theme without Sass, Gulp or npm, we've got you covered. Run the following command:

```
gulp build:dev
```

This will generate a folder `html&css` which will have unminified CSS, HTML and JavaScript.

## Minified version

If you'd like to compile the code and get a minified version of the HTML and CSS just run the following Gulp command:

```
gulp build:dist
```

This will generate a folder `dist` which will have minified CSS, HTML and JavaScript.

## Documentation
The documentation for Viglu-Dashboard is hosted on our [website]().

## File Structure
Within the download you'll find the following directories and files:

```
viglu Dashboard
.
├── README.md
├── gulpfile.js
├── package-lock.json
├── package.json
└── src
    ├── assets
    │   ├── img
    │   └── js
    ├── index.html
    ├── pages
    │   ├── components
    │   ├── dashboard
    │   ├── examples
    │   ├── settings.html
    │   ├── tables
    │   └── transactions.html
    ├── partials
    │   ├── _analytics.html
    │   ├── _footer.html
    │   ├── _head.html
    │   ├── _navigation.html
    │   ├── _pages-preview.html
    │   ├── _preloader.html
    │   ├── _scripts.html
    │   └── dashboard
    └── scss
        ├── viglu
        └── viglu.scss
```

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/chrome.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/firefox.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/edge.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/safari.png" width="64" height="64"> <img src="https://s3.amazonaws.com/creativetim_bucket/github/browser/opera.png" width="64" height="64">

## Resources
- Demo: <>
- Download Page: <>
- Documentation: <>
- License Agreement: <https://github.com/viglu/viglu-dashboard/blob/master/LICENSE.md>
- Issues: [Github Issues Page](https://github.com/viglu/viglu-dashboard/issues)

## Reporting Issues

We use GitHub Issues as the official bug tracker for viglu Dashboard. Here are some advices for our users that want to report an issue:

1. Make sure that you are using the latest version of viglu Dashboard. Check the CHANGELOG from your dashboard on our [website](https://github.com/viglu/viglu-dashboard/blob/master/changelog/).
2. Providing us reproducible steps for the issue will shorten the time it takes for it to be fixed.
3. Some issues may be browser specific, so specifying in what browser you encountered the issue might help.

## Technical Support or Questions

If you have questions or need help integrating the product please https://github.com/viglu/viglu-dashboard/issues.

## Licensing

Copyright (c) 2025 Luc Vigato / [license]https://github.com/viglu/viglu-dashboard/blob/master/LICENSE.md#mit (MIT License)
Copyright (c) 2021 Themesberg (Crafty Dwarf LLC) / [license](https://themesberg.com/licensing#mit) (MIT License)
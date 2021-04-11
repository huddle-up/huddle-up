# Date Locales

This folder contains all available locales for date formatting. Each available locale is exported from its own file.

## WHY?

Doing this gives us two advantages:

1. Reducing the main bundle size in the future since we may load the locales asynchronously, thus making them tree-shakable.
2. If there's ever a locale supported by HuddleUp, but not by one of the dependent packages (date-fns, or Material UI) we can still supply through here.

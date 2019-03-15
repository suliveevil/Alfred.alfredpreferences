# Flask Docs Workflow for Alfred

Search the [Flask documentation](http://flask.pocoo.org/docs/1.0/) using [Alfred](https://www.alfredapp.com/). 

![demo](demo.gif)

## Installation

1. [Download the latest version](https://github.com/techouse/alfred-flask-docs/releases/latest)
2. Install the workflow by double-clicking the `.alfredworkflow` file
3. You can add the workflow to a category, then click "Import" to finish importing. You'll now see the workflow listed in the left sidebar of your Workflows preferences pane.

## Usage

Just type `flask` followed by your search query.

```
flask jsonify
```

Either press `⌘Y` to Quick Look the result, or press `<enter>` to open it in your web browser.

## Supported Branches

Currently the app indexes branch __1.0__ only.

### Note

Built using [Alfred-Workflow](https://github.com/deanishe/alfred-workflow).
The lightning fast search is powered by [Algolia](https://www.algolia.com) which was generous enough to hand me a big 
enough plan for all these Alfred Workflows.
A big thank you to [@redox](https://github.com/redox) from [@algolia](https://github.com/algolia) :innocent: :beers: :heart:

The index for Algolia was compiled from the Flask Sphinx HTML documentation using a [simple Python script](https://github.com/techouse/flask-docs-parser) I wrote.
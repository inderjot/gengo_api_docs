# Gengo API documentation

This project is forked from the GitHub API resource built with [nanoc][nanoc].

All submissions are welcome. To submit a change, fork this repo, commit your changes, and send us a [pull request](http://help.github.com/send-pull-requests/).

## Setup

Ruby 1.9 is required to build the site. Start by installing [bundler](http://gembundler.com/):

    gem install bundler

Get the nanoc gem, plus kramdown for markdown parsing:

    bundle install

You can see the available commands with nanoc:

    nanoc -h

Nanoc has [some nice documentation](http://nanoc.stoneship.org/docs/3-getting-started/) to get you started.  Though if you're mainly concerned with editing or adding content, you won't need to know much about nanoc.

[nanoc]: http://nanoc.stoneship.org/

#### OSX Mountain Lion issues?

If you're on OSX and get an error about missing header files...

    mkmf.rb can't find header files for ruby at /System/Library/Frameworks/Ruby.framework/Versions/1.8/usr/lib/ruby/ruby.h

then after installing Xcode go to Preferences > Downloads and install the Command Line Tools. Then run the above `bundle install` again.

### JSON Responses

We specify the JSON responses in ruby so that we don't have to write
them by hand all over the docs.  You can render the JSON for a resource
like this:

    <%= json :issue %>

This looks up `GitHub::Resources::ISSUE` in `lib/resources.rb`.

Some actions return arrays.  You can modify the JSON by passing a block:

    <%= json(:issue) { |hash| [hash] } %>

### Terminal blocks

You can specify terminal blocks with `pre.terminal` elements.  It'd be
nice if Markdown could do this more cleanly...

    <pre class="terminal">
    $ curl foobar
    ....
    </pre>

This isn't a `curl` tutorial though, I'm not sure every API call needs
to show how to access it with `curl`.

## Development

Nanoc compiles the site into static files living in `./output`.  It's
smart enough not to try to compile unchanged files:

    $ nanoc compile
    Loading site data...
    Compiling site...
       identical  [0.00s]  output/css/960.css
       identical  [0.00s]  output/css/pygments.css
       identical  [0.00s]  output/css/reset.css
       identical  [0.00s]  output/css/styles.css
       identical  [0.00s]  output/css/uv_active4d.css
          update  [0.28s]  output/index.html
          update  [1.31s]  output/v3/gists/comments/index.html
          update  [1.92s]  output/v3/gists/index.html
          update  [0.25s]  output/v3/issues/comments/index.html
          update  [0.99s]  output/v3/issues/labels/index.html
          update  [0.49s]  output/v3/issues/milestones/index.html
          update  [0.50s]  output/v3/issues/index.html
          update  [0.05s]  output/v3/index.html

    Site compiled in 5.81s.

You can setup whatever you want to view the files.  If you have the adsf
gem, however (I hope so, it was in the Gemfile), you can start Webrick:

    $ nanoc view
    $ open http://localhost:3000

Compilation times got you down?  Use `autocompile`!

    $ nanoc autocompile

This starts a web server too, so there's no need to run `nanoc view`.
One thing: remember to add trailing slashes to all nanoc links!

## Deploy

    $ rake publish

## Gengo API Documentation Syntax

Follow these basic syntax rules when editing API documentation:

 * Parameter names should be in **bold**.
 * Parameter values should be display as `code`.
 * Always use a lowercase *v* when referencing the version - *v2*.

## Gengo API Guidelines

Review the [Gengo API Guidelines](http://github.com/myGengo/tech-docs-internal/) for information on naming, versioning, and all the great rules that help make an API consistent and easy to use.

## TODO

* Complete Gengo API Documentation Syntax section
* Integrate through a simple hurl.it app for live API calls.
* Maybe add a nice TOC at the top of each page.
* Write a task for verifying JSON Resource examples against the actual
  API.

## Credits

As noted on the top, this project is based off of (Github's own documentation repo)[https://github.com/github/developer.github.com] and modified further by Lloyd (lloyd.chan@gengo.com). If you have questions about how to work with this project or have any issues, please direct them to Lloyd.
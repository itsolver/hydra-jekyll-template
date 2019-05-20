# IT Solver Marketing Site

A marketing website for [IT Solver](https://www.itsolver.net), a managed service provider for people and business.

This is a labour of ❤️ for serverless and the latest web technologies, built by a coding novice, Angus McLauchlan, whose day job is running a solo, desktop support business.

Based on CloudCannon's [Hydra Jekyll Template](https://github.com/CloudCannon/hydra-jekyll-template) and inspired by Made Mistakes [How I'm Using Jekyll in 2017](https://mademistakes.com/articles/using-jekyll-2017/).

Hosted at [Firebase Hosting](https://firebase.google.com/products/hosting/) for the secure connection, Fast content delivery, Rapid deployment, One-click rollbacks, and the free (Spark) plan for starters. Note the pay as you go [Blaze plan](https://firebase.google.com/pricing) or fixed rate Flame Plan is required for Stripe functions to work.

[Gulp](https://gulpjs.com/) for development workflow.

[Stripe](https://github.com/itsolver/stripe-payments-demo) for payments, deployed via [Firebase Functions](https://firebase.google.com/products/functions/) in TypeScript.

[Travis CI](https://travis-ci.com/) for auto deployments of successful builds.

Source code edited in [Visual Studio Code](https://code.visualstudio.com/).

Build status: [![Build Status](https://travis-ci.com/itsolver/msp-marketing-site.svg?branch=master)](https://travis-ci.com/itsolver/msp-marketing-site)

## Lighthouse reports

[Lighthouse](https://developers.google.com/web/tools/lighthouse/) to audit performance, accessibility and user experience.

### Mobile

[![mobile lighthouse report screenshot](https://www.itsolver.net/site-audit/www.itsolver.net/mobile-lighthouse-report-screenshot.png)](https://www.itsolver.net/site-audit/www.itsolver.net/www.itsolver.net_2018-09-12_11-27-30-mobile)

### Desktop

[![desktop lighthouse report screenshot](https://www.itsolver.net/site-audit/www.itsolver.net/desktop-lighthouse-report-screenshot.png)](https://www.itsolver.net/site-audit/www.itsolver.net/www.itsolver.net_2018-09-12_11-25-43-desktop)

## My workflow

- local dev: Visual Studio Code with ``gulp`` running on integrated terminal for local testing of static content.
- version control: push changes I like to this github repository
- automation / continuous integration: pushing code to this github repo triggers Travis build. If build successful, publishes to Firebase.
- to do: create a testing branch and domain (for testing Firebase Functions)

## Configure

1. Delete .firebaserc
2. Remove redirects in firebase.json
3. In .travis.yml, replace with your own API keys for Firebase, Stripe and (optional) Slack.
4. Add your site and author details in `_config.yml`.
5. Add your Google Analytics and Disqus keys to `_config.yml`.
6. Replace pages and posts with your own.

## Preparation on macOS

Hydra was built with [Jekyll](https://jekyllrb.com/) version 3.3.1, but should support newer versions as well.

Install brew

~~~bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
~~~

Using bash install nvm. 
*Note: Homebrew installation is not supported. If you have issues with homebrew-installed nvm, please ``brew uninstall`` it, and install it using the instructions below.*

~~~bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
~~~

Using node version manager install and use node version 9.5:

~~~bash
nvm install 9.5
nvm use 9.5
~~~

## Install Jekyll on macOS
Manage multiple Ruby environments with rbenv. Source: [jekyllrb.com](https://jekyllrb.com/docs/installation/macos/#rbenv)
People often use [rbenv](https://github.com/rbenv/rbenv) to manage multiple Ruby versions. This is very useful when you need to be able to run a given Ruby version on a project.

~~~bash
# Install rbenv and ruby-build
brew install rbenv

# Setup rbenv integration to your shell
rbenv init
~~~

Open a new Terminal tab and check rbenv is installed:

~~~bash
# Check your install
curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
~~~

Restart your terminal for changes to take effect. Now you can install the Ruby version of our choice, let’s go with current latest stable Ruby. If you're interested, head over to [rbenv command references])(https://github.com/rbenv/rbenv#command-reference) to learn how to use different versions of Ruby in your projects.

~~~bash
rbenv install 2.4.1
rbenv local 2.4.1
~~~

Install Jekyll:

~~~bash
gem install --user-install bundler jekyll
~~~

Install dependencies:

~~~bash
cd functions && npm install && cd ..
bundle install
npm install
npm install -g gulp-cli
~~~

Build functions:

~~~bash
cd functions && npm run build  && cd ..
~~~

Initiliaze your own Firebase project from the root of your directory

~~~bash
npm install -g firebase-tools
firebase login
firebase init # enable Hosting and Functions
~~~

Run local server:

~~~bash
gulp
~~~

At this point I use [Travis CI](https://docs.travis-ci.com/user/tutorial/#to-get-started-with-travis-ci) for deploying my site.

If you're not using Travis, deploy from local environment and submit sitemaps to search engines:

~~~bash
- firebase deploy
- gulp submit
~~~

## Edits

Edit with your favourite text editor. There were editable classes in the original template, for live editing at [CloudCannon](https://app.cloudcannon.com/), but I am doing all editing via source code, so I removed them. CloudCanon is ideal for giving easy access to editors.

### Posts

- Add, update or remove a post in the *Posts- collection.
- The **Staff Author*- field links to members in the **Staff*- collection.
- Documentation pages are organised in the navigation by category, with URLs based on the path inside the `_docs` folder.
- Change the defaults when new posts are created in `_posts/_defaults.md`.

### Staff

- Reused around the site to save multiple editing locations.
- Add `excluded_in_search: true` to any documentation page's front matter to exclude that page in the search results.

### Navigation

- Exposed as a data file to give clients better access.
- Set in src/_data/navigation/main.yml

### Footer

- Exposed as a data file to give clients better access.
- Set in src/_data/navigation/footer.yml

### Jekyll Resources

- Jekyll marketing site for a managed tech support business, IT Solver, forked from [CloudCannon/hydra-jekyll-template](https://github.com/CloudCannon/hydra-jekyll-template).
- Find more templates and themes at [Jekyll Tips](https://jekyll.tips/templates/).
- Learn Jekyll with step-by-step tutorials and videos at [Jekyll Tips](https://jekyll.tips/).
- Learn how to [deliver Jekyll build to Firebase using TravisCI](https://www.wrapcode.com/jekyll-deploy-firebase-travis-ci/)

# github-pages-skeleton
A barebones skeleton app for getting a github pages site up and running.

## Getting Started

GitHub has a feature called GitHub Pages which allows you to host a static website right from your hosted git repository. To launch a project site, all we need to do is create a `gh-pages` branch with an `index.html` file at the root. 

As you're gearing up to launch a static site, keep in mind that the name of your repository will be part of the url, so choose a repository name that makes sense. GitHub provides two options: user sites and project sites. 

### User Site

Each user can have one user site. To create a user site, name your repository `username.github.io`, where `username` is your GitHub username. If your GitHub username is `coder`, then you should name your repository `coder.github.io` to create your user site.

User pages are generated from the `master` branch. This repo is a skeleton for creating Project pages, which require using a `gh-pages` branch. Consequently, this repo will not be helpful to you for creating User Pages. If you want user pages, you can check out the docs here: https://pages.github.com/

### Project Site

Each user can have an unlimited number of project sites. A project site will be hosted at `http://username.github.io/repository`, so if your GitHub username is `coder` and you name your repository `blog`, your site will be hosted at `http://coder.github.io/blog`.

### Setting Up Your Repository

1. Navigate to https://github.com/josh-egan/github-pages-skeleton.
1. Fork the project by clicking the `Fork` button.
1. You should now see your forked repository.
1. Click on the `Settings` tab.
1. Change the repository name to whatever you want it to be. Keep in mind the notes from above on naming your repository.

With your repository set up, clone it to your workstation.

Once cloned, you're almost there. Simply run these commands from the command line:

1. npm install
1. npm run deploy

### Check it Out!

Github pages are hosted at `http://username.github.io/repository`. For example, this repo is hosted at https://josh-egan.github.io/github-pages-skeleton/. Replace your GitHub username and repository name in the url, and check out your site!

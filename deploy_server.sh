#! /bin/bash

git push heroku-server `git subtree split --prefix server main`:main --force
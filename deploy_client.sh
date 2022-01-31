#! /bin/bash

git push heroku-client `git subtree split --prefix client main`:main --force
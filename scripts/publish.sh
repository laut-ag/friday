#! /bin/env sh

RED='\033[1;31m'
GREEN='\033[1;32m'
NC='\033[0m'

set -Eeuo pipefail

echo -e "${GREEN}Checking git branch${NC}"
GIT_BRANCH=$(git branch --show-current)

if [ $GIT_BRANCH != master ]; then
    echo -e "${RED}You are on $GIT_BRANCH. Please only publish from master${NC}"
    exit 127
fi

echo -e "${GREEN}Installing dependencies${NC}"
npm ci

echo -e "${GREEN}Running tests${NC}"
npm test

echo -e "${GREEN}Running build steps${NC}"
npm run build

echo -e "${GREEN}Making types${NC}"
npm run make:types

echo -e "${GREEN}What level bump is this?${NC}"
read -p "[patch,minor,major]: " LEVEL

VERSION=$(npm version --no-git-tag-version $LEVEL)

echo -e "${GREEN}commiting $VERSION, (package.json && package-lock.json), types, and tagging${NC}"
git add package-lock.json package.json types/
git commit -m"$VERSION"
git tag -a $VERSION -m"version $VERSION"

echo -e "${GREEN}Making docs${NC}"
npm run make:docs

echo -e "${GREEN}adding docs to git${NC}"
git add docs/
git commit --amend

echo -e "${GREEN}Logging into NPM${NC}"
npm login

echo -e "${GREEN}Publishing${NC}"
npm publish

echo -e "${GREEN}Logging out of NPM${NC}"
npm logout

echo -e "${GREEN}pushing to gogs${NC}"
git push --follow-tags origin

echo -e "${GREEN}pushing to github${NC}"
git push --follow-tags github

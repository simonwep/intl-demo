#!/bin/bash
BRANCH="gh-pages"
echo "[DGP] Deploying to github-pages (branch $BRANCH)..."

# Check if there are current changes
if [[ "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "[DPG] Please undo your current changes."
  exit
fi

# Building dist files
echo "[DGP] Building dist files..."
npm run build

# Stage files
echo "[DGP] Staging files..."
git stash --include-untracked

# Delete existing branch
if git show-ref --quiet refs/heads/"$BRANCH"; then
  echo "[DGP] $BRANCH found, deleting it..."
  git branch -d "$BRANCH"
fi

# Create new orphan branch
echo "[DGP] Creating new orphan branch..."
git checkout --orphan "$BRANCH"

# Unstage everything
git reset

# Stage dist files and gitignore
git add .gitignore
git clean -d -f

# Get stash, move dist file up and stage everything
git stash pop
mv ./dist/* .
git add .

# Commit and push
git commit -m "Update"
git push --set-upstream origin "$BRANCH" -f

# Switch back to master
git checkout master -f

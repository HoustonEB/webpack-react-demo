set -e
echo ------------push gh-pages start----------------------
cd ./dist/prod/
git init
git config user.name "${U_NAME}"
git config user.email "${U_EMAIL}"
git add .
git commit -m "deploy"
git push --force --quiet "https://${GH_TOKEN}@${GH_REF} master:gh-pages"
echo ------push gh-pages success--------
cd -
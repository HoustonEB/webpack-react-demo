cd ./dist/prod/
git init
git config user.name HoustonEB
git config user.email 860852345@qq.com
git add .
git commit -m 'deploy'
git push --force https://github.com/HoustonEB/webpack-react-demo.git master:gh-pages
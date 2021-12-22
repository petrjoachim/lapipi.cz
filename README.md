
# Deploy
```
vercel --prod app
git subtree push --prefix cms/ heroku master
``` 

# Fetch configurations
```
cd cms
heroku config -s > .production.env
ENV_PATH=.production.env npm start
```
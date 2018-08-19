# Backend API with MongoDB, Express JS, Node JS Stack


## Requirements
* Node JS >= 8.11.3
* Express JS >= 4.16.3
* MongoDB >= 3.6


## How to install
```
git clone https://github.com/ahmedsubkhi/express-api.git
cd express-api/
npm install
npm start
```

## Database setup
```
mongoimport --db express_api --collection auto_increments --file infrastructure/database/auto_increments.json
mongoimport --db express_api --collection posts --file infrastructure/database/posts.json
mongoimport --db express_api --collection users --file infrastructure/database/users.json
```
e.g: 
Use: email = ahmed.subkhi@gmail.com, and password = `ahmed`.


## How to use the services

### Authentication
```
curl -X POST \
  http://localhost:3000/auth/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'email=ahmed.subkhi%40gmail.com&password=ahmed'
 ```
 You will get token after this above request. You can use it to authenticate with other service below.

### Users data
```
curl -X GET \
  http://localhost:3000/users/ \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'x-access-token: YOUR_TOKEN_YOU_GET'
```

### Blog post data
```
curl -X GET \
  http://localhost:3000/posts/ \
  -H 'Content-Type: application/x-www-form-urlencoded' \
```

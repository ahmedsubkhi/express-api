# Backend API with MongoDB, Express JS, Node JS Stack


## Requirements
* Node JS >= 8.11.3
* Express JS >= 4.16.3
* MongoDB >= 3.6


## Database setup
```
mongo
> use express_app
> db.users.insertOne({ username: "ahmedsubkhi", email: "ahmed.subkhi@gmail.com", password: "$2a$10$3ZszmlVJ9BpeLI.0n9wFzOPh/7AmCajVcBvJm4BUGfThKU8K2s3di", created_at: new Date, updated_at: new Date })
```
e.g: password = ahmed


## How to install
```
git clone https://github.com/ahmedsubkhi/express-api.git
cd express-api/
npm install
npm start
```


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

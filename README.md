
# Friends Management

This API server was developed with JavaScript, Node.JS and Express.JS and other modules.

The server developed on Ubuntu 16.04 64bit, MySQL installed and used as database.

For first time, install modules with command:

```
make install
```

To test all user stories, run command:

```
make test
```

The test command will provide JSON request and response for all six user stories.

## Route and HTTP Verb

Different REST request should be used for API, as the user stories always send
request with JSON body, I have to use POST instead of GET sometime.


| Route                     | HTTP Verb   |
| --------------------------|:-----------:|
| /api/friendconnection     | POST        | 
| /api/friendlist	        | POST / GET  |
| /api/commonlist 	        | POST / GET  |
| /api/subscribe	        | PUT         |
| /api/block	            | PUT         |
| /api/updatelist	        | POST / GET  |


## Local machine testing settings

Install MySQL on Ubuntu 16.04 LTS 64bit.

Set root password root during installation

```
curl -OL https://dev.mysql.com/get/mysql-apt-config_0.8.3-1_all.deb
sudo dpkg -i mysql-apt-config*
sudo apt-get install mysql-server
```
Check status:
```
systemctl status mysql
```
Check version:

```
mysqladmin -u root -p version
```

Login MySQL:
```
mysql -u root -p
```

Create user sp, password sp

```
GRANT ALL PRIVILEGES ON *.* TO 'sp'@'localhost' IDENTIFIED BY 'sp';
```

## Local machine testing sample

In directory express_friend, run test command:
```
make test
```

Notice: I add multi friends connection for later testing.

```
express_friends > make test
npm test

> express-friends@0.0.0 test /home/huangchao/spgroup/express_friends
> mocha --exit



  API endpoint /api
{
    "friends": [
        "andy@example.com",
        "john@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection (100ms)
{
    "friends": [
        "andy@example.com",
        "sophia@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection
{
    "friends": [
        "andy@example.com",
        "emma@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection
{
    "friends": [
        "andy@example.com",
        "olivia@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection
{
    "friends": [
        "andy@example.com",
        "ava@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection
{
    "friends": [
        "andy@example.com",
        "mia@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection
{
    "friends": [
        "andy@example.com",
        "isabella@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection
{
    "friends": [
        "john@example.com",
        "ava@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection
{
    "friends": [
        "john@example.com",
        "mia@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection
{
    "friends": [
        "john@example.com",
        "isabella@example.com"
    ]
}
{
    "success": true
}
    ✓ should creat friend connection
{
    "email": "andy@example.com"
}
{
    "success": true,
    "friends": [
        "john@example.com",
        "sophia@example.com",
        "emma@example.com",
        "olivia@example.com",
        "ava@example.com",
        "mia@example.com",
        "isabella@example.com"
    ],
    "count": 7
}
    ✓ should list friends
{
    "friends": [
        "andy@example.com",
        "john@example.com"
    ]
}
{
    "success": true,
    "friends": [
        "ava@example.com",
        "mia@example.com",
        "isabella@example.com"
    ],
    "count": 3
}
    ✓ should list common friends
{
    "requestor": "lisa@example.com",
    "target": "john@example.com"
}
{
    "success": true
}
    ✓ should set subscribe
{
    "requestor": "andy@example.com",
    "target": "john@example.com"
}
{
    "success": true
}
    ✓ should set block
{
    "sender": "andy@example.com",
    "text": "Hello World! kate@example.com"
}
{
    "success": true,
    "recipients": [
        "sophia@example.com",
        "emma@example.com",
        "olivia@example.com",
        "ava@example.com",
        "mia@example.com",
        "isabella@example.com"
    ],
    "count": 6
}
    ✓ should list update recipients:



  15 passing (242ms)
```


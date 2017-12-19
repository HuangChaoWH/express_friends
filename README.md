
# Friends Management

This API server was developed with JavaScript, Node.JS and Express.JS and other modules.

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

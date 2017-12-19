
# Friends Management

For first time, install modules with command:

```
make install
```


To test all user stories, run command:

```
make test
```


## Route and HTTP Ver
Different REST request should be used for API, as the user stories always send
request with JSON body, I have to use POST instead of GET sometime.


| Route                     | HTTP Verb   |
| --------------------------|:-----------:|
| /api/friendconnection     | POST        | 
| /api/friendlist	        | POST / GET  |
| /api/commonlist 	        | POST / GET  |
| /api/subscribe	        | PUT         |
| /api/block	            | PUT         |
| /api/updatelist	        | POST        |

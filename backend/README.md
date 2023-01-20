## .env file must contains

``` 
JWT_SECRET=
MONGODB_URI=
PORT=8000
MESSAGES_SERVER_URL=http://localhost:8001
STRIPE_API_KEY= 
```
                                                                          

## Some information                                                            
ClassName is always start with capital letter, simple file name start with small letter e.g app.ts

### Improvement

- replaced usersMap( which hold relationship between userId and socketId) with redis database

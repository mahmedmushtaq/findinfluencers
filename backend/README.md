MONGODB_URI =                                                                                                                    
JWT_SECRET =                                                                                                                  
PORT = 4000                                                                                                                  
ALLOW_CORS_DOMAIN = http://localhost:3000      
MESSAGES_SERVER_URL = http://localhost:4001                                                                               

## Some information                                                            
ClassName is always start with capital letter, simple file name start with small letter e.g app.ts

## Container Setup

To build the container, run ```docker build -t influencer-backend . ```
To run the container, run ```docker run -p 4000:4000 --rm influencer-backend ```

### Improvement

- replaced usersMap( which hold relationship between userId and socketId) with redis database

# Redis Browser - Server

## Run Locally

1. Make sure you have a Redis server running
    1. By default, expects it to be running @ localhost:6379 with default 
    settings (i.e. no password)
    1. The Redis host and port can be overridden with the 
    REDIS_HOST and REDIS_PORT environment variables
1. Run main class `com.davidagood.RedisBrowserServerApplication`
1. Or run `../gradlew bootRun`

## Docker
1. `../gradlew build docker`
1. `docker run -p 8080:8080 paltamadura/redis-browser-server`

## Notes
The dependency `redis-client` has been added directly to this 
repo as a stop-gap solution since it has not yet been published to any 
public repository. That project lives 
[here](https://github.com/paltamadura/redis-client).

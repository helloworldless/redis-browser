# Redis Browser - UI

## Running Locally

**Note:** Server is expected to be running at http://localhost:8080. See `proxy` in `package.json`.

1. Run `yarn install`
1. Run `yarn start`
1. Starts at [http://localhost:3000/](http://localhost:3000/)

## Docker
1. Update proxy in `package.json`, e.g. `"proxy": "http://server:8080"`
1. `docker build -t paltamadura/redis-browser-ui .`
1. `docker run -p 5000:5000 paltamadura/redis-browser-ui`
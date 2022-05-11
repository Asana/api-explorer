# api-explorer [![Build Status][travis-image]][travis-url]

The Asana Api Explorer is a React component that was built to allow one to explore the Asana Api. It is built in typescript with React to allow easy integration with the [Asana Developers Site](https://developers.asana.com/docs), and uses the [node.js asana client](https://github.com/Asana/node-asana). To populate the API Explorer, we use metadata from the [asana-api-meta](https://github.com/Asana/asana-api-meta) repository, which contains structural information of the various resources and endpoints in the API.

We avoid using the convenience methods provided by the node.js client (e.g. `client.users.me()`), in favor of explicit GET requests with the dispatcher (`dispatcher.get('/users/me', params, null)`). This allows us to consistently cover all endpoint and parameter permutations across the API instead of mixing the two styles throughout.

# Setup
### Node
If you do not have Node, run the following commands

```
curl https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
nvm install 0.12
nvm use 0.12
nvm alias default 0.12
```

## Api Explorer
```
git clone git@github.com:Asana/api-explorer.git
cd api-explorer
npm run update

```

# Developing

## Running locally
Since the base of the API Explorer is a React component, we've created a sample HTML page to run the explorer locally. After making some changes, run:

```
# Clean setup to have the latest version of everything
npm run setup
# Compile the typescript and browserify the output
npm run web
# Start a server
cd dist && python -m http.server 8338
# Now, you can open a web browser to http://localhost:8338/
```

## Testing locally
To run the test suite locally, just run `npm run test`.

## Updating resource metadata

The asana-api-meta repository generates [resource files](https://github.com/Asana/api-explorer/tree/master/src/resources/gen) from [templates](https://github.com/Asana/api-explorer/tree/master/src/resources/templates), and these resources are used to populate the API Explorer. These generated resource files should not be changed directly. Instead, they should be updated within the `asana-api-meta` repository using `gulp deploy-api_explorer`.

## Application constants
When generating a bundle, we use an environment variable to decide which [set of constants](https://github.com/Asana/api-explorer/blob/master/src/constants.ts) to use. This allows us to easily transition from testing the app locally, and running it in a production environment. In order to switch which constants you run, simply run `CONSTANTS_TYPE=localhost npm run web`. 

## Generating minified release
If you want to use this live, you can minify the javascript file with `npm run release`. By default, this uses the production set of constants.

[travis-url]: http://travis-ci.org/Asana/api-explorer
[travis-image]: https://travis-ci.org/Asana/api-explorer.svg?branch=master

module.exports = {
  apps : [{
    name: 'api-service',
    script: './dist/main.js',
    env: {
	    NODE_ENV: "development"
    },
    env_production: {
	    NODE_ENV: "production"
    },
  }],
};
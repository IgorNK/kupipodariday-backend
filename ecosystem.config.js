module.exports = {
  apps : [{
    name: 'kpd-backend-service',
    script: './dist/src/main.js',
    env: {
	    NODE_ENV: "development"
    },
    env_production: {
	    NODE_ENV: "production"
    },
  }],
};

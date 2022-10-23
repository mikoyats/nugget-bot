module.exports = {
    deploy: {
        production: {
            user: process.env.SSH_USERNAME,
            host: process.env.SSH_HOST,
            key: 'deploy.key',
            ref: 'origin/test',
            repo: 'git@github.com:mikoyats/nugget-bot.git',
            path: '/home/github/nugget-bot',
            'post-deploy':
                'nvm use 18 && yarn install && yarn add typescript && yarn build && pm2 reload ../ecosystem.config.js nugget-bot --env production',
            env: {
                NODE_ENV: 'production',
            },
        },
    },
};

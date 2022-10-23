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
                'yarn install && yarn build && pm2 reload ecosystem.config.js nugget-bot --env production',
        },
    },
};

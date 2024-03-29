module.exports = {
    deploy: {
        production: {
            user: process.env.SSH_USERNAME,
            host: process.env.SSH_HOST,
            key: 'deploy.key',
            ref: 'origin/main',
            repo: 'git@github.com:mikoyats/nugget-bot.git',
            path: '/home/github/nugget-bot',
            'post-deploy':
                'npm install && npm run build && pm2 reload ~/ecosystem.config.js',
        },
    },
};

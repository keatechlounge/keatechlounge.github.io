const ghpages = require('gh-pages')

ghpages.publish('build', {
    branch: 'master',
    message: 'auto-commit',
    repo: 'https://github.com/keatechlounge/keatechlounge.github.io',
    dest: 'leap-motion-demo'
},
(error) => {
    console.log(error)
})
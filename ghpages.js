const ghpages = require('gh-pages')

ghpages.publish('build', {
    branch: 'master',
    message: 'auto-commit',
    repo: 'https://github.com/keatechlounge/keatechlounge.github.io',
    dest: 'weatherapp'
},
(error) => {
    console.log(error)
})
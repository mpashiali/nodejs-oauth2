const application = require('./app');

const app = application.runApplication();

app.listen(3000, function () {
  console.log('Server running on port 3000!');
});

module.exports = app;

const
    express = require('express'),
    path = require('path'),
    app = express(),
    cors = require('cors'),
    createError = require('http-errors'),
    cookieParser = require('cookie-parser'),
    logger = require('morgan'),
    indexRouter = require('./routes'),
    authenticationRouter = require('./routes/authentication'),
    countryRouter = require('./routes/country'),
    exchangeRateRouter = require('./routes/exchange-rate');

process.env.PORT = 2000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: 'http://127.0.0.1:3000'
}))


// START: API_ENDPOINTS
app.use('/', indexRouter);
app.use('/auth', authenticationRouter);
app.use('/country-details', countryRouter);
app.use('/exchange-rate', exchangeRateRouter);
// END: API_ENDPOINTS

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

/// <reference path="../../../custom_typings/_custom.d.ts" />

var express = require('express');
var serveStatic = require('serve-static');
var historyApiFallback = require('connect-history-api-fallback');


module.exports = function(ROOT) {
  var router = express.Router();

  var universalPath = ROOT + '/dist/examples/app/universal';

  var App     = require(universalPath + '/app/App').App;
  var TodoApp = require(universalPath + '/todo/index').TodoApp;

  var di = require('angular2/di');

  var {
    HTTP_BINDINGS,
    SERVER_LOCATION_BINDINGS,
    BASE_URL,
    queryParamsToBoolean
  } = require(ROOT + '/dist/modules/server/server');
  // require('@angular/universal')


  router.
    route('/').
    get(function ngApp(req, res) {
      let queryParams = queryParamsToBoolean(req.query);
      let options = Object.assign(queryParams, {
        // client url for systemjs
        componentUrl: 'examples/app/client/app',

        Component: App,
        serverBindings: [
          HTTP_BINDINGS,
          SERVER_LOCATION_BINDINGS,
          di.bind(BASE_URL).toValue(req.baseUrl)
        ],
        data: {},

        preboot: queryParams.preboot === false ? null : {
          start:    true,
          appRoot:  'app',         // selector for root element
          freeze:   'spinner',     // show spinner w button click & freeze page
          replay:   'rerender',    // rerender replay strategy
          buffer:   true,          // client app will write to hidden div until bootstrap complete
          debug:    false,
          uglify:   true,
          presets:  ['keyPress', 'buttonPress', 'focus']
        }

      });

      res.render('app/universal/app/index', options);

    });

  router.
    route('/examples/todo').
    get(function ngTodo(req, res) {
      let queryParams = queryParamsToBoolean(req.query);
      let options = Object.assign(queryParams , {
        // client url for systemjs
        componentUrl: 'examples/app/universal/todo/index',

        Component: TodoApp,
        serverBindings: [
          HTTP_BINDINGS,
          SERVER_LOCATION_BINDINGS,
          di.bind(BASE_URL).toValue(req.baseUrl)
        ],
        data: {},

        preboot: queryParams.preboot === false ? null : {
          start:    true,
          appRoot:  'app',         // selector for root element
          freeze:   'spinner',     // show spinner w button click & freeze page
          replay:   'rerender',    // rerender replay strategy
          buffer:   true,          // client app will write to hidden div until bootstrap complete
          debug:    false,
          uglify:   true,
          presets:  ['keyPress', 'buttonPress', 'focus']
        }

      });

      res.render('app/universal/todo/index', options);

    });


  router.use('/src', function(req, res, next) {
    serveStatic(ROOT + '/src')(req, res, next);
  });

  router.use('/node_modules', function(req, res, next) {
    serveStatic(ROOT + '/node_modules')(req, res, next);
  });

  router.use('/angular2/dist', function(req, res, next) {
    serveStatic(ROOT + '/angular/dist/bundle')(req, res, next);
  });

  router.use('/web_modules', function(req, res, next) {
    serveStatic(ROOT + '/web_modules')(req, res, next);
  });

  router.use('/bower_components', function(req, res, next) {
    serveStatic(ROOT + '/bower_components')(req, res, next);
  });

  router.use(historyApiFallback({
    // verbose: true
  }));


  return router;
};

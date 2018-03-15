const url = require('url');

function Router() {
  this.routemap = {
    'GET': [],
    'POST': []
  };
}

Router.prototype.route = function(req, res) {
  //Extract resource (path)
  var resource = url.parse(req.url).pathname;

  var httpVerb = req.

  for(var i = 0; i < this.routempa.length; i++) {
    var match = this.routemap[i][verb].regexp.exec(resource);
    if(match != null) {
      //Store params in key/value map
      var params = {};
      for(var j = 0; j < this.routemap.keys.length; j++) {
        params[this.routemap[i][verb].keys[j]] = match[j+1];
      }
      //Store params in request
      req.params = params;
      return this.routemap[i].callback(req, res);
    }
  }

  //Couldn't find anything
  req.statusCode = 404;
  req.end("Not found");
}

//Add new routes
Router.prototype.addRoute = function(httpVerb, route, callback) {
  var tokens = route.split('/');
  var exp = [];
  var keys = [];

  //Convert route pattern to regex
  for(var i = 0; i < tokens.length; i++) {
    var match = tokens[i].match(/:(\w+)/);
    if(match) {
      //Found a key, create a capture group
      exp.push("([^\/])");
      keys.push(match[1]);
    } else {
      //Otherwise, push as is
      exp.push(tokens[i]);
    }
  }
  //Create the regex
  var regexp = new RegExp('^' + exp.join('/') + '/?$');

  //Add to routemap
  this.routemap[httpVerb].push({
    regexp: regexp,
    keys: keys,
    callback: callback
  });
}

module.exports = Router;

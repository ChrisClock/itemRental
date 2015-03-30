
jade = (function(exports){
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

  return exports;

})({});

jade.templates = {};
jade.render = function(node, template, data) {
  var tmp = jade.templates[template](data);
  node.innerHTML = tmp;
};

jade.templates["mixin"] = function(locals, attrs, escape, rethrow, merge
/**/) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
if ( items)
{
buf.push('<table');
buf.push(attrs({ 'id':(id), "class": ('table') + ' ' + ('table-condensed') + ' ' + ('table-striped') + ' ' + ('table-hover') }, {"id":true}));
buf.push('><thead><tr><th data-sort="category" class="col-md-2 noselect handcursor sort">Category</th><th data-sort="name" class="col-md-5 noselect handcursor sort">Item</th><th data-sort="labelID" class="col-md-1 noselect handcursor centered sort">ID</th><th data-sort="location" class="col-md-1 noselect handcursor sort">Location</th><th data-sort="condition" class="col-md-3 noselect handcursor sort">Condition</th></tr></thead><tbody class="list">');
// iterate items
;(function(){
  if ('number' == typeof items.length) {
    for (var $index = 0, $$l = items.length; $index < $$l; $index++) {
      var item = items[$index];

buf.push('<tr><td class="category"><p>');
var __val__ = item.category
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td><td class="name"><p><b>');
var __val__ = item.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</b></p><small>');
var __val__ = item.description
buf.push(escape(null == __val__ ? "" : __val__));
var __val__ = '<a href="http://'+item.url+'" target="_blank" class="pull-right">More Information</a>'
buf.push(null == __val__ ? "" : __val__);
buf.push('</small></td><td class="labelID centered"><b>');
var __val__ = ("0000" + item.label).substr(-4,4)
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</b></td>');
if ( item.status=='available')
{
buf.push('<td class="location success"><p>');
var __val__ = item.location
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.status
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else if ( item.status=='borrowed')
{
buf.push('<td class="location warning"><p>');
var __val__ = item.location
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.status
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else
{
buf.push('<td class="location info"><p>');
var __val__ = item.location
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.status
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
if ( item.condition=='Working')
{
buf.push('<td class="condition success"><p>');
var __val__ = item.condition
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else if ( item.condition=='Mended')
{
buf.push('<td class="condition warning"><p>');
var __val__ = item.condition
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else if ( item.condition=='Broken')
{
buf.push('<td class="condition danger"><p>');
var __val__ = item.condition
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else
{
buf.push('<td class="condition info"><p>');
var __val__ = item.condition
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
buf.push('</tr>');
    }
  } else {
    for (var $index in items) {
      var item = items[$index];

buf.push('<tr><td class="category"><p>');
var __val__ = item.category
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td><td class="name"><p><b>');
var __val__ = item.name
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</b></p><small>');
var __val__ = item.description
buf.push(escape(null == __val__ ? "" : __val__));
var __val__ = '<a href="http://'+item.url+'" target="_blank" class="pull-right">More Information</a>'
buf.push(null == __val__ ? "" : __val__);
buf.push('</small></td><td class="labelID centered"><b>');
var __val__ = ("0000" + item.label).substr(-4,4)
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</b></td>');
if ( item.status=='available')
{
buf.push('<td class="location success"><p>');
var __val__ = item.location
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.status
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else if ( item.status=='borrowed')
{
buf.push('<td class="location warning"><p>');
var __val__ = item.location
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.status
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else
{
buf.push('<td class="location info"><p>');
var __val__ = item.location
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.status
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
if ( item.condition=='Working')
{
buf.push('<td class="condition success"><p>');
var __val__ = item.condition
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else if ( item.condition=='Mended')
{
buf.push('<td class="condition warning"><p>');
var __val__ = item.condition
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else if ( item.condition=='Broken')
{
buf.push('<td class="condition danger"><p>');
var __val__ = item.condition
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
else
{
buf.push('<td class="condition info"><p>');
var __val__ = item.condition
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p><p>');
var __val__ = item.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p></td>');
}
buf.push('</tr>');
   }
  }
}).call(this);

buf.push('</tbody></table><p></p>');
var __val__ = 'Displaying ' + items.length + ' items.'
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('<p class="handcursor"></p><ul class="pagination"></ul>');
}
}
return buf.join("");
}
/*
 * decaffeinate suggestions:
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/main/docs/suggestions.md
 */
// ==================================================================== *
//   Copyright Xialia.com  2011-2018
//   FILE : ../src/drumee/libs/skeleton/box/horizontal
//   TYPE : 
// ==================================================================== *


// ===========================================================
// __skl_box_h
//
// @param [Object] view
// @param [Object] ext
// @param [Object] style
//
// @return [Object] 
//
// ===========================================================
const __skl_box_h = function(view, ext, style) {
  const a = {
    kind       : KIND.box,
    flow       : _a.x,
    signal     : _e.ui.event,
    handler    : { 
      ui       : view
    }
  };
    //mapName    : _a.reader
  if (_.isObject(ext)) {
    if ((ext.sys_pn != null) && (ext.className == null)) {
      ext.className = ext.sys_pn;
    }
    _.extend(a, ext);
  }
  if (_.isObject(style)) {
    a.styleOpt = a.styleOpt || {};
    _.extend(a.styleOpt, style);
  }
  return a;
};
module.exports = __skl_box_h;
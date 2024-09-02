class __image_slide extends Marionette.CollectionView {
  constructor(...args) {
    super(...args);
    this.onDestroy = this.onDestroy.bind(this);
    this._responsive = this._responsive.bind(this);
    this._loaded = this._loaded.bind(this);
    this.onRender = this.onRender.bind(this);
    this.onDomRefresh = this.onDomRefresh.bind(this);
    this.onParentReady = this.onParentReady.bind(this);
    this._resize = this._resize.bind(this);
    this._playChildren = this._playChildren.bind(this);
    this.play = this.play.bind(this);
  }

  static initClass() { //Gallery.Reader.Slide
    this.prototype.templateName = _T.wrapper.slide;
    this.prototype.childViewContainer = _K.tag.ul;
    this.prototype.childView = WPP.Note;
    this.prototype.className  = 'film absolute';
    this.prototype.ui =
      {image   : 'img'};
  }
// ========================
//
// ========================

// ===========================================================
// initialize
//
// @param [Object] opt
//
// ===========================================================
  initialize(opt) {
    this._done = false;
    const src = require('options/url/file')(this.model, _a.slide);
    this.model.set({
      format : _a.orig,
      src
    });
    this.image = new window.Image();
    $(this.image).on(_e.load, this._loaded);
    $(this.image).attr(_a.src, src);
    this.collection = new Backbone.Collection();
    this.collection.cleanSet(this.get(_a.kids));
    return RADIO_BROADCAST.on(_e.responsive, this._responsive);
  }
// ========================
//
// ========================

// ===========================================================
// onDestroy
//
// ===========================================================
  onDestroy() {
    return RADIO_BROADCAST.off(_e.responsive, this._responsive);
  }
// ========================
//
// ========================

// ===========================================================
// _responsive
//
// ===========================================================
  _responsive() {
    const img = this.$el.find('img');
    return img.attr(_a.width, this.$el.parent().width());
  }
// ========================
//
// ========================

// ===========================================================
// _loaded
//
// ===========================================================
  _loaded() {
    return this.trigger(_e.ready);
  }
// ========================
//
// ========================

// ===========================================================
// onRender
//
// ===========================================================
  onRender() {
    return this.$el.css({
      overflow: _a.hidden});
  }
      //visibility : _a.hidden
// ========================
//
// ========================

// ===========================================================
// onDomRefresh
//
// ===========================================================
  onDomRefresh() {
    return this._responsive();
  }
// ========================
//
// ========================

// ===========================================================
// onParentReady
//
// @param [Object] parent
//
// ===========================================================
  onParentReady(parent) {
    return this._resize(parent);
  }
// ========================
//
// ========================

// ===========================================================
// _resize
//
// @param [Object] parent
//
// ===========================================================
  _resize(parent) {
    if (!this._done) {
      delete this.image.height; // = height
      this.ui.image.replaceWith(this.image);
      this._done = true;
    }
    return this._responsive();
  }
// ========================
//
// ========================

// ===========================================================
// _playChildren
//
// ===========================================================
  _playChildren() {
    return this.children.each(child => child.triggerMethod(_e.play));
  }
// ========================
//
// ========================

// ===========================================================
// play
//
// @param [Object] tl
//
// @return [Object] 
//
// ===========================================================
  play(tl) {
    const left = this.parent.$el.width() + 60;
    const anim = this.model.get(_a.anim);
    if ((anim == null)) {
      return;
    }
    const settings = anim.settings || require('options/gsapp/base')(_a.defaults);
    tl.from(this.$el, 0.01, {opacity:0});
    const from = require('options/gsapp/convert')(anim.in, {x:-left});
    if (!_.isEmpty(from)) {
      tl.from(this.$el, from.duration, from.definition);
    }
    const to =  require('options/gsapp/convert')(anim.out, {x:left});
    if (!_.isEmpty(to)) {
      tl.to(this.$el, to.duration, to.definition, `+=${settings.pausetime}`);
    }
    tl.add(this._playChildren);
    return tl.to(this.$el, 0.06, {opacity:0});
  }
}
__image_slide.initClass();
module.exports = __image_slide;
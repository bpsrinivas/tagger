var Utility = (function(){

  var closest = function (el, selector) {
    var matchesFn;
    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] === 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    });

    var parent;

    // traverse parents
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }
    return null;
  };

  var selector = '';

  var getSelector = function(el){
    if(!el){
      return 'Not Found';
    }
    var sel = (el.className) ? '.' + el.className : ((el.id) ? '#' + el.id : '');
    selector = el.nodeName.toLowerCase() + sel + selector;

    if(selector && document.querySelectorAll(selector).length === 1){
      return selector;
    }else{
      return getSelector(el.parentElement);
    }
  };

  var init = function(){
    selector = '';
    return Utility;
  };

  var stopEvents = function(){
    d3.event.preventDefault();
    d3.event.stopPropagation();
  };

  var getImageUrl = function(rootEl){
    return d3.select(rootEl).selectAll('img').attr('src');
  };

  return {
    getImageUrl :getImageUrl,
    getClosest  :closest,
    stopEvents  :stopEvents,
    getSelector :getSelector,
    init        :init
  };
})();

/* globals chrome */
'use strict';

var StorageHelper = (function(chrome){

  var get = function(cb){
    chrome.storage.sync.get({'list':[]},function(d){
      cb(d.list);
    });
  };

  var save = function(url,selectors,cb){
    get(function(list){
      var el = list.filter(function(l){
        return l.url === url;
      });

      if(el.length === 1){
          el[0].url = url;
          el[0].selectors = selectors;
      }else{
        list.push({
          url:url,
          selectors:selectors
        });
      }
      chrome.storage.sync.set({'list': list},cb);
    });
  };



  return{
    save:save,
    get:get
  };

})(chrome);

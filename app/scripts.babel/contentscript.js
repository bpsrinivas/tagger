/* globals d3,chrome,InfoBox,Utility */
'use strict';

var Listener = (function(InfoBox,Utility){
  var selectionType;

  var setSelectionType = function(type){
    selectionType = type;
  };

  var logSelector = function(){
    var sel = "";
    if(selectionType === 'imagePicker'){
       sel = Utility.getImageUrl(d3.event.target);
    }else{
        sel = Utility.init().getSelector(d3.event.target);
    }

    var viewModel = InfoBox.getViewModel();
    var attr = (selectionType === 'imagePicker') ? 'imageSelector' : 'textSelector';
    viewModel[attr] = sel;
    InfoBox.updateView();
    Utility.stopEvents();
  };

  var outLine = function(outline){
    return function(){
      if(!Utility.getClosest(d3.event.target,'.infoBox') && !Utility.getClosest(d3.event.target,'.reportBox')){
          d3.select(d3.event.target).style('outline',outline);
      }
    };
  };

  var setOutline = outLine('2px solid green');
  var removeOutline = outLine('none');

  var attach = (function(){
    var ranOnce = false;
    return function(){
      if(!ranOnce){
        d3.select('html').on('click',logSelector);
        d3.select('body').on('mouseover',setOutline);
        d3.select('body').on('mouseout',removeOutline);
      }
      ranOnce = true;
      return Listener;
    };
  })();

  return {
    attach:attach,
    setSelectionType:setSelectionType
  };
})(InfoBox,Utility);

var onRequest = function(request, sender, sendResponse) {
    InfoBox.create();
    ReportBox.create();
    Listener.attach().setSelectionType(request.object);
};

chrome.runtime.onMessage.addListener(onRequest);

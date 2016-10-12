/* globals d3,chrome,InfoBoxModel,InfoBox ,StorageHelper*/
'use strict';

var InfoBoxModel = function(config){
  var conf = config || {};
  this.textSelector = conf.textSelector || '';
  this.imageSelector = conf.imageSelector || '';
};

var InfoBox = (function(StorageHelper,InfoBoxModel){

  var textSelectorLabel,imgSelectorLabel, infoBoxModel;

  var stopEvents = function(){
    d3.event.stopPropagation();
    d3.event.preventDefault();
  };

  var addLabels = function(selection){
    var selectorLabels = ['Text Selector :','Img Selector  :'].map(function(lab){
      var div = selection.append('div');
      div.append('span').text(lab);
      return div.append('span');
    });

    textSelectorLabel = selectorLabels[0];
    imgSelectorLabel = selectorLabels[1];

    var buttonDiv = selection.append('div');
    buttonDiv.append('button').text('Save').on('click',function(){
      stopEvents();
      StorageHelper.save(window.location.href,JSON.stringify(infoBoxModel),function(){
        console.log('data saved');
        ReportBox.refresh();
      });
    });
  };

  var create = function(){
    if(!d3.select('.infoBox').empty()){
      return;
    }

    d3.select('body')
        .append('div')
        .classed('infoBox',true)
        .call(addLabels);
  };

  var updateView = function(){
    textSelectorLabel.text(infoBoxModel.textSelector);
    imgSelectorLabel.text(infoBoxModel.imageSelector);
  };

  var getViewModel = function(){
    if(!infoBoxModel){
      infoBoxModel = new InfoBoxModel();
    }
    return infoBoxModel;
  };

  return {
    create        : create,
    updateView    : updateView,
    getViewModel  : getViewModel
  };
})(StorageHelper,InfoBoxModel);

/* globals d3,chrome,InfoBoxModel,InfoBox ,StorageHelper*/
'use strict'
var ReportBox = (function(){

  var populateData = function(list){
    if(list.length == 0){
      return;
    }
    var dat = [];

    list.forEach(function(l){
      dat.push(l.url);
      dat.push(JSON.parse(l.selectors).textSelector);
      dat.push(JSON.parse(l.selectors).imageSelector);
    });

    var selection = d3.select('.reportBox')
      .selectAll('div')
      .data(dat)
      .text(function(d){return d;});

    selection.enter()
        .append('div')
        .text(function(d){return d;})
        .style('border-bottom',function(d,i){
          if(i % 3 === 2){
            return '1px solid black';
          }
        });

    selection.exit().remove();
  };

  var refresh = function(){
    StorageHelper.get(populateData);
  };

  var create = function(){
    if(!d3.select('.reportBox').empty()){
      return;
    }

    d3.select('body')
        .append('div')
        .classed('reportBox',true);

    refresh();
  };

  return {
    create:create,
    refresh:refresh
  };
})();

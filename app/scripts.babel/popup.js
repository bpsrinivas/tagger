/* globals d3,chrome */
'use strict';

var Popup = (function() {

    var menu = [{
        label: 'Pick Title',
        class: 'titlePicker',
        id:'titlePicker'
    },
    {
        label: 'Pick Image',
        class: 'imagePicker',
        id:'imagePicker'
    }];

    var createSpans = function(selection) {
        selection.each(function() {
            d3.select(this).append('span').classed('picker', true);
            d3.select(this).append('span').classed('text', true).html(function(d) {
                return d.label;
            });
        });
    };

    var menuClickHandler = function(d){
      window.close();
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {object: d.id}, function(response) {
            console.log(response.farewell);
          });
        });
    };

    var createRows = function() {
        d3.select('ul.listContainer')
            .selectAll('li')
            .data(menu)
            .enter()
            .append('li')
            .classed('row', true)
            .on('click',menuClickHandler)
            .call(createSpans);
    };

    var init = function() {
      createRows();
    };

    return {
        init: init
    };
})();

document.addEventListener('DOMContentLoaded', function() {
    Popup.init();
});

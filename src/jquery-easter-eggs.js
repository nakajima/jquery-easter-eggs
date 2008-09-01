(function($) {
  $.easterEggs = {
    log: [ ],  // Stores typed character history.
    list: { }, // Stores string/handler pairs.
    
    add: function(str, handler) {
      if (!$.easterEggs.list[str]) { $.easterEggs.list[str] = []; }
      $.easterEggs.list[str].push(handler);
    },
    
    strings: function() {
      return $.easterEggs.log.join('').split(' ');
    },
    
    handle: function(event) {
      if ($(event.target).is(':input')) { return; }
      var BACKSPACE = 8;
      var code = event.charCode || event.keyCode;
      if (code == BACKSPACE) { $.easterEggs.log.pop(); return false; }
      var character = String.fromCharCode(code).toLowerCase();
      if (!character.match(/\d|\w/)) { character = ' ' }
      $.easterEggs.log.push(character);
      $.easterEggs.check(event);
    },
    
    check: function(event) {
      var strings = $.easterEggs.strings();
      $.each($.easterEggs.list, function(str, handlers) {
        if ($.inArray(str, strings) != -1) {
          for (i in handlers) { handlers[i](event) }
          strings = $.grep(strings, function(sub) { return str != sub });
        }
      });
      $.easterEggs.log = strings.join(' ').split('');
    }
  }
  
  var makeHandler = function(fn, context) {
    return function() {
      return fn.apply(context)
    }
  }
  
  // Attach egg events to DOM elements.
  $.fn.addEgg = function(str, handler) {
    $.easterEggs.add(str, makeHandler(handler, this));
  }
  
  // Setup observer
  $(document).keydown($.easterEggs.handle);
})(jQuery);
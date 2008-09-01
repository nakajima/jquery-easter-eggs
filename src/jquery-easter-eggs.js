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
      var SPACE_BAR = 32;
      var code = event.charCode || event.keyCode;
      var character = (code == SPACE_BAR) ? ' ' : String.fromCharCode(code).toLowerCase();
      if (!character.match(/\d|\w|\s/)) { return }
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
Screw.Unit(function() {
  var typeGreat = function() {
    $.easterEggs.handle({ keyCode: 71 });
    $.easterEggs.handle({ keyCode: 82 });
    $.easterEggs.handle({ keyCode: 69 });
    $.easterEggs.handle({ keyCode: 65 });
    $.easterEggs.handle({ keyCode: 84 });
  }
  
  before(function() {
    $.easterEggs.log = [];
    $.easterEggs.list = { };
  });
  
  describe("storing typing history", function() {
    it("has array", function() {
      expect($.easterEggs.log).to(be_empty);
    });
    
    it("adds a space for non-word characters", function() {
      expect($.easterEggs.log).to(be_empty);
      $.easterEggs.handle({ keyCode: 27 });
      expect($.easterEggs.log).to(have_length, 1);
      expect($.easterEggs.log.pop()).to(equal, ' ');
    });
    
    it("allows backspace", function() {
      typeGreat();
      expect($.easterEggs.log).to(have_length, 5);
      $.easterEggs.handle({ keyCode: 8 });
      expect($.easterEggs.log).to(have_length, 4);
    });
    
    it("returns current strings", function() {
      $.easterEggs.log = ['h','e','l','l','o',' ', 'w','o','r','l','d'];
      expect($.easterEggs.strings()).to(equal, ['hello', 'world']);
    });
  });
  
  describe("handlers", function() {
    it("should be called", function() {
      var passed = false
      $.easterEggs.add('great', function() { passed = true });
      typeGreat();
      expect(passed).to(be_true);
    });
    
    it("shouldn't be called for inputs", function() {
      var passed = true;
      $.easterEggs.add('g', function() { passed = false });
      $.easterEggs.handle({ keyCode: 71, target: $('#an-input')[0] });
      expect(passed).to(be_true);
    });
    
    it("should pass event object", function() {
      $.easterEggs.handle({ keyCode: 71 });
      $.easterEggs.handle({ keyCode: 82 });
      $.easterEggs.handle({ keyCode: 69 });
      $.easterEggs.handle({ keyCode: 65 });
      var event = { keyCode: 84 }
      $.easterEggs.add('great', function(e) { passed = (e == event); });
      $.easterEggs.handle(event);
      expect(passed).to(be_true);
    });
    
    it("should clear after calling", function() {
      var passed = false
      $.easterEggs.add('great', function() { passed = true });
      typeGreat();
      expect(passed).to(be_true);
      expect($.easterEggs.log).to(be_empty);
    });
    
    it("allows multiple handlers for same string", function() {
      var called = []
      $.easterEggs.add('great', function() { called.push('once') });
      $.easterEggs.add('great', function() { called.push('twice') });
      typeGreat();
      expect(called.pop()).to(equal, 'twice');
      expect(called.pop()).to(equal, 'once');
    });
  });
  
  describe("dom helper", function() {
    it("should have dom helper", function() {
      $('#some_div').addEgg('great', function() { $(this).text('PASSED!'); });
      expect($('#some_div').text()).to(equal, '');
      typeGreat();
      expect($('#some_div').text()).to(equal, 'PASSED!');
    });
  });
  
  after(function() {
    $.easterEggs.log = [];
    $.easterEggs.list = { };
  });
});
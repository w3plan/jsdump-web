/**
 * Defines an general objects with Object literal
 * 
 * @type {Object}
 */
var baseObj = {
  bar10: 10,
  bar20: 20.56,
  foo10() {
    console.log('foo10');
  },
  // Arrow function
  foo20: () => console.log('bar20'),
  // Class expression
  foo25: class {
    foo25() { 
      console.log('foo25');
    }
  },
  [Symbol.iterator]() { 
    console.log('Symbol.iterator');
  }
};

var bar0 = new Date('2020-05-01, 11:10:01'),
    br = 'bar1',
    id = Symbol("id");

/**
 * Copies own properties from baseObj to target object
 * @type {Object}
 */
var obj = Object.assign(
  { 
    bar0,
    // Computed property
    [br]: 'bar1',
    [id]: 100.25,
    bar5: { /* To add your code */ },
    foo28() {
      console.log('foo28');
    },
    // Getter
    get bar() {
      return this.bar10;
    },
    // Setter
    set bar(val) {
      this.bar10 = val;
    }
  },
  baseObj
);

obj.bar30 = 'bar30';
obj.foo30 = function() {
  console.log('foo30');
}

Object.defineProperty(obj, 'bar40', {
  value : 'bar40',
  writable: true,
  enumerable: false
});

Object.defineProperty(obj, 'foo40', {
  value : function() {
    console.log('foo40');
  },
  enumerable: false
});


/**
 * Defines a base function
 * 
 * @type {Function}
 */
function base(a) {
  this.bar1 = 1.28;
  this.foo1 = function () {
    console.log('foo1');
  }

  var bar22 = 'bar22';

  function foo22(a) {
    console.log('foo22', a);
  }
}

/**
 * Defines a derived function
 *
 * @type {Function}
 */
function func(b) {
  // Inherited super function 
  base.apply(this, arguments);
  
  this.bar5 = new Date('2020-05-01, 11:10:01');  
  this.foo10 = function() {
    console.log('foo10');
  };
  
  this[Symbol.iterator] = function () { 
    console.log('Symbol.iterator'); 
  };
  
  this.bar10 = 10;
  // Getter and setter
  Object.defineProperty(this, 'bar', {
    get() {
      return this.bar10;
    },

    set(val) {
      this.bar10 = val;
    }
  });
  
  var bar20 = 'bar20';
  // Arrow function
  var foo20 = () => console.log('foo20');
  // Nested(inner) function
  function foo25(c) {   
    console.log(c);
  }
  
  return foo25(b);
}

func.bar30 = 'bar30';
func.foo30 = function() {
  console.log('foo30');
} 

func.prototype.bar40 = 'bar40';
func.prototype.foo40 = function() {
  console.log('foo40');
}

Object.defineProperty(func, 'bar50', {
  value : 'bar50',
  writable: true,
  enumerable: false
});

Object.defineProperty(func, 'foo50', {
  value : function() {
    console.log('foo50');
  },
  enumerable: false
});


/**
 * Defines a superclass
 *
 * @type {Function}
 */
class Base {
  // Private property
  #bar1 = 'bar1';

  // Public property
  bar2 = new Date('2020-05-01, 11:10:01');
  bar21 = 'bar21';
  
  constructor(a) { 
    this.bar3 = 'bar3';
  }
  
  // Static property
  static bar100 = 'bar100';
  
  // Static method
  static foo100() {
    console.log('foo100');
  }
  
  // Public method
  foo10() {
    console.log('foo10');
  }
}

/**
 * Defines a subclass
 *
 * @type {Function}
 */
class Cls extends Base {
  // Private property
  #bar5 = 'bar5';
  #bar10 = 'bar10';

  // Public property
  bar15 = 15;
  bar150 = new Date('2020-05-01, 09:01:01');
  
  // Static property
  static bar20 = 20.73;
  
  constructor(b) {
    super(b);
    this.bar25 = 'bar25';
  }
  
  // Static method
  static foo20() { 
    console.log('foo20');
  }
  
  // Public method
  foo25() {
    console.log('foo25');
  }
  
  // Public method
  [Symbol.iterator]() { 
    console.log('Symbol.iterator');
  }

  // Getter
  get bar() {
    return this.#bar10;
  }
  
  // Setter
  set bar(val) {
    this.#bar10 = val;
  }
}

Cls.bar30 = 'bar30';
Cls.foo30 = function() {
  console.log('foo30');
} 

Cls.prototype.bar40 = 'bar40';
Cls.prototype.foo40 = function() {
  console.log('foo40');
}

Object.defineProperty(Cls, 'bar50', {
  value : 'bar50',
  writable: true,
  enumerable: false
});

Object.defineProperty(Cls, 'foo50', {
  value : function() {
    console.log('foo50');
  },
  enumerable: false
});

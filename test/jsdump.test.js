// gets entries object 
var objEts = jsdump.entriesObj(obj);
var funcEts = jsdump.entriesObj(func);
var clsEts = jsdump.entriesObj(Cls);

// gets an entry from entries object
function getProperty(entries, prop) {
  for (var i = 0; i < entries.length; i++) {
    if (entries[i].key === prop || entries[i].key.toString() === prop) {
       return entries[i];
    }
  }
}

// serializes the value then removes newlines and whitespace from the value 
function serialize(val) {
  try {
    return val.toString().replace(/\r\n|\r|\n/g, '').replace(/ +/g, '');
  } catch(e) {
    console.log('Failed to serialize the value');
  }
}


var actual;

// starts testing
QUnit.test("Testing general object", function(assert) {

  actual = getProperty(objEts.ownEntries, 'bar');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'getter', 'setter'], 'Attributes to property: bar');

  actual = getProperty(objEts.ownEntries, 'bar0');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: bar0');
  assert.deepEqual(actual.types, ['Date'], 'Types to property: bar0');
  assert.deepEqual(actual.constructor, 'Date', 'Constructor to property: bar0');
  assert.deepEqual(actual.value, new Date("2020-05-01, 11:10:01"), 'Value to property: bar0');
    
  actual = getProperty(objEts.ownEntries, 'bar1');
    
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar1');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar1');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar1');
  assert.deepEqual(actual.value, 'bar1', 'Value to property: bar1');

  actual = getProperty(objEts.ownEntries, 'bar5');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: bar5');
  assert.deepEqual(actual.types, ['EmptyObject', 'Object'], 'Types to property: bar5');
  assert.deepEqual(actual.constructor, 'Object', 'Constructor to property: bar5');
  assert.deepEqual(actual.value, {}, 'Value to property: bar5');      

  actual = getProperty(objEts.ownEntries, 'bar10');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar10');
  assert.deepEqual(actual.types, ['Number', 'SafeInteger', 'Integer', 'Primitive'], 'Types to property: bar10');
  assert.deepEqual(actual.constructor, 'Number', 'Constructor to property: bar10');
  assert.deepEqual(actual.value, 10, 'Value to property: bar10');

  actual = getProperty(objEts.ownEntries, 'bar20');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar20');
  assert.deepEqual(actual.types, ['Number', 'Float', 'Primitive'], 'Types to property: bar20');
  assert.deepEqual(actual.constructor, 'Number', 'Constructor to property: bar20');
  assert.deepEqual(actual.value, 20.56, 'Value to property: bar20');

  actual = getProperty(objEts.ownEntries, 'foo10');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo10');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo10');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo10');
  assert.deepEqual(serialize(actual.value), "foo10(){console.log('foo10');}", 'Value to property: foo10');

  actual = getProperty(objEts.ownEntries, 'foo20');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo20');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo20');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo20');
  assert.deepEqual(serialize(actual.value), "()=>console.log('bar20')", 'Value to property: foo20');

  actual = getProperty(objEts.ownEntries, 'foo25');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo25');
  assert.deepEqual(actual.types, ['Class'], 'Types to property: foo25');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo25');
  assert.deepEqual(serialize(actual.value), "class{foo25(){console.log('foo25');}}", 'Value to property: foo25'); 

  actual = getProperty(objEts.ownEntries, 'foo28');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo28');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo28');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo28');
  assert.deepEqual(serialize(actual.value), "foo28(){console.log('foo28');}", 'Value to property: foo28');


  actual = getProperty(objEts.ownEntries, 'bar30');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar30');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar30');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar30');
  assert.deepEqual(actual.value, 'bar30', 'Value to property: bar30');

  actual = getProperty(objEts.ownEntries, 'foo30');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo30');
  assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types to property: foo30');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo30');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo30');}", 'Value to property: foo30');

  actual = getProperty(objEts.ownEntries, 'bar40');
  
  assert.deepEqual(actual.attributes, ['writable'], 'Attributes to property: bar40');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar40');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar40');
  assert.deepEqual(actual.value, 'bar40', 'Value to property: bar40');

  actual = getProperty(objEts.ownEntries, 'foo40');
  
  assert.deepEqual(actual.attributes, ['extensible'], 'Attributes to property: foo40');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo40');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo40');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo40');}", 'Value to property: foo40');

  actual = getProperty(objEts.ownEntries, 'Symbol(id)');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: Symbol(id)');
  assert.deepEqual(actual.types, ['Number', 'Float', 'Primitive'], 'Types to property: Symbol(id)');
  assert.deepEqual(actual.constructor, 'Number', 'Constructor to property: Symbol(id)');
  assert.deepEqual(actual.value, 100.25, 'Value to property: Symbol(id)');

  actual = getProperty(objEts.ownEntries, 'Symbol(Symbol.iterator)');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: Symbol(Symbol.iterator)');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: Symbol(Symbol.iterator)');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: Symbol(Symbol.iterator)');
  assert.deepEqual(serialize(actual.value), "[Symbol.iterator](){console.log('Symbol.iterator');}", 'Value to property: Symbol(Symbol.iterator)');
});

QUnit.test("Testing function", function(assert) {

  actual = getProperty(funcEts.ownEntries, 'bar30');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar30');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar30');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar30');
  assert.deepEqual(actual.value, 'bar30', 'Value to property: bar30');

  actual = getProperty(funcEts.ownEntries, 'foo30');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo30');
  assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types to property: foo30');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo30');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo30');}", 'Value to property: foo30');

  actual = getProperty(funcEts.ownEntries, 'bar50');
  
  assert.deepEqual(actual.attributes, ['writable'], 'Attributes to property: bar50');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar50');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar50');
  assert.deepEqual(serialize(actual.value), 'bar50', 'Value to property: bar50');

  actual = getProperty(funcEts.ownEntries, 'foo50');
  
  assert.deepEqual(actual.attributes, ['extensible'], 'Attributes to property: foo50');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo50');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo50');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo50');}", 'Value to property: foo50');

  actual = getProperty(funcEts.prototypeOwnEntries, 'bar40');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar40');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar40');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar40');
  assert.deepEqual(serialize(actual.value), 'bar40', 'Value to property: bar40');

  actual = getProperty(funcEts.prototypeOwnEntries, 'foo40');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo40');
  assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types to property: foo40');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo40');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo40');}", 'Value to property: foo40');

  actual = getProperty(funcEts.instanceOwnEntries, 'bar1');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar1');
  assert.deepEqual(actual.types, ['Number', 'Float', 'Primitive'], 'Types to property: bar1');
  assert.deepEqual(actual.constructor, 'Number', 'Constructor to property: bar1');
  assert.deepEqual(actual.value, 1.28, 'Value to property: bar1');
  
  actual = getProperty(funcEts.instanceOwnEntries, 'foo1');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo1');
  assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types to property: foo1');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo1');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo1');}", 'Value to property: foo1');

  actual = getProperty(funcEts.instanceOwnEntries, 'bar5');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: bar5');
  assert.deepEqual(actual.types, ['Date'], 'Types to property: bar5');
  assert.deepEqual(actual.constructor, 'Date', 'Constructor to property: bar5');
  assert.deepEqual(actual.value, new Date('2020-05-01, 11:10:01'), 'Value to property: bar5');

  actual = getProperty(funcEts.instanceOwnEntries, 'foo10');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo10');
  assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types to property: foo10');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo10');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo10');}", 'Value to property: foo10');

  actual = getProperty(funcEts.instanceOwnEntries, 'bar10');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar10');
  assert.deepEqual(actual.types, ['Number', 'SafeInteger', 'Integer', 'Primitive'], 'Types to property: bar10');
  assert.deepEqual(actual.constructor, 'Number', 'Constructor to property: bar10');
  assert.deepEqual(actual.value, 10, 'Value to property: bar10');

  actual = getProperty(funcEts.instanceOwnEntries, 'bar');
  
  assert.deepEqual(actual.attributes, ['getter', 'setter'], 'Attributes to property: bar');

  actual = getProperty(funcEts.instanceOwnEntries, 'Symbol(Symbol.iterator)');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: Symbol(Symbol.iterator)');
  assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types to property: Symbol(Symbol.iterator)');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: Symbol(Symbol.iterator)');
  assert.deepEqual(serialize(actual.value), "function(){console.log('Symbol.iterator');}", 'Value to property: Symbol(Symbol.iterator)');
});

QUnit.test("Testing class", function(assert) {

  actual = getProperty(clsEts.ownEntries, 'bar20');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar20');
  assert.deepEqual(actual.types, ['Number', 'Float', 'Primitive'], 'Types error');
  assert.deepEqual(actual.constructor, 'Number', 'Constructor error');
  assert.deepEqual(actual.value, 20.73, 'Value error');

  actual = getProperty(clsEts.ownEntries, 'foo20');
  
  assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes to property: foo20');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo20');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo20');
  assert.deepEqual(serialize(actual.value), "foo20(){console.log('foo20');}", 'Value to property: foo20');

  actual = getProperty(clsEts.ownEntries, 'bar30');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar30');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar30');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar30');
  assert.deepEqual(actual.value, 'bar30', 'Value to property: bar30');

  actual = getProperty(clsEts.ownEntries, 'foo30');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo30');
  assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types to property: foo30');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo30');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo30');}", 'Value to property: foo30');

  actual = getProperty(clsEts.ownEntries, 'bar50');
  
  assert.deepEqual(actual.attributes, ['writable'], 'Attributes to property: bar50');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar50');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar50');
  assert.deepEqual(actual.value, 'bar50', 'Value to property: bar50');

  actual = getProperty(clsEts.ownEntries, 'foo50');
  
  assert.deepEqual(actual.attributes, ['extensible'], 'Attributes to property: foo50');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo50');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo50');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo50');}", 'Value to property: foo50');

  actual = getProperty(clsEts.inheritedEntries, 'bar100');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar100');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar100');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar100');
  assert.deepEqual(actual.value, 'bar100', 'Value to property: bar100');
  
  actual = getProperty(clsEts.inheritedEntries, 'foo100');
  
  assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes to property: foo100');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo100');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo100');
  assert.deepEqual(serialize(actual.value), "foo100(){console.log('foo100');}", 'Value to property: foo100');
  
  actual = getProperty(clsEts.prototypeOwnEntries, 'foo25');
  
  assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes to property: foo25');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo25');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo25');
  assert.deepEqual(serialize(actual.value), "foo25(){console.log('foo25');}", 'Value to property: foo25');
  
  actual = getProperty(clsEts.prototypeOwnEntries, 'bar');
  
  assert.deepEqual(actual.attributes, ['configurable', 'getter', 'setter'], 'Attributes to property: bar');

  actual = getProperty(clsEts.prototypeOwnEntries, 'bar40');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar40');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar40');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar40');
  assert.deepEqual(actual.value, 'bar40', 'Value to property: bar40');
  
  actual = getProperty(clsEts.prototypeOwnEntries, 'foo40');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: foo40');
  assert.deepEqual(actual.types, ['AnonymousFunction', 'Function'], 'Types to property: foo40');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo40');
  assert.deepEqual(serialize(actual.value), "function(){console.log('foo40');}", 'Value to property: foo40');

  actual = getProperty(clsEts.prototypeOwnEntries, 'Symbol(Symbol.iterator)');
  
  assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes to property: Symbol(Symbol.iterator)');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: Symbol(Symbol.iterator)');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: Symbol(Symbol.iterator)');
  assert.deepEqual(serialize(actual.value), "[Symbol.iterator](){console.log('Symbol.iterator');}", 'Value to property: Symbol(Symbol.iterator)');

  actual = getProperty(clsEts.prototypeIheritedEntries, 'foo10');
  
  assert.deepEqual(actual.attributes, ['configurable', 'writable', 'extensible'], 'Attributes to property: foo10');
  assert.deepEqual(actual.types, ['Function'], 'Types to property: foo10');
  assert.deepEqual(actual.constructor, 'Function', 'Constructor to property: foo10');
  assert.deepEqual(serialize(actual.value), "foo10(){console.log('foo10');}", 'Value to property: foo10');
  
  actual = getProperty(clsEts.instanceOwnEntries, 'bar2');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: bar2');
  assert.deepEqual(actual.types, ['Date'], 'Types to property: bar2');
  assert.deepEqual(actual.constructor, 'Date', 'Constructor to property: bar2');
  assert.deepEqual(actual.value, new Date('2020-05-01, 11:10:01'), 'Value to property: bar2');

  actual = getProperty(clsEts.instanceOwnEntries, 'bar21');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar21');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar21');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar21');
  assert.deepEqual(actual.value, 'bar21', 'Value to property: bar21');

  actual = getProperty(clsEts.instanceOwnEntries, 'bar3');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar3');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar3');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar3');
  assert.deepEqual(actual.value, 'bar3', 'Value to property: bar3');

  actual = getProperty(clsEts.instanceOwnEntries, 'bar15');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar15');
  assert.deepEqual(actual.types, ['Number', 'SafeInteger', 'Integer', 'Primitive'], 'Types to property: bar15');
  assert.deepEqual(actual.constructor, 'Number', 'Constructor to property: bar15');
  assert.deepEqual(actual.value, 15, 'Value to property: bar15');

  actual = getProperty(clsEts.instanceOwnEntries, 'bar150');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable', 'extensible'], 'Attributes to property: bar150');
  assert.deepEqual(actual.types, ['Date'], 'Types to property: bar150');
  assert.deepEqual(actual.constructor, 'Date', 'Constructor to property: bar150');
  assert.deepEqual(actual.value, new Date('2020-05-01, 09:01:01'), 'Value to property: bar150');

  actual = getProperty(clsEts.instanceOwnEntries, 'bar25');
  
  assert.deepEqual(actual.attributes, ['configurable', 'enumerable', 'writable'], 'Attributes to property: bar25');
  assert.deepEqual(actual.types, ['String', 'Primitive'], 'Types to property: bar25');
  assert.deepEqual(actual.constructor, 'String', 'Constructor to property: bar25');
  assert.deepEqual(actual.value, 'bar25', 'Value to property: bar25');
});

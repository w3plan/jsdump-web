/**
 * JSDump for web browsers
 *  
 * (c) Copyright 2020-present Richard Li <richard.li@w3plan.net>
 * License: MIT
 */

(function(){
"use strict";

/**
 * Base function
 * @private
 *
 */
var main = function() {
  /**
   * Library
   * @private
   *
   */
  var lib = {
    WEB_BLT_OBJS: [],
    
    WEB_BLT_OBJ_KEYS: [
      'length',
      'name',
      'arguments',
      'caller',
      '__defineGetter__',
      '__defineSetter__',
      '__lookupGetter__',
      '__lookupSetter__'
    ],
    
    typeCheck: {
      // The constructor is Object
      isObject(val) { 
        return typeof val === 'object' && 
               Object.prototype.toString.call(val).slice(8, -1) === 'Object';
      },
      // The constructor is Object
      isEmptyObject(val) { 
        return typeof val === 'object' && 
               Object.prototype.toString.call(val).slice(8, -1) === 'Object' &&
               Reflect.ownKeys(val).length === 0;
      },
      // The constructor is Function
      isFunction(val) {
        return typeof val === 'function' && 
               Object.prototype.toString.call(val).slice(8, -1) === 'Function' &&
               val.toString().substring(0, 5) !== 'class';
      },      
      // The constructor is Function
      isClass(val) {
        return typeof val === 'function' && 
               Object.prototype.toString.call(val).slice(8, -1) === 'Function' && 
               val.toString().substring(0, 5) === 'class';
      },      
      isIterableFunction(val) {
        return typeof val === 'function' && 
               Object.prototype.toString.call(val).slice(8, -1) === 'Function' && 
               ( typeof val[Symbol.iterator] === 'function' || 
                 typeof val[Symbol.asyncIterator] === 'function'
                );
      },      
      isAnonymousFunction(val) {
        return typeof val === 'function' && 
               Object.prototype.toString.call(val).slice(8, -1) === 'Function' && 
               val.toString().substring(0, 5) !== 'class' &&
               val.name === '';
      },
      isAnonymousClass(val) {
        return typeof val === 'function' && 
               Object.prototype.toString.call(val).slice(8, -1) === 'Function' && 
               val.toString().substring(0, 5) === 'class' &&
               val.name === '';
      },      
      isArray(val) {
        return Array.isArray(val)
      },  
      isEmptyArray(val) {
        return Array.isArray(val) &&
               val.length === 0;
      },    
      isError(val) {
        return val instanceof Error && 
               typeof val.message !== 'undefined';
      },
      isPrimitive (val) {
        return (Object(val) !== val);
      },      
      // A primitive type, not a Boolean object
      isBoolean(val) {
        return typeof val === "boolean" && 
               !(val instanceof Boolean);
      },      
      // A primitive type, not a Number object
      isNumber(val) {
        return typeof val === "number" && 
               !isNaN(val) && 
               !(val instanceof Number);
      },      
      // A primitive type
      isFloat(val) {
        return typeof val === "number" && 
               !isNaN(val) && 
               !(val instanceof Number) &&
               val % 1 !== 0;
      },      
      // A primitive type
      isInteger(val) {
        return typeof val === "number" && 
               !isNaN(val) && 
               !(val instanceof Number) &&
               Number.isInteger(val);
      },
      // A primitive type
      isSafeInteger(val) {
        return typeof val === "number" && 
               !isNaN(val) && 
               !(val instanceof Number) &&
               Number.isSafeInteger(val);
      },        
      // A primitive type, not a String object
      isString(val) {
        return typeof val === "string" && 
               !(val instanceof String);
      },      
      // A primitive type, not a Symbol object
      isSymbol(val) {
        return typeof val === 'symbol' && 
               !(val instanceof Symbol);
      },      
      // A primitive type
      isundefined(val) {
        return val === undefined;
      },      
      // null is a primitive type
      isnull(val) {
        return val === null;
      },
      hasPrototype(val) {
        return !!val.prototype;
      },
      // polyfill
      isBooleanObject(val) {
        return val instanceof Boolean && 
               Object.prototype.toString.call(val).slice(8, -1) === 'Boolean';
      },
      isNumberObject(val) {
        return val instanceof Number &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Number';
      },
      isStringObject(val) {
        return val instanceof String &&
               Object.prototype.toString.call(val).slice(8, -1) === 'String';
      },
      isSymbolObject(val) {
        return val instanceof Symbol &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Symbol';
      },
      isBoxedPrimitive(val) {
        return lib.typeCheck.isBooleanObject(val) ||
               lib.typeCheck.isNumberObject(val) ||
               lib.typeCheck.isStringObject(val) ||
               lib.typeCheck.isSymbolObject(val);
      },
      isGeneratorObject(val) {
        return Object.prototype.toString.call(val).slice(8, -1) === 'Generator';
      }, 
      isArgumentsObject(val) {
        return Object.prototype.toString.call(val).slice(8, -1) === 'Arguments';
      },
      isDate(val) {
        return val instanceof Date &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Date';
      },
      isRegExp(val) {
        return val instanceof RegExp &&
               Object.prototype.toString.call(val).slice(8, -1) === 'RegExp';
      },
      isMap(val) {
        return val instanceof Map &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Map';
      },
      isMapIterator(val) {
        return Object.prototype.toString.call(val).slice(8, -1) === 'Map Iterator';
      },
      isWeakMap(val) {
        return Object.prototype.toString.call(val).slice(8, -1) === 'WeakMap';
      },
      isSet(val) {
        return val instanceof Set &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Set';
      },
      isSetIterator(val) {
        return Object.prototype.toString.call(val).slice(8, -1) === 'Set Iterator';
      },
      isWeakSet(val) {
        return Object.prototype.toString.call(val).slice(8, -1) === 'WeakSet';
      },
      isPromise(val) {
        return Object.prototype.toString.call(val).slice(8, -1) === 'Promise';
      },
      isInt8Array(val) {
        return val instanceof Int8Array &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Int8Array';
      },
      isInt16Array(val) {
        return val instanceof Int16Array &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Int16Array';
      },
      isInt32Array(val) {
        return val instanceof Int32Array &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Int32Array';
      },
      isFloat32Array(val) {
        return val instanceof Float32Array &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Float32Array';
      },
      isFloat64Array(val) {
        return val instanceof Float64Array &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Float64Array';
      },
      isUint8Array(val) {
        return val instanceof Uint8Array &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Uint8Array';
      },
      isUint8ClampedArray(val) {
        return val instanceof Uint8ClampedArray &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Uint8ClampedArray';
      },
      isUint16Array(val) {
        return val instanceof Uint16Array &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Uint16Array';
      },
      isUint32Array(val) {
        return val instanceof Uint32Array &&
               Object.prototype.toString.call(val).slice(8, -1) === 'Uint32Array';
      },
      isDataView(val) {
        return val instanceof DataView &&
               Object.prototype.toString.call(val).slice(8, -1) === 'DataView';
      },
      isAsyncFunction(val) {
        return Object.prototype.toString.call(val).slice(8, -1) === 'AsyncFunction';
      },
      isGeneratorFunction(val) {
        return Object.prototype.toString.call(val).slice(8, -1) === 'GeneratorFunction';
      }
    }
  };
  
  var WEB_CHECK_FUNCS = [lib.typeCheck.isundefined,lib.typeCheck.isnull,lib.typeCheck.isBoolean,lib.typeCheck.isNumber,lib.typeCheck.isFloat,lib.typeCheck.isSafeInteger,lib.typeCheck.isInteger,lib.typeCheck.isString,lib.typeCheck.isSymbol,lib.typeCheck.isPrimitive,lib.typeCheck.isEmptyObject,lib.typeCheck.isBooleanObject,lib.typeCheck.isNumberObject,lib.typeCheck.isStringObject,lib.typeCheck.isSymbolObject,lib.typeCheck.isBoxedPrimitive,lib.typeCheck.isGeneratorObject,lib.typeCheck.isArgumentsObject,lib.typeCheck.isDate,lib.typeCheck.isRegExp,lib.typeCheck.isEmptyArray,lib.typeCheck.isArray,lib.typeCheck.isMap,lib.typeCheck.isMapIterator,lib.typeCheck.isWeakMap,lib.typeCheck.isSet,lib.typeCheck.isSetIterator,lib.typeCheck.isWeakSet,lib.typeCheck.isPromise,lib.typeCheck.isInt8Array,lib.typeCheck.isInt16Array,lib.typeCheck.isInt32Array,lib.typeCheck.isFloat32Array,lib.typeCheck.isFloat64Array,lib.typeCheck.isUint8Array,lib.typeCheck.isUint8ClampedArray,lib.typeCheck.isUint16Array,lib.typeCheck.isUint32Array,lib.typeCheck.isDataView,lib.typeCheck.isAnonymousClass,lib.typeCheck.isClass,lib.typeCheck.isAsyncFunction,lib.typeCheck.isGeneratorFunction,lib.typeCheck.isIterableFunction,lib.typeCheck.isAnonymousFunction,lib.typeCheck.isFunction,lib.typeCheck.isError,lib.typeCheck.isObject];
  
  try {
    lib.WEB_BLT_OBJS=[Object,Function,Boolean,Symbol,Number,Date,String,RegExp,Array,Map,Set,WeakMap,WeakSet,Promise,DataView,Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,Error,EvalError,RangeError,ReferenceError,SyntaxError,TypeError,URIError,AbortSignal,AnalyserNode,Attr,Audio,AudioBuffer,AudioBufferSourceNode,AudioContext,AudioDestinationNode,AudioListener,AudioNode,AudioParam,AudioProcessingEvent,AuthenticatorAssertionResponse,AuthenticatorAttestationResponse,AuthenticatorResponse,BarProp,BeforeUnloadEvent,BiquadFilterNode,Blob,ByteLengthQueuingStrategy,CDATASection,CSS,CSSConditionRule,CSSFontFaceRule,CSSGroupingRule,CSSImportRule,CSSKeyframeRule,CSSKeyframesRule,CSSMediaRule,CSSNamespaceRule,CSSPageRule,CSSRule,CSSRuleList,CSSStyleDeclaration,CSSStyleRule,CSSStyleSheet,CSSSupportsRule,Cache,CacheStorage,CanvasGradient,CanvasPattern,CanvasRenderingContext2D,ChannelMergerNode,ChannelSplitterNode,CharacterData,CloseEvent,Comment,CompositionEvent,ConvolverNode,CountQueuingStrategy,Credential,CredentialsContainer,Crypto,CryptoKey,CustomEvent,DOMException,DOMImplementation,DOMParser,DOMStringList,DOMStringMap,DOMTokenList,DataTransfer,DataTransferItem,DataTransferItemList,DelayNode,Document,DocumentFragment,DocumentType,DragEvent,DynamicsCompressorNode,Element,ErrorEvent,Event,EventTarget,File,FileList,FileReader,FocusEvent,FormData,GainNode,Gamepad,GamepadButton,GamepadEvent,GamepadHapticActuator,HTMLAllCollection,HTMLAnchorElement,HTMLAreaElement,HTMLAudioElement,HTMLBRElement,HTMLBaseElement,HTMLBodyElement,HTMLButtonElement,HTMLCanvasElement,HTMLCollection,HTMLDListElement,HTMLDataElement,HTMLDataListElement,HTMLDirectoryElement,HTMLDivElement,HTMLDocument,HTMLElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormControlsCollection,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHRElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLLIElement,HTMLLabelElement,HTMLLegendElement,HTMLLinkElement,HTMLMapElement,HTMLMarqueeElement,HTMLMediaElement,HTMLMenuElement,HTMLMetaElement,HTMLMeterElement,HTMLModElement,HTMLOListElement,HTMLObjectElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOptionsCollection,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPictureElement,HTMLPreElement,HTMLProgressElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableCaptionElement,HTMLTableCellElement,HTMLTableColElement,HTMLTableElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTemplateElement,HTMLTextAreaElement,HTMLTimeElement,HTMLTitleElement,HTMLTrackElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement,HashChangeEvent,Headers,History,IDBCursor,IDBCursorWithValue,IDBDatabase,IDBFactory,IDBIndex,IDBKeyRange,IDBObjectStore,IDBOpenDBRequest,IDBRequest,IDBTransaction,IDBVersionChangeEvent,IIRFilterNode,Image,ImageData,IntersectionObserver,IntersectionObserverEntry,KeyboardEvent,Location,MediaDeviceInfo,MediaDevices,MediaElementAudioSourceNode,MediaEncryptedEvent,MediaError,MediaKeyMessageEvent,MediaKeySession,MediaKeyStatusMap,MediaKeySystemAccess,MediaKeys,MediaList,MediaQueryList,MediaSource,MediaStream,MediaStreamEvent,MediaStreamTrack,MediaStreamTrackEvent,MessageChannel,MessageEvent,MessagePort,MimeType,MimeTypeArray,MouseEvent,MutationEvent,MutationObserver,MutationRecord,NamedNodeMap,Navigator,Node,NodeIterator,NodeList,Notification,OfflineAudioCompletionEvent,OfflineAudioContext,Option,OscillatorNode,PageTransitionEvent,PannerNode,Path2D,Performance,PerformanceEntry,PerformanceMark,PerformanceMeasure,PerformanceNavigation,PerformanceResourceTiming,PerformanceTiming,PeriodicWave,Plugin,PluginArray,PointerEvent,PopStateEvent,ProcessingInstruction,ProgressEvent,PublicKeyCredential,PushManager,PushSubscription,PushSubscriptionOptions,RTCIceCandidate,RTCPeerConnection,RTCPeerConnectionIceEvent,RTCRtpReceiver,RTCRtpSender,RTCSessionDescription,RadioNodeList,Range,ReadableStream,Request,Response,SVGAElement,SVGAngle,SVGAnimatedAngle,SVGAnimatedBoolean,SVGAnimatedEnumeration,SVGAnimatedInteger,SVGAnimatedLength,SVGAnimatedLengthList,SVGAnimatedNumber,SVGAnimatedNumberList,SVGAnimatedPreserveAspectRatio,SVGAnimatedRect,SVGAnimatedString,SVGAnimatedTransformList,SVGCircleElement,SVGClipPathElement,SVGComponentTransferFunctionElement,SVGDefsElement,SVGDescElement,SVGElement,SVGEllipseElement,SVGFEBlendElement,SVGFEColorMatrixElement,SVGFEComponentTransferElement,SVGFECompositeElement,SVGFEConvolveMatrixElement,SVGFEDiffuseLightingElement,SVGFEDisplacementMapElement,SVGFEDistantLightElement,SVGFEFloodElement,SVGFEFuncAElement,SVGFEFuncBElement,SVGFEFuncGElement,SVGFEFuncRElement,SVGFEGaussianBlurElement,SVGFEImageElement,SVGFEMergeElement,SVGFEMergeNodeElement,SVGFEMorphologyElement,SVGFEOffsetElement,SVGFEPointLightElement,SVGFESpecularLightingElement,SVGFESpotLightElement,SVGFETileElement,SVGFETurbulenceElement,SVGFilterElement,SVGForeignObjectElement,SVGGElement,SVGGradientElement,SVGGraphicsElement,SVGImageElement,SVGLength,SVGLengthList,SVGLineElement,SVGLinearGradientElement,SVGMarkerElement,SVGMaskElement,SVGMatrix,SVGMetadataElement,SVGNumber,SVGNumberList,SVGPathElement,SVGPatternElement,SVGPoint,SVGPointList,SVGPolygonElement,SVGPolylineElement,SVGPreserveAspectRatio,SVGRadialGradientElement,SVGRect,SVGRectElement,SVGSVGElement,SVGScriptElement,SVGStopElement,SVGStringList,SVGStyleElement,SVGSwitchElement,SVGSymbolElement,SVGTSpanElement,SVGTextContentElement,SVGTextElement,SVGTextPathElement,SVGTextPositioningElement,SVGTitleElement,SVGTransform,SVGTransformList,SVGUnitTypes,SVGUseElement,SVGViewElement,Screen,ScriptProcessorNode,SecurityPolicyViolationEvent,Selection,ServiceWorker,ServiceWorkerContainer,ServiceWorkerRegistration,SourceBuffer,SourceBufferList,SpeechSynthesisEvent,SpeechSynthesisUtterance,StaticRange,StereoPannerNode,Storage,StorageEvent,StyleSheet,StyleSheetList,SubtleCrypto,Text,TextMetrics,TextTrack,TextTrackCue,TextTrackCueList,TextTrackList,TimeRanges,TrackEvent,TransitionEvent,TreeWalker,UIEvent,URL,URLSearchParams,ValidityState,VideoPlaybackQuality,WaveShaperNode,WebGLActiveInfo,WebGLBuffer,WebGLContextEvent,WebGLFramebuffer,WebGLProgram,WebGLRenderbuffer,WebGLRenderingContext,WebGLShader,WebGLShaderPrecisionFormat,WebGLTexture,WebGLUniformLocation,WebKitCSSMatrix,WebSocket,WheelEvent,Window,Worker,XMLDocument,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,XMLSerializer,XPathEvaluator,XPathExpression,XPathResult];
  } catch (er) {
    console.log('JSDump-Web requires the browser supporting for ES6 (ECMAScript 2015)');
  }
  
  /**
   * Checks an object whether is a prototype of Browser standard built-in object.
   * 
   * @param {object} val - An object which should checked
   * @return {string|boolean}   A description string or false if the object isn't a prototype of standard built-in object
   */
  function checkWebBuiltin(obj) {
    
    for (let i = 0; i < lib.WEB_BLT_OBJS.length; i++) {
      
      if ( lib.WEB_BLT_OBJS[i].prototype && 
           lib.WEB_BLT_OBJS[i].prototype === obj
      ) {
        return "Browser standard built-in object: " + lib.WEB_BLT_OBJS[i].name;
      }
    }
    
    return false;
  }

  /**
   * returns a array includes 'configurable', 'enumerable', 'writable', 
   * 'getter', or 'setter' attributes when thge values of attribute are trure.
   * 
   * @param {object} flag - A property descriptor
   * @return {array}   An array of attributes
   */
  function getAttributes1(flag) {
    var attrs = [];

    if (flag.configurable) {
      attrs.push('configurable');
    }

    if (flag.enumerable) {
      attrs.push('enumerable');
    }

    if (flag.writable) {
      attrs.push('writable');
    }

    if (flag.get && lib.typeCheck.isFunction(flag.get)) {
      attrs.push('getter');
    }
    
    if (flag.set && lib.typeCheck.isFunction(flag.set)) {
      attrs.push('setter');
    }
    
    return attrs;
  }

  /**
   * Returns an array includes 'extensible', 'sealed' or 'frozen' attributes 
   * when the object is extensible, sealed or frozen.
   * 
   * @param {object} obj - An object which should be checked
   * @return {array}   An array of attributes
   */
  function getAttributes2(obj) {
    var attrs = [];
    
    if (Object.isExtensible(obj)) {
      attrs.push('extensible');
    }

    if (Object.isSealed(obj)) {
      attrs.push('sealed');
    }

    if (Object.isFrozen(obj)) {
      attrs.push('frozen');
    }
    
    return attrs;
  }

  /**
   * Returns an array of roperty types.
   * 
   * @param {object} obj - An object which should be checked
   * @return {array}   An array of property types
   */
  function getTypes(obj) {
    return WEB_CHECK_FUNCS.reduce((types, func) => {
    
      if (func.name && func(obj)) 
        types.push( func.name.substring( func.name.indexOf("is") + 2 ) );

      return types;
    }, []);
  }
  
  /**
   * Gets the instance of the given object.
   * 
   * @param {object} val - An object which should be instanced
   * @return {object}   An instance of the object 
   */
  function getNewObject(val) {

    if ( !lib.typeCheck.hasPrototype(val) ) {
      return undefined;
    }
    
    try {
      var obj = new val();
    } catch (er) {
      return undefined;
    }

    return obj;
  }

  /**
   * Gets entries infomation from a given object.
   * 
   * @param {object} obj - An object which should be processed
   * @param {array} hdKeys - An array of the given properties which should be not ignored in the entries 
   * @return {array}   An array of entry objects 
   */
  function getEntries(obj, hdKeys) {
    var keys = Reflect.ownKeys(obj);
    var bypassKeys = lib.WEB_BLT_OBJ_KEYS;
    
    if (Array.isArray(hdKeys) && hdKeys.length > 0) {
      bypassKeys = [...new Set([...bypassKeys, ...hdKeys])];
    }
    
    return keys.reduce((acc, key) => {
      
      if (bypassKeys.includes(key)) {
        /* bypass properties in dumped out contents */
      } else {
        var entry = {key};
        var descriptor = Object.getOwnPropertyDescriptor(obj, key);
        
        if (descriptor) {
          
          entry.attributes = getAttributes1(descriptor);
          
          if ( descriptor.value !== undefined && 
               descriptor.value !== null
          ) {

            if ( !lib.typeCheck.isPrimitive(descriptor.value) ) {
              entry.attributes = entry.attributes.concat(getAttributes2(descriptor.value));
            }
            
            entry.types = getTypes(descriptor.value);

            if (entry.types.length === 0) entry.types = ['Others'];
            
            if (descriptor.value.constructor) {
              entry.constructor = descriptor.value.constructor.name;
            }
            
            entry.value = descriptor.value;
            
            entry.valueSerialized = false;
            
            if ( descriptor.value.prototype !== undefined && 
                 descriptor.value.prototype !== null &&
                 descriptor.value.prototype.constructor
            ) {
              entry.valuePrototypeConstructor = descriptor.value.prototype.constructor.name;
            }
            
          }
        }

        acc.push(entry);
      }
      
      return acc;
    }, []);
  }

  /**
   * Returns an object that includes dumped out content from the given object.
   * 
   * @param {object} obj - An object which should be processed
   * @param {array} hdKeys - An array of the given properties which should be ignored in the result 
   * @return {object}   An object of dumped out content
   */
  this.entriesObj = function(obj, hiddenKeys = []) {
  
    if (lib.typeCheck.isPrimitive(obj))
      return null;
    
    var entries = {};
    
    entries.ownEntries = getEntries(obj, hiddenKeys);
    
    var objProto1 = Object.getPrototypeOf(obj);
    
    if (objProto1) {
      const jsBlt1 = checkWebBuiltin(objProto1);
      
      if (jsBlt1) {
        entries.inheritedEntries = jsBlt1;
      } else {
        entries.inheritedEntries = getEntries(objProto1, hiddenKeys);
      }
    }
    
    if (lib.typeCheck.hasPrototype(obj)) {
      entries.prototypeOwnEntries = getEntries(obj.prototype, hiddenKeys);
      
      var objProto2 = Object.getPrototypeOf(obj.prototype);

      if (objProto2) {
        const jsBlt2 = checkWebBuiltin(objProto2);
        
        if (jsBlt2) {
          entries.prototypeIheritedEntries = jsBlt2;
        } else {
          entries.prototypeIheritedEntries = getEntries(objProto2, hiddenKeys);
        }
      }
    }
    
    const newObj = getNewObject(obj);
    
    if (newObj) {
      entries.instanceOwnEntries = getEntries(newObj, hiddenKeys);
    }
    
    return entries;
  }
};

/**
 * Resources
 * @private
 *
 */
var resrc = {
  name: 'JSDump-Web',
  features: 'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes',
  htmlHead: '<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><title>JSDump-Web</title>',
  htmlMid: '</head><body>',
  htmlFoot2: '</body><footer class="w3-container"><p style="text-align:right">Powered by JSDump-Web</p></footer></html>',
  htmlFoot1: '</body></html>',
  blockHeadStart2: '<div class="w3-container w3-grey" style="position:relative"><p class="w3-large w3-text-white" style="margin-left:20px;ext-shadow:1px 1px 0 #444">',
  blockHeadEnd2: '</p></div>',
  blockContentStart2: '<div class="w3-section w3-container"><div class="w3-card-4"><div class="w3-container w3-white"><pre class="language-js"><code>',
  blockContentEnd2: '</code></pre></div></div></div>',
  blockHeadStart1: '<p style="font-weight:bold">',
  blockHeadEnd1: '</p>',
  blockContentStart1: '<pre style="white-space:pre-wrap"><code>',
  blockContentEnd1: '</code></pre>',
  css: '<style>body,.w3-container{width:94%;margin-left:3%;}.w3-container:after,.w3-container:before,.w3-panel:after,.w3-panel:before,.w3-row:after,.w3-row:before,.w3-row-padding:after,.w3-row-padding:before,.w3-cell-row:before,.w3-cell-row:after,.w3-clear:after,.w3-clear:before,.w3-bar:before,.w3-bar:after{content:"";display:table;clear:both}.w3-section,.w3-code{margin-top:16px!important;margin-bottom:16px!important}.w3-grey,.w3-hover-grey:hover,.w3-gray,.w3-hover-gray:hover{color:#000!important;background-color:#9e9e9e!important}.w3-card-4,.w3-hover-shadow:hover{box-shadow:0 4px 10px 0 rgba(0,0,0,0.2),0 4px 20px 0 rgba(0,0,0,0.19)}.w3-white,.w3-hover-white:hover{color:#000!important;background-color:#fff!important}.w3-large{font-size:18px!important}.w3-text-white,.w3-hover-text-white:hover{color:#fff!important}.language-js{white-space:pre-wrap}</style>',
  js: ''
};

/** 
 * Base function 
 * @private * 
*/
var pkg = function() {
  /*
    Copyright (c) 2014, Yahoo! Inc. All rights reserved.
    Copyrights licensed under the New BSD License.
    See the accompanying LICENSE file for terms.
  */
  
  // Generate an internal UID to make the regexp pattern harder to guess.
  var UID                 = Math.floor(Math.random() * 0x10000000000).toString(16);
  var PLACE_HOLDER_REGEXP = new RegExp('"@__(F|R|D|M|S|U|I)-' + UID + '-(\\d+)__@"', 'g');

  var IS_NATIVE_CODE_REGEXP = /\{\s*\[native code\]\s*\}/g;
  var IS_PURE_FUNCTION = /function.*?\(/;
  var IS_ARROW_FUNCTION = /.*?=>.*?/;
  var UNSAFE_CHARS_REGEXP   = /[<>\/\u2028\u2029]/g;

  var RESERVED_SYMBOLS = ['*', 'async'];

  // Mapping of unsafe HTML and invalid JavaScript line terminator chars to their
  // Unicode char counterparts which are safe to use in JavaScript strings.
  var ESCAPED_CHARS = {
    '<'     : '\\u003C',
    '>'     : '\\u003E',
    '/'     : '\\u002F',
    '\u2028': '\\u2028',
    '\u2029': '\\u2029'
  };

  function escapeUnsafeChars(unsafeChar) {
    return ESCAPED_CHARS[unsafeChar];
  }

  function deleteFunctions(obj){
    var functionKeys = [];
    for (var key in obj) {
      if (typeof obj[key] === "function") {
        functionKeys.push(key);
      }
    }
    for (var i = 0; i < functionKeys.length; i++) {
      delete obj[functionKeys[i]];
    }
  }

  return function serialize(obj, options) {
    options || (options = {});

    // Backwards-compatibility for space as the second argument.
    if (typeof options === 'number' || typeof options === 'string') {
      options = {space: options};
    }

    var functions = [];
    var regexps   = [];
    var dates     = [];
    var maps      = [];
    var sets      = [];
    var undefs    = [];
    var infinities= [];

    // Returns placeholders for functions and regexps (identified by index)
    // which are later replaced by their string representation.
    function replacer(key, value) {

      // For nested function
      if(options.ignoreFunction){
          deleteFunctions(value);
      }

      if (!value && value !== undefined) {
          return value;
      }

      // If the value is an object w/ a toJSON method, toJSON is called before
      // the replacer runs, so we use this[key] to get the non-toJSONed value.
      var origValue = this[key];
      var type = typeof origValue;

      if (type === 'object') {
        if(origValue instanceof RegExp) {
          return '@__R-' + UID + '-' + (regexps.push(origValue) - 1) + '__@';
        }

        if(origValue instanceof Date) {
          return '@__D-' + UID + '-' + (dates.push(origValue) - 1) + '__@';
        }

        if(origValue instanceof Map) {
          return '@__M-' + UID + '-' + (maps.push(origValue) - 1) + '__@';
        }

        if(origValue instanceof Set) {
          return '@__S-' + UID + '-' + (sets.push(origValue) - 1) + '__@';
        }
      }

      if (type === 'function') {
        return '@__F-' + UID + '-' + (functions.push(origValue) - 1) + '__@';
      }

      if (type === 'undefined') {
        return '@__U-' + UID + '-' + (undefs.push(origValue) - 1) + '__@';
      }

      if (type === 'number' && !isNaN(origValue) && !isFinite(origValue)) {
        return '@__I-' + UID + '-' + (infinities.push(origValue) - 1) + '__@';
      }

      return value;
    }

    function serializeFunc(fn) {
      var serializedFn = fn.toString();
      if (IS_NATIVE_CODE_REGEXP.test(serializedFn)) {
        throw new TypeError('Serializing native function: ' + fn.name);
      }

      // pure functions, example: {key: function() {}}
      if(IS_PURE_FUNCTION.test(serializedFn)) {
        return serializedFn;
      }

      // arrow functions, example: arg1 => arg1+5
      if(IS_ARROW_FUNCTION.test(serializedFn)) {
        return serializedFn;
      }

      var argsStartsAt = serializedFn.indexOf('(');
      var def = serializedFn.substr(0, argsStartsAt)
                .trim()
                .split(' ')
                .filter(function(val) { return val.length > 0 });

      var nonReservedSymbols = def.filter(function(val) {
        return RESERVED_SYMBOLS.indexOf(val) === -1
      });

      // enhanced literal objects, example: {key() {}}
      if(nonReservedSymbols.length > 0) {
        return (def.indexOf('async') > -1 ? 'async ' : '') + 'function'
               + (def.join('').indexOf('*') > -1 ? '*' : '')
               + serializedFn.substr(argsStartsAt);
      }

      // arrow functions
      return serializedFn;
    }

    // Check if the parameter is function
    if (options.ignoreFunction && typeof obj === "function") {
      obj = undefined;
    }
    // Protects against 'JSON.stringify()' returning 'undefined', by serializing
    // to the literal string: "undefined".
    if (obj === undefined) {
      return String(obj);
    }

    var str;

    // Creates a JSON string representation of the value.
    // NOTE: Node 0.12 goes into slow mode with extra JSON.stringify() args.
    if (options.isJSON && !options.space) {
      str = JSON.stringify(obj);
    } else {
      str = JSON.stringify(obj, options.isJSON ? null : replacer, options.space);
    }

    // Protects against 'JSON.stringify()' returning 'undefined', by serializing
    // to the literal string: "undefined".
    if (typeof str !== 'string') {
      return String(str);
    }

    // Replace unsafe HTML and invalid JavaScript line terminator chars with
    // their safe Unicode char counterpart. This _must_ happen before the
    // regexps and functions are serialized and added back to the string.
    if (options.unsafe !== true) {
      str = str.replace(UNSAFE_CHARS_REGEXP, escapeUnsafeChars);
    }

    if ( functions.length === 0 && 
         regexps.length === 0 && 
         dates.length === 0 && 
         maps.length === 0 && 
         sets.length === 0 && 
         undefs.length === 0 && 
         infinities.length === 0
    ) {
      return str;
    }

    // Replaces all occurrences of function, regexp, date, map and set placeholders in the
    // JSON string with their string representations. If the original value can
    // not be found, then 'undefined' is used.
    return str.replace(PLACE_HOLDER_REGEXP, function (match, type, valueIndex) {
      if (type === 'D') {
        return "new Date(\"" + dates[valueIndex].toISOString() + "\")";
      }

      if (type === 'R') {
        return "new RegExp(" + serialize(regexps[valueIndex].source) + ", \"" + regexps[valueIndex].flags + "\")";
      }

      if (type === 'M') {
        return "new Map(" + serialize(Array.from(maps[valueIndex].entries()), options) + ")";
      }

      if (type === 'S') {
        return "new Set(" + serialize(Array.from(sets[valueIndex].values()), options) + ")";
      }

      if (type === 'U') {
        return 'undefined'
      }

      if (type === 'I') {
        return infinities[valueIndex];
      }

      var fn = functions[valueIndex];

      return serializeFunc(fn);
    });
  }
};

/** 
 * Base function 
 * @private
 * @license MIT
 */
var utins = function() {
  /**
   * Echos the value of a value. Trys to print the value out
   * in the best way possible given the different types.
   *
   * @param {Object} obj The object to print out.
   * @param {Object} opts Optional options object that alters the output.
   */
  function inspect(obj, opts) {
    // default options
    var ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    // legacy...
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean(opts)) {
      // legacy...
      ctx.showHidden = opts;
    } else if (opts) {
      // got an "options" object
      _extend(ctx, opts);
    }
    // set default options
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }

  // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
  inspect.colors = {
    'bold' : [1, 22],
    'italic' : [3, 23],
    'underline' : [4, 24],
    'inverse' : [7, 27],
    'white' : [37, 39],
    'grey' : [90, 39],
    'black' : [30, 39],
    'blue' : [34, 39],
    'cyan' : [36, 39],
    'green' : [32, 39],
    'magenta' : [35, 39],
    'red' : [31, 39],
    'yellow' : [33, 39]
  };

  // Don't use 'blue' not visible on cmd.exe
  inspect.styles = {
    'special': 'blue',
    'number': 'magenta',
    'boolean': 'magenta',
    'undefined': 'grey',
    'null': 'bold',
    'string': 'green',
    'date': 'magenta',
    // "name": intentionally not styling
    'regexp': 'red'
  };

  function stylizeNoColor(str, styleType) {
    return str;
  }

  function isBoolean(arg) {
    return typeof arg === 'boolean';
  }

  function isUndefined(arg) {
    return arg === void 0;
  }

  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];

    if (style) {
      return '\u001b[' + inspect.colors[style][0] + 'm' + str +
             '\u001b[' + inspect.colors[style][1] + 'm';
    } else {
      return str;
    }
  }

  function isFunction(arg) {
    return typeof arg === 'function';
  }

  function isString(arg) {
    return typeof arg === 'string';
  }

  function isNumber(arg) {
    return typeof arg === 'number';
  }

  function isNull(arg) {
    return arg === null;
  }

  function hasOwn(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }

  function isRegExp(re) {
    return isObject(re) && objectToString(re) === '[object RegExp]';
  }

  function isObject(arg) {
    return typeof arg === 'object' && arg !== null;
  }

  function isError(e) {
    return isObject(e) &&
        (objectToString(e) === '[object Error]' || e instanceof Error);
  }

  function isDate(d) {
    return isObject(d) && objectToString(d) === '[object Date]';
  }

  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }

  function arrayToHash(array) {
    var hash = {};

    array.forEach(function(val, idx) {
      hash[val] = true;
    });

    return hash;
  }

  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwn(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            String(i), true));
      } else {
        output.push('');
      }
    }
    keys.forEach(function(key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
            key, true));
      }
    });
    return output;
  }

  function formatError(value) {
    return '[' + Error.prototype.toString.call(value) + ']';
  }

  function formatValue(ctx, value, recurseTimes) {
    // Provide a hook for user-specified inspect functions.
    // Check that value is an object with an inspect function on it
    if (ctx.customInspect &&
        value &&
        isFunction(value.inspect) &&
        // Filter out the util module, it's inspect function is special
        value.inspect !== inspect &&
        // Also filter out any prototype objects using the circular check.
        !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }

    // Primitive types cannot have properties
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }

    // Look up the keys of the object.
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);

    try {
      if (ctx.showHidden && Object.getOwnPropertyNames) {
        keys = Object.getOwnPropertyNames(value);
      }
    } catch (e) {
      // ignore
    }

    // IE doesn't make error fields non-enumerable
    // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
    if (isError(value)
        && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
      return formatError(value);
    }

    // Some type of object without properties can be shortcutted.
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ': ' + value.name : '';
        return ctx.stylize('[Function' + name + ']', 'special');
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), 'date');
      }
      if (isError(value)) {
        return formatError(value);
      }
    }

    var base = '', array = false, braces = ['{', '}'];

    // Make Array say that they are Array
    if (Array.isArray(value)) {
      array = true;
      braces = ['[', ']'];
    }

    // Make functions say that they are functions
    if (isFunction(value)) {
      var n = value.name ? ': ' + value.name : '';
      base = ' [Function' + n + ']';
    }

    // Make RegExps say that they are RegExps
    if (isRegExp(value)) {
      base = ' ' + RegExp.prototype.toString.call(value);
    }

    // Make dates with properties first say the date
    if (isDate(value)) {
      base = ' ' + Date.prototype.toUTCString.call(value);
    }

    // Make error with message first say the error
    if (isError(value)) {
      base = ' ' + formatError(value);
    }

    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }

    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
      } else {
        return ctx.stylize('[Object]', 'special');
      }
    }

    ctx.seen.push(value);

    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function(key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }

    ctx.seen.pop();

    return reduceToSingleString(output, base, braces);
  }

  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = { value: void 0 };
    try {
      // ie6 › navigator.toString
      // throws Error: Object doesn't support this property or method
      desc.value = value[key];
    } catch (e) {
      // ignore
    }
    try {
      // ie10 › Object.getOwnPropertyDescriptor(window.location, 'hash')
      // throws TypeError: Object doesn't support this action
      if (Object.getOwnPropertyDescriptor) {
        desc = Object.getOwnPropertyDescriptor(value, key) || desc;
      }
    } catch (e) {
      // ignore
    }
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize('[Getter/Setter]', 'special');
      } else {
        str = ctx.stylize('[Getter]', 'special');
      }
    } else {
      if (desc.set) {
        str = ctx.stylize('[Setter]', 'special');
      }
    }
    if (!hasOwn(visibleKeys, key)) {
      name = '[' + key + ']';
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf('\n') > -1) {
          if (array) {
            str = str.split('\n').map(function(line) {
              return '  ' + line;
            }).join('\n').substr(2);
          } else {
            str = '\n' + str.split('\n').map(function(line) {
              return '   ' + line;
            }).join('\n');
          }
        }
      } else {
        str = ctx.stylize('[Circular]', 'special');
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify('' + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, 'name');
      } else {
        name = name.replace(/'/g, "\\'")
                   .replace(/\\"/g, '"')
                   .replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, 'string');
      }
    }

    return name + ': ' + str;
  }

  function formatPrimitive(ctx, value) {
    if (isUndefined(value))
      return ctx.stylize('undefined', 'undefined');
    if (isString(value)) {
      var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                               .replace(/'/g, "\\'")
                                               .replace(/\\"/g, '"') + '\'';
      return ctx.stylize(simple, 'string');
    }
    if (isNumber(value))
      return ctx.stylize('' + value, 'number');
    if (isBoolean(value))
      return ctx.stylize('' + value, 'boolean');
    // For some reason typeof null is "object", so special case here.
    if (isNull(value))
      return ctx.stylize('null', 'null');
  }

  function reduceToSingleString(output, base, braces) {
    var numLinesEst = 0;
    var length = output.reduce(function(prev, cur) {
      numLinesEst++;
      if (cur.indexOf('\n') >= 0) numLinesEst++;
      return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
    }, 0);

    if (length > 60) {
      return braces[0] +
             (base === '' ? '' : base + '\n ') +
             ' ' +
             output.join(',\n  ') +
             ' ' +
             braces[1];
    }

    return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
  }

  function _extend(origin, add) {
    // Don't do anything if add isn't an object
    if (!add || !isObject(add)) return origin;

    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  
  return inspect;
};

/**
 * Derived function
 * @private
 */
var jsdump = function(version) {

  this.NAME = "JSDump-Web";
  this.DESCRIPTION = "JSDump for web browser " + version;
  
  /**
   * The array of dumped out object properties
   */
  var dumProps = [ 
      'ownEntries', 
      'inheritedEntries', 
      'prototypeOwnEntries',
      'prototypeIheritedEntries',
      'instanceOwnEntries'
  ];
  
  /**
   * Super types of property types
   */
  var superTypes = { 
    primitive: ['undefined', 'null', 'Boolean', 'Number', 'Float', 'SafeInteger', 'Integer', 'BigInt', 'String', 'Symbol'],
    function: ['AsyncFunction', 'GeneratorFunction', 'IterableFunction', 'AnonymousFunction', 'Function'],
    class: ['AnonymousClass', 'Class'],
    indexedCollection: ['EmptyArray', 'Array', 'Int8Array', 'Uint8Array', 'Uint8ClampedArray', 'Int16Array', 'Uint16Array', 'Int32Array', 'Uint32Array', 'Float32Array', 'Float64Array', 'BigInt64Array', 'BigUint64Array'],
    keyedCollection: ['Map', 'Set', 'WeakMap', 'WeakSet'],  
    others: ['EmptyObject', 'BooleanObject', 'NumberObject', 'StringObject', 'SymbolObject', 'BoxedPrimitive', 'GeneratorObject', 'ArgumentsObject', 'ModuleNamespaceObject', 'Object', 'Date', 'RegExp', 'MapIterator', 'SetIterator', 'Promise', 'Proxy', 'SharedArrayBuffer', 'AnyArrayBuffer', 'ArrayBuffer', 'Buffer', 'DataView', 'NativeError', 'Error', 'External', 'Others']
  };
  
  var serialize = pkg();
  
  var inspect = utins();
  
  // inheritance from main function
  main.apply(this, arguments);
  
  /**
   * Serialized non-Primitive properties and non-BoxedPrimitive properties from an object
   * 
   * @param {object} props - An object
   * @return {object}   A serialized object
   */
  function doSerialization(props) {

    props.forEach((prop, index) => {

      if ( prop.value && 
           !prop.types.includes('Primitive') && 
           !prop.types.includes('BoxedPrimitive')
      ) {
          try {
            props[index].value = serialize(prop.value);
            props[index].valueSerialized = true;
          } catch (er) {
            /* continuous loop */
          }
      }
    });
    
    return props;
  }

  /**
   * Gets the property source.
   * 
   * @param {object} entries  - An object returned by jsdump.entries function.
   * @param {srting} property - An property of entries object
   * @return {string}   A source string
   */
  function getSource(entries, property) {
    var source = '', head = '\n', ser = '', props = '';

    dumProps.forEach((key) => {
      if (entries && entries.hasOwnProperty(key)) {
        props = entries[key];

        if (Array.isArray(props) && props.length > 0) {
          props.forEach((prop) => {

            if (prop.value !== undefined && 
                property && 
                prop.key === property
            ) {

              if ( !prop.types.includes('Primitive') && 
                   !prop.types.includes('BoxedPrimitive')
              ) {
                try {
                  ser = serialize(prop.value);
                  if ( prop.types.includes('Class') && 
                       prop.valuePrototypeConstructor !== undefined && 
                       property === 'constructor'
                  ) {
                    head = '\nclass ' + prop.valuePrototypeConstructor + ' {  ';
                    ser = ser.replace(/^function/, '[function]')
                             .replace(new RegExp('^class ' + prop.valuePrototypeConstructor + ' +{' ), '');
                  }
                  source += head + ser;
                } catch (er) {
                  source += head + "The native code can't be dumped out.";
                }
              } else {
                source += head + prop.value;
              }
            }

          });
        }
      }
    });

    return source;
  }
  
  /**
   * Updates entries array with assigned type.
   * 
   * @param {object} entries  - A JavaScript object to dump out
   * @param {array} typeEntries - An entries array
   * @param {string} type - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection', 'others'
   * @return {array}   Updated entries array
   */
  function updateTypeEntries(entries, typeEntries, type) {
    var props = null;
    
    if ( !['primitive', 'function', 'class', 'indexedCollection', 'keyedCollection', 'others'].includes(type) ) {
      type = 'function';
    }
    
    dumProps.forEach((key) => {
      
      if (entries && entries.hasOwnProperty(key)) {
        props = entries[key];

        if ( Array.isArray(props) && props.length > 0 ) {

          for (var i = 0; i < props.length; i++) {
           
            if (Array.isArray(props[i].types) && props[i].types.length > 0) {

              for (var j = 0; j < props[i].types.length; j++) {
              
                if ( superTypes[type].includes( props[i].types[j] ) ) {
                  typeEntries.push( props[i] );              
                  break;
                }
              }
            }
          }
        }
      }
    });

    return typeEntries;
  }
  
  /**
   * Creates a new page
   *
   * @param {string} str  - The string which would be processed  
   * @param {boolean} raw - true to print source in raw format, otherwise to use false
   */
  function writePage(str, raw) {
    var pg = window.open('', resrc.name, resrc.features);
    
    var output = resrc.htmlHead + resrc.htmlMid + str + resrc.htmlFoot1;
    if (!raw) {
      output = resrc.htmlHead + resrc.css + resrc.js + resrc.htmlMid + str + resrc.htmlFoot2;
    }
    
    pg.document.write(output);
    pg.document.close();
  }
  
  /**
   * Prints JSDump information to the console.
   *
   */
  this.info = function() {
    console.log(`
       ***  JSDump-Web v1.0.2 ***
    JSDump-Web is a tool to dump out the information of own and inherited properties from an object, 
    object prototype, and object instance.
    
    JSDump-Web is a version of JSDump specified for web browsers.
    
    Sample Usage:
      // prints this message.
      jsdump.info();
      // returns an object that includes dumped out content from URL.
      jsdump.entriesObj(URL);
      
      // prints the information of URL to the console.
      jsdump.entriesPrint(URL);
      
      // writes the information of URL to a new page.
      jsdump.entriesPage(URL);
      // writes the information of URL without style to a new page.
      jsdump.entriesPage(URL, true);
      
      // prints the information of entries type with 'function' from URL to the console.
      jsdump.typeEntriesPrint(URL);
      
      // writes the serialized information of entries type with 'function' from URL to new page.
      jsdump.typeEntriesPage(URL);
      
      // prints constructor source of jsdump to the console.
      jsdump.sourcePrint(jsdump);
      // prints sourcePrint source of jsdump to the console.
      jsdump.sourcePrint(jsdump, 'sourcePrint');
      
      // writes raw constructor of jsdump to a new page.
      jsdump.sourcePage(jsdump, 'constructor', true);
      // writes sourcePrint source of jsdump to a new page.
      jsdump.sourcePage(jsdump, 'sourcePrint');
    
    Author: Richard Li <richard.li@w3plan.net>, License: MIT
    `);
  };
  
  /**
   * Prints the property source to the console.
   * 
   * @param {object} obj  - An JavaScript object to dump out
   * @param {srting} [prop=constructor] - An optional string for the property, the default value is constructor
   */
  this.sourcePrint = function (obj, prop = 'constructor') {
    var source = '';
    var entries = this.entriesObj(obj);

    if (entries === null ) {
      source = 'null';
    } else {
      source = getSource(entries, prop);

      if (source.length === 0) {
        source = "The property: " + prop + " doesn't exist.";
      }
    }
    console.log(source);
  };

  /**
   * Prints the property source to a new page.
   * 
   * @param {object} obj  - An JavaScript object to dump out
   * @param {srting} [prop=constructor] - An optional string for the property, the default value is constructor
   * @param {boolean} [raw = false]  - An optional boolean for the format of dumped out content
   */
  this.sourcePage = function (obj, prop = 'constructor', raw = false) {
    var entries = this.entriesObj(obj);
    
    if (entries === null ) {
      console.log('null');
      return;
    }
    
    var source = getSource(entries, prop);

    if (source.length === 0) {
      source = "The property: " + prop + " doesn't exist.";
    } else {
      if (raw) {
        source = resrc.blockContentStart1 + source + resrc.blockContentEnd1;
      } else {
        source = resrc.blockContentStart2 + source + resrc.blockContentEnd2;
      }
      
      writePage(source, raw);
      
      source = 'Printed the property source to the new page.';
    }

    console.log(source);
  };
  
  /**
   * Prints the infomation of an entries object to the console.
   * 
   * @param {object} obj - An JavaScript object to dump out
   * @param {array} [hiddenKeys = []] - An optional array of keys that would be ignored in dumped out content
   */
  this.entriesPrint = function (obj, hiddenKeys = []) {
    var props = null, flag = false, source = '';    
    var entries = this.entriesObj(obj, hiddenKeys);

    if (entries === null ) {
      source = 'null';
    } else {
      dumProps.forEach((key) => {
        
        if (entries && entries.hasOwnProperty(key)) {
          props = entries[key];

          if ( Array.isArray(props) && props.length > 0 ) {
            props = doSerialization(props);
          }

          console.log('\n%c' + key, 'font-weight:bold');
          console.log( inspect(props, false, 10, true, true, true) );
          flag = true;
        }
      });
      
      if (!flag) {
        source = 'There is no entries to output.';
      }
    }
    console.log(source);    
  };
  
  /**
   * Prints entries in assigned type to the console.
   * 
   * @param {object} obj  - A JavaScript object to dump out
   * @param {string} [propType=function] - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection', 'others'
   * @param {array} [hiddenKeys = []] - An optional array of keys that would be ignored in dumped out content
   */
  this.typeEntriesPrint = function (obj, propType = 'function', hiddenKeys = []) {
    var props = null,
        typeEntries = [],
        entries = this.entriesObj(obj, hiddenKeys);
    
    if (entries === null ) {
      console.log('null');
      return;
    }

    typeEntries = updateTypeEntries(entries, typeEntries, propType);
    
    if (typeEntries.length === 0) {
      console.log('There is no entries to print.');
    } else {
      typeEntries = doSerialization( typeEntries );
      console.log( inspect(typeEntries, false, 10, true, true, true) );
    }
  };
  
  /**
  * Prints the infomation of an entries object to a new page.
  * 
  * @param {object} obj - An JavaScript object to dump out
  * @param {boolean} [raw=true] - An optional boolean for dumped-out content format
  * @param {array} [hiddenKeys = []] - An optional array of keys that would be ignored in dumped out content
  */
  this.entriesPage = function (obj, raw = false, hiddenKeys = []) {
    var props = null, flag = false, source = '';    
    var entries = this.entriesObj(obj, hiddenKeys);

    if (entries === null ) {
      console.log('null');
      return;
    }

    dumProps.forEach((key) => {
      
      if (entries && entries.hasOwnProperty(key)) {
        props = entries[key];

        if ( Array.isArray(props) && props.length > 0 ) {
          props = doSerialization(props);
        }
        
        if (raw) {
          source += resrc.blockHeadStart1 + key + resrc.blockHeadEnd1;
          source += resrc.blockContentStart1 + inspect(props, false, 10, false, true, true) + resrc.blockContentEnd1;
        } else {
          source += resrc.blockHeadStart2 + key + resrc.blockHeadEnd2;
          source += resrc.blockContentStart2 + inspect(props, false, 10, false, true, true) + resrc.blockContentEnd2;
        }

        flag = true;
      }
    });
    
    if (flag) {
      writePage(source, raw);

      source = 'Printed the infomation of an entries object to the new page.';
    } else {
      source = 'There is no entries to output.';
    }

    console.log(source);
  };

  /**
   * Prints entries in assigned type to a new page.
   * 
   * @param {object} obj  - A JavaScript object to dump out
   * @param {string} [propType=function] - One of 'primitive', 'function', 'class', 'indexedCollection', 'keyedCollection', 'others'
   * @param {boolean} [raw=true] - An optional boolean for dumped-out content format
   * @param {array} [hiddenKeys = []] - An optional array of keys that would be ignored in dumped out content
   */
  this.typeEntriesPage = function (obj, propType = 'function', raw = false, hiddenKeys = []) {
    var typeEntries = [], source = '';    
    var entries = this.entriesObj(obj, hiddenKeys);

    if (entries === null ) {
      console.log('null');
      return;
    }
    
    typeEntries = updateTypeEntries(entries, typeEntries, propType);

    if (typeEntries.length === 0) {
      source = 'There is no entries to print.'
    } else {
      typeEntries = doSerialization( typeEntries );
      
      for (var i = 0; i < typeEntries.length; i++) {

        if (raw) {
          source += resrc.blockContentStart1 + inspect(typeEntries[i], false, 10, false, true, true) + resrc.blockContentEnd1;
        } else {
          source += resrc.blockContentStart2 + inspect(typeEntries[i], false, 10, false, true, true) + resrc.blockContentEnd2;
        }
      }
      
      writePage(source, raw);
      
      source = 'Printed the property source to the new page.';
    }

    console.log(source);
  };
};

/**
 *
 * Create global object: jsdump
 * @public
 */
window.jsdump = new jsdump("Version 1.0.2");

})();

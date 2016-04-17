/*
* Copyright (C) 2015 - 2016, Daniel Dahan and CosmicMind, Inc. <http://cosmicmind.io>.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*	*	Redistributions of source code must retain the above copyright notice, this
*		list of conditions and the following disclaimer.
*
*	*	Redistributions in binary form must reproduce the above copyright notice,
*		this list of conditions and the following disclaimer in the documentation
*		and/or other materials provided with the distribution.
*
*	*	Neither the name of MaterialJS nor the names of its
*		contributors may be used to endorse or promote products derived from
*		this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
* FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
* DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
* SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
* CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
* OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

	( function ( window, document, undefined )
	{
		var _Material = function () {},

			/*
			@function		_$
			@usage			Selector capture function.
			@param			selector : The element or object to capture.
			@param			context : The parent or context object of the element.
			@param			cache : Dummy internal value.
			@return 		A Selector Object.
			*/
			_$ = function ( selector, context, cache )
			{
				/*
				@note	The Regular Expression is used to avoid caching tag values.
				*/
				return new _Selector( selector, context );
			},

			/*
			@note	Library version.
			*/
			_version = '0.0.1',

			/*
			@note	The Error object is used to represent error information from ajax requests.
			*/
			_Error = null,

			/*
			@note	The Selector object is used for capturing elements from the DOM.
			*/
			_Selector = null,

			/*
			@note	Stores values in a cache object with helpful functions.
			*/
			_Cache = null,

			/*
			@note	Manages Cookie values.
			*/
			_Cookie = null,

			/*
			@note	Manages GET values.
			*/
			_Get = null,

			/*
			@note	Holds the Animation Class.
			*/
			_Animate = null,

			/*
			@note	The AjaxRequest object is used to interface with the AjaxHttp object for sending Ajax style requests.
			*/
			_AjaxRequest = null,

			/*
			@note	The AjaxResponse object is passed to the handlers after an AjaxHttp process.
			*/
			_AjaxResponse = null,

			/*
			@note	The Subject object is used to provide core functionality for observable object types.
			*/
			_SubjectInterface = null,

			/*
			@note	The Subscriber object is used to provide core functionality for subscriber object types.
			*/
			_SubscriberInterface = null,

			/*
			@note	Boolean to indicate whether to turn the debugging console on or not.
			*/
			_debug = false,

			/*
			@note	A regular expression for finding HTML elements or ID value of an HTML element.
			*/
			_regExpHtml = /^(?:[^<]*(<[\w\W]+>)[^>]*$|#([\w\-]+)|\.([\w\-]+)|@([\w\-]+)$)/,

			/*
			@note	Checks for non-word characters.
			*/
			_regExpNonWord = /\W/,

			/*
			@note	Checks for attributes.
			*/
			_regExpClassOrAttribute = /^\.([\w\-]+)|@([\w\-]+)$/,

			/*
			@note	User agent regular expressions.
			*/
			_regExpWebkit = /(webkit)[ \/]([\w.]+)/gi,
			_regExpOpera = /(opera)(?:.*version)?[ \/]([\w.]+)/gi,
			_regExpIE = /(msie) ([\w.]+)/gi,
			_regExpMozilla = /(mozilla)(?:.*? rv:([\w.]+))?/gi,

			/*
			@note	Cross platform event adjustments made here to give compatability across all major browsers.
			*/
			_eventFormat = function ( event )
			{
				if ( _Browser.isIE )
				{
					var window = _$.win();

						event.eventPhase = 2;

						event.isChar = event.charCode > 0;

						event.pageX = event.clientX + window.scrollLeft();

						event.pageY = event.clientY + window.scrollTop();

						event.preventDefault = function()
						{
							event.returnValue = false;
						};

						if ( event.type == 'mouseout' )
						{
							event.relatedTarget = event.telement;
						}
						else if ( event.type == 'mouseover' )
						{
							event.relatedTarget = event.fromElement;
						}

						event.stopPropagation = function()
						{
							event.cancelBubble = true;
						};

						event.target = event.srcElement;

						event.time = ( new Date() ).getTime();
				}

				/*
				@note	Set the key code.
				*/
				event.keyCode = event.keyCode || event.charCode || 0;

				if ( event.type == 'mousewheel' )
				{
					if ( typeof event.wheelDelta === 'number' )
					{
						event.delta = event.wheelDelta / 120;
					}
				}
				else if ( typeof event.detail === 'number' )
				{
					event.delta = -event.detail;
				}

				return event;
			},

			/*
			@class		Browser
			@usage		Tests browser type.
			*/
			_Browser = new function ( _agent )
			{
				var self = this;

					self.isSafari = _regExpWebkit.test( _agent );
					self.isOpera = _regExpOpera.test( _agent );
					self.isIE = _regExpIE.test( _agent );
					self.isMozilla = _regExpMozilla.test( _agent );

			} ( navigator.userAgent ),

			/*
			@class		Console
			@usage		Console is used to log information to the browser console. Only allows logging when debug mode is set to true.
			*/
			_Console = new function ( $, _$ )
			{
				var self = this;

					/*
					@function	error
					@usage		Sets a message to the console with an error status.
					@param		message : The message string that is written to the console.
					*/
					self.error = function (message) {
						if ( _debug && $ ) {
							$.error(message);
						}
					};

					/*
					@function	warn
					@usage		Sets a message to the console with a warning status.
					@param		message : The message string that is written to the console.
					*/
					self.warn = function (message) {
						if ( _debug && $ ) {
							$.warn(message);
						}
					};

					/*
					@function	log
					@usage		Sets a message to the console with a log status.
					@param		message : The message string that is written to the console.
					*/
					self.log = function (message) {
						if ( _debug && $ ) {
							$.log(message);
						}
					};

			} ( window.console, _$ ),

			/*
			@note			The _OnLoad Object manages window load, resize, and scroll events at runtime.
			*/
			_OnLoad = new function ( _$, window, document, undefined )
			{
				var self = this;

					/*
					@note	Stores the function list for when the window loads.
					*/
					self.load = [];

					/*
					@note	Stores the function list for when the window scrolls.
					*/
					self.onscroll = [];

					/*
					@note	Stores the function list for when the window resizes.
					*/
					self.onresize = [];

					/*
					@function		addFunction
					@usage			Helper function that adds a new function to the load, resize or scroll calls.
					@param			func, The function to be called.
					@param			order, The order to call the function in.
					@param			list, The function list to call from.
					*/
					self.addFunction = function ( func, order, list )
					{
						if ( typeof func === 'function' )
						{
							if ( typeof order !== 'number' )
							{
								order = 0;
							}
							else if ( order < 0 )
							{
								order = -order;
							}

							/*
							@note		If the array of functions exists, append the new function, otherwise create a new function array.
							*/
							if ( list[ order ] )
							{
								list[ order ].push( func );
							}
							else
							{
								list[ order ] = [ func ];
							}
						}
					};

					/*
					@function		callFunctionList
					@usage			Helper function that calls the function list for the load, resize or scroll list of functions.
					@param			list, The function list to call.
					*/
					self.callFunctionList = function ( list )
					{
						var series = 0,
							index = 0,
							m = list.length - 1,
							i,
							func,
							callback;

							for ( ; series <= m; ++series )
							{
								if ( func = list[ series ] )
								{
									for ( i = func.length - 1; index <= i; ++index )
									{
										callback = func[ index ];

										if ( typeof callback === 'function' )
										{
											callback.call( callback, _$, window, document, undefined );
										}
									}

									index = 0;
								}
							}
					};

			} ( _$, window, document, undefined ),

			/*
			@note	The AjaxHttp object is used to provide core Ajax functionality.
			*/
			_AjaxHttp = new function ( window, document, $, undefined )
			{
				var self = this,

					/*
					@note	The interval reference.
					*/
					_daemon = null,

					/*
					@note	The interval speed.
					*/
					_speed = 150,

					/*
					@function		XMLHttpRequest
					@usage			Creates XMLHttpRequest objects.
					@return			An new instance of the XMLHttpRequest object or MS ActiveXObject for XMLHTTP.
					*/
					_XMLHttpRequest = function ()
					{
						try
						{
							return new XMLHttpRequest();
						}
						catch ( error )
						{
							/*
							@note	Stop the requests if we cannot establish an XMLHttp Object.
							*/
							//self.stop();

							return { withCredentials : undefined, error : true };
						}
					},

					/*
					@note	A boolean indicating whether XMLHttpRequest2 is supported.
					*/
					_hasXMLHttp2Support = ( function ()
					{
						return !( typeof _XMLHttpRequest().withCredentials === undefined );
					} ) (),

					/*
					@note	A boolean indicating whether the Post Message Api is supported.
					*/
					_hasPostMessageSupport = window.postMessage !== undefined,

					/*
					@note	The callback URL for Post Message Events.
					*/
					_postMessageCallbackUrl = _hasPostMessageSupport ? window.location.href.split( '#' )[ 0 ] : '',

					/*
					@note	Requests added to the xhr manager.
					*/
					_requests = [],

					/*
					@note	Stores the requests that have already been sent and waiting for a response.
					*/
					_activeRequests = [],

					/*
					@note	A queue handler for the request.
					*/
					_Queue = new function ( _requests )
					{
						var self = this,

							/*
							@function	compare
							@usage		Compares two requests to see which should be set prior to the other.
							@param		AjaxRequest1 : An instance of the AjaxRequest object.
							@param		AjaxRequest2 : An instance of the AjaxRequest object.
							*/
							compare = function ( AjaxRequest1, AjaxRequest2 )
							{
								return AjaxRequest1.priority - AjaxRequest2.priority;
							};

							/*
							@function		put
							@usage			Adds a request to the queue.
							@param			AjaxRequest : An instance of the AjaxRequest object.
							*/
							self.put = function ( AjaxRequest )
							{
								_requests.push( AjaxRequest );
								_requests.sort( compare );
							};

							/*
							@function		prioritize
							@usage			Organizes the list into priority sequence.
							*/
							self.prioritize = function ()
							{
								_requests.sort( compare );
							};

							/*
							@function		get
							@usage			Retrieves the next ready request.
							@return			An AjaxRequest object if one is available.
							*/
							self.get = function ()
							{
								return _requests.shift();
							};

							/*
							@function 		remove
							@usage			Removes an AjaxRequest object instance from the Queue.
							@param			AjaxRequest : The AjaxRequest object to be removed.
							@return			A boolean value of the result.
							*/
							self.remove = function ( AjaxRequest )
							{
								for ( var i = 0, l = _requests.length - 1; i <= l; ++i )
								{
									if ( _requests[ i ] === AjaxRequest )
									{
										_requests.splice( i, 1 );

										return true;
									}
								}

								return false;
							};

					} ( _requests ),

					/*
					@function 		_jsonParse
					@usage			Parses the JSON object and turns it into JavaScript code.
					@param			json : The JSON string object.
					@return			The json string parsed to a JavaScript obejct.
					*/
					_jsonParse = ( function ()
					{
						$.JSON = window.JSON ? window.JSON.parse : function ( json )
						{
								/*
								@note	used to search for unicode characters embedded in the json string passed into the parse function.
								*/
							var unicode = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
								evaled;

								/*
								@note	Unicode characters with escape sequences. JavaScript handles many characters incorrectly, either silently deleting them, or treating them as line endings.
								*/
								unicode.lastIndex = 0;

								if ( unicode.test( json ) )
								{
									json = json.replace( unicode, function ( char )
									{
										return '\\u' + ( '0000' + char.charCodeAt( 0 ).toString( 16 ) ).slice( -4 );
									});
								}

								if ( /^[\],:{}\s]*$/.test( json.replace( /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@' ).replace( /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']' ).replace( /(?:^|:|,)(?:\s*\[)+/g, '' ) ) )
								{
									if ( json.length >= 2 )
									{
										evaled = eval( '(' + json + ')' );

										evaled = evaled !== null && typeof evaled === 'object' ? evaled : {};
									}

									return evaled;
								}
						};

						return $.JSON;

					} () ),

					/*
					@function		completeUrl
					@usage			Creates the full url value.
					@param			protocol : The protocol to ensure if one does not exist.
					@param			domain : The domain to ensure if one does not exist.
					@param			url : The url to completely identify.
					@return			The new url value.
					*/
					_completeUrl = function ( protocol, domain, url )
					{
						if ( /((https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim.test( url ) )
						{
							return url;
						}
						else if ( /(^|[^\/])(www\.[\S]+)/gim.test( url ) )
						{
							return url.replace( /(^|[^\/])(www\.[\S]+)/gim, protocol + '//$2' );
						}
						else if ( /^(\/)/gmi.test( url ) )
						{
							return url.replace( /^(\/.*)/gim, protocol + '//' + domain + '$1' );
						}

						return protocol + '//' + url;
					},

					/*
					@function		_getOrigin
					@usage			Retrieves the origin value from a url.
					@param			url : The URL to detect th origin value.
					@return			A string of the origin value.
					*/
					_getOrigin = function ( url )
					{
						return url.replace( /^(https?:\/\/)([a-z0-9]+\.)([a-z]+)(\.[a-z]+)(.*)/gi, '$1$2$3$4' );
					},

					/*
					@function		_postMessage
					@usage			Used for cross domain messaging.
					*/
					_postMessage = function ( AjaxRequest )
					{
						/*
						@note	Ensure support for the Post Message Api.
						*/
						if ( _hasPostMessageSupport )
						{
								AjaxRequest.data[ 'post_message_wrapper' ] = 1;
								AjaxRequest.data[ 'post_message_origin' ] = _postMessageCallbackUrl;

							var execute = $.handlerExecute,

								/*
								@function		MessageReturnDataSubscriber
								@usage			Handler for the window on message function.
								@param			PostMessageEvent event : A PostMessageEvent Object reference.
								*/
								MessageReturnDataSubscriber = new $.Subscriber( function ( event )
								{
									if ( event.origin == _getOrigin( url ) && AjaxRequest.state != AjaxRequest.COMPLETE )
									{
										var	data,
											error = false,
											response;

											try
											{
												data = execute( AjaxRequest.dataFilter, _processData( event.data, AjaxRequest.dataType ) );
											}
											catch ( e )
											{
												data = { error : 1, message : e, code : 0, property : 'http' };
											}

											if ( data.error )
											{
												error = true;
											}

											response = new _AjaxResponse( AjaxRequest, data, error ? new _Error( data ) : null );

											/*
											@note	Handling stage.
											*/
											AjaxRequest.state = AjaxRequest.HANDLING;
											execute( _callback( AjaxRequest, 200, error || data.error ), response );

											/*
											@note	Complete stage.
											*/
											AjaxRequest.state = AjaxRequest.COMPLETE;
											execute( AjaxRequest.complete, response.data, response.request );
									}

									/*
									@note	Ensure that the returning message if from the expected origin.
									*/
									this.message( MessageReturnDataSubscriber, true );

									/*
									@note	Remove the frame from the document body.
									*/
									window.setTimeout( function () { $( 'body' ).remove( frame ); }, 100 );

									event.preventDefault();
									event.stopPropagation();
								} ),

								/*
								@note	The url to request data from.
								*/
								url = AjaxRequest.url + '?' + AjaxRequest.getDataString(),

								/*
								@note	The hidden frame used to retrieve the requested data.
								*/
								frame = $.create( 'iframe', { src : url, style : { display : 'none', visibility : 'hidden' } } );

								/*
								@note	Attach the messaging event subscriber.
								*/
								$( 'window' ).message( MessageReturnDataSubscriber );

								/*
								@note	Execute the before send function.
								*/
								execute( AjaxRequest.beforeSend, AjaxRequest );

								/*
								@note	Append the frame to the body.
								*/
								$( 'body' ).append( frame );

								/*
								@note	Update the state of the AjaxRequest Object.
								*/
								AjaxRequest.state = AjaxRequest.SENDING;
						}
					},

					/*
					@function		_xmlRequest
					@usage			Used to send a XMLHttpRequest
					*/
					_xmlRequest = function ( AjaxRequest )
					{
						var xhr = _XMLHttpRequest();

							if ( !xhr.error )
							{
								var isGET = AjaxRequest.method === 'get';

									/*
									@note	Needed for later usage.
									*/
									AjaxRequest.xhr = xhr;

									_activeRequests.push( AjaxRequest );

									$.handlerExecute( AjaxRequest.beforeSend, AjaxRequest );

									xhr.open( AjaxRequest.method, AjaxRequest.url + ( isGET ? '?' + AjaxRequest.getDataString() : '' ), AjaxRequest.async );

									xhr.setRequestHeader( 'Content-Type', AjaxRequest.contentType );
									xhr.setRequestHeader( 'X-Requested-With', 'xmlhttpRequest' );

									/*
									@note	The last modified header is added to ensure that the request value is new and not a cached value.
									*/
									if ( AjaxRequest.cache === false )
									{
										xhr.setRequestHeader( 'If-Modified-Since', 'Sat, 1 Jan 2000 00:00:00: GMT' );
									}

									/*
									@note	Call the transport send method to initiate the request, and then set the request to active.
									*/
									xhr.send( isGET ? null : AjaxRequest.getDataString() );

									/*
									@note	Update the state of the request.
									*/
									AjaxRequest.state = AjaxRequest.SENDING;
							}
					},

					/*
					@function		determineMessageService
					@usage			Selects the appropriate messaging service based on support and origin policies.
					@param			AjaxRequest : The AjaxRequest object reference to retrieve the call back function from.
					*/
					_determineMessageService = function ( AjaxRequest )
					{
						var protocol = window.location.protocol,
							domain = document.domain;

							AjaxRequest.url = AjaxRequest.url ? _completeUrl( protocol, domain, AjaxRequest.url ) : protocal + '//' + domain;

							return ( new RegExp( '^(' + protocol + '//' + domain + ')', 'gim' ) ).test( AjaxRequest.url ) ? _xmlRequest : AjaxRequest.postMessage ? _postMessage : _xmlRequest;
					},

					/*
					@function 		processData
					@usage			Ensures the integrity of the data returned from the AjaxRequest object.
					@param			data : The raw data.
					@param			type : A string value representing the data type.
					@return			The data processed based on its value.
					*/
					_processData = function ( data, type )
					{
						/*
						@note		Check that the data is not spiced. If it is strip the seasoning.
						*/
						switch ( type )
						{
							case 'json' :
								if ( typeof data === 'string' )
								{
									data = $.normalizeSpace( data );
									return _jsonParse( data.substring( 0, 8 ) === 'for(;;);' ? data.substring( 8 ) : data );
								}
							break;
						}

						return data;
					},

					/*
					@function		_sendNext
					@usage			Prepares and sends the next AjaxRequest object in the Queue.
					*/
					_sendNext = function ()
					{
						/*
						@note	Run at most two requests at a time. Some older browsers can only support two at a time.

						if ( _activeRequests.length <= 1 )
						{
						*/
							var request = _Queue.get();

								if ( request instanceof _AjaxRequest )
								{
									/*
									@note	Update the AjaxHttp state.
									*/
									self.state = self.PROCESSING;

									_determineMessageService( request ).call( self, request );
								}

								/*
								@note	The request no longer needs to be in the Queue.
								*/
								_Queue.remove( request );
						/*
						}
						*/
					},

					/*
					@function 		_callback
					@usage			Retrieve the correct call back function based on the status of the AjaxRequest object.
					@param			AjaxRequest : The AjaxRequest object reference to retrieve the call back function from.
					@param			status : The status code from the XMLHttpRequest object.
					@param			error : An error message if one exists.
					@return			A function reference to the call back.
					*/
					_callback = function ( AjaxRequest, status, error )
					{
						if ( error )
						{
							return AjaxRequest.error;
						}
						else if ( ( ( status >= 200 && status < 300 ) || status == 0 || status === null ) )
						{
							return AjaxRequest.success;
						}
						else if ( status == 304 )
						{
							return AjaxRequest.notModified;
						}
						else
						{
							return AjaxRequest.failure;
						}
					},

					/*
					@function		_checkActiveRequests
					@usage			Prepares and send the next AjaxRequest ready.
					*/
					_checkActiveRequests = function ()
					{
						for ( var i = 0, l = _activeRequests.length - 1; i <= l; ++i )
						{
							var request = _activeRequests[ i ],
								xhr;

								if ( request instanceof _AjaxRequest )
								{
									xhr = request.xhr;

									/*
									@note	Is the AjaxRequest object ready to be handled.
									*/
									if ( xhr.readyState == 4 )
									{
										request.endTime = ( new Date() ).getTime();

										/*
										@note	The active request is removed.
										*/
										_activeRequests.splice( i, 1 );

										/*
										@note	The state of the AjaxHttp is now waiting.
										*/
										self.state = self.WAITING;

										var execute = $.handlerExecute,
											error = false,
											data,
											response;

											try
											{
												data = execute( request.dataFilter, _processData( xhr[ 'response' + ( { json : true, script : true, xml : false, html : true }[ request.dataType ] ? 'Text' : 'XML' ) ], request.dataType ) );
											}
											catch ( e )
											{
												data = { error : 1, message : e, code : 0, property : 'http' };
											}

											if ( data.error )
											{
												error = true;
											}

											response = new _AjaxResponse( request, data, error ? new _Error( data ) : null );

											/*
											@note	Handling stage.
											*/
											request.state = request.HANDLING;
											execute( _callback( request, xhr.status, error ), response );

											/*
											@note	Complete stage.
											*/
											request.state = request.COMPLETE;
											execute( request.complete, response );
									}
								}
						}
					},

					/*
					@function 	_agePromote
					@usage		Promotes the age values of the requests. This ensures the requests are sent
					*/
					_agePromote = function ()
					{
						var request,
							i = 0,
							l = _requests.length - 1;

							for ( ; i <= l; ++i )
							{
								request = _requests[ i ];

								if ( request instanceof _AjaxRequest )
								{
									request.age += _speed;

									/*
									@note	Force the request object to be sent by setting the priority to 0.
									*/
									if ( request.age >= 6000 )
									{
										request.priority = 0;
									}
								}
							}

							_Queue.prioritize();
					};

					/*
					@note	Statuses.
					*/
					self.state = self.STOPPED = 0;
					self.WAITING = 1;
					self.PROCESSING = 2;

					/*
					@function		request
					@usage			Adds an AjaxRequest object to the Queue.
					@param			AjaxRequest : An instance of the AjaxRequest object.
					*/
					self.request = function ( AjaxRequest )
					{
						if ( AjaxRequest instanceof _AjaxRequest )
						{
							AjaxRequest.startTime = ( new Date() ).getTime();

							_Queue.put( AjaxRequest );
						}
					};

					/*
					@function		start
					@usage			Starts the AjaxHttp Deamon.
					*/
					self.start = function ()
					{
						/*
						@note	Initiate the first check.
						*/
						_checkActiveRequests();
						_sendNext();
						_agePromote();

						/*
						@note	Initialize the Ajax object.
						*/
						_daemon = window.setInterval( function ()
						{
							_checkActiveRequests();
							_sendNext();
							_agePromote();

						}, _speed );

						self.state = self.WAITING;
					};

					/*
					@function		stop
					@usage			Stops the AjaxHttp Deamon.
					*/
					self.stop = function ()
					{
						if ( _daemon )
						{
							window.clearInterval( _daemon );

							_daemon = null;
						}

						self.state = self.STOPPED;
					};

			} ( window, document, _$, undefined );

			/*
			@function		extend
			@usage			Provides inheritance
			*/
			_Material.extend = function ( dynamic, static )
			{
				/*
				@note	Start the prototyping stage.
				*/
				_Material._prototyping = true;

				var self = this,
					prototype = new self(),
					klass = null,
					constructor = null,
					extend = _Material.prototype.extend;

					extend.call( prototype, dynamic );

					prototype.base = function () {};

					/*
					@note	End the prototyping stage.
					*/
					delete _Material._prototyping;

					constructor = prototype.constructor;

					klass = function ()
					{
						if ( !_Material._prototyping )
						{
							var self = this;

								if ( self.constructor !== null && self.constructor !== undefined && ( self._constructing || self.constructor === constructor ) )
								{
									self._constructing = true;

									constructor.apply( self, arguments );

									delete self._constructing;
								}
								else if ( arguments[ 0 ] !== null && arguments !== undefined )
								{
									return ( arguments[ 0 ].extend || extend ).call( arguments[ 0 ], prototype );
								}
						}
					};

					/*
					@note	Build the klass interface.
					*/
					klass.ancestor = self;
					klass.extend = self.extend;
					klass.prototype = prototype;

					klass.valueOf = function ( value )
					{
						return ( value !== null && typeof value === 'object' ) ? klass : constructor.valueOf();
					};

					/*
					@note	Call the extend function to set the klass values for the object.
					*/
					extend.call( klass, static );

					/*
					@note	Initialize the object.
					*/
					if ( typeof klass.init === 'function' )
					{
						window.setTimeout( klass.init, 1 );
					}

					return klass;
			};

			/*
			@object		prototype
			@usage		Defines the instance functions.
			*/
			_Material.prototype =
			{
				extend : function ( source, value )
				{
					var self = this;

						/*
						@note	Builds the source object.
						*/
						if ( arguments.length > 1 )
						{
							var ancestor = self[ source ];

								if ( ancestor && typeof value === 'function' && ( !ancestor.valueOf || ancestor.valueOf() != value.valueOf() ) && /\bbase\b/.test( value ) )
								{
									/*
									@note	Capture the underlying method.
									*/
									var method = value.valueOf();

										value = function ()
										{
											var self = this,
												previous = self.base || _Material.prototype.base,
												retVal = null;

												self.base = ancestor;

												try
												{
													retVal = method.apply( self, arguments );
												}
												catch ( error ) {}
												finally
												{
													self.base = previous;
												}

												return retVal;
										};

										/*
										@note	Point to the underlying method.
										*/
										value.valueOf = function ( value )
										{
											return value !== null && typeof value === 'object' ? value : method;
										};
								}

								/*
								@note	Set the value to the new function including the parent call.
								*/
								self[ source ] = value;
						}

						/*
						@note	Extending with an object literal.
						*/
						else if ( source )
						{
							/*
							@note	Check for a customized extend method and use it.
							*/
							var extend = ( !_Material._prototyping && typeof self !== 'function' && self.extend ) ? self.extend : _Material.prototype.extend,
								prototype =
								{
									toSource : null
								},

								/*
								@note	Do the following methods manually.
								*/
								hidden = [ 'constructor', 'valueOf' ],
								key = null,

								/*
								@note	If prototyping than include the constructor.
								*/
								i = _Material._prototyping ? 0 : 1;

								while ( key = hidden[ i++ ] )
								{
									if ( source[ key ] != prototype[ key ] )
									{
										extend.call( self, key, source[ key ] );
									}
								}

								/*
								@note	copy each of the source object's properties to this object.
								*/
								for ( key in source )
								{
									if ( !prototype[ key ] )
									{
										extend.call( self, key, source[ key ] );
									}
								}
						}

						return self;
				}
			};

			/*
			@note	Attach the Nacho object to the window object.
			*/
			_Material = _Material.extend
			( {
				constructor : function ()
				{
					this.extend( arguments[ 0 ] );
				}
			},
			{
				version : '1.0',

				ancestor : Object,

				/*
				@note	Allows for multiple inheritence for object.
				*/
				implement : function ()
				{
					var self = this,
						i = arguments.length - 1;

						for ( ; i >= 0; --i )
						{
							if ( typeof arguments[ i ] === 'function' )
							{
								arguments[ i ]( self.prototype );
							}
							else
							{
								self.prototype.extend( arguments[ i ] );
							}
						}

						return self;
				},

				/*
				@note	Returnes a string representation of the object.
				*/
				toString : function ()
				{
					return String( this.valueOf() );
				}
			} );

			/*
			@class		_Error
			@usage		An error object that holds the information associated with an error.
			*/
			_Error = _Material.extend
			( {
				/*
				@function		constructor
				@usage			Constructs the object.
				@param			args : An argument object literal.
				*/
				constructor : function ( args )
				{
					args !== null && typeof args === 'object' ? args : {};

					var self = this;

						self.type = args.type;
						self.message = args.message;
						self.property = args.property;
						self.code = args.code;
				}
			} );

			/*
			@note	An object used to select DOMElements.
			*/
			_Selector = _Material.extend
			( {
				/*
				@function		constructor
				@usage			Constructs the object.
				@param			selector : The selector to choose.
				@param			context : The context to create or search the selector in.
				*/
				constructor : function ( selector, context )
				{
					var self = this;

						/*
						@note	Always call the parent object's constructor.
						*/
						self.base();

						/*
						@note	HANDLE: $( '' ), $( null ), or $( undefined ).
						*/
						if ( selector === '' || selector === null || selector === undefined )
						{
							self[ 0 ] = null;
							self.context = _$( context )[ 0 ] || document;
							self.length = 0;
						}

						/*
						@note	HANDLE: $( DOMElement ).
						*/
						else if ( selector.nodeType )
						{
							self.context = self[ 0 ] = selector;
							self.length = 1;
						}

						/*
						@note	HANDLE: $( 'body' ).
						*/
						else if ( selector === 'body' && document.body && !context )
						{
							self.selector = 'body';
							self.context = document;
							self[ 0 ] = document.body;
							self.length = 1;
						}

						/*
						@note	HANDLE: $( window )
						*/
						else if ( selector == 'window' || selector === window )
						{
							self.selector = 'window';
							self.context = window;
							self[ 0 ] = window;
							self.length = 1;
						}

						/*
						@note	HANDLE: $( document )
						*/
						else if ( selector == 'document' || selector === document )
						{
							self.selector = 'document';
							self.context = window;
							self[ 0 ] = document;
							self.length = 1;
						}

						/*
						@note	HANDLE: $( $( expr ) )
						*/
						else if ( selector instanceof _Selector )
						{
							self.selector = selector.selector;
							self.context = selector.context;
							self[ 0 ] = null;
							self.length = 0;
							self.merge( selector );
						}

						/*
						@note	HANDLE: HTML strings.
						*/
						else if ( typeof selector === 'string' )
						{
							/*
							@note	Are we dealing with HTML string or an ID?.
							*/
							var match = _regExpHtml.exec( selector );

								if ( match && selector.split( ' ' ).length == 1 )
								{
									/*
									@note	HANDLE: $( '#ID' ).
									*/
									if ( match[ 2 ] )
									{
										self.selector = selector;
										self.context = context ? _$( context )[ 0 ] : document;

										if ( context )
										{
											var children = $( '@id', context ),
												i = 0,
												l = children.length - 1,
												regExp = _$.needle( match[ 2 ] );

												for ( ; i <= l; ++i )
												{
													elem = children[ i ];

													if ( regExp.test( elem.id ) )
													{
														break;
													}

													elem = null;
												}

												self[ 0 ] = elem;
												self.length = 1;
										}
										else
										{
											var elem = document.getElementById( match[ 2 ] );
												self[ 0 ] = elem;
												self.length = 1;
										}
									}

									/*
									@note	HANDLE: $( '.CLASS' ).
									*/
									else if ( match[ 3 ] )
									{
										self.selector = selector;
										self.context = context ? _$( context )[ 0 ] : document;
										self[ 0 ] = null;
										self.length = 0;

										var nodes = [],
											children = self.context.getElementsByTagName( '*' ),
											i = 0,
											l = children.length - 1,
											regExp = _$.needle( match[ 3 ] ),
											elem = null;

											for ( ; i <= l; ++i )
											{
												elem = children[ i ];

												if ( regExp.test( elem.className ) )
												{
													nodes.push( elem );
												}
											}

											/*
											@note	Set main values.
											*/
											self.merge( nodes );
									}

									/*
									@note	HANDLE: $( '@ATTRIBUTE' ).
									*/
									else if ( match[ 4 ] )
									{
										self.selector = selector;
										self.context = context ? _$( context )[ 0 ] : document;
										self[ 0 ] = null;
										self.length = 0;

										var nodes = [],
											children = self.context.getElementsByTagName( '*' ),
											i = 0,
											l = children.length - 1,
											attribute = match[ 4 ],
											elem = null;

											for ( ; i <= l; ++i )
											{
												elem = children[ i ];

												if ( elem[ attribute ] || ( elem.getAttribute ? elem.getAttribute( attribute ) : false ) )
												{
													nodes.push( elem );
												}
											}

											/*
											@note	Set main values.
											*/
											self.merge( nodes );
									}
								}

								/*
								@note	HANDLE: $( TAG ).
								*/
								else if ( !_regExpNonWord.test( selector ) )
								{
									/*
									@note	Only recongnizable elements will be processed.
									*/
									self.selector = selector;
									self.context = context ? _$( context )[ 0 ] : document;
									self[ 0 ] = null;

									self.merge( self.context.getElementsByTagName( selector ) );
								}

								/*
								@note	Handle a chain of selectors.
								*/
								else
								{
									var selectors = _$.normalizeSpace( selector ).split( ' ' ),
										current = [ context ],
										i = 0,
										l = selectors.length - 1,
										debug = _debug;

										for ( ; i <= l; ++i )
										{
											current = _$.find( selectors[ i ], current[ 0 ] );

											if ( !current[ 0 ] )
											{
												break;
											}
										}

										/*
										@note	The complete chain has been processed.
										*/
										if ( i > l )
										{
											self.selector = current.selector;
											self.context = current.context;
											self.length = 0;
											self.merge( current );
										}
								}
						}
				},

				/*
				@function		cache
				@usage 			Returns a cache object for the selector.
				@return 		A Cache Object.
				*/
				cache : function ()
				{
					var self = this;

						if ( !( self._cache instanceof _Cache ) )
						{
							self._cache = new _Cache();
						}

						return self._cache;
				},

				/*
				@function		find
				@usage 			Returns the elements searched for with the context of the intial Selector Object element.
				@param	 		selector : The element tag name of the targets to return
				@return 		A Selector Object.
				*/
				find : function ( selector )
				{
					return _$.find( selector, this );
				},

				/*
				@function 		merge
				@usage			Merges two objects or arrays together.
				@param			data : The array to merge the Selector Object with.
				@return 		The newly built Selector Object reference.
				*/
				merge : function( data )
				{
					var self = this;

						_$.merge( self, data );

						return self;
				},

				/*
				@function 		each
				@usage			Loops through the object properties and calls a function while passing in the property, key, and target reference.
				@param			func : The function to call with the data.
				@param			callback : An optional callback function when the iteration of data is complete.
				@param			scope : THescope to call the function. Default [ window ].
				@return			The Selector object.
				*/
				each : function( func, callback, scope )
				{
					var self = this;

						/*
						@note	Ensure there is a length greater than 0, so we know to process the values in the selector.
						*/
						if ( self.length > 0 )
						{
							_$.each( self, func, callback, scope );
						}

						return self;
				},

				/*
				@function		get
				@usage			Retrieves the element based on the index value.
				@param			index : The index element to get. Default [0]
				@return			The DOMElement object.
				*/
				get : function ( index )
				{
					var self = this;

						index = index || 0;

						return index >= 0 && index <= self.length - 1 ? self[ index ] : null;
				},

				/*
				@function		listener
				@usage			Adds an event to an object.
				@param			type : The event type as a string.
				@param			handler : The hanlder object, either a single or array of Subscriber Object instances.
				@param			scope : Optional scope value.
				@return			The Selector object.
				*/
				listener : function ( type, handler, scope )
				{
					var self = this,
						element = self[ 0 ],
						listener = '$listener_' + type;

						if ( element )
						{
							/*
							@note	If the element already has the listener, attach the handler ( s ) to it.
							*/
							if ( self.hasListener( type ) && element[ listener ] instanceof _$.Dispatcher )
							{
								element[ listener ].attach( handler );
							}
							else
							{
								element[ listener ] = new _$.Dispatcher();

								element[ listener ].attach( handler );

								/*
								@note	A wrapper function is created for the element so that when the event is called, the subscribers are notified. This only happens once per event.
								*/
								handler = function ( event )
								{
									element[ listener ].notify( _eventFormat( event ), scope || self );
								};

								/*
								@note	Choose the correct handler.
								*/
								if ( typeof element.addEventListener === 'function' )
								{
								   element.addEventListener( type, handler, false );
								}
								else if ( typeof element.attachEvent === 'function' )
								{
								   element.attachEvent( 'on' + type, handler );
								}
								else
								{
									element[ 'on' + type ] = handler;
								}

								/*
								@note	Append the type of listener set to the element.
								*/
								self[ 0 ][ 'listeners' ] = self[ 0 ][ 'listeners' ] ? self[ 0 ][ 'listeners' ] + ' ' + type : type;
							}
						}

						return self;
				},

				/*
				@function		hasListener
				@usage			Checks if an object has an event list stack set.
				@param			type : The event type as a string.
				@return			A boolean of the result. True if the handler is set, false otherwise.
				*/
				hasListener : function ( type )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							var handlers = ( self[ 0 ][ 'listeners' ] || '' ).split( ' ' ),
								i = handlers.length - 1;

								for ( ; i >= 0; --i )
								{
									if ( handlers[ i ] === type )
									{
										return true;
									}
								}
						}

						return false;
				},

				/*
				@function		removeListener
				@usage			Remove an event from an object.
				@param			type : The event type as a string.
				@param			handler : The hanlder object, either a single or array of Subscriber Object instances.
				@return			The Selector object.
				*/
				removeListener : function ( type, handler )
				{
					var self = this;

						if ( self.hasListener( type ) )
						{
							self[ 0 ][ '$listener_' + type ].detach( handler );
						}

						return self;
				},

				/*
				@function		focus
				@usage			Sets focus to the element.
				@return			The Selector object.
				*/
				focus : function ()
				{
					var self = this;
						self[ 0 ].focus();

						return self;
				},

				/*
				@function		blur
				@usage			Sets a blur to the element.
				@return			The Selector object.
				*/
				blur : function ()
				{
					var self = this;
						self[ 0 ].blur();

						return self;
				},

				/*
				@function		message
				@usage			Adds or removes Subscribers from the Selector Object for message events.
				@param			handler : The hanlder object, either a single or array of Subscriber Object instances.
				@param			remove	: A boolean indicating to remove the handlers or not. True is to remove, otherwise not.
				@return			The Selector object.
				*/
				message : function ( handler, remove )
				{
					return remove ? this.removeListener( 'message', handler ) : this.listener( 'message', handler );
				},

				/*
				@function		load
				@usage			Adds or removes Subscribers from the Selector Object for load events.
				@param			handler : The hanlder object, either a single or array of Subscriber Object instances.
				@param			remove	: A boolean indicating to remove the handlers or not. True is to remove, otherwise not.
				@return			The Selector object.
				*/
				load : function ( handler, remove )
				{
					return remove ? this.removeListener( 'load', handler ) : this.listener( 'load', handler );
				},

				/*
				@function		click
				@usage			Adds or removes Subscribers from the Selector Object for click events.
				@param			handler : The hanlder object, either a single or array of Subscriber Object instances.
				@param			remove	: A boolean indicating to remove the handlers or not. True is to remove, otherwise not.
				@return			The Selector object.
				*/
				click : function ( handler, remove )
				{
					return remove ? this.removeListener( 'click', handler ) : this.listener( 'click', handler );
				},

				/*
				@function		change
				@usage			Adds or removes Subscribers from the Selector Object for change events.
				@param			handler : The hanlder object, either a single or array of Subscriber Object instances.
				@param			remove	: A boolean indicating to remove the handlers or not. True is to remove, otherwise not.
				@return			The Selector object.
				*/
				change : function ( handler, remove )
				{
					return remove ? this.removeListener( 'change', handler ) : this.listener( 'change', handler );
				},

				/*
				@function		focus
				@usage			Adds or removes Subscribers from the Selector Object for focus events.
				@param			handler : The hanlder object, either a single or array of Subscriber Object instances.
				@param			remove	: A boolean indicating to remove the handlers or not. True is to remove, otherwise not.
				@return			The Selector object.
				*/
				focus : function ( handler, remove )
				{
					return remove ? this.removeListener( 'focus', handler ) : this.listener( 'focus', handler );
				},

				/*
				@function		blur
				@usage			Adds or removes Subscribers from the Selector Object for blur events.
				@param			handler : The hanlder object, either a single or array of Subscriber Object instances.
				@param			remove	: A boolean indicating to remove the handlers or not. True is to remove, otherwise not.
				@return			The Selector object.
				*/
				blur : function ( handler, remove )
				{
					return remove ? this.removeListener( 'blur', handler ) : this.listener( 'blur', handler );
				},

				/*
				@function		keyPress
				@usage			Adds or removes Subscribers from the Selector Object for keypress events.
				@param			handler : The hanlder object, either a single or array of Observer/Subscriber Object instances.
				@param			remove	: A boolean indicating to remove the handlers or not. True is to remove, otherwise not.
				@return			The Selector object.
				*/
				keyPress : function ( handler, remove )
				{
					return remove ? this.removeListener( 'keypress', handler ) : this.listener( 'keypress', handler );
				},

				/*
				@function		keyUp
				@usage			Adds or removes Subscribers from the Selector Object for keyup events.
				@param			handler : The hanlder object, either a single or array of Observer/Subscriber Object instances.
				@param			remove	: A boolean indicating to remove the handlers or not. True is to remove, otherwise not.
				@return			The Selector object.
				*/
				keyUp : function ( handler, remove )
				{
					return remove ? this.removeListener( 'keyup', handler ) : this.listener( 'keyup', handler );
				},

				/*
				@function		keyDown
				@usage			Adds or removes Subscribers from the Selector Object for keydown events.
				@param			handler : The hanlder object, either a single or array of Observer/Subscriber Object instances.
				@param			remove	: A boolean indicating to remove the handlers or not. True is to remove, otherwise not.
				@return			The Selector object.
				*/
				keyDown : function ( handler, remove )
				{
					return remove ? this.removeListener( 'keydown', handler ) : this.listener( 'keydown', handler );
				},

				/*
				@function		html
				@usage			Sets the innerHTML value of a selector.
				@param			value : HTML string to set.
				@return			The Selector object.
				*/
				html : function ( value )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							if ( value !== null && value !== undefined )
							{
								element.innerHTML = String( value );

								return self;
							}
							else
							{
								return element.innerHTML;
							}
						}
				},

				/*
				@function		value
				@usage			Sets the value of the input field.
				@param			value : String to set.
				@return			The Selector object.
				*/
				value : function ( value )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							if ( value !== null && value !== undefined )
							{
								element.value = String( value );

								return self;
							}
							else
							{
								return element.value;
							}
						}
				},

				/*
				@function		text
				@usage			Sets the text value of a selector.
				@param			value : Text string to set.
				@return			The Selector object.
				*/
				text : function ( value )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							if ( typeof value === 'string' )
							{
								element[ element.textContent !== null && element.textContent !== undefined ? 'textContent' : 'innerText' ] = _$.normalizeSpace( value );
							}
							else
							{
								return 	element[ element.textContent !== null && element.textContent !== undefined ? 'textContent' : 'innerText' ];
							}
						}

						return self;
				},

				/*
				@function		layer
				@usage 			Moves the element to the indicated z-index value, or layer starting from position '0'. If no number is set and the element exists, then it is set to "0", which is the default value.
				@param: 		value : The z-index layer value.
				@return			The Selector object.
				*/
				layer : function ( value )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							element.style.zIndex = value || 0;
						}

						return self;
				},

				/*
				@function		opacity
				@usage			Changes an elements opacity.
				@param			value : The opacity to set the element to.
				@return			The Selector object.
				*/
				opacity : function ( value )
				{
					var self = this;

						_$.opacity( this, value );

						return self;
				},

				/*
				@function		resetCSS
				@usage			Sets the element's style value to the passed in object literal and then returns the old values to be later converted back.
				@param 			css : The new CSS styles passed in as an object literal.
				@return			The old CSS values changed by the object literal passed in as a paramater.
				*/
				resetCSS : function ( css )
				{
					var self = this,
						element = self[ 0 ];

						if ( element !== null && typeof css === 'object' )
						{
							var retVal = {},
								style,
								elementStyle = element.style;

								for ( style in css )
								{
									retVal[ style ] = self.style( style );

									elementStyle[ style ] = css[ style ];
								}

								return retVal;
						}
				},

				/*
				@function		restoreCSS
				@usage			A function for restoring the side effects of the resetCSS function.
				@param 			css : The old CSS styles passed in as an object literal.
				@return			The Selector object.
				*/
				restoreCSS : function ( css )
				{
					var self = this,
						element = self[ 0 ];

						if ( element !== null && typeof css === 'object' )
						{
							element = element.style;

							for ( var index in css )
							{
								element[ index ] = css[ index ];
							}
						}

						return self;
				},

				/*
				@function		style
				@note			Rerteives an element's computed style value.
				@param 			index : The style value to retrieve.
				@return 		A value representing the style value for the element.
				*/
				style : function ( index )
				{
					return _$.style( this[ 0 ], index );
				},

				/*
				@function		width
				@usage			Retrieves the width of the element.
				@return			The width as an integer value.
				*/
				width : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( typeof element !== null )
						{
							if ( self.style( 'display' ) != 'none' )
							{
								return parseInt( element.offsetWidth || self.style( 'width' ) );
							}

							var css = self.resetCSS( { position : 'absolute', display : 'block', visibility : 'hidden' } );

								element = parseInt( element.offsetWidth || self.style( 'width' ) );

								self.restoreCSS( css );

								return element;
						}
				},

				/*
				@function		height
				@usage			Retrieves the height of the element.
				@return			The height as an integer value.
				*/
				height : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( typeof element !== null )
						{
							if ( self.style( 'display' ) != 'none' )
							{
								return parseInt( element.offsetHeight || self.style( 'height' ) );
							}

							var css = self.resetCSS( { position : 'absolute', display : 'block', visibility : 'hidden' } );

								element = parseInt( element.offsetHeight || self.style( 'height' ) );

								self.restoreCSS( css );

								return element;
						}

				},

				/*
				@function 		moveTo
				@usage			Moves an element to another position, indicated by left and top values, relative
								"per1, per2" optional number types, "px" or "%".
				@param			left, The width of the element
				@param			top, the height of the element
				@param			per1, optional "px or "%" value for param1 "x" by setting true for "%"
				@param			per2, optional "px or "%" value for param1 "y" by setting true for "%"
				@return			The Selector object.
				*/
				moveTo : function ( left, top, per1, per2 )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							element.style.left = left + ( per1 ? '%' : 'px' );
							element.style.top = top + ( per2 ? '%' : 'px' );
						}

						return self;
				},

				/*
				@function		docTop
				@usage			Find an elements top (X) position in relation to the document
				@return			An integer value representing the element's top position in relation to the document
				*/
				docTop : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							return parseInt( element.offsetParent ? element.offsetTop + self.parent( 1 ).docTop() : element.offsetTop );
						}
				},

				/*
				@function		docLeft
				@usageFind		An elements left (Y) position in relation to the document
				@return			An integer value representing the element's left position in relation to the document
				*/
				docLeft : function (element)
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							return parseInt( element.offsetParent ? element.offsetLeft + self.parent( 1 ).docLeft() : element.offsetLeft );
						}
				},

				/*
				@function		parentTop
				@usage			Returns the top position of the element passed
				@return			An integer value representing the element's top position in relation to the parent element
				*/
				parentTop : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							if ( self.parent( 1 ).get() === element.offsetParent )
							{
								return element.offsetTop;
							}
							else
							{
								return self.docTop() - self.parent( 1 ).docTop();
							}
						}
				},

				/*
				@function		parentLeft
				@usage			Returns the left position of the element passed
				@return			An integer value representing the element's left position in relation to the parent element
				*/
				parentLeft : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							if ( self.parent( 1 ).get() === element.offsetParent )
							{
								return element.offsetLeft;
							}
							else
							{
								return self.docLeft() - self.parent( 1 ).docLeft();
							}
						}
				},

				/*
				@function		show
				@usage			Sets an element to be visible, that possibly was hidden by the hide function or css styles, etc... The "visibility" property of the element is set to visible. The "display" property of the element is set to block by default.
				@param			display : Optional, type of display, default is "block", must be a string value to pass.
				@return			The Selector object.
				*/
				show : function ( display )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							element.style.display = typeof display === 'string' ? display : element.$oldDisplay || 'block';
							element.style.visibility = 'visible';
						}

						return self;
				},

				/*
				@function		hide
				@usage			Sets an element to be hidden. The "visibility" property of the element is set to hidden. The "display" property of the element is set to none.
				@param			display : A boolean value of whether to leave the display as is and change only the visibility, or by default set it to "none".
				@return			The Selector object.
				*/
				hide : function ( display )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							/*
							@note	Findout what is the current display state.
							*/
							var d = self.style( 'display' );

								if ( d != 'none' )
								{
									element.$oldDisplay = d;
								}

								element.style.visibility = 'hidden';

								if ( typeof display !== true )
								{
									/*
									@note	Set the display to none (hiding the element).
									*/
									element.style.display = 'none';
								}
						}

						return self;
				},

				/*
				@function		attribute
				@usage			Get or set an attribute value for an element.
				@param 			name : The attirbute name.
				@param 			value : An optionanl replacement value.
				@param 			append : An optional boolean value to append the value or to replace it from @param 2.
				@return			The Selector object.
				*/
				attribute : function ( name, value, append )
				{
					var self = this,
						element = self[ 0 ];

						if ( element && typeof name === 'string' )
						{
							/*
							@note	If the user is setting a value.
							*/
							if ( typeof value === 'string' || typeof value === 'number' )
							{
								/*
								@note	If we can, use setAttribute.
								*/
								if ( typeof element.setAttribute === 'function' )
								{
									element.setAttribute( name, _$.normalizeSpace( append === true ? self.attribute( name ) + ' ' + value : value ) );
								}
								else if ( element[ name ] )
								{
									/*
									@note	Set the quick way first.
									*/
									element[ name ] = _$.normalizeSpace( append === true ? self.attribute( name ) + ' ' + value : value );
								}

								return self;
							}

							return element[ name ] || ( typeof element.getAttribute === 'function' ? element.getAttribute( name ) : '' ) || '';
						}
				},

				/*
				@function		removeAttribute
				@usage			Removes an attribute or an attribute value within the attribute
				@param 			name : The attribute name.
				@param 			value : An optional value to remove from an attribute.
				@return 		The Selector object.
				*/
				removeAttribute : function ( name, value )
				{
					var self = this,
						element = self[ 0 ];

						if ( element && typeof name === 'string' )
						{
							if ( typeof value === 'string' )
							{
								self.attribute( name, self.attribute( name ).replace( new RegExp( '\\b' + value + '\\b' ), '' ) );
							}
							else
							{
								element.removeAttribute( name, 0 );
							}

							return self;
						}

						return self;
				},

				/*
				@function		addClass
				@usage			Append a class value to an element.
				@param 			className : The class name to append.
				@return			The Selector object.
				*/
				addClass : function ( className )
				{
					var self = this;

						if ( !_$.needle( className ).test( self.attribute( 'class' ) ) )
						{
							self.attribute( 'class', className, true );
						}

						return self;
				},

				/*
				@function		removeClass
				@usage			Removes a class value from an element.
				@param			className : The class to remove.
				@return 		The Selector object.
				*/
				removeClass : function ( className )
				{
					return this.removeAttribute( 'class', className );
				},

				/*
				@function		parent
				@usage			A reference to the parent Selector object.
				@param			level : The level of parent object to iterate to.
				@return			The parent Selector object or the current selecter object if no parent exists.
				*/
				parent : function ( level )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							var i = ( level || 1 );

								do
								{
									element = element.parentNode;
								}
								while ( element && element.nodeType && --i > 0 );

								return _$( element );
						}
				},

				/*
				@function		previous
				@usage			A reference to the previous element's Selector object.
				@return			The previous Selector object or the current selecter object if no parent exists.
				*/
				previous : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							do
							{
								element = element.previousSibling;
							}
							while ( element && element.nodeType != 1 );

							return _$( element );
						}
				},

				/*
				@function		next
				@usage			A reference to the next element's Selector object.
				@return			The next Selector object or the current selecter object if no parent exists.
				*/
				next : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							do
							{
								element = element.nextSibling;
							}
							while ( element && element.nodeType != 1 );

							return _$( element );
						}
				},

				/*
				@function		first
				@usage			A reference to the first element's Selector object.
				@return			The first Selector object or the current selecter object if no parent exists.
				*/
				first : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							element = element.firstChild;

							return ( element && element.nodeType != 1 ) ? self.next() : _$( element );
						}
				},

				/*
				@function		last
				@usage			A reference to the last element's Selector object.
				@return			The last Selector object or the current selecter object if no parent exists.
				*/
				last : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							element = element.lastChild;

							return ( element && element.nodeType != 1 ) ? self.parent( 1 ) : _$( element );
						}
				},

				/*
				@function		prepend
				@usage			Prepends an HTML element.
				@param 			htmlElement : The element to append.
				@return			The Selector object.
				*/
				prepend : function ( htmlElement )
				{
					var self = this;
						return self.insert( htmlElement, self.first() || null );
				},

				/*
				@function		append
				@usage			Appends an HTML element.
				@param 			htmlElement : The element to append.
				@return			The Selector object.
				*/
				append : function ( htmlElement )
				{
					return this.insert( htmlElement, null );
				},

				/*
				@function		insert
				@usage			Adds an HTML element.
				@param 			htmlElement : The element to append.
				@param 			beforeElement : An optional element to insert the element @param1 before.
				@return			The Selector object.
				*/
				insert : function ( htmlElement, beforeElement )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							element.insertBefore( htmlElement instanceof _Selector ? htmlElement[ 0 ] : htmlElement, beforeElement instanceof _Selector ? beforeElement[ 0 ] || null : beforeElement || null );
						}

						return self;
				},

				/*
				@function		remove
				@usage			Removes a node from the element tree
				@param 			htmlElement : The element to remove.
				@return			The Selector object.
				*/
				remove : function ( htmlElement )
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							htmlElement = htmlElement instanceof _Selector ? htmlElement[ 0 ] : htmlElement;

							var children = element.childNodes,
								i = children.length - 1;

								for ( ; i >= 0; --i )
								{
									if ( children[ i ] === htmlElement )
									{
										element.removeChild( htmlElement );

										break;
									}
								}
						}

						return self;
				},

				/*
				@function		clear
				@usage			Removes all elements within itself.
				@return			The Selector object.
				*/
				clear : function ()
				{
					var self = this,
						element = self[ 0 ];

						if ( element )
						{
							var toRemove;

								while ( ( toRemove = element.firstChild ) )
								{
									element.removeChild( toRemove );
								}
						}

						return self;
				},

				/*
				@function		size
				@usage			Retrieves the length of elements in the Selector Object.
				@return			An integer value representing the number of Selector Objects in the Selector request.
				*/
				size : function ()
				{
					return this.length;
				},

				/*
				@function		animate
				@usage			Returns an Animate Object.
				@param			properties : An object literal of properties to animate.
				@param			speed : An optional speed.
				@param			easing: An optional easing type.
				@param			callback : An optional callback function or Observable Object reference.
				*/
				animate : function ( properties, speed, easing, callback )
				{
					return new _Animate( _$, this, properties, speed, easing, callback );
				}
			});

			/*
			@function		time
			@usage			Returns a Time object.
			@return			A Time Object reference.
			*/
			_$.time = function ()
			{
				return _Time;
			},

			/*
			@function		addCSS
			@usage			Adds CSS to the document, by appending a style element to the head of the page.
			@param			text : The CSS text value.
			@return			The namespace "$" Object.
			*/
			_$.addCSS = function ( text )
			{
				if ( typeof text === 'string' )
				{
					var elem = $.create( 'style', { type: 'text/css' } );

						if ( elem.styleSheet )
						{
							elem.styleSheet.text = text;
						}
						else
						{
							_$( elem ).insert( document.createTextNode( text ) );
						}

						_$( 'head' ).append( elem );
				}

				return _$;
			};

			/*
			@function		addJS
			@usage			Adds JS to the document, by appending a script element to the body of the page.
			@param			text : The JS text value.
			@return			The namespace "$" Object.
			*/
			_$.addJS = function ( text )
			{
				if ( typeof text === 'string' )
				{
					_$( 'body' ).append( $.create( 'script', { type: 'text/javascript', text: text } ) );
				}

				return _$;
			};

			/*
			@function		linkify
			@usage			Converts detected urls to anchor links.
			@param			string : The string to search.
			@return			The passed in string with URLS converted to anchors.
			*/
			_$.linkify = function ( string )
			{
				return string.replace( /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|]*)/gim, '<a href="$1" target="_blank">$1</a>' ).replace( /(^|[^\/])(www\.[\S]+(\b|$))/gim, '$1<a href="http://$2" target="_blank">$2</a>' ).replace( /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim, '<a href="mailto:$1">$1</a>' );
			};

			/*
			@function		needle
			@usage			Returns a RegExp Object that searches for the value passed in a string.
			@param			search : The value to search for.
			@return			RegExp Object.
			*/
			_$.needle = function ( search )
			{
				return new RegExp( '(?:^|\\s)' + _$.normalizeSpace( String( search ) ) + '(?:\\s|$)' )
			};

			/*
			@function		create
			@usage			Dynamically creates an xhtml element.
			@param			tag : The element type to create
			@param			properties : An object reference of the elements properties.
			@param3+		If param1 is equal to "table" then param2+ becomes table row references.
			@return			The element with the properties created.
			*/
			_$.create = function ( tag, properties )
			{
				tag = tag.toLowerCase();

				var d = _$( document.createElement( tag || 'div' ) ),
					m,
					n;

					/*
					@note		If the element to create is a table, then we enter the algorithm below.
					*/
					if ( tag === 'table' )
					{
						/*
						@note		Get the arguments length from the passed in arguments to the function
									If this is a table element, we are expecting at least two arguments.
						*/
						m = 2;
						n = arguments.length - 1;

						/*
						@note		A document fragment is created to speed the creation of the element
									We loop through the arguments starting at "m" which is 2, to create the table.
						*/
						var f = _$( document.createDocumentFragment() ),
							r,
							k;

							for ( ; m <= n; ++m )
							{
								/*
								@note		If the arguments exists, and there is a type set, then we create the element type,
											otherwise tbody is used. The values are then checked in the 2+ arguments passed.
								*/
								tag = _$.create( arguments[ m ].type ? arguments[ m ].type : 'tbody' );

								for ( properties in arguments[ m ] )
								{
									if ( properties == 'id' )
									{
										tag[ 0 ].id = arguments[ m ][ properties ];
									}
									else if ( properties != 'type' )
									{
										/*
										@note		A table row is created, by default to set up for table cells
										*/
										r = _$.create( 'tr', arguments[ m ][ o ].row );

										/*
										@note		Then any other value is treated as a table cell, and is then attached or appended to the table row.
										*/
										for ( k in arguments[ m ][ o ] )
										{
											if ( k != 'row' )
											{
												r.insert( $.create( 'td', arguments[ m ][ o ][ k ] ) );
											}
										}

										tag.insert( r );
									}

								f.insert( tag );
							}
						}

						d.insert( f );
					}

					/*
					@note		Whether the element to create is a table or not, the attributes are set here
								Consideration is taken based on the browser type to set the appropriate attributes
								for the elements.
					*/
					for ( m in properties )
					{
						switch ( m )
						{
							case 'class' :
							case 'className' :
								d.addClass( properties[ m ] );
							break;

							case 'style' :

								for ( n in properties[ m ] )
								{
									d[ 0 ].style[ n ] = properties[ m ][ n ];
								}

							break;

							case 'append' :
							case 'appendChild' :
								d.append( properties[ m ] );
							break;

							case 'text' :
							case 'innerText' :
								d.text( properties[ m ] );
							break;

							case 'html' :
							case 'innerHTML' :
								d.html( properties[ m ] );
							break;

							default :
								d.attribute( m, properties[ m ] );
							break;
						}
					}

					return d;
			};

			/*
			@function		style
			@note			Rerteives an element's computed style value.
			@param			element : The element to retrieve the style value from.
			@param 			index : The style value to retrieve.
			@return 		A value representing the style value for the element.
			*/
			_$.style = function ( element, index )
			{
				if ( typeof element !== null )
				{
					if ( !index )
					{
						return element.style;
					}

					else if ( element.style !== null && typeof element.style === 'object' && element.style[ index ] )
					{
						return element.style[ index ];
					}

					/*
					@note	Otherwise,try to use IE's method.
					*/
					else if ( element.currentStyle !== null && typeof element.currentStyle === 'object' && element.currentStyle[ index ] )
					{
						return element.currentStyle[ index ];
					}

					/*
					@note	Or the W3C's method, if it exists.
					*/
					else if ( document.defaultView && document.defaultView.getComputedStyle )
					{
						/*
						@note	It uses the traditional'text-align' style of rule writing, instead of textAlign.
						*/
						index = ( index.replace( /([A-Z])/g, '-$1' ) ).toLowerCase();

						element = document.defaultView.getComputedStyle( element, '' );

						return element && element.getPropertyValue( index );
					}
				}
			};

			/*
			@function		isSelector
			@usage			Determines if a value is a _Selector Object or not.
			@return			A boolean value, true if the value is a Selector Object, false otherwise.
			*/
			_$.isSelector = function ( selector )
			{
				return selector instanceof _Selector;
			};

			/*
			@function		version
			@usage			Retrieves the version of the AjaxScript library.
			@return			A string represening the version value.
			*/
			_$.version = function ()
			{
				return _version;
			};

			/*
			@class			Interface
			@usage			Defines object interfaces.
			@param			name : The interface name.
			@param			methods : The interface methods.
			@return			A new Interface object.
			*/
			_$.Interface = _Material.extend
			( {
				constructor : function ( name, methods )
				{
					/*
					@note	For debugging.
					*/
					if ( typeof name !== 'string' || !_$.isArray( methods ) )
					{
						name = false;
					}

					for ( var i = methods.length - 1; i >= 0; --i )
					{
						if ( typeof methods[ i ] !== 'string' )
						{
							name = false;

							break;
						}
					}

					if ( name === false )
					{
						return;
					}

					var self = this;

						/*
						@function		hasBeenImplemented
						@usage			Ensures the object has extended the interface and implemented its method definitions.
						*/
						self.hasBeenImplemented = function ()
						{
							var index,
								i = methods.length - 1;

								for ( ; i >= 0; --i )
								{
									index = methods[ i ];

									if ( !self[ index ] || typeof self[ index ] !== 'function' )
									{
										return false;
									}
								}

								return true;
						}
				}
			} );

			/*
			@interface		SubscriberInterface
			@usage			Defines the interface for the Subscriber class.
			@param			update : An update function that is called when the notify function of the Subject is called.
			*/
			_SubscriberInterface = _$.Interface.extend
			( {
				constructor : function ( update )
				{
					var self = this;

						self.base( 'SubscriberInterface', [ 'update' ] );

						self.update = typeof update === 'function' ? update : null;
				}
			} );

			/*
			@class			Subscriber
			@usage			Implements the SubscriberInterface interface.
			@param			update : An update function that is called when the notify function of the Subject is called.
			*/
			_$.Subscriber = _SubscriberInterface.extend ();

			/*
			@interface		SubjectInterface
			@usage			Defines the interface for the Subject class.
			@param			subscribers : An array of Subscriber objects that will be notified by the Subject class.
			*/
			_SubjectInterface = _$.Interface.extend
			( {
				constructor : function ( subscribers )
				{
					var self = this;

						self.base( 'SubjectInterface', [ 'notify' ] );

						self.subscribers = [];

						self.attach( subscribers || [] );
				},

				/*
				@function		attach
				@usage			Adds an Subscriber object to the list of subscribers watching this Subject.
				@param			subscriber : An instance or array list of the Subscriber object ( s ) to add.
				*/
				attach : function ( subscriber )
				{
					var self = this;

						/*
						@note	Array of subscribers.
						*/
						if ( _$.isArray( subscriber ) )
						{
							for ( var i = 0, l = subscriber.length - 1; i <= l; ++i )
							{
								self.attach( subscriber[ i ] );
							}

							return true;
						}

						/*
						@note	Single instance.
						*/
						else if ( subscriber instanceof _SubscriberInterface && !self.has( subscriber ) )
						{
							self.subscribers.push( subscriber );

							return true;
						}

						return false;
				},

				/*
				@function		detach
				@usage			Removes an Subscriber object from the list of subscribers watching this Subject.
				@param			subscriber : An instance or array list of the Subscriber object ( s ) to remove.
				@return			A boolean value indicating the result.
				*/
				detach : function ( subscriber )
				{
					/*
					@note	Array of subscribers.
					*/
					if ( _$.isArray( subscriber ) )
					{
						var self = this,
							i = subscriber.length - 1;

							for ( ; i >= 0; --i )
							{
								self.detach( subscriber[ i ] );
							}

							return true;
					}

					/*
					@note	Single instance.
					*/
					else if ( subscriber instanceof _SubscriberInterface )
					{
						var	subscribers = this.subscribers,
							i = 0,
							l = subscribers.length - 1;

							for ( ; i <= l; ++i )
							{
								if ( subscriber === subscribers[ i ] )
								{
									subscribers.splice( i, 1 );

									return true;
								}
							}
					}

					return false;
				},

				/*
				@function		has
				@usage			Determines if a subscriber is already set for the Subject Object.
				@param			subscriber : A Subscriber Object to check for.
				@return			A boolean indicating the result. True is returned if the Subscriber is already set as an observable object, false otherwise.
				*/
				has : function ( subscriber )
				{
					var	index,
						subscribers = this.subscribers;

						for ( index in subscribers )
						{
							if ( subscriber === subscribers[ index ] )
							{
								return true;
							}
						}

						return false;
				},

				/*
				@function		doNotify
				@usage			Runs the notify function of extended objects and calls the update function for all Subscriber objects in the subscribers list.
				@param			subscriber : An instance of the Subscriber object.
				@param			scope : The scope at which to call the notify function.
				@param			callback : An optional callback to call when the subscribers have all been notified.
				*/
				doNotify : function ( subject, scope, callback )
				{
					var interface = _SubscriberInterface,
						subscribers = this.subscribers,
						i = 0,
						l = subscribers.length - 1,
						subscriber;

						for ( ; i <= l; ++i )
						{
							subscriber = subscribers[ i ];

							if ( subscriber instanceof interface && subscriber.hasBeenImplemented() )
							{
								subscriber.update.call( scope || subscriber, subject );
							}
						}

						/*
						@note	Execute the callback if one exists.
						*/
						if ( typeof callback === 'function' )
						{
							callback.call( scope || window, subject );
						}
				},

				/*
				@function		reset
				@usage			removes all the subscribers.
				*/
				reset : function ()
				{
					this.subscribers = [];
				}

			} );

			/*
			@class			Dispatcher
			@usage			Implements the SubjectInterface interface.
			@param			event : An event to pass to all Subscriber objects watching this Subject objects.
			*/
			_$.Dispatcher = _SubjectInterface.extend
			( {
				notify : function ( event, scope, callback )
				{
					this.doNotify( event, scope, callback );
				}
			} );

			/*
			@class			Publisher
			@usage			Implements the SubjectInterface interface.
			*/
			_$.Publisher = _SubjectInterface.extend
			( {
				notify : function ( scope, callback )
				{
					var self = this;

						self.doNotify( self, scope, callback );
				}
			} );

			/*
			@function		handlerCheck
			@usage			Checks whether a value is a function or Subject.
			@param			handler : Either a function reference or an array of Subscriber object instances.
			@param			subject : A SubjectInterface implemented object to attach the array of Subscriber objects @param one.
			@return			A function reference or Subject instance if one was passed and a function handler does not exist.
			*/
			_$.handlerCheck = function ( handler , subject )
			{
				if ( typeof handler === 'function' )
				{
					return handler;
				}

				else if ( typeof subject === 'function' && subject.ancestor === _SubjectInterface )
				{
					return new subject( handler );
				}
			};

			/*
			@function		handlerExecute
			@usage			Calls the notify method or function based on the appropriate handler type.
			@param			handler : Either a function reference or an instance of the SubjectInterface.
			@param			args : Argument to pass to the handler.
			@param			scope : The scope to call the handler in.
			@param			callback : The callback to execute when the handler is complete.
			*/
			_$.handlerExecute = function ( handler, args, scope, callback )
			{
				if ( typeof handler === 'function' )
				{
					return handler.call( scope || handler, args );
				}
				else if ( handler instanceof _SubjectInterface && handler.hasBeenImplemented() )
				{
					handler.notify( args, scope, callback );
				}
			};

			/*
			@class			Cache
			@usage			Stores values in a cache object with helpful functions.
			@param			items : An object or array of values to set in the cache.
			*/
			_Cache = _Material.extend
			( {
				/*
				@function		constructor
				@usage			Constructs the object.
				@param			items: An optional object literal to pass as the initial cached values.
				*/
				constructor : function ( items )
				{
					var self = this;

						/*
						@note	Always call the parent object's constructor.
						*/
						self.base();

						self.total = 0;
						self.items = {};

						self.set( items || {} );
				},

				/*
				@function		set
				@usage			Set an index value pair.
				@param			index : The index for the pair, or an object literal of name value pairs.
				@param			value : The value for the pair.
				@return			The value set for the pair.
				*/
				set : function ( index, value )
				{
					if ( _$.isObject( index ) )
					{
						var self = this,
							items;

							for ( items in index )
							{
								self.set( items, index[ items ] );
							}

							return true;
					}

					else if ( typeof index === 'string' || typeof index === 'number' )
					{
						var self = this;

							++self.total;

							return self.items[ index ] = value;
					}

					return false;
				},

				/*
				@function		get
				@usage			Retrieve a value from the cache if it exists.
				@param			index : The index to retrieve.
				@return			The value of the index or null if it does not exist.
				*/
				get : function ( index )
				{
					var self = this;

						return self.has( index ) ? self.items[ index ] : null;
				},

				/*
				@function		has
				@usage			Determines if the index checked has a value or not.
				@param			index : The index to check.
				@return			A boolean value indicating the result.
				*/
				has : function ( index )
				{
					return index && ( index in this.items );
				},

				/*
				@function		remove
				@usage			Remove a specific index value.
				@param			index : The index of the value to remove.
				@return			A boolean value indicating whether the removal was successful or not.
				*/
				remove : function ( index )
				{
					var self = this;

						if ( self.has( index ) )
						{
							if ( delete self.items[ index ] )
							{
								--self.total;

								return true;
							}
						}

						return false;
				},

				/*
				@function		clear
				@usage			Clears the cached items.
				*/
				clear : function ()
				{
					var self = this;

						self.items = {};
						self.total = 0;
				},

				/*
				@function		count
				@usage			Return the number of the cached items.
				*/
				count : function ()
				{
					return this.total;
				},

				/*
				@function		dump
				@usage			Gets all the items in the cache.
				@return			An object literal of all the items in the cache.
				*/
				dump : function ()
				{
					return this.items;
				}
			} );

			/*
			@class			SmartMovements
			@usage			Defines the SmartMovements API.
			*/
			_SmartMovements = new function ( $, window )
			{
				var self = this,
					_cache = new _Cache();

					/*
					@function		framework
					@usage			Extends the SmartMovements API.
					@param			dynamic : The values to pass to the SmartMovements framework when extendning its API.
					*/
					self.framework = function ( dynamic )
					{
						if ( !_cache.has( dynamic.smartmovement ) )
						{
							_cache.set( $.normalizeSpace( dynamic.smartmovement ), dynamic );
						}
					};

					/*
					@function		callback
					@usage			The callback function used when the selector calls on the smartmovements.
					@param			subscribers : A subscriber list of handlers.
					*/
					self.callback = function ( subscribers )
					{
						var self = this,
							i,
							movement,
							smartmovements = self.attribute( 'smartmovements' );

							smartmovements = smartmovements ? smartmovements.split( ',' ) : [];

							i = smartmovements.length - 1;

							for ( ; i >= 0; --i )
							{
								movement = $.normalizeSpace( smartmovements[ i ] );

								if ( _cache.has( movement ) &&( movement = _cache.get( movement ).callback ) && typeof movement === 'function' )
								{
									 movement.call( self, $, window, document, undefined, subscribers );
								}
							}
					};

			} ( _$, window );

			/*
			@function		Cache
			@usage			Stores values in a cache object with helpful functions.
			@param			items : An object or array of values to set in the cache.
			*/
			_$.Cache = _Cache;

			/*
			@class			_Cookie
			@usage			Manages the cookie values.
			*/
			_Cookie = new function ( _$, document )
			{
				var self = this,
					_cache = new _Cache();

					/*
					@function	set
					@usage  	Creates a Cookie.
					@param  	c : The cookie name.
					@param  	d : The cookie value.
					@param  	i : The expirary date of the cookie.
					@param  	m : The cookie path.
					@param  	n : The cookie domain.
					@param  	b : Whether to use secure data transmission or not.
					@return 	The cookie value.
					*/
					self.set = function ( c, d, i, m, n, b )
					{
						var l = new Date(),
							j;

							l.setTime( l.getTime() );

							j = new Date( l.getTime() + ( i ? i : 86400000 ) );

							document.cookie = c + '=' + escape( d ) + ';expires=' + j.toGMTString() + ';path=' + ( m ? m : '/' ) + ';domain=' + ( n ? n : '.' + document.domain.replace( /www\./, '' ) ) + ( b ? ';secure' : '' );

							_cache.set( c, d );

							return d;
					};

					/*
					@function	get
					@usage		Returns a Cookie value.
					@param 		c : The cookie name.
					@return		The cookie value.
					*/
					self.get = function ( c )
					{
						var cookie = _cache;

							/*
							@note	Check if the cookie already exists in the current session. This will be returned rather than issuing the overhead to get the cookie values.
							*/
							if( cookie.has( c ) )
							{
								return cookie.get( c );
							}

							/*
							@note	Set the needed local variables.
							*/
							var d = document.cookie.split( ';' ),
								m,
								n,
								i = d.length - 1,
								l,
								j = null;

								for ( ; i >= 0; --i )
								{
									m = d[ i ].split( '=' );

									n = m[ 0 ].replace( /^\s+|\s+$/g, '' );

									/*
									@note	Check if the cookie value exists in the session object. If not, this is a great opportunity to set it in the session object to reduce overhead on later calls.
									*/
									l = n;

									/*
									@note	Ensure that all the cookies that are not in the session object are now placed in the session.
									*/
									if ( !cookie.has( n ) && typeof m[ 1 ] === 'string' )
									{
										l = cookie.set( n, unescape( _$.normalizeSpace( m[ 1 ] ) ) );
									}

									/*
									@note	If c and n match and the length of m is greater than 1, then we have a cookie value to be returned.
									*/
									if ( n === c )
									{
										j = l;
									}
								}

								return j;
					};

					/*
					@function	remove
					@usage 		Deletes a Cookie.
					@param 		c : The cookie name.
					@param		m : The cookie path.
					@param 		n : The cookie domain.
					*/
					self.remove = function ( c, m, n )
					{
						if ( self.get( c ) )
						{
							document.cookie = c + '= ;path=' + ( m ? m : '/' ) + ';domain=' + ( n ? n : '.' + document.domain.replace( /www\./, '' ) ) + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';

							_cache.remove( c );
						}
					};

			} ( _$, document );

			/*
			@class		_Get
			@usage		Manages GET values.
			*/
			_Get = new function ( _$, window )
			{
				var self = this,
					_cache = new _Cache();

					/*
					@function	get
					@usage		Captures GET values.
					@param		c : The value to retrieve.
					@return		The GET value or null.
					*/
					self.get = function ( c )
					{
						/*
						@note	Check if the cookie already exists in the current session. This will be returned rather than issuing the overhead to get the cookie values.
						*/
						if ( _cache.has( c ) )
						{
							return _cache.get( c );
						}

						/*
						@note	Set the needed local variables.
						*/
						var url = window.location.href.split( '?' ),
							d = ( url.length > 1 ? url[ 1 ].split( '&' ) : [] ),
							m,
							n,
							i = d.length - 1,
							l,
							j = null;

							for ( ; i >= 0; --i )
							{
								m = d[ i ].split( '=' );

								n = _$.normalizeSpace( m[ 0 ] );

								/*
								@note	Check if the get value exists in the session object. If not, this is a great opportunity to set it in the session object to reduce overhead on later calls.
								*/
								l = n;

								/*
								@note	Ensure that all the get values that are not in the session object are now placed in the session.
								*/
								if ( !_cache.has( n ) && typeof m[ 1 ] === 'string' )
								{
									l = _cache.set( n, unescape(_$.normalizeSpace( m[ 1 ] ) ) );
								}

								/*
								@note	If c and n match and the length of m is greater than 1, then we have a get value to be returned.
								*/
								if ( n === c )
								{
									j = l;
								}
							}

							return j;
					};

					/*
					@function	set
					@usage		Rewrites the GET value with the get name value pair.
					@param		args : An object literal of name value pairs.
					*/
					self.set = function ( args )
					{
						/*
						@note	Set the needed local variables.
						*/
						var url = window.location.href.split( '?' ),
							d = ( url.length > 1 ? url[ 1 ].split( '#' )[ 0 ].split( '&' ) : [] ),
							m,
							i = d.length - 1,
							get = {},
							reload = false,
							result = {},
							normalizeSpace = _$.normalizeSpace,
							each = _$.each;

							/*
							@note	Capture all the GET values.
							*/
							for ( ; i >= 0; --i )
							{
								m = d[ i ].split( '=' );

								/*
								@note	Ensure none of the values are empty.
								*/
								if ( m[ 0 ] !== '' && m[ 1 ] !== '' )
								{
									get[ normalizeSpace( m[ 0 ] ) ] = normalizeSpace( m[ 1 ] );
								}
							}

							/*
							@note	Removes the GET values.
							*/
							if ( _$.isArray( args ) )
							{
								/*
								@note	Compare the values and add the output values intp the result object.
								*/
								while ( m = args.shift() )
								{
									each( get, function ( value, key )
									{
										/*
										@note	Remove the key from the array by not setting it in the result and removing it from the get values.
										*/
										if ( m == key )
										{
											reload = true;

											/*
											@note	Remove the args name value pair, to avoid cycling through the values again.
											*/
											delete get[ m ];
										}
									} );
								}

								/*
								@note	Ensure all get values are added to the result.
								*/
								each( get, function ( value, key )
								{
									result[ key ] = value;
								} );
							}

							/*
							@note	Adds the GET values.
							*/
							else if ( _$.isObject( args ) )
							{
								each( args, function ( value, key )
								{
									/*
									@note	If the key doesn't exist, then a reload will occur.
									*/
									if ( args[ key ] != get[ key ] )
									{
										reload = true;
									}

									result[ key ] = value;
								} );

								/*
								@note	Ensure all get values are added to the result.
								*/
								each( get, function ( value, key )
								{
									if ( !result[ key ] )
									{
										result[ key ] = value;
									}
								} );
							}

							/*
							@note	If reload is true, then rebuild the url and reload the window content.
							*/
							if ( reload === true )
							{
								get = '?';

								/*
								@note	Create the result string.
								*/
								each( result, function ( value, key )
								{
									get += key + '=' + value + '&';
								});

								/*
								@note	Rewrite the URL value.
								*/
								_$.goTo( url[ 0 ].split( '#' )[ 0 ] + ( get ? get : '' ) + window.location.hash );
							}
							else
							{
								/*
								@note	Return the get value object.
								*/
								return get;
							}
					};

			} ( _$, window );

			/*
			@function	get
			@usage		Allows for management of get values.
			*/
			_$.get = function ( args )
			{
				return typeof args === 'string' ? _Get.get( args ) : _Get.set( args );
			};

			/*
			@class		AjaxRequest
			@usage		The object passed to the AjaxHttp to make an Ajax type request.
			@param		settings : The object literal settings value.
			*/
			_AjaxRequest = _Material.extend
			( {
				WAITING : 0,
				SENDING : 1,
				HANDLING : 2,
				COMPLETE : 3,

				constructor : function ( settings )
				{
					var self = this,
						check = _$.handlerCheck,
						Dispatcher = _$.Dispatcher,
						boundary = _$.boundary;

						if ( _$.isObject( settings ) )
						{
							self.postMessage = settings.postMessage !== false;
							self.async = settings.async !== false;
							self.cache = settings.cache !== false;
							self.method = (settings.method || '').toLowerCase() !== 'post' ? 'get' : 'post';
							self.url = settings.url;
							/*self.url = self.prepareURL( settings.url );*/
							self.data = settings.data;
							self.age = 0;
							self.timeout = boundary( settings.timeout, 0, 10000 ) ? settings.timeout : 10000;
							self.priority = boundary( settings.priority, 0, 5 ) ? settings.priority : 0;
							self.contentType = typeof settings.contentType === 'string' ? settings.contentType : 'application/x-www-form-urlencoded; charset-utf8;';
							self.dataType = { json : 'json', script : 'script', xml : 'xml', html : 'html' }[ settings.dataType ] || 'json';
							self.beforeSend = check( settings.beforeSend, Dispatcher );
							self.dataFilter = typeof settings.dataFilter === 'function' ? settings.dataFilter : function ( data ) { return data; };
							self.success = check( settings.success, Dispatcher );
							self.error = check( settings.error, Dispatcher );
							self.failure = check( settings.failure, Dispatcher );
							self.notModified = check( settings.notModified, Dispatcher );
							self.complete = check( settings.complete, Dispatcher );
							self.state = self.WAITING;
							self.startTime = 0;
							self.endTime = 0;
							self.xhr = null;
						}
				},

				/*
				@function		prepareURL
				@usage			Checks the URL passed to ensure it is of the same type as the location. If not, then a check for HTML5 is made. If an array of URLs are passed, then each URL will be tried until one works.
				@param			urls : A string or array of URLs.
				@return			The URL values as an array.
				*/
				prepareURL : function ( urls )
				{
					return ( typeof urls === 'string' ? [ urls ] : ( _$.isArray( urls ) ? urls : [ window.location ] ) );
				},

				/*
				@function		getDataString
				@usage			Checks whether the data paramater is a string or object literal. After being checked the data is prepared based on the method [ get | post ].
				@return			The data value as a string.
				*/
				getDataString : function ()
				{
					var self = this,
						data = self.data;

						return ( typeof data === 'string' ? data : ( _$.isObject( data ) ? ( function ( method, data )
						{
							var retVal = '',
								value;

								for ( value in data )
								{
									retVal += value + '=' + ( method ? encodeURIComponent( data[ value ] ) : data[ value ] ) + '&';
								}

								return retVal;

						} )( self.method === 'post', data ) : '' ) );
				},

				/*
				@function		cancel
				@usage			Abort the request.
				*/
				cancel : function ()
				{
					var self = this;

						if ( self.xhr !== null && typeof self.xhr === 'object' )
						{
							self.xhr.abort();
						}
				}
			} );

			/*
			@class		AjaxResponse
			@usage		The object passed to the handlers of an AjaxHttp process.
			@param		AjaxRequest : The original AjaxRequest object.
			*/
			_AjaxResponse = _Material.extend
			( {
				constructor : function ( AjaxRequest, data, error )
				{
					var self = this;

						self.request = AjaxRequest;
						self.data = data;
						self.error = error;
				}
			} );

			/*
			@function		ajax
			@usage			Pushes a new AjaxRequest object on to the AjaxHttp queue.
			@param			settings : The AjaxRequest object settings.
			@return			The namespace "$" Object.
			*/
			_$.ajax = function ( settings )
			{
				_AjaxHttp.request( new _AjaxRequest( settings ) );

				return _$;
			};

			/*
			@function		extend
			@usage			Object creation function. Extends the Nacho base class.
			@param			dynamic : The dynamic object definition.
			@param			static : The static object definition.
			@return			The new object definition.
			*/
			_$.extend = function ( dynamic, static )
			{
				return _Material.extend( dynamic, static );
			};

			/*
			@function		debug
			@usage			Sets the code to logging or non-logging mode.
			@param			bool : If set to true logging is active otherwise not.
			@return			The namespace "$" Object.
			*/
			_$.debug = function ( bool )
			{
				_debug = bool === true;

				return _$;
			};

			/*
			@function		isDebugging
			@usage			A boolean test to determine if the scripts are in debug mode.
			@return			A boolean value indicating whether the scripts are in debug more or not.
			*/
			_$.isDebugging = function ()
			{
				return _debug;
			};

			/*
			@function	cookie
			@usage		Allows for management of cookies.
			*/
			_$.cookie = function ( args )
			{
				/*
				@note	If there is no value set, then get the value.
				*/
				if ( typeof args === 'string')
				{
					return _Cookie.get( args );
				}

				/*
				@note	Set the value of the get name pair.
				*/
				else if ( _$.isObject( args ) )
				{
					_$.each( args, function ( value, key )
					{
						_Cookie.set( key, value );
					} );

					return args;
				}

				/*
				@note	Otherwise remove the get value.
				*/
				else if ( _$.isArray( args ) )
				{
					var cookie;

						while ( cookie = args.shift() )
						{
							_Cookie.remove( cookie );
						}

						return args;
				}
			};

			/*
			@function		error
			@usage			Logs the message to the console. With an error status.
			@param			message : The value to log.
			@return			The namespace "$" Object.
			*/
			_$.error = function (message) {
				_Console.error(message);
				return _$;
			};

			/*
			@function		warn
			@usage			Logs the message to the console. With a warning status.
			@param			message : The value to log.
			@return			The namespace "$" Object.
			*/
			_$.warn = function (message) {
				_Console.warn(message);
				return _$;
			};

			/*
			@function		log
			@usage			Logs the message to the console. With a log status.
			@param			message : The value to log.
			@return			The namespace "$" Object.
			*/
			_$.log = function (message) {
				_Console.log(message);
				return _$;
			};

			/*
			@function		load
			@usage			Dynamically add window load events.
			@param			func : The function to add.
			@param			order : The call stack order.
			@return			The namespace "$" Object.
			*/
			_$.load = function ( func, order )
			{
				_OnLoad.addFunction( func, order, _OnLoad.load );

				return _$;
			};

			/*
			@function		scroll
			@usage			Dynamically add window onscroll events.
			@param			func : The function to add.
			@param			order : The call stack order.
			@return			The namespace "$" Object.
			*/
			_$.scroll = function ( func, order )
			{
				_OnLoad.addFunction( func, order, _OnLoad.onscroll );

				return _$;
			};

			/*
			@function		resize
			@usage			Dynamically add window onresize events.
			@param			func : The function to add.
			@param			order : The call stack order.
			@return			The namespace "$" Object.
			*/
			_$.resize = function ( func, order )
			{
				_OnLoad.addFunction( func, order, _OnLoad.onresize );

				return _$;
			};

			/*
			@function		normalizeSpace
			@usage			Trims the white-space around a string.
			@param			char : The string value to convert.
			@return			The new string vablue.
			*/
			_$.normalizeSpace = function ( char )
			{
				return char.replace ? char.replace( /^\s+|\s+$/g, '' ) : char;
			};

			_$.toCapitalize = function( char ) {
				return char.replace ? _$.normalizeSpace( char ).replace(/(?:^|\s)\S/g, function ( value )
				{
					return value.toUpperCase().replace( /(\_|\-)/g, '' );

				} ) : char;
			};

			/*
			@function		toCamel
			@usage			Turns dashes or underscores to camel casing.
			@param			char : The string value to convert.
			@return			The new string vablue.
			*/
			_$.toCamel = function ( char )
			{
				return char.replace ? _$.normalizeSpace( char ).replace( /(\_|\-)+([a-zA-Z])/g, function ( value )
				{
					return value.toUpperCase().replace( /(\_|\-)/g, '' );

				} ) : char;
			};

			/*
			@function		toDash
			@usage			Converts camel casing to dashes.
			@param			char : The string value to convert.
			@return			The new string vablue.
			*/
			_$.toDash = function ( char )
			{
				return char.replace ? _$.normalizeSpace( char ).replace( /( |\-|\_|[A-Z])+([a-zA-Z])/g, function ( value )
				{
					return ( char.indexOf( value ) > 0 ? '-' : '' ) + value.replace( /( |\-|\_)/g, '' );

				}).toLowerCase() : char;
			};

			/*
			@function		toUnderscore
			@usage			Converts camel casing to underscores.
			@param			char : The string value to convert.
			@return			The new string vablue.
			*/
			_$.toUnderscore = function ( char )
			{
				return char.replace ? _$.normalizeSpace( char ).replace( /( |\-|\_|[A-Z])+([a-zA-Z])/g, function ( value )
				{
					return ( char.indexOf( value ) > 0 ? '_' : '' ) + value.replace( /( |\-|\_)/g, '' );

				}).toLowerCase() : char;
			};

			/*
			@function		isObject
			@usage			Determines whether a value is of type object or not.
			@param			value : The value to test.
			@return			A boolean indicating the result.
			*/
			_$.isObject = function ( value )
			{
				return ( value !== null && typeof value === 'object' && value.constructor !== null && value.constructor.toString().indexOf( 'Array' ) == -1 );
			};

			/*
			@function		isArray
			@usage			Determines whether or not an object is an array.
			@param			value : The value to test.
			@return			A boolean indicating the result.
			*/
			_$.isArray = function ( value )
			{
				return ( value !== null && typeof value === 'object' && value.constructor !== null && value.constructor.toString().indexOf( 'Array' ) != -1 );
			};

			/*
			@function		indexOf
			@usage			Looks for the index position of the value in the array.
			@param			array : The array to check.
			@param			value : The value to look up.
			@return			The index value in the array or -1 otherwise.
			*/
			_$.indexOf = function ( array, value )
			{
				if ( _$.isArray( array ) )
				{
					for ( var i = array.length - 1; i >= 0; --i )
					{
						if ( value === array[i] )
						{
							return i;
						}
					}
				}

				return -1;
			};

			/*
			@function 		boundary
			@usage			Checks a value if it is within a certain boundary.
			@param			value : The value to check
			@param			lower : The lower boundary
			@param			upper : The upper boundary
			*/
			_$.boundary = function ( value, lower, upper )
			{
				return ( typeof value === 'number' && typeof lower === 'number' && typeof upper === 'number' ? value >= lower && value <= upper : false );
			};

			/*
			@function 		goTo
			@usage			Changes the location of the window URL.
			@param			url : The URL destination.
			*/
			_$.goTo = function ( url )
			{
				if ( typeof url === 'string' )
				{
					window.location.href = url;
				}
			};

			/*
			@function		find
			@usage 			Returns the elements searched for with the context of the intial Selector Object element.
			@param	 		selector : The element tag name of the targets to return
			@param			context : The context scope in which to search within.
			@return 		A Selector Object.
			*/
			_$.find = function ( selector, context )
			{
				if ( typeof selector === 'string' )
				{
					return _$( selector, context );
				}
			};

			/*
			@function 		each
			@usage			Loops through the object properties and calls a function while passing in the property, key, and target reference.
			@param			data : The object literal to pass with the name key pairs.
			@param			func : The function to call with the data.
			@param			scope : THescope to call the function. Default [ window ].
			@param			callback : An optional callback function when the iteration of data is complete.
			@return			The namespace "$" Object.
			*/
			_$.each = function( data, func, callback, scope )
			{
				if ( data !== null && typeof data === 'object' )
				{
					scope = scope || window;

					var i = 0,
						l = data.length - 1;

						/*
						@note	An object with length, like a Selector object.
						*/
						if ( l >= 0 )
						{
							for ( ; i <= l; ++i )
							{
								/*
								@note	Only cycle through the non prototype values.
								*/
								if ( typeof data[ i ] !== 'function' )
								{
									func.call( scope, data[ i ], i );
								}
							}
						}

						/*
						@note	An object literal.
						*/
						else
						{
							for ( i in data )
							{
								/*
								@note	Only cycle through the non prototype values.
								*/
								if ( typeof data[ i ] !== 'function' )
								{
									func.call( scope, data[ i ], i );
								}
							}
						}

						/*
						@note	Execute the callback if one exists.
						*/
						_$.handlerExecute( _$.handlerCheck( callback, _$.Dispatcher ) , data, scope );
				}

				return _$;
			};

			/*
			@function 		merge
			@usage			Merges two objects or arrays together.
			@param			first : The first object or array.
			@param			second : The second object or array.
			@return 		The newly built object reference.
			*/
			_$.merge = function( first, second )
			{
				var i = first.length || 0,
					j = 0;

					if ( typeof second.length === 'number' )
					{
						for ( var l = second.length - 1; j <= l; ++j )
						{
							first[ i++ ] = second[ j ];
						}

					}
					else
					{
						while ( second[ j ] !== undefined )
						{
							first[ i++ ] = second[ j++ ];
						}
					}

					first.length = i;

					return first;
			};

			/*
			@function 		browser
			@usage			Holds values on the Browser.
			*/
			_$.browser = _Browser;

			/*
			@function		opacity
			@usage			Changes an elements opacity.
			@param			selector : The Selector Object.
			@param			opacity : The opacity to set the element to.
			@return			The namespace "$" Object.
			*/
			_$.opacity = function ( selector, opacity )
			{
				if ( selector = _$( selector ).style() )
				{
					selector.opacity = ( opacity / 100 );
					selector.filter = 'alpha(opacity=' + opacity + ')';
				}

				return _$;
			};

			/*
			@function		RGBToHex
			@usage			Convert an RGB value to a hex string.
			@param			rgb : An array representing a RGB value [ Red, Green, Blue ].
			@return			A string that is a hex value of the rgb colour passed.
			*/
			_$.RGBToHex = function ( rgb )
			{
				rgb = typeof rgb === 'string' ? rgb.replace( /rgb\(|\)/g, '' ).split( ', ' ) : rgb;

				var output = '',
					i = 0,
					length = rgb.length - 1,
					pad = _$.pad,
					toHex = _$.toHex;

					for ( ; i <= length; ++i )
					{
						output += pad( toHex( rgb[ i ] ), 2 );
					}

					return '#' + output;
			};

			/*
			@function		hexToRGB
			@usage			Convert a hex value to a RGB value.
			@param			hex : The hex value, optionally including a "#" value in the beginning.
			@return			An array representing the RGB value [ Red, Green, Blue ].
			*/
			_$.hexToRGB = function ( hex )
			{
				var toDecimal = _$.toDecimal;

					hex = hex.toUpperCase();

					if( hex.substring( 0, 1 ) === '#' )
					{
						hex = hex.substring( 1 );
					}

					return [ toDecimal( hex.substring( 0, 2 ) ), toDecimal( hex.substring( 2, 4 ) ), toDecimal( hex.substring( 4, 6 ) ) ];
			};

			/*
			@function		pad
			@usage			Pads a number with leading zeros.
			@param			number : The value to add teh padding to.
			@param			The length of the total string.
			@return			The string with added 0 padding.
			*/
			_$.pad = function( number, length )
			{
				var str = '' + number;

					while ( str.length < length )
					{
						str = '0' + str;
					}

					return str;
			};

			/*
			@function		toHex
			@usage			Converts the value to a hex base 16 value.
			@return			A decimal number to hex value.
			*/
			_$.toHex = function ( decimal )
			{
				return parseInt( decimal ).toString( 16 );
			};

			/*
			@function		toDecimal
			@usage			Converts the value of a hex number to a normal decimal number.
			@return			A converted hex to decimal number.
			*/
			_$.toDecimal = function ( hex )
			{
				if ( typeof hex === 'string' )
				{
					return parseInt( '0x' + hex, 16 );
				}
			};

			/*
			@function		now
			@usage			Gets the time in milliseconds.
			@return			The current timestamp in milliseconds.
			*/
			_$.now = function ()
			{
				return ( new Date() ).getTime();
			};

			/*
			@function		escape
			@usage			Encodes a string value.
			@return			The encoded string.
			*/
			_$.escape = function ( value )
			{
				return value.replace( /</gi, '&lt;' ).replace( />/gi, '&gt;' );
			};

			/*
			@note	Add a window load handler to call the window load event stacks.
			*/
			window.onload = function ()
			{
				_OnLoad.callFunctionList( _OnLoad.load );
			};

			/*
			@note	Add a window onscroll handler to call the window onscroll event stacks.
			*/
			window.onscroll = function ()
			{
				_OnLoad.callFunctionList( _OnLoad.onscroll );
			};

			/*
			@note	Add a window onresize handler to call the window onresize event stacks.
			*/
			window.onresize = function ()
			{
				_OnLoad.callFunctionList( _OnLoad.onresize );
			};

			/*
			@note	Launch the daemons.
			*/
			_$.load( function()
			{
				_AjaxHttp.start();
			}, 4 );

			window.material = _$;
			window.$ = _$;

	} ) ( window, document, undefined );

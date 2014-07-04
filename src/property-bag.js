/*!
 * Bookmarklet for getting properties from Property Bag
 * Mark Bice <mbice@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */

  /* Register custom namespace */
 window.Hcf = window.Hcf || {};
 Hcf.PropertyBagBookmarklet = Hcf.PropertyBagBookmarklet || {};
 
(function (module, window, document, undefined) {
    'use strict';

    var ctx, web,  // SP context for CSOM, web object
		props;


	/**
	* Constructor
	*/
    function init() {
		// Don't want to do anything if our endpoints modal is already opened
		if (!module.isModalOpened) {
			if (typeof SP !== 'undefined') {
				// Get modal library, then we can use the CSOM and initialize our bookmarklet UI
				SP.SOD.loadMultiple(['sp.ui.dialog.js'], function () {
					initJSOM();
					getPropertyBag();
				});
			}
		}
    }
	
	
	/**
	* Initialize our context and web objects from the CSOM
	*/
	function initJSOM() {
		ctx = new SP.ClientContext.get_current();
		web = ctx.get_web();
	}
	
	
    /**
    * Gets web relative URL
    * @returns {string} Web relative URL with trailing slash
    */
    function getWebRelativeUrl() {
        return (_spPageContextInfo.webServerRelativeUrl === '/') ? _spPageContextInfo.webServerRelativeUrl : _spPageContextInfo.webServerRelativeUrl + '/';
    }

	
	/**
	* Load up the current web's property bag
	*/
    function getPropertyBag() {
		props = web.get_allProperties();
		ctx.load(props);
		ctx.executeQueryAsync(
			getPropertyBagSuccess,
			function(sender, args) {
				if (typeof console !== 'undefined') {
					console.log(args.get_message());
				}
			}
		);
    }
	
	
	/**
	* Successfully fetched property bag, now iterate through and display them to the user in a modal
	*/
	function getPropertyBagSuccess() {
		var allProps = props.get_fieldValues(),
			container = document.createElement('div'),
			counter = 0, trStyle, tdStyle = ' style="padding: 5px;"',
			outputHtml = '<table><thead><tr><th align="left"' + tdStyle + '>Key</th><th align="left"' + tdStyle + '>Value</th></thead>',
			sortedArray = [];
		
		for (var key in allProps) {
			if (allProps.hasOwnProperty(key)) {
				sortedArray.push(key);
			}
		}
		
		sortedArray.sort();
		
		for (var i=0; i < sortedArray.length; i++) {
			trStyle = (i%2 === 0) ? '' : ' style="background: #f0f0f0"';
			outputHtml += '<tr' + trStyle + '><td' + tdStyle + '>' + sortedArray[i] + '</td><td' + tdStyle + '>' + allProps[sortedArray[i]] + '</td></tr>';
		}
		
		outputHtml += '</table>';
		container.innerHTML = outputHtml;	

		var options = {
			title: 'Property bag (current site)',
			html: container,
			dialogReturnValueCallback: function() {
				module.isModalOpened = false;
			}
		};

		SP.UI.ModalDialog.showModalDialog(options);
		module.isModalOpened = true;
	}
	

    // Fire initialization
    init();

})(Hcf.PropertyBagBookmarklet, window, document);
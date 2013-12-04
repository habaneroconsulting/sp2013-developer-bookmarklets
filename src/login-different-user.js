/*!
 * Bookmarklet for forcing login by different user
 * Mark Bice <mbice@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */

(function (window, document, undefined) {
    'use strict';

    var module = {};

    function init() {
        // If our page context object exists, show our UI
        if (_spPageContextInfo) {
            forceNewLogin();
        }
    }
    

    /**
    * Navigates user to closeConnection.aspx that makes them login as a different user
    */
    function forceNewLogin() {
        window.location.href = getWebServerRelativeUrl() + '_layouts/closeConnection.aspx?loginasanotheruser=true';
    }

	
    /**
	* Gets SP Web server relative URL
	* @returns {string} SP Web server relative URL with trailing slash
	*/
    function getWebServerRelativeUrl() {
        return (_spPageContextInfo.webServerRelativeUrl === '/') ? _spPageContextInfo.webServerRelativeUrl : _spPageContextInfo.webServerRelativeUrl + '/';
    }
	

	/**
	* Module configuration object
	*/
    module.config = {
    };

    // Fire initialization
    init();

})(window, document);
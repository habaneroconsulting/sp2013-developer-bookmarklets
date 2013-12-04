/*!
 * Bookmarklet for opening SharePoint 2013 REST API endpoints in browser
 * Mark Bice <mbice@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */

 /* Register custom namespace */
 Hcf = Hcf || {};
 Hcf.RestEndpointsBookmarklet = Hcf.RestEndpointsBookmarklet || {};
 
(function (module, window, document, undefined) {
    'use strict';

    var relativeToSiteCollectionInput,
		relativeToSiteCollection = false;

	/**
	* Constructor
	*/
    function init() {
        // If our page context object exists, show our UI
        if (SP) {
			// Get modal library, then we can use the CSOM and initialize our bookmarklet UI
			SP.SOD.loadMultiple(['sp.ui.dialog.js'], function () {
				toggleUI();
			});
        }
    }
    

    /**
    * Shows a flyout to the user that lets them select which endpoint they would like to navigate to. This lets us encapsulate a bunch of links in a single
    * bookmarklet a bit more easily.
    */
    function toggleUI() {
        var container = document.createElement('div'),
			endpoints = module.config.endpoints,
			outputHtml = '<p>The following endpoints are relative to the current site you are browsing. If you want to launch links relative to your current site collection check the "Relative to site collection" box below</p><input type="checkbox" id="hcfRestEndpoints_relativeSiteCollection" value="0" /><label for="hcfRestEndpoints_relativeSiteCollection">&nbsp;Relative to site collection</label><br /><br />';

		for (var key in endpoints) {
			outputHtml += '<h3>' + endpoints[key].title + '</h3>';

			for (var subkey in endpoints[key].links) {
				outputHtml += '<a href="' + endpoints[key].links[subkey].url + '" onclick="Hcf.RestEndpointsBookmarklet.execLink(this);">' + endpoints[key].links[subkey].title + '</a><br />';
			}

			outputHtml += '<br />';
		}

		container.innerHTML = outputHtml;	

		
		var options = {
			title: 'REST API endpoints',
			html: container
		};

		SP.UI.ModalDialog.showModalDialog(options);
    }


	/**
    * Gets base URL relative to site collection or site depending on user setting
    * @returns {string} URL relative to either site collection or site
    */
    function getBaseRelativeUrl() {
		var url;
		
		if (relativeToSiteCollection) {
			url = (_spPageContextInfo.siteServerRelativeUrl === '/') ? _spPageContextInfo.siteServerRelativeUrl : _spPageContextInfo.siteServerRelativeUrl + '/';
		}
		else {
			url = (_spPageContextInfo.webServerRelativeUrl === '/') ? _spPageContextInfo.webServerRelativeUrl : _spPageContextInfo.webServerRelativeUrl + '/';
		}
		
		return url;
    }
	

	/**
	* Returns a scope based on whether user has selected relative to site collection or not
	*/
	function getScope() {
		return (relativeToSiteCollection) ? 'site' : 'web';
	}

	
	/**
	* Activates on click of any API link. Evaluates whether we are going to link relative to current site collection or current site/web. Then opens in new window/tab.
	*/
	module.execLink = function(el) {
		var linkUrl = el.getAttribute('href'),
			newUrl;	

		if (!relativeToSiteCollectionInput) {
			relativeToSiteCollectionInput = document.getElementById('hcfRestEndpoints_relativeSiteCollection');
		}
		
		relativeToSiteCollection = (relativeToSiteCollectionInput.checked);
		newUrl = getBaseRelativeUrl() + module.config.apiPrefix + linkUrl.replace('~scope', getScope());
		
		window.open(newUrl,'_blank');
		
		return false;
	};
	
	
	/**
	* Configuration
	*/
    module.config = {
        apiPrefix: '_api/',
        endpoints: {
            lists: {
                title: 'Lists',
                links: {
                    allLists: {
                        url: '~scope/lists',
                        title: 'All lists',
                    },
                    listByTitle: {
                        title: 'List by title',
                        url: '~scope/lists/GetByTitle(\'Documents\')'
                    },
                    listItemsByTitle: {
                        title: 'List items by title',
                        url: '~scope/lists/GetByTitle(\'Documents\')/items'
                    },
					listItemsByTitleSort: {
						title: 'List items by title (with sort order)',
                        url: '~scope/lists/getByTitle(\'Documents\')/items?$orderby=Title asc'
					},
					listItemsByTitleFilter: {
						title: 'List items by title (with filter and top 10 results)',
                        url: '~scope/lists/getByTitle(\'Documents\')/items?$filter=Title eq \'Test\'&$top=10'
					},
                    listByGuid: {
                        title: 'List by GUID',
                        url: '~scope/lists(guid\'b70c7a25-f0e2-494b-83f6-5b13ab840ad2\')'
                    },
                    listItemsByGuid: {
                        title: 'List items by GUID',
                        url: '~scope/lists(guid\'b70c7a25-f0e2-494b-83f6-5b13ab840ad2\')/items'
                    }
                }
            },
            search: {
                title: 'Search',
                links: {
                    search: {
                        title: 'Search query',
                        url: 'search/query?queryText=\'term\''
                    }
                }
            },
            social: {
                title: 'Social',
                links: {
                    followed: {
                        title: 'Followed',
                        url: 'social.following/followed'
                    },
                    usersImFollowing: {
                        title: 'Users I\'m following',
                        url: 'social.following/my/followed(types=1)'
                    },
                    sitesImFollowing: {
                        title: 'Sites I\'m following',
                        url: 'social.following/my/followed(types=4)'
                    },
                    myFollowers: {
                        title: 'My followers',
                        url: 'social.following/my/followers'
                    }
                }
            },
			files: {
				title: 'Files / Folders',
				links: {
					folder: {
						title: 'Folder',
						url: 'web/GetFolderByServerRelativeUrl(\'Documents\')'
					},
					files: {
						title: 'Files',
						url: 'web/GetFolderByServerRelativeUrl(\'Documents\')/Files'
					},
					file: {
						title: 'Specific file',
						url: 'web/GetFolderByServerRelativeUrl(\'Documents\')/Files(\'test.txt\')'
					}
				}
			}
        }
    };

    // Fire initialization
    init();

})(Hcf.RestEndpointsBookmarklet, window, document);
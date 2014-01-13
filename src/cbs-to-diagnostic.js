/*!
 * Bookmarklet for switching content by search web parts to diagnostic view
 * Christopher Parsons <cparsons@habaneroconsulting.com>
 * Habanero Consulting Group - Licensed under MIT
 */
(function () {
    'use strict';

    var options = {
        template: '/_catalogs/masterpage/Display Templates/Content Web Parts/Item_Diagnostic.js',
        templateName: 'Item_Diagnostic'
    };

    RegisterSod(options.templateName, options.template);

    SP.SOD.loadMultiple([options.templateName], function() {
        var elements = document.querySelectorAll('div[id*="_csr"]');

        for (var i = 0; i < elements.length; i++) {
            var cbs = elements[i].control,
                displayTemplate = '~sitecollection' + options.template;

            try {
                cbs.set_itemTemplateId(displayTemplate);
                cbs.getDataProvider().set_bypassResultTypes(!!displayTemplate);
                cbs.refresh(new Srch.QueryState());
            } catch(e) {}
        }
    });
})();
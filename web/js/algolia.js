var application_id = '5GV5O9YDQI';
var search_api_key = 'a641458739c43ef5418f242f39dc47ef';

var resultTemplate =
  '<div class="result">' +
    '<div class="image">' +
    ' <img src="{{image}}">' +
    '</div>' +
    '<div class="names">' +
      '<span class="last-name">{{lastName}}</span>' +
      '<span class="first-name">{{firstName}}</span>' +
    '</div>' +
  '</div>';

var filterTemplate =
    '<li class="filter">' +
        '<a href="javascript:void(0);" class="facet-item {{#isRefined}}is-active{{/isRefined}}">' +
            '<span class="facet-name"><i class="fa fa-angle-right"></i> {{name}}</span class="facet-name">' +
        '</a>' +
    '</li>';

var search = instantsearch({
  appId: application_id,
  apiKey: search_api_key,
  indexName: 'Person_dev'
});

search.addWidget(
  instantsearch.widgets.searchBox({
    container: '#algolia',
    placeholder: 'Rechercher…'
  })
);

search.addWidget(
  instantsearch.widgets.hits({
    container: '.result-container',
    hitsPerPage: 10,
    templates: {
      item: resultTemplate
    }
  })
);

search.addWidget(
  instantsearch.widgets.pagination({
    container: '.pagination-container',
    cssClasses: {
      active: 'active'
    },
    labels: {
      first: '<span aria-hidden="true">←</span>',
      previous: '&laquo Précédent',
      next: 'Suivant &raquo',
      last: '<span aria-hidden="true">→</span>'
    }
  })
);

search.addWidget(
    instantsearch.widgets.refinementList({
        container: '.filter-list',
        attributeName: 'gender',
        templates: {
            item: filterTemplate
        }
    })
);

search.start();

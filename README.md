Algolia
=======

## Setup

Add this line to your `composer.json` file:
```json
"require": {
    ...
    "algolia/algolia-search-bundle": "~1.0",
    ...
}
```

Run `composer update`.


Update your application Kernel:
```php
$bundles = array(
    ...
    new Algolia\AlgoliaSearchBundle\AlgoliaAlgoliaSearchBundle(),
    ...
);
```


Add your Algolia application ID and API key to your `config.yml` file:
```yaml
algolia:
    application_id: YOUR_APP_ID
    api_key: YOUR_ADMIN_API_KEY
```

## Index your entity's properties and methods

The `Attribute` annotation marks a field or method for indexing by Algolia.

All annotations are defined in the `Algolia\AlgoliaSearchBundle\Mapping\Annotation` namespace.

Below is an example of an indexed property and an indexed method in the `Person` entity:
```php
namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Algolia\AlgoliaSearchBundle\Mapping\Annotation as Algolia;

/**
 * Person
 *
 * @ORM\Entity
 *
 */
class Person
{
   ...

    /**
     * @var string
     *
     * @ORM\Column(name="lastName", type="string", length=255)
     *
     * @Algolia\Attribute
     *
     */
    private $lastName;

    ...

    /**
     * Get fullName
     *
     * @return string
     *
     * @Algolia\Attribute
     *
     */
    public function getFullName()
    {
        return $this->firstName . ' ' . $this->lastName;
    }
}
```

Now, one single command will index your entity:

```bash
php bin/console algolia:reindex AppBundle:Person
```

Your data is now available on the [Algolia dashboard](https://www.algolia.com/dashboard)

## Start searching

In your search page view, call for the InstantSearch library:
```html
{% block javascripts %}
  <script src="//cdn.jsdelivr.net/instantsearch.js/1/instantsearch.min.js"></script>
  <script src="{{ asset('js/algolia.js') }}"></script>
{% endblock %}
```

Create an ``algolia.js``file and paste your application ID and your search API key:
```js
var application_id = 'YOUR_APPLICATION_ID';
var search_api_key = 'YOUR_SEARCH_API_KEY';
```

Define a new instance of InstantSearch:
```js
var search = instantsearch({
    appId: application_id,
    apiKey: search_api_key,
    indexName: 'Person_dev'
});
```

Link it to your search bar:
```js
search.addWidget(
    instantsearch.widgets.searchBox({
        container: '#algolia',
        placeholder: 'Rechercher…'
    })
);
```

Define the result template:
```js
var resultTemplate =
  '<div class="result">' +
    '<div class=""image>'
      '<img src="{{image}}">' +
    '</div>' +
    '<div class="names">' +
      '<span class="last-name">{{lastName}}</span>' +
      '<span class="first-name">{{firstName}}</span>' +
    '</div>' +
  '</div>';
```

Tell your app how to display the search results and the number of results per page:
```js
search.addWidget(
    instantsearch.widgets.hits({
        container: '.result-container',
        hitsPerPage: 10,
        templates: {
            item: resultTemplate
        }
    })
);
```

One last line and you are ready to search:
```js
search.start();
```

## Paginate your results

Before ``search.start();``, add:

```js
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
```

## Filter your results by gender

Finally, add: 

```js
search.addWidget(
    instantsearch.widgets.refinementList({
        container: '.filter-list',
        attributeName: 'gender',
        templates: {
            item: filterTemplate
        }
    })
);
```

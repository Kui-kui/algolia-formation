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

## Indexing entity properties or methods

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

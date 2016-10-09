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


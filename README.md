# SymReact

A little customers/invoices CRM App.

## Technologies & versions

- Symfony Api-Platform 2.6
- lexik/jwt-authentication-bundle 2.13
- react 16.8.6

## Knowledges and skills

- Install & config ApiPlatform (Ressources, Subresources, Groups, Pagination, Custom operations, Validation, Events, Acl and more..)
- JWT with LexikJwtAuthentication
- React (Routing, Hooks, Contexts, Services, Forms, Jwt and more..)

## Install
```
- Clone project
- Make: composer install
- Make: php app/console doctrine:database:create
- Make: php app/console doctrine:schema:update --force
- Make: php app/console doctrine:fixtures:load
- Make: npm install
- Make: npm run build
- Start: symfony serve
- Go to project localhost url ex: http://127.0.0.1:8000/. 
```


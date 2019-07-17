#!/bin/bash
docker-compose up -d
docker-compose exec app composer install
npm install
docker-compose exec app php artisan migrate
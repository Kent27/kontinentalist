#!/bin/bash
cp .env.example .env
docker-compose up --build -d
docker-compose exec app composer install
docker-compose exec app npm install
docker-compose exec app php artisan key:generate
docker-compose restart
docker-compose exec app php artisan migrate:fresh --seed
docker-compose exec app php artisan passport:install
FROM php:7.3-fpm

# Copy composer.lock and composer.json
COPY composer.lock composer.json /var/www/
WORKDIR /var/www

RUN apt-get update && apt-get install -y libmcrypt-dev \
    libmagickwand-dev zip unzip git curl vim --no-install-recommends \
    && docker-php-ext-install pdo_mysql gd bcmath 

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY . /var/www

# Copy existing application directory permissions
COPY --chown=www:www . /var/www

# Change current user to www
USER www

# Rizikove Kaceni teplice
Site is base on the [Bedrock](https://roots.io/bedrock/). Bedrock is a modern WordPress stack that helps you get started with the best development tools and project structure. Much of the philosophy behind Bedrock is inspired by the [Twelve-Factor App](http://12factor.net/) methodology including the [WordPress specific version](https://roots.io/twelve-factor-wordpress/).

It also uses Sage base theme

## Features

* Better folder structure
* Dependency management with [Composer](http://getcomposer.org)
* Easy WordPress configuration with environment specific files
* Environment variables with [Dotenv](https://github.com/vlucas/phpdotenv)
* Autoloader for mu-plugins (use regular plugins as mu-plugins)

Use [bedrock-ansible](https://github.com/roots/bedrock-ansible) for additional features:

* Easy development environments with [Vagrant](http://www.vagrantup.com/)
* Easy server provisioning with [Ansible](http://www.ansible.com/) (Ubuntu 14.04, PHP 5.6 or HHVM, MariaDB)
* One-command deploys

## Requirements

* PHP >= 5.4
* Composer - [Install](https://getcomposer.org/doc/00-intro.md#installation-linux-unix-osx) It uses old version of the composer (when installing composer, it needs to be downgraded) As of now 23.0 2024 the dependency packages were updated to the oldest versions (It works but the whole stack including PHP should be updated)
* npm (Grunt for assets build)
* bower (assets libraries download)

## Installation

1. Clone the git repo - `git clone https://github.com/roots/bedrock.git`
2. Run `composer install`
3. Copy `.env.example` to `.env` and update environment variables:
  * `DB_NAME` - Database name
  * `DB_USER` - Database user
  * `DB_PASSWORD` - Database password
  * `DB_HOST` - Database host
  * `WP_ENV` - Set to environment (`development`, `staging`, `production`)
  * `WP_HOME` - Full URL to WordPress home (http://example.com)
  * `WP_SITEURL` - Full URL to WordPress including subdirectory (http://example.com/wp)
4. Add theme(s) in `web/app/themes` as you would for a normal WordPress site.
4. Set your site vhost document root to `/path/to/site/web/` (`/path/to/site/current/web/` if using deploys)
5. Access WP admin at `http://example.com/wp/wp-admin`

## Custom deploy
The whole site is deployed via Capistano

### dependency 
- It depends in the ACF (Advance Custom Fields) placed in the `~/apps/rizikovekaceni/external-plugins/acf-repeater` and is copied to `web/app/plugins`
The backup is in the `/home/git/backup/rizikove-kaceni`
- .env config file containing DB connection config and WP specific config. It is different for each environment as different env have different values
it sits in the `{environment}/shared/.env`. It contains value from point 3 in the **Installation** part. The values for the DB connection are stored in the Enpass (Janko Wordpres) it contains username and password db prefix etc
- DB. It uses locally installed MySQL database. Access credentials are also saved in Enpass
- SSH. It is required to have a host configured in the `~/.ssh/config` as for some reason, the underling ssh service take the ssh keys from ssh-agent. It uses all the keys and if the target server have limited amount attempts to log in. It will fail.  

1. Composer install / update
2. On the target server install:
   - node, npm
   - bower
   - sass gem (used by Grunt)
3. `$ bundle`
4. `$ bundle exec cap staging / production deploy`
9. hit /reset_cache.php after production deployment (add rake task to do that)

## Documentation

* [Folder structure](https://github.com/roots/bedrock/wiki/Folder-structure)
* [Configuration files](https://github.com/roots/bedrock/wiki/Configuration-files)
* [Environment variables](https://github.com/roots/bedrock/wiki/Environment-variables)
* [Composer](https://github.com/roots/bedrock/wiki/Composer)
* [wp-cron](https://github.com/roots/bedrock/wiki/wp-cron)
* [mu-plugins autoloader](https://github.com/roots/bedrock/wiki/mu-plugins-autoloader)

## Community

Keep track of development and community news.

* Participate on the [Roots Discourse](https://discourse.roots.io/)
* Follow [@rootswp on Twitter](https://twitter.com/rootswp)
* Read and subscribe to the [Roots Blog](https://roots.io/blog/)
* Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)

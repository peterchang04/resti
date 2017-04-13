# Mu.city API#

### folder structure ###
* rest // backend core files
    * core // base logic files
    * data // Data access files, by entity. Accessible by services only
    * services // business logic, rest end points etc.
* scripts // build scripts, test scripts, dev scripts

### TODO ###
* add a request parser to direct requests to appropriate service
* add better tests for restListener
* add better tests for ParsedRequest
* add pagination
* setup first service api for person
* connect service layer to rest
* setup front end proxy to backend
* install NGINX
* install TLS
* configure PM2
* tedious switch to connection pooling
* add session jwt cookie
* add error logging
* add server logging

### DONE ###
* fix variable casing on all files, fix casing on auth.js
* add 'use strict' to all files
* switch pattern to (err,res)
* create and use err class
* create DAO parent class
* reorganize project directories to data + services + core
* remove incorrect module patterns
* create db access objects

### POSTPONED ###
* integration with facebook auth
* db transactions
* switch to 3 branch GIT

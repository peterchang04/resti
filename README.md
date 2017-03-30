# Mu.city API#

### folder structure ###
* rest // backend core files
    * core // base logic files
    * data // Data access files, by entity. Accessible by services only
    * services // api
* scripts // build scripts, test scripts, dev scripts

### TODO ###
* install NGINX
* install TLS
* configure PM2
* setup front end proxy to backend
* update daos to use crud based functions create remove update delete
* connect service layer
* tedious switch to connection pooling
* add session jwt cookie
* switch pattern to (err,res)
* add error logging
* add server logging

### POSTPONED ###
* integration with facebook auth
* db transactions
* switch to 3 branch GIT

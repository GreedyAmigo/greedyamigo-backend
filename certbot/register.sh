#!/bin/sh
/scripts/certbot-auto certonly --webroot -w /webroots/$1 -d $1
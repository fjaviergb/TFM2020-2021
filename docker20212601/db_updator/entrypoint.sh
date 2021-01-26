#!/usr/bin/env bash
printenv | cat - /etc/cron.d/hello-cron > ~/hello-cron.tmp && mv ~/hello-cron.tmp /etc/cron.d/hello-cron

cron -f
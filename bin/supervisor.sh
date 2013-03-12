#! /bin/sh

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
api=$dir/..
app=$api/app

supervisor -w $api $app

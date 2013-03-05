#! /bin/sh

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
lib=$dir/../lib
models=$dir/../models
api=$dir/../
app=$api/app

supervisor -w $lib,$models,$api $app

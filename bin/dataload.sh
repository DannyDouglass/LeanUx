#! /bin/sh

dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
api=$dir/..
seeds_dir=$api/seeds
seed_files=$(find ${seeds_dir} -type f -maxdepth 1) # find files only, excluding directories if there are any

function push_collection_to_cloud {
  echo "Pushing collection ${collection_name} payload to cloud."

  json_payload=$(cat $2) # echo contents of file and cache them

  # for debugging purposes, add -v to the beginning of the command
  curl -d "${json_payload}" \
       -H Content-type:application/json \
       "https://api.mongolab.com/api/1/databases/leanux/collections/$1?apiKey=KnFCGWr9E2lELaxN6grJ4kwy73nmBLNz"

  echo "\nPushed collection ${collection_name} to cloud."
}

function purge_collection {
  echo "Purging all documents in collection ${collection_name}."

  # Specifying an empty list in the body is equivalent to deleting the documents
  # matching the query. The query itself is specified via the "q" parameter.
  # We're deleting all documents who's _id is not null (which should be all documents).
  # This is a workaround, as the Mongo Lab REST API does not expose a bulk
  # delete operation. We also have to use the -g option here to suppress globbing;
  # which will allows us to used nested braces i.e. q={"_id": {$ne: null}} in our
  # query string.

  # for debugging purposes, add -v to the beginning of the command
  curl -X PUT \
       -d "[]" \
       -H Content-Type:application/json \
       -g \
       "https://api.mongolab.com/api/1/databases/leanux/collections/$1?apiKey=KnFCGWr9E2lELaxN6grJ4kwy73nmBLNz&q={_id:{\$ne:null}}"

  echo "\nPurged collection ${collection_name}."
}

function plant_seed {
  file_name=$(basename "$1") # remove leading slashes and dots from path, returning just the name of the file and it's extension
  collection_name="${file_name%.*}" # strip off the file extension (.json), returning just the name of the file

  purge_collection $collection_name
  push_collection_to_cloud $collection_name $file
}

for file in $seed_files
do
  plant_seed $file
done

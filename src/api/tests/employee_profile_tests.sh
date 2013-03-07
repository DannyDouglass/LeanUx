#! /bin/sh

# NOTE: for any routes that rely on id, you'll have to change the id based on
# the current state of the database. the script is obviously extremely brittle in
# that it makes assumptions about the current state of the database. it's
# just a quick mechanism for performing smoke tests and obviously cannot
# reproduce the level of verification that an actual test suite does.
# if you get annoyed by the output, then just remove the verbose switch.
# I recommend leaving it around for debugging.

# TODO: Investigate if we can set the id of the document (_id attribute) client
# side so that it doesn't constantly change when populating sample data. that
# would make this script more reliable.

# get all
curl -X GET \
     -v \
     "http://localhost:3000/employeeprofiles/"

# get by id
curl -X GET \
     -v \
     -d '{ "socialSecurityNumber": "000-55-5555", "dateOfHire": "04/04/2012", "salutation": "Mr", "firstName": "Elizabeth", "lastName": "Skeet", "suffix": null, "maritalStatus": "Married", "dateOfBirth": "05/07/2013" }' \
     "http://localhost:3000/employeeprofiles/5137dcf62c73bf01fc000002"

# add new
curl -X POST \
     -v \
     -H Content-Type:application/json \
     -d '{ "socialSecurityNumber": "000-55-5555", "dateOfHire": "04/04/2012", "salutation": "Mrs", "firstName": "Tatem", "lastName": "Doubtfire", "suffix": null, "maritalStatus": "Married", "dateOfBirth": "05/07/2013", "status": "Completed", "statusLocation": null }' \
     "http://localhost:3000/employeeprofiles"

# update salutation to Mr
curl -X PUT \
     -v \
     -H Content-Type:application/json \
     -d '{ "socialSecurityNumber": "000-55-5555", "dateOfHire": "04/04/2012", "salutation": "Mr", "firstName": "Elizabeth", "lastName": "Skeet", "suffix": null, "maritalStatus": "Married", "dateOfBirth": "05/07/2013" }' \
     "http://localhost:3000/employeeprofiles/5137dcf62c73bf01fc000002"

# delete by id
curl -X DELETE \
     -v \
     "http://localhost:3000/employeeprofiles/5137db6cecc138a8f8000005"

import os

paths = ["./backend/_db_update/db_object_remove.py",
"./backend/_db_update/http_request_async_tag_file.py",
"./backend/_db_update/http_request_async_add_file.py",
"./backend/_db_update/db_object_creator.py",
"./backend/_db_update/db_object_update.py"]

for elem in paths:
    os.system('python {}'.format(elem))
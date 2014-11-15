@echo off

openssl genrsa -out key.pem 2048
openssl req -new -out csr.pem -key key.pem -config openssl.cnf
openssl x509 -req -days 3650 -in csr.pem -signkey key.pem -out cert.pem -extensions v3_req -extfile openssl.cnf
openssl x509 -outform der -in cert.pem -out memorize.crt
copy memorize.crt ..\client\dist
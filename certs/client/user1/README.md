## クライアントの秘密鍵

```
openssl genrsa -out user1.key 2048
```

## クライアント証明書署名要求作成

```
openssl req -new -key user1.key -subj "/C=jp/ST=Tokyo/O=Client/CN=*.aimerzarashi.com/emailAddress=user1@example.com" -out user1.csr
```

## クライアント証明書作成

```
openssl x509 -req -days 3650 -in user1.csr -CA ../inCA2.pem -CAkey ../inCA2.key -CAcreateserial -extfile ../san.txt -out user1.pem
openssl x509 -text -noout -in user1.pem
```

## クライアント証明書のインストール

```
openssl pkcs12 -export -in user1.pem -inkey user1.key -certfile ../inCA2.pem -out user1.p12 -passin pass:P@ssw0rd -passout pass:P@ssw0rd
```

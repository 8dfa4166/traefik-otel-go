## ルート認証局の秘密鍵作成

```
openssl genrsa -out rootCA1.key -des3 2048
1234
```

## ルート認証局の証明書作成

```
openssl req -new -x509 -key rootCA1.key -sha256 -days 3650 -extensions v3_ca -out rootCA1.pem -subj "/C=JP/ST=Tokyo/O=rootCA1/CN=rooCA1"
1234
```

## 中間認証局の秘密鍵作成

```
openssl genrsa -out inCA1.key -des3 2048
2345
```

## 中間認証局の証明書署名要求作成

```
openssl req -new -key inCA1.key -sha256 -outform PEM -keyform PEM -out inCA1.csr -subj="/C=JP/ST=Tokyo/O=inCA1/CN=inCA1"
```

## 中間認証局の証明書作成

```
openssl x509 -extfile openssl_sign_inca.cnf -req -in inCA1.csr -sha256 -CA rootCA1.pem -CAkey rootCA1.key -set_serial 01 -extensions v3_ca -days 3650 -out inCA1.pem
openssl x509 -text -noout -in inCA1.pem
```

## 秘密鍵と証明書署名要求を作成

```
openssl req -new -newkey rsa:2048 -nodes -out server.csr -keyout server.key -sha256 -config openssl_sign_server.cnf -subj "/C=JP/ST=Tokyo/O=Keycloak/CN=*.aimerzarashi.com"
```

## Keycloak サーバの証明書作成

```
openssl x509 -req -in server.csr -sha256 -CA inCA1.pem -CAkey inCA1.key -set_serial 01 -days 3650 -extfile san.txt -out server.pem
```

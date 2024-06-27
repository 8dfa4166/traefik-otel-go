## ルート認証局の秘密鍵作成

```
openssl genrsa -out rootCA2.key -des3 2048
4321
```

## ルート認証局の証明書作成

```
openssl req -new -x509 -key rootCA2.key -sha256 -days 3650 -extensions v3_ca -out rootCA2.pem -subj "/C=JP/ST=Tokyo/O=rootCA2/CN=rooCA2"
4321
```

## 中間認証局の秘密鍵作成

```
openssl genrsa -out inCA2.key -des3 2048
5432
```

## 中間認証局の証明書署名要求作成

```
openssl req -new -key inCA2.key -sha256 -outform PEM -keyform PEM -out inCA2.csr -subj="/C=JP/ST=Tokyo/O=inCA2/CN=inCA2"
```

## 中間認証局の証明書作成

```
openssl x509 -extfile openssl_sign_inca.cnf -req -in inCA2.csr -sha256 -CA rootCA2.pem -CAkey rootCA2.key -set_serial 01 -extensions v3_ca -days 3650 -out inCA2.pem
openssl x509 -text -noout -in inCA2.pem
```

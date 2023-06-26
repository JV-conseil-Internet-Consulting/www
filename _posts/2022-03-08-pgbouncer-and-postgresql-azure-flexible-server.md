---
layout: post
title: PgBouncer and PostgreSQL Azure Flexible Server a bumpy road 🛣
image:
  path: /assets/posts/2022-03-08-pgbouncer-and-postgresql-azure-flexible-server.jpg
description: >
  Azure PostgreSQL Flexible Server and PgBouncer with sslmode=verify-full triggers SSL error sslv3 alert handshake failure
# hide_description: true
tag: [azure, cloud, postgresql]
---

- &nbsp;
{:toc .large-only}

<!-- markdownlint-disable MD026 MD033 MD041 -->

[![PostgreSQL 14.6](https://img.shields.io/badge/PostgreSQL-14.6-green.svg)](https://www.postgresql.org/docs/14.6/)
[![Become a sponsor to JV-conseil](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/JV-conseil "Become a sponsor to JV-conseil")
[![Follow JV conseil on StackOverflow](https://img.shields.io/stackexchange/stackoverflow/r/2477854)](https://stackoverflow.com/users/2477854/jv-conseil "Follow JV conseil on StackOverflow")
[![Follow JVconseil on Twitter](https://img.shields.io/twitter/follow/JVconseil.svg?style=social&logo=twitter)](https://twitter.com/JVconseil "Follow JVconseil on Twitter")
[![Follow JVconseil on Mastodon](https://img.shields.io/mastodon/follow/110950122046692405)](https://mastodon.social/@JVconseil "Follow JVconseil@mastodon.social on Mastodon")
[![Follow JV conseil on GitHub](https://img.shields.io/github/followers/JV-conseil?label=JV-conseil&style=social)](https://github.com/JV-conseil "Follow JV-conseil on GitHub")
<!--
[![Python 3.11](https://img.shields.io/badge/Python-3.11-green)](https://www.python.org/downloads/release/python-3112/)
[![PostgreSQL 14.6](https://img.shields.io/badge/PostgreSQL-14.6-green.svg)](https://www.postgresql.org/docs/14.6/)
<img alt="https://img.shields.io/badge/stack-overflow-orange.svg" src="https://img.shields.io/badge/stack-overflow-orange.svg">
-->

The introduction of [PgBouncer](https://github.com/pgbouncer/pgbouncer), a lightweight connection pooler for PostgreSQL, on [Azure PostgreSQL Flexible Server](https://docs.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-pgbouncer#feedback) has been bumpy to say the least 😉
{:lead}

Here is an excerpt of the [issue](https://github.com/MicrosoftDocs/azure-docs/issues/89424) that triggers the opening of a seven-month--long-to-be-solved support ticket 🎫
{:lead}

PgBouncer with sslmode=verify-full triggers SSL error sslv3 alert handshake failure
{:lead}

Once you have set up in your PostgreSQL flexible server parameters `pgbouncer.client_tls_sslmode` to `verify-full`, saved your changes and restarted your server, you end up with `SSL error: tlsv13 alert certificate required` when you attempt to run a `pqsl` connection command on your server.

This happens also when setting `pgbouncer.client_tls_sslmode` to `verify-ca`.

According to [documentation](https://docs.microsoft.com/en-us/azure/postgresql/concepts-certificate-rotation#4-what-is-the-impact-if-using-app-service-with-azure-database-for-postgresql)

> This new certificate has been added to App Service at platform level. If you are using the SSL certificates included on App Service platform in your application, then no action is needed.

Is `DigiCertGlobalRootG2.crt.pem` certificate only set for `postgresql` server but not for `pgbouncer`?

As a workaround, the only way to successfully connect is by setting `pgbouncer.client_tls_sslmode` to `require`.

In the present issue the problem is being able to set the TLS mode to use for connections from clients to the highest level available which is `verify-full`.

![set the TLS mode to use for connections from clients to the highest level available which is `verify-full`](https://user-images.githubusercontent.com/8126807/157479980-956367de-9da0-47fb-8924-8b00bab264c3.png)

`sslmode=verify-full` activation implies providing to the connection string a path to an authentication certificate. For PostgreSQL that can be handle by [PGSSLROOTCERT](https://www.postgresql.org/docs/current/libpq-envars.html#id-1.7.3.21.3.4.17.1.1) environment variable.

There is a lack of information in [PgBouncer - Azure Database for PostgreSQL - Flexible Server](https://docs.microsoft.com/en-us/azure/postgresql/flexible-server/concepts-pgbouncer#feedback) on how `verify-full` is handle by `pgbouncer`.

So far activating `verify-full` on `pgbouncer.client_tls_sslmode` on Azure Database for PostgreSQL flexible server parameters triggers an `SSL error sslv3 alert handshake failure`.

Here is an example of a `psql` connection attempt failing with `SSL error: tlsv13 alert certificate required`

```bash
psql "host=myPgServer.postgres.database.azure.com dbname=pgbouncer user=pgbouncer password=myPassword
port=6432 sslmode=verify-full sslrootcert=~/.postgresql/root.crt"

psql: error: connection to server at "myPgServer.postgres.database.azure.com" (ip), port 6432 failed: SSL
error: tlsv13 alert certificate required
```

According to PostgreSQL [documentation](https://www.postgresql.org/docs/current/libpq-connect.html#LIBPQ-PARAMKEYWORDS) here are the parameters to provide when establishing a `sslmode=verify-full` connection:

- `sslmode`: `verify-full` only try an SSL connection, verify that the server certificate is issued by a trusted CA and that the requested server host name matches that in the certificate.

- `sslrootcert`: This parameter specifies the name of a file containing SSL certificate authority (CA) certificate(s). If the file exists, the server's certificate will be verified to be signed by one of these authorities. The default is ~/.postgresql/root.crt.

According to pgBouncer [documentation](http://www.pgbouncer.org/config.html#tls-settings) here are the parameters to provide when establishing a `sslmode=verify-full` connection:

- `client_tls_sslmode`: `verify-full` Client must use TLS with valid client certificate.

- `client_tls_ca_file`: Root certificate file to validate client certificates.

On Azure PostgreSQL flexible server parameters, there is a panel to set `pgbouncer.client_tls_sslmode` to `verify-full`, but there is not a `pgbouncer.client_tls_ca_file` allowing to specify the path to the file containing SSL certificate authority (CA).

The question is « When you activate  `pgbouncer.client_tls_sslmode` to `verify-full` how do you provide the accompanying file containing SSL certificate authority (CA) » ❓

A subsidiary question could be « Does Azure assures the transmission of the SSL certificate authority (CA) from `pgBouncer` to `PostgreSQL` server when hitting first `pgBouncer` on port `6432` by collecting the value of `sslrootcert`in the connection string and converting it into `client_tls_ca_file` » ❓

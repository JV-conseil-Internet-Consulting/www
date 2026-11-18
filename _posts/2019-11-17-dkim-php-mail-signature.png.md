---
layout: post
title: "DKIM PHP Mail Signature: Sign Your Emails with a Stand-Alone PHP Class Using SHA-256 and a 2048-bit RSA Key"
image:
  path: /assets/posts/2019-11-17-dkim-php-mail-signature.webp
  srcset:
    - [900w, /assets/posts/2019-11-17-dkim-php-mail-signature-900.webp]
    - [1280w, /assets/posts/2019-11-17-dkim-php-mail-signature.webp]
  alt: "Envelope with a digital signature seal illustrating the dkim-php-mail-signature PHP library that signs outgoing emails with DKIM, SPF and DMARC using a 2048-bit RSA key and SHA-256."
description: >
  Stand-alone PHP class to DKIM-sign your emails with a 2048-bit RSA private key and SHA-256 — Composer package, DNS record setup, SPF and DMARC configuration included.
excerpt: >
  jv-conseil/dkim-php-mail-signature is a stand-alone PHP library that adds a DKIM-Signature header to your outgoing emails using a 2048-bit RSA private key hashed with SHA-256. Install it via Composer, generate your keys with OpenSSL, publish the public key in your DNS as a TXT record, and pair it with SPF and DMARC to prevent email spoofing.
hide_description: true
hide_last_modified: true
category: [projects]
keywords: [DKIM, PHP, email signature, DKIM-Signature header, RSA 2048, SHA-256, OpenSSL, SPF, DMARC, DNS TXT record, email authentication, anti-spoofing, PHP mail, Composer package, Packagist, email deliverability, selector domainkey]
tags: [php, security]
author: "Julien Vieillefont"

seo:
  type: TechArticle
  links:
    - https://www.jv-conseil.dev/blog/2019-11-17-dkim-php-mail-signature.png/
  json_ld:
    dependencies: "PHP, Composer, OpenSSL, RSA 2048-bit, SHA-256, DKIM, SPF, DMARC"
    proficiencyLevel: "Expert"
    timeRequired: "PT10M"
    keywords: "DKIM PHP mail signature, sign emails with DKIM PHP, dkim-php-mail-signature Composer, DKIM-Signature header PHP class, 2048-bit RSA key SHA-256 DKIM, openssl genrsa DKIM private key, DKIM DNS TXT record selector._domainkey, SPF DMARC configuration, prevent email spoofing PHP, PHP mail() DKIM signing, email authentication PHP library, Packagist jv-conseil dkim, email deliverability DKIM, PHP DKIMmail class, standalone DKIM signer without framework"
---

- &nbsp;
{:toc .large-only}

<!-- markdownlint-disable MD026 MD033 MD041 -->

[![Packagist Version](https://img.shields.io/packagist/v/jv-conseil/dkim-php-mail-signature?color=orange)](https://packagist.org/packages/jv-conseil/dkim-php-mail-signature)
[![Packagist Dependency Version](https://img.shields.io/packagist/dependency-v/jv-conseil/dkim-php-mail-signature/php)](https://packagist.org/packages/jv-conseil/dkim-php-mail-signature)
[![License EUPL 1.2](https://img.shields.io/badge/License-EUPL--1.2-blue.svg)](LICENSE)
[![Become a sponsor to JV-conseil](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/JV-conseil "Become a sponsor to JV-conseil")
[![Follow JV conseil on StackOverflow](https://img.shields.io/stackexchange/stackoverflow/r/2477854)](https://stackoverflow.com/users/2477854/jv-conseil "Follow JV conseil on StackOverflow")
[![Follow JVconseil on Twitter](https://img.shields.io/twitter/follow/JVconseil.svg?style=social&logo=twitter)](https://twitter.com/JVconseil "Follow JVconseil on Twitter")
[![Follow JVconseil on Mastodon](https://img.shields.io/mastodon/follow/110950122046692405)](https://mastodon.social/@JVconseil "Follow JVconseil@mastodon.social on Mastodon")
[![Follow JV conseil on GitHub](https://img.shields.io/github/followers/JV-conseil?label=JV-conseil&style=social)](https://github.com/JV-conseil "Follow JV-conseil on GitHub")
<!--
[![Donate with PayPal](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=P3DGL6EANDY96&source=url)
-->

## Usage

Sample lines to import into your mail code to start signing with DKIM:

```php
require_once __DIR__ . '/../vendor/autoload.php' ; // Autoload files using Composer autoload
use JVconseil\DkimPhpMailSignature\DKIMsign ;
use JVconseil\DkimPhpMailSignature\DKIMconfig ;

// init
$config = new DKIMconfig('/www/inc/config/jv-conseil/dkim-php-mail-signature/config.inc.php') ;
$sign = new DKIMsign(
 $config->private_key,
 $config->passphrase,
 $config->domain,
 $config->selector
) ;

// sign
$signed_headers = $sign->get_signed_headers($to, $subject, $message, $headers) ;

// send email
mail($to, $subject, $message, $signed_headers.$headers) ;
```

## Installation

> Step by Step guide to generate your encryption keys and populate them through your DNS records.

## Installation & loading

DkimPhpMailSignature is available on [Packagist](https://packagist.org/packages/jv-conseil/dkim-php-mail-signature) (using semantic versioning), and installation via [Composer](https://getcomposer.org) is the recommended way to install DkimPhpMailSignature. Just add this line to your `composer.json` file:

```json
"jv-conseil/dkim-php-mail-signature": "^1.0"
```

or run

```sh
composer require jv-conseil/dkim-php-mail-signature
```

Note that the `vendor` folder and the `vendor/autoload.php` script are generated by Composer; they are not part of DkimPhpMailSignature.

## Make your own copy of config file

Before starting you should make a copy of folder `config/` and store it outside your `vendor/` Composer repository in a non-public area of your website e.g.:

```bash
/www/inc/config/jv-conseil/dkim-php-mail-signature/
```

Failing to do so will expose you to lose all your settings in case of a future Composer udpate.

## Generate your Public & Private Encryption keys

In Terminal enter this command line to start working under the path of your `config/` folder:

```bash
cd /www/inc/config/jv-conseil/dkim-php-mail-signature/
```

In Terminal enter this command line to generate a new **private 2048 bit encryption key**:

```bash
openssl genrsa -des3 -out private.pem 2048
```

Enter your **Pass Phrase** and save it for editing your `config.inc.php` file in the next step.

Then retrieve your **public key**:

```bash
openssl rsa -in private.pem -out public.pem -outform PEM -pubout
```

_You can delete the two originals `*.pem` file keys stored in the `config/` folder if they create a conflict in the creation process of your keys._

## Edit your DNS with a new DKIM record

Access your registrar interface (e.g.: OVH.com) and create a new **DKIM record** to declare your **public key**:

```bash
selector._domainkey  IN TXT  ( "v=DKIM1;k=rsa;p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0ekggNf9vuzzL4SlVc8QZyyqbEwR5bVTPC9cEZ8hFqTKOc7go180n3RZilYJZvveaxBkLCVJSTQaMPtKuSptY5au6Pi3AkFlizzhUJ80+0zgZXSGx7gfbginbRwhD+XdGOe9NXpo0PfrD6dEJ49Ytx4/nHB0TKiL227C0kGWb7RfWTVWccgJq4+kQb4l+4" "oDU5rGomSYK+zmMV13QTSETcJnoXhmjoJ30omyJfEXAsK5Ny0LJo8rWCucLD31BxHrM9/+M/Ye+TWxcrD2mRh5Jxqcnyj00/7kCnWeGPTftVKkAJBP3JMRqCNShLUchLhaz0qeXUtxAe9dx7ltr8042QIDAQAB;" )
```

DKIM works better with **SPF** and **DMARC** records, you should consider editing them too:

```bash
3600     IN TXT  "v=spf1 include:_spf.google.com ~all"
_dmarc   IN TXT  "v=DMARC1; p=quarantine; rua=mailto:me@yourdomain.name"
```

Further reading:

- [Add DKIM domain key to domain DNS records](https://support.google.com/a/answer/173535)
- [Manage suspicious emails with DMARC](https://support.google.com/a/answer/2466563?hl=en)
- [Help prevent email spoofing with SPF records](https://support.google.com/a/answer/33786?hl=en)

## Edit your Config File

Under `config/config.sample.inc.php` you will find a config file example to help you set your own details.

Now you can drop `.sample` in the filename and start editing it:

- **domain**: your domain name e.g: google.com
- **selector**: `selector` used in your DKIM DNS record, e.g.: selector._domainkey.MAIL_DKIM_DOMAIN
- **passphrase**: your pass phrase used to generate your keys e.g.: myPassPhrase.
- ... other parameters can be omitted.

## Simple Use

Sample lines to import into your mail code to start signing with DKIM:

```php
require_once __DIR__ . '/../vendor/autoload.php' ; // Autoload files using Composer autoload
use JVconseil\DkimPhpMailSignature\DKIMsign ;
use JVconseil\DkimPhpMailSignature\DKIMconfig ;

// init
$config = new DKIMconfig('/www/inc/config/jv-conseil/dkim-php-mail-signature/config.inc.php') ;

// set: this calls __set()
$config->domain = "mynewdomain.name" ;

// get: this calls __get()
$config->domain ; // => "mynewdomain.name" ;
```

## Introducing DKIMmail class

> 📬 Stand-alone class to send DKIM signed emails with a 2048 bit private key hashed with SHA-256 algorithm.

```php
// init
$mail = new DKIMmail('/www/inc/config/jv-conseil/dkim-php-mail-signature/config.inc.php') ;

// parameters
$mail->from    = "Sender" <sender@yourdomain.com> ;
$mail->to      = "Recipient" <recipient@yourdomain.com> ;
$mail->subject = "Your Mail Subject" ;
$mail->body    = "Your Mail Message." ;
$mail->attach("/path/to/your/attachment.jpg", "NameOfYourAttachment.jpg") ;

// send!
$mail->send() ;
```

## Documentation

Documentation is [available online](https://jv-conseil-internet-consulting.github.io/dkim-php-mail-signature/classes/JVconseil.DkimPhpMailSignature.DKIMconfig.html), though it may not be quite up to date or match your version exactly.

You can generate API documentation by running `phpdoc` in the top-level folder of this project, and documentation will be generated in this folder:

```bash
php ~/vendor/bin/phpdoc -d ~/dkim-php-mail-signature/ -t ~/dkim-php-mail-signature/docs/
```

You will need to have [phpDocumentor](https://www.phpdoc.org) installed.

## Sponsorship

If this project helps you reduce time to develop, you can give me a cup of coffee ☕️ :-)

[![Become a sponsor to JV-conseil](https://img.shields.io/static/v1?label=Sponsor&message=%E2%9D%A4&logo=GitHub&color=%23fe8e86)](https://github.com/sponsors/JV-conseil)

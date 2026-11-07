---
layout: post
title: "Technology Governance in a Danish University's Administrative Department"
image:
  path: /assets/posts/2026-11-05-technology-governance-danish-universities.jpg
  alt: "Abstract illustration of governance layers surrounding a web application inside a university administration."
description: >
  Why the hardest part of building web apps for a Danish university's administrative department is not the code — it is technology governance
excerpt: >
  Building web applications inside a Danish university's administrative department means navigating security reviews, data protection, procurement, shared infrastructure, and consensus-driven decision-making. A field guide to technology governance — the invisible layer that decides whether your app ever reaches production.
# hide_description: true
category: [projects, europe, denmark]
keywords: [Technology Governance, Higher Education, Web Development, Denmark, IT Compliance, GDPR, Information Security]
tags: [governance, security, azure]
author: "Julien Vieillefont"

seo:
  type: TechArticle
  links:
    - https://jv-conseil.dev/blog/2026-10-27-funding-apps-danish-universities-7-years-collaboration/
  json_ld:
    dependencies: "Django, PostgreSQL, Azure Cloud, SAML/OpenID Connect"
    proficiencyLevel: "Expert"
    timeRequired: "PT10M"
    keywords: "Technology Governance, Danish universities, web application development, IT security review, GDPR compliance, university IT departments, administrative software, higher education governance, identity federation, procurement"
---

- &nbsp;
{:toc .large-only}

<!-- markdownlint-disable MD026 MD033 MD041 -->

_Reading time: 10 min._

**When the code is the easy part: governing technology inside a university administration**
{:.lead}

In [my previous article][funding apps], I retraced seven years of collaboration with Danish universities and the [Funding Apps][SDU Funding Apps] ecosystem they now rely on. One theme kept surfacing in the background, and it deserves an article of its own: **technology governance** — the set of rules, reviews, committees, and shared responsibilities that decide whether a web application is allowed to exist inside a university's administrative department at all.

<!-- TODO: add lead illustration before publishing -->

## What Technology Governance Actually Means Here

<!-- DRAFT NOTE: This post is a work in progress on the `info/new-post` branch. Structure and arguments below; final polish, illustrations, and links to internal policies still to be added. -->

Technology governance is often reduced to "IT security" — a checklist you satisfy before go-live. Inside a Danish university, it is much broader. It is the framework through which the institution decides:

* **What may be built:** which data the department is legally allowed to process, and for which purposes.
* **Who may build it:** internal IT, external vendors, or independent developers — and under what contract and liability terms.
* **Where it may run:** on-premises, in a national cloud community, or with a public cloud provider, and under which data-residency rules.
* **How it must be operated:** authentication, logging, backup, monitoring, incident response, and patch management.
* **How long it must live:** archival obligations, exit strategies, and what happens when the developer or vendor disappears.

In other words: governance is the invisible architecture around the visible one. And for a web application serving an administrative department — the very heart of the university's non-academic machinery — it is the layer that most often decides the fate of a project.

## Why Administrative Departments Are a Special Case

<!-- TODO: examples from RIO/HR/finance-adjacent projects, anonymized -->

A faculty researcher can often experiment with a tool on their laptop and share it with colleagues informally. An administrative department cannot. Research support, HR, finance, and grant offices process **personal data of employees and students**, sign decisions on behalf of the institution, and are bound by Danish public-sector law — including the GDPR with its public-authority provisions, and the Danish records-management and archival legislation.

This changes the engineering conversation from day one:

1. **Data protection by design is not optional.** A DPIA (Data Protection Impact Assessment) may be required before a single line of code is written, and the university's Data Protection Officer becomes a stakeholder of your project.
2. **Security reviews are formal gates.** Penetration tests, threat modelling, and secure-development documentation are passed through the institution's information-security function — often aligned with ISO 27001 and the Danish implementation of the NIS2 directive.
3. **Identity is never yours.** Users do not get local accounts; they log in through the university's Microsoft identity stack and the national federations (SAML / OpenID Connect). Your application must fit *their* model of authentication, MFA, and access delegation.
4. **Procurement has opinions.** Even an enthusiastic department cannot simply "buy" a solution; public-procurement thresholds, framework agreements, and vendor-risk assessments shape what is contractually possible.

## The Governance Stack of a Danish University Web App

<!-- TODO: verify names of frameworks against current Danish sector guidance (Digitaliseringsstyrelsen, DKCERT, Deic) -->

Layer by layer, here is what a developer must navigate — each layer owned by a different group of people, each with its own vocabulary:

* **Institutional policies:** the university's IT security policy, data-processing rules, and web-estate standards (hostnames, subdomains, TLS, cookies consent).
* **National frameworks:** Danish public-sector digitalisation requirements, records-management law, and sector security guidance.
* **European frameworks:** the GDPR, the NIS2 directive, and — for research-adjacent tools — the data-protection expectations of EU funding instruments.
* **Shared infrastructure:** the university's Azure tenant (or equivalent), where your app lives inside someone else's subscription, network perimeter, and logging pipeline.

The practical consequence: **your architecture is negotiated, not chosen.** Django or Flask, PostgreSQL or SQL Server, which region the data sits in, how logs are shipped — every decision has a governance dimension, and the wrong one is not a code smell but a compliance finding.

## The Human Layer: Consensus, Trust, and the Danish Way

<!-- TODO: expand with anecdotes from collaborations at SDU, AAU, AU, DTU, CBS -->

Danish working culture deserves its own section. Flat hierarchies and consensus-driven decision-making mean that no single person can simply impose a technical direction. Governance in a Danish university is social before it is procedural: the security officer, the data-protection officer, the network team, and the department's own product owners must all be brought along.

This is slow — and it is also the system's strength. Because when a platform finally passes through the gates, it carries the institution's trust with it. The [seven-year collaboration][funding apps] behind the Funding Apps would have been impossible without that trust: security reviews passed once, then renewed; infrastructure shared rather than fought over; and a governance relationship maintained across five institutions simultaneously.

## Lessons for Developers Entering This World

<!-- TODO: turn into a checklist before publishing -->

For any developer — independent or in-house — building web applications for a university administration, my hard-earned advice:

1. **Treat governance as a requirement, not an obstacle.** Design your security review, DPIA, and identity integration as first-class deliverables with the same rigour as your database schema.
2. **Learn the vocabulary.** Being able to discuss DPIAs, identity federations, and records management in the institution's own terms collapses months of friction into weeks.
3. **Build relationships, not tickets.** The security officer who knows your name and your track record will review your next project faster and with more goodwill.
4. **Design for the long term.** Archival rules, exit strategies, and continuity of knowledge are governance requirements — and, as I argued before, they are also where an independent senior developer genuinely outperforms a rotating cast of vendors.
5. **Assume you will be audited.** Documentation, logging, monitoring, and incident-response readiness are not overhead; they are the price of admission.

## The Road Ahead

<!-- TODO: link to FP10 / upcoming governance developments, conclusion to be finalized -->

As Danish universities face growing cyber-security obligations, tighter budgets, and the data-intensive ambitions of the next EU framework programmes, technology governance will only become more central. The winners of the next decade of academic software will not be those who write the best code — they will be those who write the best code **that the institution can actually accept, govern, and trust**.

<!-- markdownlint-enable MD026 MD033 MD041 -->

[funding apps]: https://jv-conseil.dev/blog/2026-10-27-funding-apps-danish-universities-7-years-collaboration/
[SDU Funding Apps]: https://www.sdu.dk/en/fundingapps

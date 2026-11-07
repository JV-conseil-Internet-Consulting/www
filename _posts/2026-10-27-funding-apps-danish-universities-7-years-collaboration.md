---
layout: post
title: "7 Years Building Funding Apps for Danish Universities"
image:
  path: /assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration.jpg
  alt: "Map of Denmark locating the Funding Apps platforms of SDU, DTU, Aarhus University, Aalborg University, and Copenhagen Business School."
description: >
  How an independent French senior full-stack developer spent seven years building AI-powered research funding tools for Danish universities
excerpt: > 
  Over seven years, one independent French developer and Denmark's leading universities turned a single campus tool into a national ecosystem of AI-powered grant matching — one that has helped researchers secure millions of euros in European funding.
# hide_description: true
hide_last_modified: true
category: [projects, europe, denmark]
keywords: [Freelance Development, Higher Education, Research Funding, Horizon Europe, Denmark, NLP, Full-Stack Development]
tags: [python, django, postgresql, azure]
author: "Julien Vieillefont"

seo:
  type: TechArticle
  links:
    - https://jv-conseil.dev/blog/2026-10-27-funding-apps-danish-universities-7-years-collaboration/
  json_ld:
    dependencies: "Python, Django, PostgreSQL, OpenAlex API, Bootstrap 5, Azure Cloud, NLP"
    proficiencyLevel: "Expert"
    timeRequired: "PT13M"
    keywords: "Grant Management Software, Django Architecture, OpenAlex, NLP, ETL Pipelines, Academic Tech, Funding Apps Danish universities, research funding tools, Horizon Europe grant matching, university research support software, AI grant discovery, freelance full-stack developer, SDU, DTU, Aarhus University, Aalborg University, Copenhagen Business School"
---

- &nbsp;
{:toc .large-only}

<!-- markdownlint-disable MD026 MD033 MD041 -->

_Reading time: 13 min._

**How 7 Years of Collaboration with Danish Universities Built the Funding Apps Ecosystem**
{:.lead}

Across Denmark, thousands of researchers and research managers nowadays rely on the [Funding Apps][SDU Funding Apps] ecosystem as an integral part of their daily professional lives, using it to prepare their grant applications. Yet how many of them know where this ecosystem actually comes from — how the project was born, how it was conceived and imagined, and how it grew step by step into the national standard it represents in Denmark today?

This article is an attempt to sketch an answer to those questions, by retracing the seven-year journey through which this ecosystem came to be — to the point where it now radiates well beyond Danish borders, sparking growing interest among European neighbors such as the Netherlands, Belgium, and Ireland.

As an independent French senior [full-stack developer](https://en.wikipedia.org/wiki/Solution_stack#Full-stack_developer "A full-stack developer is expected to be able to work in all the layers of the application (front-end and back-end)"), I am often asked what makes this long-running collaboration with Danish universities work so well. My honest answer, after seven years, comes down to a rather uncommon combination: **agility**, **continuity**, and **trust**, backed by a **set of skills and experience that few single profiles bring together**.

For the past seven years, I have worked hand-in-hand with the research support departments of Denmark's leading universities. Together, we have transformed academic grant acquisition — a process historically bogged down by administrative complexity — into a streamlined, automated ecosystem of interconnected research funding applications.

This is the story of the **[Funding Apps][SDU Funding Apps]** suite: a piece of software craftsmanship, built specifically for Scandinavian academic excellence.

<!-- space --> 

![SDU Funding Apps](../assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration-sdu.jpg){:.lead loading="lazy"}

The [Funding Apps][SDU Funding Apps] were first deployed at the [University of Southern Denmark][SDU] (SDU) in 2019.
{:.figcaption}

## The Genesis: Scaling from One University to a National Standard

It all started at the [University of Southern Denmark][SDU] (SDU) in [Odense][Odense]. [Maéva Vignes][Maéva] from SDU Research and Innovation (RIO) began investigating the project in 2018: she saw the potential of a suite of digital tools designed to streamline research funding, from finding a pertinent financing opportunity to writing an impactful proposal. I joined her in 2019 to bring the project to its next stage — migrating her local [Proof of Concept][PoC] (PoC) developments into a [Minimum Viable Product][MVP] (MVP), deployed as [Microsoft Azure][Azure] Cloud web applications with [CI/CD][CICD] pipelines from day one.

[Maéva][Maéva] is a French PhD researcher who was working as a funding advisor at [SDU][SDU]. [Maéva][Maéva] had stood on both sides of the table: as a researcher writing competitive proposals, and as an advisor guiding colleagues through them. Her creative mindset — grounded in rigorous science but focused on practical researcher needs — defined the philosophy of the [Funding Apps][SDU Funding Apps] from day one: solve the real pain, not the administrative surface.

The initial challenge was ambitious: how could we help busy researchers instantly discover European grant opportunities (such as [Horizon Europe][Horizon Europe]) tailored to their exact research track, without forcing them to manually comb through thousands of pages of administrative text?

By combining a highly resilient infrastructure with Natural Language Processing ([NLP][NLP]) pipelines, we built a suite of tailored, AI-powered research funding micro-applications. The platform's success at [SDU][SDU] quickly caught the attention of other major institutions across the country, leading to a nationwide expansion.

<!-- space --> 

| Since | Platform                                           | Institution                                  |
| :---- | :------------------------------------------------- | -------------------------------------------- |
| 2019  | [SDU Funding Apps][SDU Funding Apps]               | [University of Southern Denmark][SDU] (SDU)  |
| 2022  | [AAU EU Funding Apps](https://eu-funding.aau.dk/)  | [Aalborg University][AAU] (AAU)              |
| 2025  | [AU Funding Tools](https://funding-tools.au.dk/)   | [Aarhus University][AU] (AU)                 |
| 2026  | [DTU Funding Tools](https://funding-tools.dtu.dk/) | [Technical University of Denmark][DTU] (DTU) |
| 2026  | [CBS Funding Tools](https://funding-tools.cbs.dk/) | [Copenhagen Business School][CBS] (CBS)      |
{:.stretch-table}

<!-- space --> 

![AAU EU Funding Apps](../assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration-aalborg.jpg){:.lead loading="lazy"}

[Aalborg University][AAU] (AAU) was the second Danish university to adopt the [AAU EU Funding Apps](https://eu-funding.aau.dk/) in 2022.
{:.figcaption}

## Under the Hood: 4 Micro-Apps for Smarter Grant Matching

Building software for the academic sector demands strict precision. To maximize pre-award success rates, [Maéva][Maéva] and I architected the ecosystem around four specialized modules that execute data updates overnight:

- **EU Call Finder:** A text-mining algorithm that parses a researcher's publication history to automatically suggest the most relevant [Horizon Europe][Horizon Europe]) calls.
- **EU Projects:** A semantic mapping tool that scans existing EU-funded projects, ensuring a researcher's proposal is fully novel before they invest months into writing it.
- **EU Partners:** A network-graph recommendation engine that maps pan-European corporate and university connections to find missing stakeholders for a strong grant consortium.
- **EU Evaluators:** A profile-matching module that aligns the thematic focus of a draft proposal with past EU reviewers, identifying internal faculty contacts for mock peer reviews.

## A Fine-Grained Understanding of the EU Funding Ecosystem

None of this would work without a deep, practitioner-level understanding of the object the software navigates: the European research funding landscape itself. Parsing it is far from a trivial text-processing exercise.

It requires modelling a genuinely complex institutional taxonomy — the Pillars of [Horizon Europe][Horizon Europe], its thematic Clusters, the EU Missions, and the Destinations and topics that descend from each Work Programme — and understanding how a Draft Work Programme gradually evolves into published calls and deadlines.

This knowledge had to be internalized down to the finest grain: a module that recommends mock reviewers, for instance, must reason within the exact same taxonomy that EU evaluators themselves use.

![Horizon Europe Pillars & Clusters](../assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration-horizon-europe-pillars-and-clusters.jpg){:.lead loading="lazy"}

[Horizon Europe][Horizon Europe] Pillars & Clusters.
{:.figcaption}

## Interconnecting Datasets

Rather than relying on static mailing lists or manual searches, the apps were built to pull and interconnect siloed datasets, joining the scientific world and the European funding world into a single, coherent data model. Two families of sources feed the platform.

**Scientific datasets** describe who the researchers are and what they publish:

- [OpenAlex](https://openalex.org), the open catalog to the global research system. It supplies indexed publications, affiliations, citation graphs, and research concepts, and its fully open [API][API] makes it the backbone for reconstructing each researcher's publication history.
- [ORCID](https://orcid.org), the persistent digital identifier for researchers. It is the glue for identity resolution: the key that reliably links a PURE profile to the right author records in publication databases, despite homonymous names and career mobility across institutions and countries.
- [PURE](https://www.elsevier.com/products/pure), the research information management system that each university operates internally. It is the authoritative institutional source for research profiles, activities, and outputs, and the starting point from which every grant match is computed.

**European datasets** describe what can be funded and by whom:

- [CORDIS][CORDIS], the European Commission's reference portal on EU-funded research projects. Past and present projects, participants, results, and budgets are mined to verify the novelty of a proposed topic and to map potential consortium partners.
- [SEDIA](https://ec.europa.eu/info/funding-tenders/opportunities/portal/), the Single Electronic Data Interchange Area — better known as the EU Funding &amp; Tenders Portal. It is the single entry point for Commission-managed programmes, and the source monitored in near real time for newly published calls, topics, and deadlines.
- The [EU Experts](https://ec.europa.eu/info/funding-tenders/opportunities/portal/screen/how-to-participate/experts) database, where the Commission registers its independent evaluators. Thematic profiles of past reviewers are matched against draft proposals to identify experienced contacts for mock evaluations.
- [Pivot-RP][Pivot-RP], Clarivate's expert-curated database of global funding opportunities. It widens the horizon well beyond EU programmes: editorially maintained calls from foundations, national agencies, and private funders worldwide are synchronized with the platforms, giving researchers a single point of entry to the global funding landscape.

The engineering challenge was never fetching these sources individually — it was reconciling them: resolving identities across systems, normalizing taxonomies that were never designed to meet, and maintaining one coherent graph that the [NLP][NLP] layer could reason over, night after night.

<!-- space --> 

![AAU EU Funding Apps](../assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration-aarhus.jpg){:.lead loading="lazy"}

[Aarhus University][AU] (AU) was the third Danish university to adopt the [AU Funding Tools](https://funding-tools.au.dk) in 2025.
{:.figcaption}

## The Full-Stack Reality: Five Disciplines in One Codebase

People often assume "full-stack" is a marketing label. The [Funding Apps][SDU Funding Apps] suite is a concrete demonstration of what the term truly demands. A single glance at the project's dependencies reveals five distinct engineering disciplines that one person must command simultaneously:

### Back End Engineering

The server side is anchored on a mature [Django](https://www.djangoproject.com/start/overview/) application, with scheduled batch jobs orchestrated nightly, enterprise-grade authentication wired into the universities' Microsoft identity stack, and secrets and storage delegated to [Azure Key Vault](https://learn.microsoft.com/en-us/azure/key-vault/general/overview) and Azure blob services. Reliability engineering — caching, memoization, error resilience — is woven through every layer, because grant deadlines do not tolerate downtime.

### Database Engineering

Underneath sits a [PostgreSQL](https://www.postgresql.org/) core with connection pooling, bulk import and export pipelines, and carefully tuned query patterns. The data model must reconcile heterogeneous sources — publication records, grant calls, funded-project portfolios — into a coherent schema that can answer a researcher's question in milliseconds.

### Front End Engineering

The user-facing layer follows a rigorous build chain — webpack, Sass, and minification pipelines — serving Bootstrap 5 interfaces styled to each institution's identity. Interactive data tables, full-scale calendar views of upcoming calls, search panes, and rich charting libraries must all feel instant and effortless, in keeping with Scandinavian design minimalism.

### [ETL](https://en.wikipedia.org/wiki/Extract,_transform,_load "Extract, transform, load") and Data Cleaning

Raw funding data arrives in every conceivable condition: HTML pages, PDF documents, Excel spreadsheets, compressed archives. An entire extraction-transformation layer — scrapers, PDF and spreadsheet parsers, browser automation, language detection, and Unicode normalization — runs nightly to turn that chaos into clean, structured, matchable records.

### Natural Language Processing

Finally, the intelligent layer that ties it all together: [NLP][NLP] and machine-learning libraries that tokenize, lemmatize, and vectorize publication abstracts and call texts, then use semantic similarity and fuzzy matching to connect the right researcher with the right opportunity. This is the engine behind EU Call Finder, EU Projects, EU Partners, and EU Evaluators.

<!-- space --> 

Five disciplines. One developer. That is the bar this project has set — and maintained — for seven years of continuous releases.
{:.lead}

<!-- space --> 

![DTU Funding Tools](../assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration-dtu.jpg){:.lead loading="lazy"}

[Technical University of Denmark][DTU] (DTU) was the fourth Danish university to adopt the [DTU Funding Tools](https://funding-tools.dtu.dk/) in 2026.
{:.figcaption}

## Beyond the Code: A Genuinely Multidisciplinary Experience

Delivering the same ecosystem to five institutions taught me an essential lesson: writing the software is only one layer of the job. Each deployment was, in reality, a cross-functional endeavor that pulled me far outside the traditional perimeter of a developer.

### Working Hand-in-Hand with Each University's IT Department

No two campuses run their infrastructure the same way, and none of these platforms would have gone live without the daily cooperation of each university's IT organization. Over the years, I collaborated across their full spectrum of métiers:

- **Network and DNS:** Configuring hostnames, subdomains, and routing rules so each platform integrates cleanly into the university's own web estate.
- **Security and Identity:** Implementing federated Single Sign-On through national identity federations (SAML/OpenID Connect), passing institutional security reviews and penetration tests, and meeting Danish and European data protection requirements, GDPR included.
- **[API][API]s and Data Integration:** Designing, exposing, and consuming REST interfaces to synchronize with internal PURE research repositories as well as external sources such as [Pivot-RP][Pivot-RP] and [CORDIS][CORDIS].
- **Operations and Reliability:** Setting up [CI/CD][CICD] pipelines, monitoring, and the overnight batch jobs that keep every researcher's grant matches up to date.

This meant speaking the language of network engineers, security officers, and system administrators alike — often within the same week, often across five different organizations at once.

### A Product Shaped by Research Support Staff

The true product owners were never the IT departments. They were the research support officers of each university: the grant advisers, EU consultants, and project managers who live and breathe the funding landscape. Every module in the suite reflects their expertise. Through workshops, feedback sessions, and years of iterative dialogue, they translated the realities of [Horizon Europe][Horizon Europe] into requirements, and my role was to translate their requirements into software that fits the way they actually work — including the specific terminology and internal processes of each institution.

### Building Bridges Across Working Cultures

As a French developer embedded in Danish institutions, I also had to become something of a bridge builder. Danish professional culture — its flat hierarchies, direct communication, and consensus-driven decision-making — differs in many ways from the traditions in which I was trained, and learning to work fluently within it took deliberate effort. Add to this the daily reality of international collaboration: partners spread across Europe, with English as the working language and remote coordination as the norm. Seven years of this have made cross-cultural communication a core skill of the craft, as fundamental as any technology in the stack.

### Improvised Community Manager

Software alone does not make an ecosystem; its users do. Users from all five universities — researchers, research support advisors, and research managers — are gathered in a private, dedicated [LinkedIn group](https://www.linkedin.com/groups/12721532/ "Dedicated private LinkedIn group for the Funding Apps user community"). This community channel serves two main purposes:

1. **Product communication:** announcing new features, sharing tips, and publishing how-to guides, so that every user gets the most out of the tools.
2. **Service health status:** in case of service disruption, the group doubles as a health status channel, informing the community of incidents and fixes as they are being handled.

Caring for this community became yet another informal métier on the project — one part community management, one part product communication, and one part incident response — and a direct, human link between the people who build the tools and the thousands of researchers who use them every day.

<!-- space --> 

![CBS Funding Tools](../assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration-cbs.jpg){:.lead loading="lazy"}

[Copenhagen Business School][CBS] (CBS) is the last Danish university that recently adopted the [CBS Funding Tools](https://funding-tools.cbs.dk/) in 2026.
{:.figcaption}

## From Solo Developer to Tech Lead: A Team Grows Around the Vision

Over the span of these seven years, something happened that nobody had planned at the outset: a team began to form around the project. Data scientists, web developers, and software engineers gradually joined, drawn to the initial vision — digitalising the métiers that facilitate academic collaboration — and eager to build new projects in its orbit.

With the team came new responsibilities. On top of my development assignments, I have increasingly assumed an informal role that sits somewhere between [tech lead](https://en.wikipedia.org/?redirect=no&title=Technical_lead "A tech lead (short for technical lead) is a software engineer responsible for leading a team and aligning the technical direction of a project"), [CTO](https://en.wikipedia.org/wiki/CTO "Chief Technology Officer"), and team manager:

- **Recruitment:** Designing recruitment tests and conducting hiring interviews to select developers and data scientists who combine technical rigor with an understanding of the academic world.
- **Knowledge sharing:** Hosting weekly thematic seminars in [Odense][Odense] to spread good coding practices, review architectural decisions, and keep the quality bar consistently high.
- **Team leadership:** Chairing weekly meetings that hold an international team together across three Western European countries — balancing working cultures, and communication styles into one coherent rhythm of delivery.

In hindsight, this is the natural extension of everything described above. The same continuity and depth that shaped the codebase now apply to people: building a team is not so different from building software — it requires a clear vision, honest feedback, and years of patient iteration.

## The Freelance Advantage: Stability, Continuity, and a Long-Term Vision

If this collaboration has lasted seven years, it is because it rests on stability and permanence. A **senior full-stack developer is, in effect, a Swiss army knife:** the entire spectrum of IT competences — architecture, back end, database, front end, data engineering, and operations — concentrated in one person, which is exactly what empowers a project to grow organically from a local [Proof of Concept][PoC] into a production-grade platform. This journey highlights what a senior independent developer brings to an institution over the long run:

1. **Full-Stack Ownership:** From fine-tuning background [NLP][NLP] algorithms to designing clean, minimalist user interfaces inspired by Scandinavian aesthetics, every line of code is optimized for performance — carried by the same hands, year after year.
2. **Continuity of Project History:** Over seven years, there has been no staff turnover and no changing project managers. The complete history of the project lives on in one place: every architectural decision, every resolved incident, every institutional constraint. Nothing is ever lost, re-learned at the client's expense, or re-discovered by a new team.
3. **Knowledge as a Compounding Asset:** Seven years of trial and error are never wasted. Every lesson learned is conserved, every competence acquired is tracked and refined, and their accumulation becomes a valuable asset in its own right — the intangible capital that enables a professional project to keep growing.
4. **Permanence of the Partnership:** This collaboration goes beyond standard client-vendor delivery. It is a continuous co-innovation process where we actively iterate to bring the latest technological advancements to the platforms, sustained by the trust accumulated through seven years of delivery.
5. **Vision for the Future:** Because the roadmap is never reset with each contract renewal, the project has a direction. The next features are designed today with the full memory of everything built before — a rare form of permanence in the software industry, and the foundation on which the next seven years are being planned.

## The Road Ahead: Rise to the Challenges of [FP10][FP10]

Today, these tools actively support thousands of Danish researchers in securing millions of euros in funding to build the science of tomorrow — from [Odense][Odense] to Lyngby, from Aarhus to Aalborg, and now in Copenhagen. What began as a single university's internal need has grown into a de facto national standard, and the journey is far from over.

The relevance of this model extends well beyond Denmark's borders: as [Horizon Europe][Horizon Europe] draws to a close in December 2027, the ecosystem stands ready to help universities rise to the challenges of [FP10][FP10] — the next European Union’s funding programme for research and innovation, due to begin in January 2028 and, as is now widely known, heavily **inspired by the [Draghi report][Draghi] on the future of European competitiveness**.

Seven years. Five institutions. Countless métiers and working cultures. One developer. The proof that long-term, trust-based collaboration between an independent craftsman and world-class academic institutions is not only viable — it is the model that built this ecosystem.

<!-- links -->

[AAU]: https://www.en.aau.dk/about-aau "About Aalborg University (AAU)"
[API]: https://en.wikipedia.org/wiki/API "Application Programming Interface"
[AU]: https://international.au.dk/about "About Aarhus University (AU)"
[Azure]: https://azure.microsoft.com/ "Microsoft Azure"
[CBS]: https://www.cbs.dk/en/about-cbs "About Copenhagen Business School (CBS)"
[CICD]: https://en.wikipedia.org/wiki/CI/CD "Continuous Integration / Continuous Delivery"
[CORDIS]: https://cordis.europa.eu "Community Research and Development Information Service"
[Draghi]: https://commission.europa.eu/topics/competitiveness/draghi-report_en "The future of European competitiveness — Report by Mario Draghi (September 2024)"
[DTU]: https://www.dtu.dk/english/about "About DTU – Technical University of Denmark"
[FP10]: https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI%282025%29779234 "Horizon Europe 2028–2034: 10th EU research and innovation framework programme"
[Horizon Europe]: https://research-and-innovation.ec.europa.eu/funding/funding-opportunities/funding-programmes-and-open-calls/horizon-europe_en "Horizon Europe is the European Union’s primary funding programme for research and innovation for the period 2021–2027"
[Maéva]: https://www.linkedin.com/in/maevavignes/ "Maéva Vignes' LinkedIn Profile"
[MVP]: https://en.wikipedia.org/wiki/Minimum_viable_product "Minimum Viable Product"
[NLP]: https://en.wikipedia.org/wiki/Natural_language_processing "Natural Language Processing"
[Odense]: https://en.wikipedia.org/wiki/Odense "Odense is the third largest city in Denmark"
[Pivot-RP]: https://clarivate.com/academia-government/scientific-and-academic-research/research-funding-analytics/pivot-rp-funding/ "Pivot-RP, Clarivate's expert-curated global funding opportunities database"
[PoC]: https://en.wikipedia.org/wiki/Proof_of_concept "Proof of Concept"
[SDU Funding Apps]: https://funding-apps.sdu.dk/ "SDU Funding Apps"
[SDU]: https://www.sdu.dk/en/om-sdu "University of Southern Denmark (SDU)"

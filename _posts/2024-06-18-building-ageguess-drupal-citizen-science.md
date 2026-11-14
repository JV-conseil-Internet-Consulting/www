---
layout: post
title: "10 Years Building AgeGuess: Drupal Development for Citizen Science"
image:
  path: /assets/posts/2024-06-18-building-ageguess-drupal-citizen-science.png
  alt: "AgeGuess.org, the citizen science game where players guess the ages of the people in photographs to support research on human ageing."
description: >
  How an independent French senior full-stack developer has spent ten years building and maintaining the AgeGuess.org citizen science platform on Drupal, helping researchers assemble one of the world's largest open databases on perceived age.
excerpt: >
  Behind a simple online game — look at a face, guess an age — lies a Drupal platform that has quietly collected hundreds of thousands of perceived age guesses for ageing research. This is the story of the ten years of freelance development behind AgeGuess.org.
# hide_description: true
hide_last_modified: true
category: [projects, science, drupal]
keywords: [Freelance Development, Drupal, Citizen Science, Ageing Research, Perceived Age, Open Data, Open Source]
tags: [php, drupal, mysql, bootstrap]
author: "Julien Vieillefont"

seo:
  type: TechArticle
  links:
    - https://jv-conseil.dev/blog/2024-06-18-building-ageguess-drupal-citizen-science/
  json_ld:
    dependencies: "Drupal 7, PHP, MySQL, Bootstrap 3.2.0, jQuery 1.11.1, JpGraph, Font Awesome 4.7.0"
    proficiencyLevel: "Expert"
    timeRequired: "PT10M"
    keywords: "Drupal development, citizen science platform, AgeGuess, perceived age, biological age, ageing research, freelance Drupal developer, open data, open source, CNIL, GDPR, gamification, Nature Scientific Data, PHP, MySQL"
---

- &nbsp;
{:toc .large-only}

<!-- markdownlint-disable MD026 MD033 MD041 -->

_Reading time: 10 min._

**How Ten Years of Drupal Development Quietly Built a Scientific Resource on Human Ageing**
{:.lead}

At first sight, [AgeGuess.org][AgeGuess] looks like a harmless little game. Create an account, look at a photograph, and try to guess how old the person in it is. Guess again. And again. Accumulate points, climb the ranking, and come back tomorrow.

Yet behind this simple game lies a genuine scientific instrument. Every guess contributes to an open database on perceived age — how old someone looks to others — a biomarker that researchers use to study the human ageing process. Since 2012, citizen scientists from more than 120 countries have uploaded thousands of facial photographs and produced more than 220,000 perceived age guesses, in the process building [a database published in Nature's *Scientific Data*][AgeGuess database paper].

What the players rarely considered was who kept the platform running. The answer: an independent French senior full-stack developer. Ten years ago, on 18 June 2014, I took over the web development of [AgeGuess][AgeGuess]; I then carried the platform until 18 June 2024, as a freelance [Drupal][Drupal] developer. This article retraces that journey — how the current platform came to be, how its architecture supports both an online game and a scientific database, and what ten years of continuous maintenance of a citizen science project truly demand.

This is the story of a quiet piece of software engineering in the service of open science.

## The Science Behind the Game: Perceived Age as a Biomarker of Ageing

In many developed countries, human life expectancy has doubled over the last 180 years. Underlying this remarkable extension is a change in how we age. Biomarkers of ageing are used to quantify these changes and to determine biological age — the relative condition of, for example, the cardiovascular, metabolic, or immune system. Perceived age is one such biomarker.

How old someone looks to others correlates with many cognitive and physical functions, and has been shown to predict mortality hazard among older people to a larger degree than chronological age. This makes perceived age a low-cost, non-invasive window into the biological ageing process — and it opens research questions that traditional cohorts cannot easily answer: is a 40-year-old today biologically younger than a 40-year-old in the 1990s? Do we age continuously throughout our lives, or through bursts and pauses? To what degree is biological age heritable?

Answering such questions requires data — a great deal of it. Photographs of the same persons at different ages, spanning birth cohorts over more than a century, with both the chronological age and the perceived age attached to every observation. Recruiting and rating thousands of faces in a controlled laboratory setting would be prohibitively expensive. A crowd of citizen scientists playing an online game can achieve exactly that, at scale, over years. The data collected through [AgeGuess][AgeGuess] span birth cohorts from 1877 to 2012, with persons aged 5 to 100 in the photographs.

The game, in other words, is the sampling method.

## The Genesis: From a Research Idea to a Drupal Platform

[AgeGuess][AgeGuess] was started in 2012 by the evolutionary biologist [Ulrich K. Steiner][Uli] and the population geneticist D. Misevic, who headed the project throughout its lifetime: they defined the data collection protocols, secured funding, and steered the scientific directions with a team of academic and industrial advisors. The first fully functional version of the website was coded by Charlotte Le Pesquer.

I joined the project in 2014 with a clear assignment: rebuild the platform so that it could carry the project over the long haul. That decision framed everything that followed. A citizen science project lives or dies by its capacity to run reliably for decades — data collection of this kind is a marathon, not a sprint — and the software had to be designed accordingly.

The platform was already running on [Drupal][Drupal] — version 6 at the time — and the 2014 rebuild carried it to version 7, a foundation I have never had reason to regret:

- **A mature, open-source foundation.** [Drupal][Drupal] is a free and open-source content management system based on [PHP][PHP] and [MySQL][MySQL]. It provides user account management, login/logout, account activation and deletion, forms, permissions, and image handling out of the box — precisely the mundane infrastructure that a research project should never have to reinvent.
- **An extensible architecture.** Thanks to its hook system, every project-specific behaviour — the guessing game, the points, the photo queue, the exports — could be implemented as custom modules and a custom theme layered on top of the core, without ever patching it. Upgrades remain possible; nothing is forked into a dead end.
- **A defensible legal and operational basis.** The platform is hosted in France and was declared to the [CNIL][CNIL], the French regulatory body ensuring the application of data privacy law — a prerequisite for collecting photographs of identifiable persons, year after year.

## Under the Hood: One Platform, Two Faces

Building software for the general public while serving researchers demands a particular discipline: every feature must satisfy both audiences at once. The players expect a fluid, playful experience; the scientists expect clean, structured, exportable data. The architecture reflects this duality.

| Layer                   | Implementation                                                                                                                                    |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Content management      | [Drupal 7][Drupal] ([PHP][PHP] / [MySQL][MySQL])                                                                                                  |
| Custom theme            | AgeGuess sub-theme of the Business theme: [Bootstrap 3.2.0][Bootstrap], jQuery 1.11.1, Font Awesome 4.7.0, jQuery File Upload, [JpGraph][JpGraph] |
| Custom module           | AgeGuess: monitoring and watchdog alerting, analytics, photo-resize engine, photo-folder audits, security review, maintenance scripts             |
| Third-party integration | Social login (Facebook, Google), CAPTCHA, lightbox gallery                                                                                        |
| Compliance              | [CNIL][CNIL] declaration, cookie disclaimer, community reporting and moderation                                                                   |
{:.stretch-table}

Two components deserve a closer look, because they carry most of the project's identity: the custom theme that the players see, and the custom module that the scientists — and I — rely on.

### The Custom Theme: A Game That Must Feel Simple

The visible layer is a custom sub-theme of the Business theme, rebuilt around [Bootstrap 3.2.0][Bootstrap] with jQuery 1.11.1 and Font Awesome 4.7.0. Photo uploads rely on jQuery File Upload; the histogram of previous guesses that appears after each turn — a small but decisive feedback loop, as players immediately see how their own guess compares to the crowd — is rendered with [JpGraph][JpGraph]. A lightbox gallery lets users review their own photographs, and a cookie-disclaimer component manages consent on the front end.

The guiding principle was restraint: the science must never intrude on the fun, and the fun must never compromise the data.

### The Custom Module: The Unseen Machinery

The custom AgeGuess module is where the platform takes care of itself. It ships the maintenance scripts and monitoring tools that ten years of operation have proven necessary: watchdog monitoring with alerting on anomalies, analytics, a photo-resize engine that normalizes every uploaded image, recurring photo-folder audits that reconcile the file system with the database, security reviews, and structured SQL maintenance routines.

This is the unglamorous ninety percent of the work — invisible to the players, indispensable to the scientists.

### The Gamification Engine

To keep players contributing, the platform is set up as a simple online game. Guessing accurately earns points, and so does contributing photographs:

| Action                             | Points |
| :--------------------------------- | -----: |
| Exact age guess                    |     10 |
| 1–2 years off                      |      7 |
| 3–5 years off                      |      5 |
| 6–10 years off                     |      2 |
| More than 10 years off             |      1 |
| Each uploaded or linked photograph |     10 |

On their personal account page, players see their cumulative points, their number of guesses, and their proportion of fully accurate guesses; a public ranking lets them compare themselves by point score and by mean deviation from real ages. After each guess, the real age of the person, summary statistics of previous guesses, and a histogram appear — immediate feedback that turns a chore into a game.

<!-- space --> 

![AgeGuess Picture Upload Page](../assets/posts/2024-06-18-building-ageguess-drupal-citizen-science-upload-picture.png){:.lead loading="lazy"}

How the picture upload page looked on [AgeGuess][AgeGuess] (photographs are deliberately blurred to protect personal privacy).
{:.figcaption}

### The Queue Algorithm: Turning Players into a Sampling Engine

The heart of the scientific machinery is the algorithm that decides which photograph to display to which player. To be eligible, a picture must (1) not have been uploaded by the player themselves, (2) not have been guessed or already seen by them, and (3) not have been reported more than four times. The algorithm then sorts eligible pictures by ascending number of previous guesses, choosing randomly among ties; a skip button allows bypassing acquaintances, limited to four skips per session; the queue is renewed at each login.

The effect is deliberate. Perceived age is a noisy measure — a single guess tells you almost nothing, but the average of dozens of independent guesses is a robust observation. By steering every photograph towards a homogeneous number of guesses (a minimum of ten per image, and a median of forty-two at the time of the 2019 publication), the queue algorithm transforms scattered player behaviour into a statistically usable sampling design.

<!-- space --> 

![AgeGuess Guessing Page](../assets/posts/2024-06-18-building-ageguess-drupal-citizen-science-guessing.png){:.lead loading="lazy"}

How the guessing page looked on [AgeGuess][AgeGuess] (photographs are deliberately blurred to protect personal privacy).
{:.figcaption}

## Trust, Privacy, and Moderation: Engineering Consent

A platform that collects photographs of identifiable people — some of them minors, since the minimum account age is 14 — carries obligations that no amount of elegant code can replace with anything less than rigorous operational discipline.

The framework is strict. Users retain the copyright of their pictures; the photographs themselves are never published open-access, in line with EU privacy protection law, and can only be shared with researchers through formal bilateral data-sharing agreements. Registration requires email validation; a CAPTCHA keeps bots at bay; and a cookie-disclaimer component manages consent on the front end.

Moderation is crowdsourced. While guessing, players can report photographs across explicit categories — rotation needed, cropping needed, edited image, missing person, more than one person, copyright infringement, or offensive content. The team reviews reports and edits or deletes photographs accordingly, and the queue algorithm automatically removes any picture reported more than four times. A suite of countermeasures against malicious users completes the system; their full details are deliberately not documented, to keep would-be abusers at a disadvantage.

<!-- space --> 

![AgeGuess Moderation Page (Admin Side)](../assets/posts/2024-06-18-building-ageguess-drupal-citizen-science-moderation-admin-side.png){:.lead loading="lazy"}

How the moderation page looked on the admin side of [AgeGuess][AgeGuess] (photographs are deliberately blurred to protect personal privacy).
{:.figcaption}

## From Clicks to Open Data: The Data Pipeline

Every game action lands in a [MySQL][MySQL] database designed for one additional audience: researchers who were never supposed to become Drupal experts. The data were distributed as five CSV files, generated live from the database and downloadable by every registered user:

- **ag_guess** — the age guesses: who guessed, on which photograph, the guessed age, the deviation from the real age, and the timestamp.
- **ag_photos** — the photographs: demographics of the persons displayed (gender, ethnicity, birth country, birth year), their relation to the uploader, and the age at which the photograph was taken.
- **ag_gamers** — the players: guessing statistics and points, along with the same basic demographic information.
- **ag_quality** and **ag_report** — the community's quality assessments and reports, used mostly for internal moderation.

Before publication, a documented cleaning protocol removes outliers (guesses more than two standard deviations away from a photograph's mean guess), excludes photographs with fewer than ten guesses, and filters unrealistic birth years. The data are released under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0][CC BY-NC-SA 4.0] license, with an archived version deposited with the [UK Data Service][UK Data Service]. The result was a rare thing: a live, continuously updated scientific database, refreshed with every guess — and one that remains available to researchers to this day.

## Scientific Recognition: A Paper in Nature's Scientific Data

In October 2019, the project reached a milestone: the database was published as a peer-reviewed scientific data paper — Jones, J.A.B., Nash, U.W., Vieillefont, J. et al., *The AgeGuess database, an open online resource on chronological and perceived ages of people aged 5–100*, [Scientific Data 6, 246 (2019)][AgeGuess database paper]. I appear among the co-authors in my capacity as webpage and database expert — a reminder that in citizen science, the engineering is part of the method.

| Metric                   | Figure (spring 2019) |
| :----------------------- | -------------------: |
| Perceived age guesses    |             ~220,000 |
| Citizen scientists       |               ~4,500 |
| Countries of origin      |                 120+ |
| Photographs uploaded     |               ~4,700 |
| Birth cohorts spanned    |            1877–2012 |
| Age range in photographs |          5–100 years |
{:.stretch-table}

Citizen science data is often met with scepticism, and the paper settled the question with numbers: the standard deviation of the difference between perceived and chronological age in the AgeGuess data (6.9 years) is comparable to that of highly controlled laboratory studies (6–8 years). My favourite anecdote from the technical validation: a team of ten students at the University of Southern Denmark trained for weeks on the scientific literature to outguess the crowd — and failed to perform any differently from the site's players. The crowd, it turns out, is remarkably good at guessing ages.

## The Freelance Advantage: A Decade of Continuity

If this collaboration has lasted ten years, it is because it rests on the same foundations — stability, continuity, and trust — that I would later describe in my article about [seven years of collaboration with Danish universities][Funding Apps post]. A senior independent developer is, in effect, a Swiss army knife — and a citizen science project is precisely the kind of venture that needs one, because it cannot afford a full IT department, yet cannot afford downtime either.

1. **Full-stack ownership.** From the photo-resize engine to the ranking page, from the queue algorithm to the CSV exports, every layer of the platform has been carried by the same hands, year after year.
2. **Continuity of project history.** No turnover, no changing maintainers. Every resolved incident, every moderation decision, every architectural trade-off still lives in one place. Nothing is re-learned at the project's expense.
3. **Maintenance as a discipline.** The watchdog alerts, the folder audits, the security reviews — this unglamorous routine is what turns a website into a scientific instrument. Instruments are not merely built; they are maintained into existence.
4. **Knowledge as a compounding asset.** Ten years of observing how players behave, abuse, and cooperate have shaped every countermeasure and every algorithmic refinement. That accumulated knowledge is the platform's true foundation.

## The Legacy: A Closed Project, an Open Resource

Every research endeavour eventually confronts the reality of scientific funding. AgeGuess has now closed: after more than a decade of continuous data collection, the research budget that sustained the project was exhausted, and the core committee brought the adventure to an end. The final guesses have been made.

What remains is precisely what the project set out to produce. The database — more than 220,000 perceived age guesses on photographs spanning birth cohorts from 1877 to 2012 — remains available for download under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0][CC BY-NC-SA 4.0] license, with an archived version deposited with the [UK Data Service][UK Data Service]. The peer-reviewed data paper stands as the project's scientific testament, and the code base remains with the project for whoever wishes to study it — or to relaunch it.

So the invitation is no longer to play, but to build: download the data if research is your trade, cite the paper, and turn to advantage the resource that thousands of citizen scientists assembled together, one guess at a time.

Ten years. One platform. One developer. The proof that long-term, trust-based collaboration between an independent developer and a research community is not only viable — it leaves behind scientific resources of lasting value.

<!-- links -->

[AgeGuess database paper]: https://doi.org/10.1038/s41597-019-0245-9 "Jones, J.A.B., Nash, U.W., Vieillefont, J. et al. The AgeGuess database, an open online resource on chronological and perceived ages of people aged 5–100. Scientific Data 6, 246 (2019)"
[AgeGuess]: https://www.ageguess.org/ "AgeGuess.org — the citizen science project on human ageing"
[Bootstrap]: https://getbootstrap.com/docs/3.2/ "Bootstrap 3.2 documentation"
[CC BY-NC-SA 4.0]: https://creativecommons.org/licenses/by-nc-sa/4.0/ "Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International"
[CNIL]: https://www.cnil.fr/ "Commission nationale de l'informatique et des libertés"
[Drupal]: https://www.drupal.org/ "Drupal — the open source content management system"
[Funding Apps post]: https://www.jv-conseil.dev/blog/2026-10-27-funding-apps-danish-universities-7-years-collaboration/ "7 Years Building Funding Apps for Danish Universities"
[JpGraph]: https://jpgraph.net/ "JpGraph — PHP charting library"
[MySQL]: https://www.mysql.com/ "MySQL"
[PHP]: https://www.php.net/ "PHP"
[UK Data Service]: https://ukdataservice.ac.uk/ "UK Data Service"
[Uli]: https://www.linkedin.com/in/ulrich-steiner-78431449/ "Ulrich K. Steiner's LinkedIn profile"

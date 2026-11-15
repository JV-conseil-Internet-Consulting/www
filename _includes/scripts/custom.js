/* global DOMPurify */
/*!
 * Custom Scripts
 * Copyright (c) 2023 JV conseil <https://www.jv-conseil
 */

!(function () {
  'use strict';
  /**
   * Add target="_blank" to all external links
   */
  document.querySelectorAll("a[href^='http']").forEach(function (link) {
    /* console.debug('_link', link.href) */
    link.setAttribute('target', '_blank');
  });


  /**
   * mailto click
   */
  document.querySelectorAll('a[href^="mailto:"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      /* window.location = 'mailto:' + encodeURIComponent(link.dataset.mail) + '?subject=' + encodeURIComponent(link.dataset.subject) + '&body=' + encodeURIComponent("Hello " + SITE.title + ",\n\n...\n\nKind Regards,\n") */

      event.preventDefault();

      let email = link.getAttribute('href').trim();
      if (window.DOMPurify) email = window.DOMPurify.sanitize(email);
      email = email.replace(/mailto:/g, '');

      // console.debug("email ", email)

      let href = 'mailto:' + encodeURIComponent(email);
      href += '?subject=' + encodeURIComponent("Sent From JV conseil Website");
      href += '&body=' + encodeURIComponent("Hello JV conseil,\n\n...\n\nKind Regards,\n");

      // console.debug("link ", href)

      window.location = href;
    });
  });
})()

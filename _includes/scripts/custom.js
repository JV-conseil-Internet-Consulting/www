/* global $ */
/*!
 * Custom Scripts
 * Copyright (c) 2023 JV conseil <https://www.jv-conseil
 */
!(function () {
  'use strict';
  /**
   * Add target="'_blank" to all external links
   */
  $("a[href^='http']").each(function () {
    /* console.debug('_link', this.href); */
    $(this).attr('target', '_blank');
  });
})();

'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
  function (Menus) {
    // Add the articles dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Gestionar acuerdos',
      state: 'articles',
      type: 'dropdown'
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Ver acuerdos',
      state: 'articles.list',
      roles: ['user,secretaria','user']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'articles', {
      title: 'Crear acuerdo',
      state: 'articles.create',
      roles: ['secretaria']
    });
  }
]);

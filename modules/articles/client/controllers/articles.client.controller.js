'use strict';

// Articles controller
angular.module('articles').controller('ArticlesController', ['$scope', '$filter', '$stateParams', '$location', 'Authentication', 'Articles',
  function ($scope, $filter, $stateParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;

    // Create new Article
    $scope.create = function () {
      // Create new Article object
      var article = new Articles({
        sesion: this.sesion,
        title: this.title,
        content: this.content,
        mayorSummary: this.mayorSummary,
        chiefSummary: this.chiefSummary,
        contributorSummary: this.contributorSummary,
        department: this.department,
        sesionDate: this.sesionDate,
        firstDate: this.firstDate,
        lastDate: this.lastDate,
        file: this.file
      });

      // Redirect after save
      article.$save(function (response) {
        $location.path('articles/' + response._id);
        // Clear form fields
        $scope.sesion = '';
        $scope.title = '';
        $scope.content = '';
        $scope.mayorSummary = '';
        $scope.chiefSummary = '';
        $scope.contributorSummary = '';
        $scope.department = '';
        $scope.sesionDate = '';
        $scope.firstDate = '';
        $scope.lastDate = '';
        $scope.file = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    Articles.query(function (data) {
      $scope.articles = data;
      $scope.buildPager();
    });

    $scope.buildPager = function () {
      $scope.pagedItems = [];
      $scope.itemsPerPage = 3;
      $scope.currentPage = 1;
      $scope.figureOutItemsToDisplay();
    };

    $scope.figureOutItemsToDisplay = function () {
      $scope.filteredItems = $filter('filter')($scope.articles, {
        $: $scope.search
      });
      $scope.filterLength = $scope.filteredItems.length;
      var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
      var end = begin + $scope.itemsPerPage;
      $scope.pagedItems = $scope.filteredItems.slice(begin, end);
    };

    $scope.pageChanged = function () {
      $scope.figureOutItemsToDisplay();
    };

    // Remove existing Article
    $scope.remove = function (article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function () {
          $location.path('articles');
        });
      }
    };

    // Update existing Article
    $scope.update = function () {
      var article = $scope.article;

      article.$update(function () {
        $location.path('articles/' + article._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Articles
    $scope.find = function () {
      $scope.articles = Articles.query();
      $scope.buildPager();
    };

    // Find existing Article
    $scope.findOne = function () {
      $scope.article = Articles.get({
        articleId: $stateParams.articleId
      });
    };

    // Validate start date and end date
    $scope.validateDates = function () {
      var curDate = Date();
      if ($scope.sesionDate > curDate) {

      }
    }
  }
]);

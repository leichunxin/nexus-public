/*
 * Sonatype Nexus (TM) Open Source Version
 * Copyright (c) 2008-present Sonatype, Inc.
 * All rights reserved. Includes the third-party code listed at http://links.sonatype.com/products/nexus/oss/attributions.
 *
 * This program and the accompanying materials are made available under the terms of the Eclipse Public License Version 1.0,
 * which accompanies this distribution and is available at http://www.eclipse.org/legal/epl-v10.html.
 *
 * Sonatype Nexus (TM) Professional Version is available from Sonatype, Inc. "Sonatype" and "Sonatype Nexus" are trademarks
 * of Sonatype, Inc. Apache Maven is a trademark of the Apache Software Foundation. M2eclipse is a trademark of the
 * Eclipse Foundation. All other trademarks are the property of their respective owners.
 */
/*global Ext, NX*/

/**
 * URL related utils.
 *
 * @since 3.0
 */
Ext.define('NX.coreui.util.RepositoryUrls', {
  singleton: true,
  requires: [
    'NX.util.Url',
    'NX.Assert'
  ],
  
  mixins: {
    logAware: 'NX.LogAware'
  },

  /**
   * Strategies for building urls to download assets.
   *
   * @private
   */
  repositoryUrlStrategies: {
    maven2: function(assetModel) {
      var repositoryName = assetModel.get('repositoryName'),
          assetName = assetModel.get('name');
      return NX.util.Url.asLink(NX.util.Url.baseUrl + '/repository/' + repositoryName + assetName, assetName);
    },
    npm: function(assetModel) {
      var repositoryName = assetModel.get('repositoryName'),
          assetName = assetModel.get('name');
      return NX.util.Url.asLink(NX.util.Url.baseUrl + '/repository/' + repositoryName + '/' + assetName, assetName);
    },
    nuget: function(assetModel) {
      var repositoryName = assetModel.get('repositoryName'),
          assetName = assetModel.get('name'),
          attributes = assetModel.get('attributes'),
          version = attributes.nuget.version,
          path = '/' + assetName + '/' + version;
      return NX.util.Url.asLink(NX.util.Url.baseUrl + '/repository/' + repositoryName + path, path);
    },
    raw: function(assetModel) {
      var repositoryName = assetModel.get('repositoryName'),
          assetName = assetModel.get('name');
      return NX.util.Url.asLink(NX.util.Url.baseUrl + '/repository/' + repositoryName + '/' + assetName, assetName);
    },
    docker: function(assetModel) {
      var repositoryName = assetModel.get('repositoryName'),
          assetName = assetModel.get('name');
      return NX.util.Url.asLink(NX.util.Url.baseUrl + '/repository/' + repositoryName + assetName, assetName);
    }
  },

  /**
   * Add a strategy to build repository download links for a particular strategy.
   *
   * @public
   */
  addRepositoryUrlStrategy: function(format, strategy) {
    this.repositoryUrlStrategies[format] = strategy;
  },

  /**
   * Creates a link to an asset in a repository.
   *
   * @public
   * @param {Object} assetModel the asset to create a link for
   * @param {String} format the format of the repository storing this asset
   */
  asRepositoryLink: function(assetModel, format) {
    //<if assert>
    NX.Assert.assert(assetModel, 'Expected an assetModel with format: ' + format);
    //</if>
    //<if debug>
    this.logTrace('Creating link for format and asset:', format, assetModel.get('name'));
    //</if>

    var linkStrategy = this.repositoryUrlStrategies[format];
    return linkStrategy(assetModel);
  }

});

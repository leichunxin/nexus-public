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
package org.sonatype.nexus.blobstore.file.internal;

import java.io.File;

import org.sonatype.goodies.testsupport.TestSupport;

import org.junit.Test;
import org.mapdb.DB;
import org.mapdb.DBMaker;

/**
 * Trials of MapDB
 */
public class MapdbTrial
  extends TestSupport
{
  @Test
  public void createDatabase() throws Exception {
    File file = util.createTempFile("db");
    DB db = DBMaker.newFileDB(file).make();
    try {
      log("Database: {}, file: {}", db, file);
    }
    finally {
      db.close();
    }
  }
}

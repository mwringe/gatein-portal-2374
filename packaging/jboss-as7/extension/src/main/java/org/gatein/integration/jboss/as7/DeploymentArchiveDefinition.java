/*
 * JBoss, Home of Professional Open Source.
 * Copyright 2012, Red Hat, Inc., and individual contributors
 * as indicated by the @author tags. See the copyright.txt file in the
 * distribution for a full listing of individual contributors.
 *
 * This is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as
 * published by the Free Software Foundation; either version 2.1 of
 * the License, or (at your option) any later version.
 *
 * This software is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this software; if not, write to the Free
 * Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package org.gatein.integration.jboss.as7;

import org.jboss.as.controller.PathElement;
import org.jboss.as.controller.ReloadRequiredRemoveStepHandler;
import org.jboss.as.controller.SimpleAttributeDefinition;
import org.jboss.as.controller.SimpleAttributeDefinitionBuilder;
import org.jboss.as.controller.SimpleResourceDefinition;
import org.jboss.as.controller.registry.AttributeAccess;
import org.jboss.as.controller.registry.ManagementResourceRegistration;
import org.jboss.dmr.ModelNode;
import org.jboss.dmr.ModelType;

/**
 * @author Tomaz Cerar
 */
public class DeploymentArchiveDefinition extends SimpleResourceDefinition
{
   protected static final DeploymentArchiveDefinition INSTANCE = new DeploymentArchiveDefinition();

   protected static final SimpleAttributeDefinition MAIN =
      new SimpleAttributeDefinitionBuilder(Constants.MAIN, ModelType.BOOLEAN, true)
         .setAllowExpression(false)
         .setDefaultValue(new ModelNode(false))
         .setXmlName(Constants.MAIN)
         .setFlags(AttributeAccess.Flag.RESTART_ALL_SERVICES)
         .build();

   private DeploymentArchiveDefinition()
   {
      super(PathElement.pathElement(Constants.DEPLOYMENT_ARCHIVE),
         GateInExtension.getResourceDescriptionResolver(Constants.DEPLOYMENT_ARCHIVE),
         DeploymentArchiveAdd.INSTANCE, new ReloadRequiredRemoveStepHandler());
   }

   @Override
   public void registerAttributes(ManagementResourceRegistration resourceRegistration)
   {
      resourceRegistration.registerReadOnlyAttribute(MAIN, null);
   }
}

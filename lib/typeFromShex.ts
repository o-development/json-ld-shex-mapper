import { traverseShex, Schema } from "shexj-traverser";
import * as dom from "dts-dom";

function nameFromUri(uri: string): string {
  const splitUri = uri.split("/");
  return splitUri[splitUri.length - 1];
}

export default async function typeFromShex(shexSchema: Schema) {
  return traverseShex<
    dom.NamespaceDeclaration, // Schema return type
    undefined, // prefixes return type
    undefined, // SemAct return type
    dom.Type | dom.InterfaceDeclaration, // shapeExpr return type
    dom.InterfaceDeclaration[], // shapes return type
    string, // ShapesOr return type
    string, // ShapesAnd return type
    string, // ShapesNot return type
    string, // ShapeRef return type
    dom.Type, // NodeConstraint return type
    dom.InterfaceDeclaration, // Shape return type
    string, // valueSetValue return type
    dom.InterfaceDeclaration | dom.PropertyDeclaration, // tripleExpr return type
    undefined, // Annotation return type
    dom.InterfaceDeclaration, // EachOf return type
    dom.InterfaceDeclaration, // OneOf return type
    dom.PropertyDeclaration, // TripleConstraint return type
    string, // ObjectLiteral return type
    string, // IriStem return type
    string, // IriStemRange return type
    string, // LiteralStem return type
    string, // LiteralStemRange return type
    string, // Language return type
    string, // LanguageStem return type
    string, // LanguageStemRange return type
    { name?: string; comment?: string }, // Annotations return type
    string // SemActs return type
  >(shexSchema, {
    Schema: async (schema, transformmedChildren) => {
      const namespaceName = schema.base ? nameFromUri(schema.base) : "schema";
      const namespace = dom.create.namespace(namespaceName);
      if (transformmedChildren.shapes) {
        namespace.members.push(...transformmedChildren.shapes);
      }
      return namespace;
    },
    shapeExpr: async (shapeExpr, transformmedChild) => {
      if (typeof transformmedChild === "string") {
        throw new Error("Cannot handle strings for shapeExpr");
      }
      if (
        (transformmedChild as dom.InterfaceDeclaration).kind &&
        (transformmedChild as dom.InterfaceDeclaration).kind === "interface"
      ) {
        return transformmedChild as dom.InterfaceDeclaration;
      }
      return transformmedChild as dom.Type;
    },
    shapes: async (shapes, transformmedChildren) => {
      const values = Object.values(transformmedChildren);
      return values.filter(
        (value) =>
          (value as dom.InterfaceDeclaration).kind &&
          (value as dom.InterfaceDeclaration).kind === "interface"
      ) as dom.InterfaceDeclaration[];
    },
    Shape: async (shape, transformmed, parentStack) => {
      let intf: dom.InterfaceDeclaration;
      let interfaceName: string;
      const parent = parentStack.find((p) => p.type === "shapes");
      if (parent && parent.via) {
        interfaceName = nameFromUri(parent.via);
      } else if (transformmed.annotations?.name) {
        interfaceName = transformmed.annotations.name;
      } else {
        interfaceName = "UnknownInterfaceName";
      }
      if (
        transformmed.expression &&
        transformmed.expression.kind === "interface"
      ) {
        intf = transformmed.expression;
      } else if (transformmed.expression) {
        throw new Error("Cannot handle ");
      } else {
        intf = dom.create.interface(interfaceName);
      }
      if (transformmed.annotations?.comment) {
        intf.jsDocComment = transformmed.annotations.comment;
      }
      return intf;
    },
    Annotations: async (annotations) => {
      let comment: string | undefined;
      let name: string | undefined;
      annotations.forEach((annotation) => {
        if (
          annotation.predicate ===
          "http://www.w3.org/2000/01/rdf-schema#comment"
        ) {
          if (typeof annotation.object === "string") {
            comment = annotation.object;
          } else if (
            annotation.object.value &&
            annotation.object.value === "string"
          ) {
            comment = annotation.object.value;
          }
        } else if (
          annotation.predicate === "http://www.w3.org/2000/01/rdf-schema#label"
        ) {
          if (typeof annotation.object === "string") {
            name = annotation.object;
          } else if (
            annotation.object.value &&
            annotation.object.value === "string"
          ) {
            name = annotation.object.value;
          }
        }
      });
      return { name, comment };
    },
    tripleExpr: async (tripleExpr, transfromedChildren) => {
      if (typeof transfromedChildren === "string") {
        throw new Error("String tripleExpr not implemented");
      }
      return transfromedChildren;
    },
    EachOf: async (eachOf, transformedChildren, parentStack) => {
      const shapesVia = parentStack.find((p) => p.type === "shapes")?.via;
      const interfaceName =
        transformedChildren.annotations?.name || shapesVia
          ? nameFromUri(shapesVia as string)
          : "UnknownInterfaceName";
      const intf = dom.create.interface(interfaceName);
      if (transformedChildren?.annotations?.comment) {
        intf.jsDocComment = transformedChildren.annotations.comment;
      }
      transformedChildren.expressions?.forEach((child) => {
        if (child.kind === "interface") {
          throw new Error("Cannot handle interface in EachOf");
        } else {
          intf.members.push(child);
        }
      });
      return intf;
    },
    OneOf: async (oneOf, transfromedChildren) => {
      throw new Error("Not Implemented");
    },
    TripleConstraint: async (tripleConstraint, transformedChildren) => {
      const propertyName = nameFromUri(tripleConstraint.predicate);
      if (!transformedChildren.valueExpr) {
        throw new Error("Cannot handle ");
      }
      const property = dom.create.property(
        propertyName,
        transformedChildren.valueExpr
      );
      return property;
    },
    NodeConstraint: async (nodeConstraint, transformedChildren) => {
      if (nodeConstraint.datatype) {
        switch (nodeConstraint.datatype) {
          case "http://www.w3.org/2001/XMLSchema#string":
            return dom.type.string;
          case "http://www.w3.org/2001/XMLSchema#dateTime":
            return dom.type.string;
        }
      }
      return dom.type.string;
    }
  });
}

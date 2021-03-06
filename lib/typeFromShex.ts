import { traverseShex } from "shexj-traverser";
import 
import * as dom from "dts-dom";

function nameFromUri(uri: string): string {
  const splitUri = uri.split("/");
  return splitUri[splitUri.length - 1];
}

export default async function typeFromShex(shexSchema: Schema) {
  return traverseShex<
    // Base Return value generics
    dom.NamespaceDeclaration, // Schema return type
    string, // ShapeOr return type
    string, // ShapeAnd return type
    string, // ShapeNot return type
    string, // ShapeExternal return type
    string, // NodeConstraint return type
    string, // ObjectLiteral return type
    string, // IriStem retrun type
    string, // IriStemRange return type
    string, // LiteralStem return type
    string, // LiteralStemRange return type
    string, // Language return type
    string, // LanguageStem return type
    string, // LanguageStemRange return type
    string, // Wildcard return type
    dom.InterfaceDeclaration, // Shape return type
    string, // EachOf return type
    string, // OneOf return type
    string, // TripleConstraint return type
    string, // SemAct return type
    string, // Annotation return type
    // Return types for constructed types
    string, // shapeExpr return type
    string, // valueSetValue return type
    string, // tripleExpr return type
    // Return specific field values
    undefined, // Schema_startActs return type
    undefined, // Schema_start return type
    dom.NamespaceMember[], // Schema_shapes return type
    string, // ShapeOr_shapeExprs return type
    string, // ShapeAnd_shapeExprs return type
    string, // ShapeNot_shapeExpr return type
    string, // NodeConstraint_values return type
    string, // IriStemRange_exclusions return type
    string, // LiteralStemRange_exclusions return type
    string, // LanguageStemRange_exclusions return type
    string, // Shape_expression return type
    string, // Shape_semActs return type
    string, // Shape_Annotations return type
    string, // EachOf_expressions return type
    string, // EachOf_semActs return type
    string, // EachOf_Annotations return type
    string, // OneOf_expressions return type
    string, // OneOf_semActs return type
    string, // OneOf_Annotations return type
    string, // TripleConstraint_valueExpr return type
    string, // TripleConstraint_semActs return type
    string  // TripleConstraint_Annotations return type
  >(shexSchema, {
    Schema: async (schema, transformedChildren): Promise<dom.NamespaceDeclaration> => {
      const namespace = dom.create.namespace("placeholder");
      if (transformedChildren.shapes) {
        namespace.members.concat(transformedChildren.shapes);
      }
      return namespace;
    },
    ShapeOr: async (
      shapeOr,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `ShapeOr(${transformedChildren.shapeExprs})`;
    },
    ShapeAnd: async (
      shapeAnd,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `ShapeAnd(${transformedChildren.shapeExprs})`;
    },
    ShapeNot: async (
      shapeNot,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `ShapeNot(${transformedChildren.shapeExpr})`;
    },
    ShapeExternal: async (shapeExternal, parentStack): Promise<string> => {
      return `ShapeExternal`;
    },
    NodeConstraint: async (
      nodeConstraint,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `NodeConstraint(${transformedChildren.values})`;
    },
    ObjectLiteral: async (objectLiteral, parentStack): Promise<string> => {
      return `ObjectLiteral`;
    },
    IriStem: async (iriStem, parentStack): Promise<string> => {
      return `IriStem`;
    },
    IriStemRange: async (
      iriStemRange,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `IriStemRange(${transformedChildren.exclusions})`;
    },
    LiteralStem: async (literalStem, parentStack): Promise<string> => {
      return `LiteralStem`;
    },
    LiteralStemRange: async (
      literalStemRange,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `LiteralStemRange(${transformedChildren.exclusions})`;
    },
    Language: async (language, parentStack): Promise<string> => {
      return `Language`;
    },
    LanguageStem: async (languageStem, parentStack): Promise<string> => {
      return `LanguageStem`;
    },
    LanguageStemRange: async (
      languageStemRange,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `LanguageStemRange(${transformedChildren.exclusions})`;
    },
    Wildcard: async (wildcard, parentStack): Promise<string> => {
      return `Wildcard`;
    },
    Shape: async (
      shape,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `Shape(${transformedChildren.expression},${transformedChildren.semActs},${transformedChildren.annotations})`;
    },
    EachOf: async (
      eachOf,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `EachOf(${transformedChildren.expressions},${transformedChildren.semActs},${transformedChildren.annotations})`;
    },
    OneOf: async (
      eachOf,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `OneOf(${transformedChildren.expressions},${transformedChildren.semActs},${transformedChildren.annotations})`;
    },
    TripleConstraint: async (
      tripleConstraint,
      transformedChildren,
      parentStack
    ): Promise<string> => {
      return `TripleConstraint(${transformedChildren.valueExpr},${transformedChildren.semActs},${transformedChildren.annotations})`;
    },
    SemAct: async (wildcard, parentStack): Promise<string> => {
      return `SemAct`;
    },
    Annotation: async (wildcard, parentStack): Promise<string> => {
      return `Annotation`;
    },
    shapeExpr: async (
      shapeExpr,
      transformedSelf,
      parentStack
    ): Promise<string> => {
      return `shapeExpr(${transformedSelf})`;
    },
    valueSetValue: async (
      valueSetValue,
      transformedSelf,
      parentStack
    ): Promise<string> => {
      return `valueSetValue(${transformedSelf})`;
    },
    tripleExpr: async (
      tripleExpr,
      transformedSelf,
      parentStack
    ): Promise<string> => {
      return `tripleExpr(${transformedSelf})`;
    },
    Schema_startActs: async (
      semActs,
      transformed,
      parentStack
    ): Promise<undefined> => {
      return undefined;
    },
    Schema_start: async (
      shapeExpr,
      transformed,
      parentStack
    ): Promise<undefined> => {
      return undefined;
    },
    Schema_shapes: async (
      shapes,
      transformed,
      parentStack
    ): Promise<dom.NamespaceMember> => {
      return `Schema_shapes(${transformed})`;
    },
    ShapeOr_shapeExprs: async (
      shapeExprs,
      transformed,
      parentStack
    ): Promise<string> => {
      return `ShapeOr_shapeExprs(${transformed})`;
    },
    ShapeAnd_shapeExprs: async (
      shapeExprs,
      transformed,
      parentStack
    ): Promise<string> => {
      return `ShapeAnd_shapeExprs(${transformed})`;
    },
    ShapeNot_shapeExpr: async (
      shapeExpr,
      transformed,
      parentStack
    ): Promise<string> => {
      return `ShapeNot_shapeExpr(${transformed})`;
    },
    NodeConstraint_values: async (
      values,
      transformed,
      parentStack
    ): Promise<string> => {
      return `NodeConstraint_values(${transformed})`;
    },
    IriStemRange_exclusions: async (
      exclusions,
      transformed,
      parentStack
    ): Promise<string> => {
      return `IriStemRange_exclusions(${transformed})`;
    },
    LiteralStemRange_exclusions: async (
      exclusions,
      transformed,
      parentStack
    ): Promise<string> => {
      return `LiteralStemRange_exclusions(${transformed})`;
    },
    LanguageStemRange_exclusions: async (
      exclusions,
      transformed,
      parentStack
    ): Promise<string> => {
      return `LanguageStemRange_exclusions(${transformed})`;
    },
    Shape_expression: async (
      expression,
      transformed,
      parentStack
    ): Promise<string> => {
      return `Shape_expression(${transformed})`;
    },
    Shape_semActs: async (
      semActs,
      transformed,
      parentStack
    ): Promise<string> => {
      return `Shape_semActs(${transformed})`;
    },
    Shape_Annotations: async (
      annotations,
      transformed,
      parentStack
    ): Promise<string> => {
      return `Shape_Annotations(${transformed})`;
    },
    EachOf_expressions: async (
      expressions,
      transformed,
      parentStack
    ): Promise<string> => {
      return `EachOf_expressions(${transformed})`;
    },
    EachOf_semActs: async (
      semActs,
      transformed,
      parentStack
    ): Promise<string> => {
      return `EachOf_semActs(${transformed})`;
    },
    EachOf_Annotations: async (
      annotations,
      transformed,
      parentStack
    ): Promise<string> => {
      return `EachOf_Annotations(${transformed})`;
    },
    OneOf_expressions: async (
      expressions,
      transformed,
      parentStack
    ): Promise<string> => {
      return `OneOf_expressions(${transformed})`;
    },
    OneOf_semActs: async (
      semActs,
      transformed,
      parentStack
    ): Promise<string> => {
      return `OneOf_semActs(${transformed})`;
    },
    OneOf_Annotations: async (
      annotations,
      transformed,
      parentStack
    ): Promise<string> => {
      return `OneOf_Annotations(${transformed})`;
    },
    TripleConstraint_valueExpr: async (
      valueExpr,
      transformed,
      parentStack
    ): Promise<string> => {
      return `TripleConstraint_valueExpr(${transformed})`;
    },
    TripleConstraint_semActs: async (
      semActs,
      transformed,
      parentStack
    ): Promise<string> => {
      return `TripleConstraint_valueExpr(${transformed})`;
    },
    TripleConstraint_Annotations: async (
      annotations,
      transformed,
      parentStack
    ): Promise<string> => {
      return `TripleConstraint_Annotations(${transformed})`;
    },
  });
}

const animalIntf = dom.create.interface("Animal");
const catIntf = dom.create.interface("Cat");
catIntf.baseTypes = [ animalIntf ];

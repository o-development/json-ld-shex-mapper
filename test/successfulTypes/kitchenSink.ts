import { JsonLdDocument } from "jsonld";

export declare namespace kitchenSinkTypes {
  export type S1 = {
    type?: "Issue";
    /**
     * the sit
     */
    State: string;
    // Question: Should I just ignore the IRI in shape
    // By linking shapes directly that sets up circular
    // dependencies, which have benefits in usability but
    // not in strigifying.
    reportedBy: UserShape;
    // Do we use a JS date or a string. I like JS date to
    // denote the type.
    reportedOn: string;
    // How should this work? I can split it into a "nested" object
    // But, there's no information on what to name the field.
    eachOfPlaceholder?: {
      // Is it okay to ignore the "Non Literal" part?
      reproducedBy: EmployeeShape;
      reproducedOn: string;
    };
    // Should we require an empty array if there are 0 objects,
    // or is it okay to make this field optional?
    related?: S1[];
  } & JsonLdDocument;

  export type UserShape = {
    mbox: string;
    id: IDShape;
  } & ({ name: string } | { givenName: string[]; familyName: string }) &
    JsonLdDocument;

  export type EmployeeShape = {
    givenName: string[];
    familyName: string;
    // Why is phone an IRI?
    phone?: string[];
    mbox?: string;
  } & JsonLdDocument;

  // NOTE: When it has an id, make it a separate object
  type IDShapeE =
    | {
        // Does node kind: "literal" translates to string? It could
        // translate to "string | number | boolean"
        code: string;
        system: string;
        // Does not represent language or type. Is that a problem?
        literal: (
          "a" |
          { "@value": "b", "@type": "http://ex.example/#c" } |
          { "@value": "c", "@language": "en" } |
          { "@value": "d", "@language": "fr-en" }
        )[];
        // Should this be "unknown" or "any." "any" is bad practice.
        misc: unknown;
      }
    | {
        ref: true | false;
        // How should inverse be named? Like this?
        miscRef_inverse: unknown;
        issues?: S1[];
        seeAlso?: S1[];
        says?: EmployeeShape[];
      };

  export type IDShape = IDShapeE & JsonLdDocument;

  // To satisfy the "extra" properties, we need to turn code and
  // system into arrays. The best way to do that is by duplicating
  // the type. The question is, is duplicating bad?
  export type FooIdShape = (
    | {
        // With "extra" you could add anything.
        code: (string | any)[];
        system: (string | any)[];
        literal: ("a" | "b" | "c" | "d")[];
        misc: unknown;
      }
    | {
        ref: true | false;
        miscRef_inverse: unknown;
        issues?: S1[];
        seeAlso?: S1[];
        says?: EmployeeShape[];
      }
  ) &
    JsonLdDocument;
}

export const kitchenSinkJsonLd: kitchenSinkTypes.S1 = {
  "@context": {
    type: {
      "@id": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
      "@type": "@id",
    },
    Issue: "http://ex.example/#Issue",
    State: {
      "@id": "http://ex.example/#state",
      "@type": "@id",
    },
    reportedBy: {
      "@id": "http://ex.example/#reportedBy",
      "@type": "@id",
    },
    reportedOn: {
      "@id": "http://ex.example/#reportedOn",
      "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
    },
    eachOfPlaceholder: "@nest",
    reproducedBy: {
      "@id": "http://ex.example/#reproducedBy",
      "@type": "@id",
      "@nest": "eachOfPlaceholder",
    },
    reproducedOn: {
      "@id": "http://ex.example/#reproducedOn",
      "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
      "@nest": "eachOfPlaceholder",
    },
    related: {
      "@id": "http://ex.example/#related",
      "@type": "@id",
    },
  },
  "@id": "https://example.com/issue_instance",
  type: "Issue",
  State: "http://ex.example/#state_stage",
  reportedBy: {
    "@context": {
      name: {
        "@id": "http://xmlns.com/foaf/name",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      givenName: {
        "@id": "http://xmlns.com/foaf/givenName",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
        "@container": "@set",
      },
      familyName: {
        "@id": "http://xmlns.com/foaf/familyName",
        "@type": "http://www.w3.org/2001/XMLSchema#string",
      },
      mbox: {
        "@id": "http://xmlns.com/foaf/mbox",
        "@type": "@id",
      },
      id: {
        "@id": "http://ex.example/#id",
        "@type": "@id",
      },
    },
    "@id": "https://example.com/jinx_mcboingo",
    name: "Jinx McBoingo",
    mbox: "mailto:jinx@mcboingo.com",
    id: {
      "@context": {
        code: {
          "@id": "http://ex.example/#code",
        },
        system: {
          "@id": "http://ex.example/#system",
          "@type": "@id",
        },
        literal: {
          "@id": "http://ex.example/#literal",
          "@container": "@set",
        },
        misc: "http://ex.example/#misc",
      },
      code: "some_code",
      system: "https://example.com/system",
      literal: [ "a", { "@value": "c", "@language": "en" } ],
      misc: {},
    },
  },
  reportedOn: "2021-06-01T18:42:26Z",
  eachOfPlaceholder: {
    reproducedBy: {
      "@context": {
        givenName: {
          "@id": "http://xmlns.com/foaf/givenName",
          "@type": "http://www.w3.org/2001/XMLSchema#string",
          "@container": "@set",
        },
        familyName: {
          "@id": "http://xmlns.com/foaf/familyName",
          "@type": "http://www.w3.org/2001/XMLSchema#string",
        },
        phone: {
          "@id": "http://xmlns.com/foaf/phone",
          "@type": "@id",
          "@container": "@set",
        },
        mbox: {
          "@id": "http://xmlns.com/foaf/mbox",
          "@type": "@id",
        },
      },
      givenName: ["BingBong"],
      familyName: "DingDong",
      phone: ["tel:404-439-0398"],
      mbox: "mailto:bingbong@dingdong.com",
    },
    reproducedOn: "2021-06-01T18:42:26Z",
  },
};


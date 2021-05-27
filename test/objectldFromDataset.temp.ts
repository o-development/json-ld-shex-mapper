import { createDataset } from "o-dataset-pack";
import { quad, namedNode, literal } from "@rdfjs/data-model";
import { objectldFromDataset } from "../lib";

const schema = {
  "type": "Schema",
  "base": "https://shaperepo.com/schemas/longChat",
  "@context": "http://www.w3.org/ns/shex.jsonld",
  "prefixes": {
    "srs": "https://shaperepo.com/schemas/longChat#",
    "xsd": "http://www.w3.org/2001/XMLSchema#",
    "mee": "http://www.w3.org/ns/pim/meeting#",
    "purl": "http://purl.org/dc/elements/1.1/",
    "flow": "http://www.w3.org/2005/01/wf/flow#",
    "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    "ns": "http://rdfs.org/sioc/ns#",
    "terms": "http://purl.org/dc/terms/",
    "foaf": "http://xmlns.com/foaf/0.1/",
    "ic": "http://www.w3.org/2002/12/cal/ical#",
    "ui": "http://www.w3.org/ns/ui#"
  },
  "shapes": {
    "https://shaperepo.com/schemas/longChat#ChatShape": {
      "type": "Shape",
      "expression": {
        "type": "EachOf",
        "expressions": [
          {
            "type": "TripleConstraint",
            "predicate": "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
            "valueExpr": {
              "type": "NodeConstraint",
              "values": [
                "http://www.w3.org/ns/pim/meeting#LongChat"
              ]
            },
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "Defines the type of the chat as a LongChat"
                }
              }
            ]
          },
          {
            "type": "TripleConstraint",
            "predicate": "http://purl.org/dc/elements/1.1/author",
            "valueExpr": {
              "type": "NodeConstraint",
              "nodeKind": "iri"
            },
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "The WebId of the entity that created this chat"
                }
              }
            ]
          },
          {
            "type": "TripleConstraint",
            "predicate": "http://purl.org/dc/elements/1.1/created",
            "valueExpr": {
              "type": "NodeConstraint",
              "datatype": "http://www.w3.org/2001/XMLSchema#dateTime"
            },
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "The date and time the chat was created"
                }
              }
            ]
          },
          {
            "type": "TripleConstraint",
            "predicate": "http://purl.org/dc/elements/1.1/title",
            "valueExpr": {
              "type": "NodeConstraint",
              "datatype": "http://www.w3.org/2001/XMLSchema#string"
            },
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "The title of the chat"
                }
              }
            ]
          },
          {
            "type": "TripleConstraint",
            "predicate": "http://www.w3.org/2005/01/wf/flow#participation",
            "valueExpr": {
              "type": "ShapeRef",
              "reference": "https://shaperepo.com/schemas/longChat#ChatParticipationShape"
            },
            "min": 0,
            "max": -1,
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "A list of people participating in this chat"
                }
              }
            ]
          },
          {
            "type": "TripleConstraint",
            "predicate": "http://www.w3.org/ns/ui#sharedPreferences",
            "valueExpr": {
              "type": "NodeConstraint",
              "nodeKind": "iri"
            },
            "min": 0,
            "max": 1,
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "Chat preferences"
                }
              }
            ]
          }
        ]
      },
      "extra": [
        "http://www.w3.org/1999/02/22-rdf-syntax-ns#type"
      ]
    },
    "https://shaperepo.com/schemas/longChat#ChatParticipationShape": {
      "type": "Shape",
      "expression": {
        "type": "EachOf",
        "expressions": [
          {
            "type": "TripleConstraint",
            "predicate": "http://www.w3.org/2002/12/cal/ical#dtstart",
            "valueExpr": {
              "type": "NodeConstraint",
              "datatype": "http://www.w3.org/2001/XMLSchema#dateTime"
            },
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "The date and time this individual began participating in the chat."
                }
              }
            ]
          },
          {
            "type": "TripleConstraint",
            "predicate": "http://www.w3.org/2005/01/wf/flow#participant",
            "valueExpr": {
              "type": "NodeConstraint",
              "nodeKind": "iri"
            },
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "The WebId of the participant"
                }
              }
            ]
          },
          {
            "type": "TripleConstraint",
            "predicate": "http://www.w3.org/ns/ui#backgroundColor",
            "valueExpr": {
              "type": "NodeConstraint",
              "datatype": "http://www.w3.org/2001/XMLSchema#string"
            },
            "min": 0,
            "max": 1,
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "The background color of the participant's chat bubbles"
                }
              }
            ]
          }
        ]
      }
    },
    "https://shaperepo.com/schemas/longChat#ChatMessageListShape": {
      "type": "Shape",
      "expression": {
        "type": "TripleConstraint",
        "predicate": "http://www.w3.org/2005/01/wf/flow#message",
        "valueExpr": {
          "type": "ShapeRef",
          "reference": "https://shaperepo.com/schemas/longChat#ChatMessageShape"
        },
        "min": 0,
        "max": -1,
        "annotations": [
          {
            "type": "Annotation",
            "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
            "object": {
              "value": "A list of messages in the chat"
            }
          }
        ]
      }
    },
    "https://shaperepo.com/schemas/longChat#ChatMessageShape": {
      "type": "Shape",
      "expression": {
        "type": "EachOf",
        "expressions": [
          {
            "type": "TripleConstraint",
            "predicate": "http://purl.org/dc/terms/created",
            "valueExpr": {
              "type": "NodeConstraint",
              "datatype": "http://www.w3.org/2001/XMLSchema#dateTime"
            },
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "The date and time this message was posted."
                }
              }
            ]
          },
          {
            "type": "TripleConstraint",
            "predicate": "http://rdfs.org/sioc/ns#content",
            "valueExpr": {
              "type": "NodeConstraint",
              "datatype": "http://www.w3.org/2001/XMLSchema#string"
            },
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "The text content of the message"
                }
              }
            ]
          },
          {
            "type": "TripleConstraint",
            "predicate": "http://xmlns.com/foaf/0.1/maker",
            "valueExpr": {
              "type": "NodeConstraint",
              "nodeKind": "iri"
            },
            "annotations": [
              {
                "type": "Annotation",
                "predicate": "http://www.w3.org/2000/01/rdf-schema#comment",
                "object": {
                  "value": "The WebId of the person who sent the message."
                }
              }
            ]
          }
        ]
      }
    }
  },
  "http://www%2Ew3%2Eorg/2000/01/rdf-schema#label": "long chat"
};

interface Profile {
  type: ["foafPerson", "schemPerson"],
  fn?: string;
  name?: string;
  
}

interface LongChatMessage {
  created: Date;
  content: string;
  maker: Profile;
}


describe("jsonldFromDataset", () => {
  it("Does a thing", () => {
    const testDataset = createDataset(
      `
      @prefix : <#>.
      @prefix terms: <http://purl.org/dc/terms/>.
      @prefix XML: <http://www.w3.org/2001/XMLSchema#>.
      @prefix n: <http://rdfs.org/sioc/ns#>.
      @prefix n0: <http://xmlns.com/foaf/0.1/>.
      @prefix c: </profile/card#>.
      @prefix ter: <https://liqid.chat/terms/>.
      @prefix ind: <../../../index.ttl#>.
      @prefix flow: <http://www.w3.org/2005/01/wf/flow#>.

      :59d36100-e627-44bd-9bcc-440957c3d6a9
          terms:created "2021-04-27T19:00:12.890Z"^^XML:dateTime;
          n:content
              """Where you could mute a chat for a period of time""";
          n0:maker c:me;
          ter:liqidChatSignedCredential
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWtlciI6Imh0dHBzOi8vamFja3Nvbi5zb2xpZGNvbW11bml0eS5uZXQvcHJvZmlsZS9jYXJkI21lIiwidGltZUNyZWF0ZWQiOiIyMDIxLTA0LTI3VDE5OjAwOjEyLjg5MFoiLCJjb250ZW50Ijp7InRleHQiOlsiPiBXaGVyZSB5b3UgY291bGQgbXV0ZSBhIGNoYXQgZm9yIGEgcGVyaW9kIG9mIHRpbWVcblxuSGkhIl19LCJpYXQiOjE2MTk1NTAwMTN9.vX-ZDPuSJHzo_uE9nejSlURZ1ZCVIxGxI9SPAB4K8ZE".
      ind:this flow:message :59d36100-e627-44bd-9bcc-440957c3d6a9 .
    `,
      {
        baseURI:
          "https://jackson.solidcommunity.net/IndividualChats/jackson.solidcommunity.net/2021/04/27/chat.ttl",
      }
    );
    const result = objectldFromDataset(
      testDataset,
      namedNode(
        "https://jackson.solidcommunity.net/IndividualChats/jackson.solidcommunity.net/index.ttl#this"
      ),
      {

      }
    );

    console.log(result);
  });
});

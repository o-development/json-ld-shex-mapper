import {
  kitchenSinkTypes,
  kitchenSinkJsonLd,
} from "./successfulTypes/kitchenSink";
import { serializedToDataset } from "o-dataset-pack";
import { default as kitchenSinkShexJ } from "shex-test/schemas/kitchenSink.json";
import ShexValidator from "@shexjs/validator";
import ShexUtil from "@shexjs/util";
import { Store } from "n3";

describe("Kitchen Sink Tests", () => {
  it("uses valid test data to perform tests", async () => {
    const dataset = await serializedToDataset(
      JSON.stringify(kitchenSinkJsonLd),
      { format: "application/json-ld" }
    );
    // Need to convert things into n3 store becaust that's what shex takes.
    const n3Store = new Store();
    dataset.forEach((quad) => {
      n3Store.add(quad);
    })
    const validator = ShexValidator.construct(kitchenSinkShexJ, ShexUtil.rdfjsDB(n3Store), { results: "api" });
    const result = validator.validate([{ node: "https://example.com/issue_instance", shape: "http://ex.example/S1" }]);

    expect(result[0].status === "conformant")
  });
});

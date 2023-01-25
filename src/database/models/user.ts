import { Field, PrimaryKey, TigrisCollection, TigrisDataTypes } from "@tigrisdata/core";

@TigrisCollection("user")
export class User {
  @PrimaryKey(TigrisDataTypes.STRING, { order: 1 })
  userId: string;

  @Field(TigrisDataTypes.STRING)
  apiKey: string;

  @Field(TigrisDataTypes.INT64)
    created: number;
}

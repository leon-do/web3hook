import { Field, PrimaryKey, TigrisCollection, TigrisDataTypes } from "@tigrisdata/core";

@TigrisCollection("user")
export class User {
  @PrimaryKey(TigrisDataTypes.STRING, { order: 1 })
  id: string;

  @Field(TigrisDataTypes.INT64)
  credits: number;
}

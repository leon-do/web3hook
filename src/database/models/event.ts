import { Field, PrimaryKey, TigrisCollection, TigrisDataTypes } from "@tigrisdata/core";

@TigrisCollection("event")
export class Event {
  @PrimaryKey(TigrisDataTypes.STRING, { order: 1 })
  webhookUrl: string;

  @Field(TigrisDataTypes.STRING)
  userId: string;

  @Field(TigrisDataTypes.INT64)
  chainId: number;

  @Field(TigrisDataTypes.STRING)
  address: string;

  @Field(TigrisDataTypes.STRING)
  abi: string;
}

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
  fromAddress: string;

  @Field(TigrisDataTypes.STRING)
  toAddress: string;

  @Field(TigrisDataTypes.STRING)
  contractAddress: string;

  @Field(TigrisDataTypes.STRING)
  eventName: string;
}

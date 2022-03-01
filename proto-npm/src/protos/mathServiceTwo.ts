/* eslint-disable */
import { Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";

export const protobufPackage = "math2";

export interface NumberArray2 {
  data2: number[];
}

export interface SumOfNumberArray2 {
  sum2: number;
}

export interface MathServiceTwo {
  accumulate(
    request: NumberArray2,
    metadata?: Metadata
  ): Observable<SumOfNumberArray2>;
}

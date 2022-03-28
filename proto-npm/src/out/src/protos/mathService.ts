/* eslint-disable */
import { Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";

export const protobufPackage = "math";

export interface NumberArray {
  data: number[];
}

export interface SumOfNumberArray {
  sum: number;
}

export interface MathService {
  accumulate(
    request: NumberArray,
    metadata?: Metadata
  ): Observable<SumOfNumberArray>;
}

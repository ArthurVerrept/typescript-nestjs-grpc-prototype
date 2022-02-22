/* eslint-disable */
import { Observable } from "rxjs";
import { Metadata } from "@grpc/grpc-js";
import { Empty } from "../google/protobuf/empty";

export const protobufPackage = "math";

export interface NumberArray {
  data: number[];
}

export interface SumOfNumberArray {
  sum: number;
}

export interface AuthUrl {
  url: string;
}

export interface MathService {
  accumulate(
    request: NumberArray,
    metadata?: Metadata
  ): Observable<SumOfNumberArray>;
  /** https://stackoverflow.com/questions/28876725/can-protobuf-service-method-return-primitive-type */
  generateAuthUrl(request: Empty, metadata?: Metadata): Observable<AuthUrl>;
}

import type { Base64String } from 'nat-types/common';

type WasmBase64 = { wasmBase64: Base64String; wasmBytes?: never };
type WasmBytes = { wasmBase64?: never; wasmBytes: Uint8Array };

export type DeployContractActionParams = WasmBase64 | WasmBytes;

export type DeployContractAction = {
  type: 'DeployContract';
  params: DeployContractActionParams;
};

export type NativeDeployContractAction = {
  deployContract: {
    code: Uint8Array;
  };
};

import type { Base58String } from 'nat-types/common/common';

export type Ed25519Curve = 'ed25519';
export type Secp256k1Curve = 'secp256k1';
export type Curve = Ed25519Curve | Secp256k1Curve;

export type Ed25519CurveString = `${Ed25519Curve}:${Base58String}`;
export type Secp256k1CurveString = `${Secp256k1Curve}:${Base58String}`;
export type CurveString = Ed25519CurveString | Secp256k1CurveString;

export type PrivateKey = CurveString;
export type PublicKey = CurveString;
export type Signature = CurveString;

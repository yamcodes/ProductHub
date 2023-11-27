import { FakeOptions, Return } from './core/core';
export declare const numericChars = "0123456789";
export declare const alphaChars = "abcdefghijklmnopqrstuvwxyz";
export declare const specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
export declare const numericAlphaChars: string;
type RandomSequenceOptions = {
    size?: number;
    chars?: string;
} & FakeOptions;
type RandomSequenceOptions2 = {
    size?: number;
    charType?: 'numeric' | 'alpha' | 'alphaNumeric' | 'special';
} & FakeOptions;
/**
 * Generate a random sequence.
 *
 * @category general
 *
 * @example
 *
 * randSequence()
 *
 * @example
 *
 * randSequence({ size: 10 })
 *
 * @example
 *
 * randSequence({ chars: 'aAbBcC@#' })
 *
 * @example
 *
 * randSequence({ charType: 'numeric' }) // numeric | alpha | alphaNumeric | special
 *
 * @example
 *
 * randSequence({ length: 10 })
 *
 */
export declare function randSequence<Options extends RandomSequenceOptions = never>(options?: RandomSequenceOptions): Return<string, Options>;
export declare function randSequence<Options extends RandomSequenceOptions2 = never>(options?: RandomSequenceOptions2): Return<string, Options>;
export {};

// @ts-expect-error: ignore
import { convert as _convert_sb2md } from 'sb2md'
// @ts-expect-error: ignore
import { md2hatena as _orig_md2hatena } from 'md2hatena'

export const sb2md: (source: string) => string = _convert_sb2md
export const md2hatena: (source: string) => Promise<string> = _orig_md2hatena

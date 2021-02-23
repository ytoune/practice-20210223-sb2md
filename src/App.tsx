import { useState } from 'preact/hooks'
import { md2hatena, sb2md } from '~/libs'

const convert = async (source: string) => {
	const md = sb2md(source)
	const htn = await md2hatena(md)
	return { md, htn }
}

export const App = () => {
	const [source, setsourse] = useState(testdata)
	const [output, setoutput] = useState({ md: '', htn: '' })
	const [mode, setmode] = useState('hatena')
	return (
		<form
			name="mainForm"
			onSubmit={e => {
				e.preventDefault()
				convert(source).then(data => setoutput(data))
			}}
		>
			<div class="container">
				<legend id="legend_scrapbox">Scrapbox記法</legend>
				<div class="textarea_container" id="texcont_scrapbox">
					<textarea
						name="scrapbox"
						value={source}
						onChange={e => setsourse((e.target as HTMLTextAreaElement).value)}
					></textarea>
				</div>
				<div id="buttons_pc">
					<div>
						<button type="submit">→</button>
					</div>
				</div>
				<div id="buttons_phone" style="display: none">
					<div>
						<button type="submit">↓</button>
					</div>
				</div>
				<legend id="legend_hatena">
					<select
						value={mode}
						onChange={e => setmode((e.target as HTMLSelectElement).value)}
					>
						<option value="hatena">はてな記法</option>
						<option value="md">マークダウン記法</option>
					</select>
				</legend>
				<div class="textarea_container" id="texcont_hatena">
					{'hatena' === mode ? (
						<textarea name="hatena" readOnly value={output.htn}></textarea>
					) : (
						<textarea name="hatena" readOnly value={output.md}></textarea>
					)}
				</div>
			</div>
		</form>
	)
}

const testdata = `Scrapbox表記テストページ
変換器のテストに使います。
[**** 大見出し]
[*** 中見出し]
[** 小見出し]
[* 太字1][[太字2]]ふつうの文字[** ややでかい文字][*** もっとでかい文字][**** 更にでかい文字][***** もっとでかい文字]
[/ italic] [- stroke] [*/* bold bigger italic] [**-/ bold bigger stroke italic] [_ underline] [_/* underline italic bold]

数式[$ \sin (x)]
> 引用1
>引用2
 >引用3
$ cat commandline1
% cat commandline2
	$ cat commandline3
\`コード\`記法。\`[\`～\`]\` バッククォート自体は\`\\\`\` と入力する。\`\\\` \\\`
code:js
	function test(){
   console.log("Hello World!");
 }
code:py
 import numpy as np
 np.array([])
code:test.md
	# hoge
	## hogehoge
table:tabletitle0
	1111	2222	3333	4444
	aaaa	bbbb	cccc	dddd

	箇条書きlevel1
		箇条書きlevel2
			箇条書きlevel3
				箇条書きlevel4
	1. 数字
		2. 数字
			3. 数字
画像
[https://nixeneko.sakura.ne.jp/hatenablog/20180316_oembed/simarin.jpg]画像1
[[https://nixeneko.sakura.ne.jp/hatenablog/20180316_oembed/simarin.jpg]]画像2
URL
https://www.yahoo.co.jp
[Yahoo https://www.yahoo.co.jp]
[https://www.yahoo.co.jp Yahoo]
[hoge https://www.yahoo.co.jp https://www.google.co.jp]
[https://www.google.co.jp https://www.yahoo.co.jp https://www.yahoo.co.jp]
ほかどうでもいいやつ
[ページタイトル]
[ページタイトル.icon]
`.trim()

import './prepare'
import { render } from 'preact'
import { App } from './App'
import './main.css'

export const main = async () => {
	console.log('Hoge')
	const root = document.querySelector('main')
	if (root) render(<App />, root)
}

main().catch(x => {
	console.log('# something happens.')
	console.error(x)
})

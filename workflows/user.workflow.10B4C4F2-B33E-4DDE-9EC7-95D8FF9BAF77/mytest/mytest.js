// alfy.input = ''
// alfy.input = '!model default-model OneByOne'
// alfy.input = '!model default-model 2x2'
// alfy.input = '!set default-deck Cus'


// .src/config/index.js
/* -----------------------------
To prevent unknown case that invokes this error when settings new deck or model
with many random charachters which typing very quickly.
> "SyntaxError: alfred-anki/src/input/anki-model-fields.json: Unexpected end of JSON input"
------------------------------- */
// let modelFieldNames
// try {
// 	modelFieldNames = require('../input/anki-model-fields.json')
// } catch (error) {
// 	(async () => {
// 		await modelExist()
// 	})()
// }
/* --------------------------- */
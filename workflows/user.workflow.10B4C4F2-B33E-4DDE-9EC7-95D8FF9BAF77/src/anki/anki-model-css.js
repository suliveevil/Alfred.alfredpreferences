// const alfy = require('alfy')
// const jsonfile = require('jsonfile')
// const {errorAction} = require('../utils/error')
// const WorkflowError = require('../utils/error')
// const ankiConnect = require('./anki-connect')

// const idCardByModel = async (model) => {
// 	try {
// 		alfy.cache.set('validOutput', 'true')
// 		const resultAll = await ankiConnect('findCards', 6, {
// 			query: `"note:${model}"`
// 		})
// 		return resultAll
// 	} catch (error) {
// 		alfy.cache.set('validOutput', 'false')
// 		throw new WorkflowError(error, errorAction('main'))
// 	}
// }

// const css = async id => {
// 	try {
// 		alfy.cache.set('validOutput', 'true')
// 		const resultAll = await ankiConnect('cardsInfo', 6, {
// 			cards: id
// 		})
// 		return resultAll[0].css
// 	} catch (error) {
// 		alfy.cache.set('validOutput', 'false')
// 		throw new WorkflowError(error, errorAction('main'))
// 	}
// }

// module.exports = async (model) => {
// 	return await css(await idCardByModel(model))
// }

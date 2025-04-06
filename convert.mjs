import 'zx/globals'

const munch = await which('munch')

const wordsJSON = './words.json'

fs.access(wordsJSON, fs.constants.R_OK, async (wordsError) => {

    if (!wordsError) {

        const words = JSON.parse(await fs.readFile(wordsJSON))

        if (words) {

            const rows = []

            for (let w in words) { rows.push(words[w].latin) }

            const hisyeoWordList = './hisyeo.wordlist'

            await fs.writeFile(hisyeoWordList, `${rows.join('\n')}\n`)

            console.log('Wordlist written successfully')

            const hisyeoDic = './hisyeo.dic'

            await $`wc -l ${hisyeoWordList} > ${hisyeoDic}`

            console.log('Word count added to dic file')

            await $`sort ${hisyeoWordList} | uniq >> ${hisyeoDic}`
            
            console.log('Sorted and unique words added to dic file')

            const hisyeoAff = './hisyeo.aff'

            await fs.writeFile(hisyeoAff, `SET UTF-8\nLANG hs\nKEY wêutyûîô|sdfghikl|xczbnmeo\n`)

            console.log('Affix file written successfully')

            const tabfileGenerated = await $`${munch} ${hisyeoDic} ${hisyeoAff} > ./hisyeo.dic~`

            await $`mv ${hisyeoDic} ${hisyeoDic}.old`

            await $`mv ${hisyeoDic}~ ${hisyeoDic}`
            
            console.log('Hunsell files munched successfully')
            
        }

    }

})
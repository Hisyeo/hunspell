import 'zx/globals'

usePowerShell()

try {
    const wordsJSON = path.join(__dirname, 'words.json')
    const words = JSON.parse(await fs.readFile(wordsJSON, 'utf-8'))

    if (!words) {
        console.error('No words found in words.json')
        process.exit(0)
    }
    
    const rows = Object.values(words).map(word => word.latin)
    
    const wordlist = path.join(__dirname, 'hisyeo.wordlist')
    
    await fs.writeFile(wordlist, `${rows.join('\n')}\n`)
    console.log('✅ Wordlist written successfully')
    
    const hisyeoDic = path.join(__dirname, 'hisyeo.dic')
    await $`Get-Content ${wordlist} | Measure-Object -Line | Select-Object -ExpandProperty Lines | Set-Content ${hisyeoDic}` // PowerShell equivalent for: wc -l > file
    console.log('✅ Word count added to .dic file')
    
    await $`Get-Content ${wordlist} | Sort-Object -Unique | Add-Content ${hisyeoDic}` // PowerShell equivalent for: sort | uniq >> file
    console.log('✅ Sorted and unique words added to .dic file')
    
    const hisyeoAff = path.join(__dirname, 'hisyeo.aff')
    await fs.writeFile(hisyeoAff, `SET UTF-8\nLANG hs\nKEY wêutyûîô|sdfghikl|xczbnmeo\n`)
    console.log('✅ Affix file written successfully')
    
    // This command requires munch.exe to be a Windows executable
    const munch = await which('munch')
    const tempDic = `${hisyeoDic}~`
    const { stdout: munchOutput } = await $`munch .\\hisyeo.dic .\\hisyeo.aff` // munch.exe can't handle full paths
    await fs.writeFile(tempDic, munchOutput)

    // PowerShell equivalent for: mv
    await $`Move-Item -Path ${hisyeoDic} -Destination ${hisyeoDic + '.old'} -Force`
    await $`Move-Item -Path ${tempDic} -Destination ${hisyeoDic} -Force`
    console.log('✅ Hunspell files munched successfully')
    
} catch(error) {
  if (error.code === 'ENOENT') {
    console.error(`❌ Error: A required file was not found. Details: ${error.message}`)
  } else {
    console.error('❌ An error occurred:', error)
  }
  process.exit(1)
}

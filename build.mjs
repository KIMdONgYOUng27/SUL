import {readFile,writeFile,access} from 'node:fs/promises';
import {defaultConfig} from './question-config.js?v=2';
import vm from 'node:vm';
try{await access('questions.json');}catch{await writeFile('questions.json',JSON.stringify(defaultConfig(),null,2)+'\n');}
const html=await readFile('index.html','utf8'),css=await readFile('interview.css','utf8');
const strip=s=>s.replace(/^import .*?;\r?\n/gm,'').replace(/\bexport /g,'').replaceAll('import.meta.url','window.location.href');
const js=strip(await readFile('interview-model.js','utf8'))+'\n'+strip(await readFile('question-config.js','utf8'))+'\n'+strip(await readFile('interview.js','utf8'));
new vm.Script(js);
await writeFile('인터뷰-챗봇.html',html.replace('<link rel="stylesheet" href="interview.css?v=2">',()=>'<style>'+css+'</style>').replace('href="editor.html"','href="https://kimdongyoung27.github.io/SUL/editor.html"').replace('<script type="module" src="interview.js?v=2"></script>',()=>'<script type="module">'+js+'</script>'));
console.log('Question defaults and standalone HTML are ready.');

import * as mdRender from '../util/mdRender';

export default async function(format, noteContent){
	let content = '';
	let type = '';
	switch(format){
		case 'md':
			type = 'text';
			content = noteContent;
			break;
		case 'html':
			type = 'html';
			content = await mdRender.customRender(noteContent, {
				withBasicCss: true,
				inlineCss: true
			});
			break;
		case 'wx':
			type = 'html';
			content = await mdRender.customRender(noteContent, {
				withBasicCss: true,
				inlineCss: true,
				cssList: [
					'/style/wx.css'
				]
			});
			content = content.replace(/<\/span>\n/ig, '</span><br />');
			content = content.replace(/([^>])$/img, '$1<br />');
			content = content.replace(/<br \/>\n/ig, '<br />');
			break;
	}
	let clipboard = require('electron').clipboard;
	if(type === 'text'){
		clipboard.writeText(content);
	}else if(type === 'html'){
		clipboard.write({
			text: noteContent,
			html: content
		});
	}
}

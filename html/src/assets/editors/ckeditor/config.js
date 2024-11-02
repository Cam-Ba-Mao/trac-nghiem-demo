/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */


var imagesTemplatePath =  ROOT + "plugins/editors/ckeditor/" ;
var xhttp ,temp_content;
xhttp = new XMLHttpRequest();
temp_content = [];
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var x,i,xmlDoc;
        xmlDoc = xhttp.responseXML;
        x = xmlDoc.getElementsByTagName("item");
        for (i = 0; i < x.length; i++) {
            temp_content[i] = {
                'title' : x[i].getElementsByTagName("title")[0].firstChild.data,
                'image' : x[i].getElementsByTagName("image")[0].firstChild.data,
                'description' : x[i].getElementsByTagName("description")[0].firstChild.data,
                'html' : x[i].getElementsByTagName("html")[0].innerHTML
            }
        }
    }
};
//xhttp.open("GET", ROOT + "plugins/editor/ckeditor/template.xml" , true);
//xhttp.send();

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	config.toolbar = 'Normal';
    config.entities = false;
    config.toolbarGroups = [
        { name: 'document', groups: [ 'document', 'mode'] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing'] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] }
    ];

    
    // config.uiColor = '#AADC6E';
    config.removeButtons = 'Save,NewPage,Preview,Print,Cut,Copy,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Outdent,Indent,BidiLtr,BidiRtl,Language,Flash,Smiley,SpecialChar,About,Subscript,Superscript';
    config.font_names = 'Arial/Arial, Helvetica, sans-serif;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Verdana/Verdana, Geneva, sans-serif;Roboto/Roboto, sans-serif;Open Sans/Open Sans, sans-serif';

    config.extraPlugins = 'youtube,video';
};
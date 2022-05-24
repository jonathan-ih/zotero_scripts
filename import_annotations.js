// BACKUP DATA BEFORE RUNNING THIS SCRIPT!!!

// Select (highlight) all the records with annotated pdfs you wish to import
// Tools -> Developer -> Run JavaScript
// Copy-paste this file into the "Code:" box
// Click "Run"
// Wait for the popup telling you it's finished (could take some time)


var items = ZoteroPane.getSelectedItems();

for (var item of items) {
    if (item.isRegularItem()) { // not an attachment already
        let attachmentIDs = item.getAttachments();
        for (let id of attachmentIDs) {
            let attachment = Zotero.Items.get(id);
            if (attachment.attachmentContentType == 'application/pdf') {
                try {
    	            await Zotero.PDFWorker.import(id, true, '', true);
                }
                catch (e) {
	            if (e.name === 'PasswordException') {
	    	    Zotero.alert(null, Zotero.getString('general.error'),
        	        Zotero.getString('pdfReader.promptPasswordProtected'));
                    }
	            throw e;
                }
            }
        }
    }
}

alert("Done!")
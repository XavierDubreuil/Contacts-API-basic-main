//const API_URL = "http://localhost:5000/api/contacts";
const API_URL = "http://localhost:5000/api/bookmarks";
function API_GetContacts() {
    return new Promise(resolve => {
        $.ajax({
            url: API_URL,
            success: contacts => { resolve(contacts); },
            error: (xhr) => { console.log(xhr); resolve(null); }
        });
    });
}
function API_GetBookmarks(){
    return new Promise(resolve => {
        $.ajax({
            url: API_URL,
            success: bookmarks => { resolve(bookmarks); },
            error: (xhr) => { console.log(xhr); resolve(null); }
        });
    });
}
function API_GetContact(contactId) {
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + "/" + contactId,
            success: contact => { resolve(contact); },
            error: () => { resolve(null); }
        });
    });
}
function API_GetBookmark(bookmarkId){
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + "/" + bookmarkId,
            success: bookmark => { resolve(bookmark); },
            error: () => { resolve(null); }
        });
    });
}
function API_SaveContact(contact, create) {
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + (create ? "" : "/" + contact.Id),
            type: create ? "POST" : "PUT",
            contentType: 'application/json',
            data: JSON.stringify(contact),
            success: (/*data*/) => { resolve(true); },
            error: (/*xhr*/) => { resolve(false /*xhr.status*/); }
        });
    });
}
function API_SaveBookmark(bookmark, create) {
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + (create ? "" : "/" + bookmark.Id),
            type: create ? "POST" : "PUT",
            contentType: 'application/json',
            data: JSON.stringify(bookmark),
            success: (/*data*/) => { resolve(true); },
            error: (/*xhr*/) => { resolve(false /*xhr.status*/); }
        });
    });
}
function API_DeleteContact(id) {
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + "/" + id,
            type: "DELETE",
            success: () => { resolve(true); },
            error: (/*xhr*/) => { resolve(false /*xhr.status*/); }
        });
    });
}
function API_DeleteBookmark(id){
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + "/" + id,
            type: "DELETE",
            success: () => { resolve(true); },
            error: (/*xhr*/) => { resolve(false /*xhr.status*/); }
        });
    });
}
//<span class="cmdIcon fa-solid fa-ellipsis-vertical"></span>
let contentScrollPosition = 0;
Init_UI();
updateDropDownMenu();
function Init_UI() {

    renderBookmarks();
    //renderContacts();
    $('#createBookmark').on("click", async function () {
        saveContentScrollPosition();
        renderCreateBookmarkForm();
        //renderCreateContactForm();
    });
    $('#abort').on("click", async function () {
        //renderContacts();
        renderBookmarks();
    });
    $('#aboutCmd').on("click", function () {
        renderAbout();
    });
}

function renderAbout() {
    saveContentScrollPosition();
    eraseContent();
    $("#createBookmark").hide();
    $("#abort").show();
    $("#actionTitle").text("À propos...");
    $("#content").append(
        $(`
            <div class="aboutContainer">
                <h2>Gestionnaire de contacts</h2>
                <hr>
                <p>
                    Petite application de gestion de contacts à titre de démonstration
                    d'interface utilisateur monopage réactive.
                </p>
                <p>
                    Auteur: Nicolas Chourot
                </p>
                <p>
                    Collège Lionel-Groulx, automne 2024
                </p>
            </div>
        `))
}
/*async function renderContacts() {
    showWaitingGif();
    $("#actionTitle").text("Liste des contacts");
    $("#createBookmark").show();
    $("#abort").hide();
    let contacts = await API_GetContacts();
    eraseContent();
    if (contacts !== null) {
        contacts.forEach(contact => {
            $("#content").append(renderContact(contact));
        });
        restoreContentScrollPosition();
        // Attached click events on command icons
        $(".editCmd").on("click", function () {
            saveContentScrollPosition();
            renderEditContactForm(parseInt($(this).attr("editContactId")));
        });
        $(".deleteCmd").on("click", function () {
            saveContentScrollPosition();
            renderDeleteContactForm(parseInt($(this).attr("deleteContactId")));
        });
        $(".contactRow").on("click", function (e) { e.preventDefault(); })
    } else {
        renderError("Service introuvable");
    }
}*/
async function renderBookmarks(category = null) {
    showWaitingGif();
    $("#actionTitle").text("Liste des favories");
    $("#createBookmark").show();
    $("#abort").hide();
    let bookmarks = await API_GetBookmarks();
    eraseContent();
    if (bookmarks !== null) {
        // Appeler la fonction pour mettre à jour le menu déroulant
        updateDropDownMenu();

        bookmarks.forEach(bookmark => {
            if (category !== null) {
                if (bookmark.Category === category) {
                    $("#content").append(renderBookmark(bookmark));
                }
            }
            else {
                $("#content").append(renderBookmark(bookmark));
            }
        });

        restoreContentScrollPosition();

        // Attach click events to the edit and delete buttons
        $(".editCmd").on("click", function () {
            saveContentScrollPosition();
            renderEditBookmarkForm(parseInt($(this).attr("editContactId")));
        });
        $(".deleteCmd").on("click", function () {
            saveContentScrollPosition();
            renderDeleteBookmarkForm(parseInt($(this).attr("deleteContactId")));
        });
        $(".contactRow").on("click", function (e) { e.preventDefault(); });
    } else {
        renderError("Service introuvable");
    }
}
/*async function renderBookmarks() {
    showWaitingGif();
    $("#actionTitle").text("Liste des favories");
    $("#createContact").show();
    $("#abort").hide();
    let bookmarks = await API_GetBookmarks();
    eraseContent();
    if (bookmarks !== null) {
        bookmarks.forEach(bookmark => {
            $("#content").append(renderBookmark(bookmark));
        });
        restoreContentScrollPosition();
        // Attached click events on command icons
        $(".editCmd").on("click", function () {
            saveContentScrollPosition();
            //renderEditContactForm(parseInt($(this).attr("editContactId")));
            renderEditBookmarkForm(parseInt($(this).attr("editContactId")));
        });
        $(".deleteCmd").on("click", function () {
            saveContentScrollPosition();
            renderDeleteBookmarkForm(parseInt($(this).attr("deleteContactId")));
        });
        $(".contactRow").on("click", function (e) { e.preventDefault(); })
    } else {
        renderError("Service introuvable");
    }
}*/
function showWaitingGif() {
    $("#content").empty();
    $("#content").append($("<div class='waitingGifcontainer'><img class='waitingGif' src='Loading_icon.gif' /></div>'"));
}
function eraseContent() {
    $("#content").empty();
}
function saveContentScrollPosition() {
    contentScrollPosition = $("#content")[0].scrollTop;
}
function restoreContentScrollPosition() {
    $("#content")[0].scrollTop = contentScrollPosition;
}
function renderError(message) {
    eraseContent();
    $("#content").append(
        $(`
            <div class="errorContainer">
                ${message}
            </div>
        `)
    );
}
function renderCreateBookmarkForm() {
    renderBookMarkForm();
}
/*function renderCreateContactForm() {
    renderContactForm();
}*/
async function renderEditBookmarkForm(id) {
    showWaitingGif();
    let bookmark = await API_GetBookmark(id);
    if (bookmark !== null)
        renderBookMarkForm(bookmark);
    else
        renderError("Bookmark introuvable!");
}
/*async function renderEditContactForm(id) {
    showWaitingGif();
    let contact = await API_GetContact(id);
    if (contact !== null)
        renderContactForm(contact);
    else
        renderError("Contact introuvable!");
}*/
async function renderDeleteBookmarkForm(id) {
    showWaitingGif();
    $("#createBookmark").hide();
    $("#abort").show();
    $("#actionTitle").text("Retrait");
    let bookmark = await API_GetBookmark(id);
    eraseContent();
    if (bookmark !== null) {
        $("#content").append(`
        <div class="contactdeleteForm">
            <h4>Effacer le bookmark suivant?</h4>
            <br>
            <div class="contactRow" contact_id=${bookmark.Id}">
                <div class="contactContainer">
                    <div class="contactLayout">
                        <img src="https://www.google.com/s2/favicons?sz=64&domain=${bookmark.Url}" alt="Logo du site" width="64" height="64">
                        <div class="contactName">${bookmark.Title}</div>
                        <div class="contactEmail">${bookmark.Category}</div>
                    </div>
                </div>  
            </div>   
            <br>
            <input type="button" value="Effacer" id="deleteContact" class="btn btn-primary">
            <input type="button" value="Annuler" id="cancel" class="btn btn-secondary">
        </div>    
        `);
        $('#deleteContact').on("click", async function () {
            showWaitingGif();
            let result = await API_DeleteBookmark(bookmark.Id);
            if (result)
                renderBookmarks();
            else
                renderError("Une erreur est survenue!");
        });
        $('#cancel').on("click", function () {
            renderBookmarks();
        });
    } else {
        renderError("bookmark introuvable!");
    }
};
/*async function renderDeleteContactForm(id) {
    showWaitingGif();
    $("#createBookmark").hide();
    $("#abort").show();
    $("#actionTitle").text("Retrait");
    let contact = await API_GetContact(id);
    eraseContent();
    if (contact !== null) {
        $("#content").append(`
        <div class="contactdeleteForm">
            <h4>Effacer le contact suivant?</h4>
            <br>
            <div class="contactRow" contact_id=${contact.Id}">
                <div class="contactContainer">
                    <div class="contactLayout">
                        <div class="contactName">${contact.Name}</div>
                        <div class="contactPhone">${contact.Phone}</div>
                        <div class="contactEmail">${contact.Email}</div>
                    </div>
                </div>  
            </div>   
            <br>
            <input type="button" value="Effacer" id="deleteContact" class="btn btn-primary">
            <input type="button" value="Annuler" id="cancel" class="btn btn-secondary">
        </div>    
        `);
        $('#deleteContact').on("click", async function () {
            showWaitingGif();
            let result = await API_DeleteContact(contact.Id);
            if (result)
                renderContacts();
            else
                renderError("Une erreur est survenue!");
        });
        $('#cancel').on("click", function () {
            renderContacts();
        });
    } else {
        renderError("Contact introuvable!");
    }
}*/
/*function newContact() {
    contact = {};
    contact.Id = 0;
    contact.Name = "";
    contact.Phone = "";
    contact.Email = "";
    return contact;
}*/
function newBookMark() {
    bookmark = {};
    bookmark.Id = 0;
    bookmark.Title = "";
    bookmark.Url = "";
    bookmark.Category = "";
    return bookmark;
}
function renderBookMarkForm(bookmark = null) {
    $("#createBookmark").hide();
    $("#abort").show();
    eraseContent();
    let create = bookmark == null;
    if (create) bookmark = newBookMark();
    let faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain=${bookmark.Url}`;

    // Vérifiez si l'URL du domaine est vide ou invalide
    let logo;
    console.log(logo);
    if (!bookmark.Url) {
        console.log("URL vide ou invalide, utilisation de l'icône par défaut.");
        logo = `./bookmark.svg`; // Chemin relatif vers l'icône par défaut
        console.log(logo);
    } else {
        console.log("URL du favicon :", faviconUrl);
        logo = faviconUrl;
    }

    //console.log(`https://www.google.com/s2/favicons?sz=64&domain=${bookmark.Url}`);
    $("#actionTitle").text(create ? "Création" : "Modification");
    $("#content").append(`
        
        <form class="form" id="contactForm">
            <input type="hidden" name="Id" value="${bookmark.Id}"/>
            <img id="logo${bookmark.Id}" src="${logo}" alt="Logo du site" width="64" height="64">
            <br>
            <label for="Name" class="form-label">Titre </label>
            <input 
                class="form-control Alpha"
                name="Title" 
                id="Name" 
                placeholder="Titre"
                required
                RequireMessage="Veuillez entrer un titre"
                InvalidMessage="Le titre comporte un caractère illégal" 
                value="${bookmark.Title}"
            />
            <label for="URL" class="form-label">Url </label>
            <input
                class="form-control URL"
                name="Url"
                id="Phone"
                placeholder="http(s)//google.com"
                required
                oninput="changeLogoSite(${bookmark.Id})"
                RequireMessage="Veuillez entrer un url" 
                InvalidMessage="Veuillez entrer un url valide"
                value="${bookmark.Url}" 
            />
            <label for="Email" class="form-label">Categorie </label>
            <input 
                class="form-control"
                name="Category"
                id="Email"
                placeholder="video,blog,media..."
                required
                RequireMessage="Veuillez entrer une categorie" 
                InvalidMessage="Veuillez entrer une categorie valide"
                value="${bookmark.Category}"
            />
            <hr>
            <input type="submit" value="Enregistrer" id="saveContact" class="btn btn-primary">
            <input type="button" value="Annuler" id="cancel" class="btn btn-secondary">
        </form>
    `);
    initFormValidation();
    $('#contactForm').on("submit", async function (event) {
        event.preventDefault();
        let bookmark = getFormData($("#contactForm"));
        bookmark.Id = parseInt(bookmark.Id);
        showWaitingGif();
        let result = await API_SaveContact(bookmark, create);
        if (result)
            renderBookmarks();
        else
            renderError("Une erreur est survenue!");
    });
    $('#cancel').on("click", function () {
        renderBookmarks();
    });
}
function changeLogoSite(id) {
    let url = document.getElementById('Phone').value;
    let logoEmplacement = document.getElementById('logo'+id);
    logoEmplacement.src = `https://www.google.com/s2/favicons?sz=64&domain=`+url;
}
/*function renderContactForm(contact = null) {
    $("#createBookmark").hide();
    $("#abort").show();
    eraseContent();
    let create = contact == null;
    if (create) contact = newContact();
    $("#actionTitle").text(create ? "Création" : "Modification");
    $("#content").append(`
        <form class="form" id="contactForm">
            <input type="hidden" name="Id" value="${contact.Id}"/>

            <label for="Name" class="form-label">Nom </label>
            <input 
                class="form-control Alpha"
                name="Name" 
                id="Name" 
                placeholder="Nom"
                required
                RequireMessage="Veuillez entrer un nom"
                InvalidMessage="Le nom comporte un caractère illégal" 
                value="${contact.Name}"
            />
            <label for="Phone" class="form-label">Téléphone </label>
            <input
                class="form-control Phone"
                name="Phone"
                id="Phone"
                placeholder="(000) 000-0000"
                required
                RequireMessage="Veuillez entrer votre téléphone" 
                InvalidMessage="Veuillez entrer un téléphone valide"
                value="${contact.Phone}" 
            />
            <label for="Email" class="form-label">Courriel </label>
            <input 
                class="form-control Email"
                name="Email"
                id="Email"
                placeholder="Courriel"
                required
                RequireMessage="Veuillez entrer votre courriel" 
                InvalidMessage="Veuillez entrer un courriel valide"
                value="${contact.Email}"
            />
            <hr>
            <input type="submit" value="Enregistrer" id="saveContact" class="btn btn-primary">
            <input type="button" value="Annuler" id="cancel" class="btn btn-secondary">
        </form>
    `);
    initFormValidation();
    $('#contactForm').on("submit", async function (event) {
        event.preventDefault();
        let contact = getFormData($("#contactForm"));
        contact.Id = parseInt(contact.Id);
        showWaitingGif();
        let result = await API_SaveContact(contact, create);
        if (result)
            renderContacts();
        else
            renderError("Une erreur est survenue!");
    });
    $('#cancel').on("click", function () {
        renderContacts();
    });
}
*/
function getFormData($form) {
    const removeTag = new RegExp("(<[a-zA-Z0-9]+>)|(</[a-zA-Z0-9]+>)", "g");
    var jsonObject = {};
    $.each($form.serializeArray(), (index, control) => {
        jsonObject[control.name] = control.value.replace(removeTag, "");
    });
    return jsonObject;
}

/*function renderContact(contact) {
    return $(`
     <div class="contactRow" contact_id=${contact.Id}">
        <div class="contactContainer noselect">
            <div class="contactLayout">
                <span class="contactName">${contact.Name}</span>
                <span class="contactPhone">${contact.Phone}</span>
                <span class="contactEmail">${contact.Email}</span>
            </div>
            <div class="contactCommandPanel">
                <span class="editCmd cmdIcon fa fa-pencil" editContactId="${contact.Id}" title="Modifier ${contact.Name}"></span>
                <span class="deleteCmd cmdIcon fa fa-trash" deleteContactId="${contact.Id}" title="Effacer ${contact.Name}"></span>
            </div>
        </div>
    </div>           
    `);
}*/

function renderBookmark(bookmark) {
    return $(`
        <div class="contactRow" contact_id=${bookmark.Id}">
           <div class="contactContainer noselect">
               <div class="contactLayout">
                   <img id="logo${bookmark.Id}" src="https://www.google.com/s2/favicons?sz=64&domain=${bookmark.Url}" alt="Logo du site" width="64" height="64">
                   <span class="contactName">${bookmark.Title}</span>
                   <span class="contactEmail">${bookmark.Category}</span>
               </div>
               <div class="contactCommandPanel">
                   <span class="editCmd cmdIcon fa fa-pencil" editContactId="${bookmark.Id}" title="Modifier ${bookmark.Name}"></span>
                   <span class="deleteCmd cmdIcon fa fa-trash" deleteContactId="${bookmark.Id}" title="Effacer ${bookmark.Name}"></span>
               </div>
           </div>
       </div>           
       `);
}
let selectedCategory = "";
async function updateDropDownMenu() {
    let bookmarks = await API_GetBookmarks(); // Récupérer les favoris via l'API
    let categories = new Set(); // Utiliser un Set pour s'assurer qu'il n'y a pas de doublons

    // Parcourir les favoris pour extraire les catégories
    bookmarks.forEach(bookmark => {
        categories.add(bookmark.Category);
    });

    let DDMenu = $("#DDMenu");
    DDMenu.empty(); // Vider le menu avant de le remplir

    // Ajouter l'option "Toutes les catégories"
    DDMenu.append($(` 
        <div class="dropdown-item menuItemLayout" id="allCatCmd"> 
            <i class="menuIcon fa fa-fw mx-2"></i> Toutes les catégories 
        </div> 
    `));

    // Ajouter un séparateur
    DDMenu.append($(`<div class="dropdown-divider"></div>`));

    // Ajouter les catégories dynamiques
    categories.forEach(category => {
        DDMenu.append($(` 
            <div class="dropdown-item menuItemLayout category" data-category="${category}"> 
                <i class="menuIcon fa fa-fw mx-2"></i> ${category} 
            </div> 
        `));
    });

    // Gérer l'affichage des favoris en fonction de la catégorie sélectionnée
    $('#allCatCmd').on("click", function () {
        selectedCategory = "";
        renderBookmarks(); // Afficher tous les favoris
    });

    $('.category').on("click", function () {
        selectedCategory = $(this).data('category');
        renderBookmarks(selectedCategory); // Afficher les favoris filtrés par catégorie
    });
    console.log(selectedCategory);
}
class Libro {

    constructor(id,tittle,subtitle,authors,editorial,fechaPublicacion,
    description,categories,imagen){

        this.id = id;
        this.tittle = tittle;
        this.subtitle = subtitle;
        this.authors = authors;
        this.editorial = editorial;
        this.fechaPublicacion = fechaPublicacion;
        this.description = description;
        this.categories = categories;
        this.imagen = imagen;
    }

    getid() {
        return this.id;
    }
    setid(id) {
        this.id = id;
    }

    gettittle() {
        return this.tittle;
    }
    settittle(tittle) {
        this.tittle = tittle;
    }

    getsubtitle() {
        return this.subtitle;
    }
    setsubtitle(subtitle) {
        this.subtitle = subtitle;
    }

    getauthors() {
        return this.authors;
    }
    setauthors(authors) {
        this.authors = authors;
    }

    geteditorial() {
        return this.editorial;
    }
    seteditorial(editorial) {
        this.editorial = editorial;
    }

    getfechaPublicacion() {
        return this.fechaPublicacion;
    }
    setfechaPublicacion(fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
    }

    getdescription() {
        return this.description;
    }
    setdescription(description) {
        this.description = description;
    }

    getcategories() {
        return this.categories;
    }
    setcategories(categories) {
        this.categories = categories;
    }

    getimagen() {
        return this.imagen;
    }
    setimagen(imagen) {
        this.imagen = imagen;
    }
}





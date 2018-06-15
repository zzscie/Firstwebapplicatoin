pl.view.updateBook = {
  setupUserInterface: function () {
    var formEl = document.forms['Book'],
        saveButton = formEl.commit,
        selectBookEl = formEl.selectBook;
    var i=0, key="", keys=[], book=null, optionEl=null;
    // load all book objects
    Book.loadAll();
    // populate the selection list with books
    keys = Object.keys( Book.instances);
    for (i=0; i < keys.length; i++) {
      key = keys[i];
      book = Book.instances[key];
      optionEl = document.createElement("option");
      optionEl.text = book.title;
      optionEl.value = book.isbn;
      selectBookEl.add( optionEl, null);
    }

    selectBookEl.addEventListener("change",
	    pl.view.updateBook.handleBookSelectionEvent);

  saveButton.addEventListener("click",
      pl.view.updateBook.handleSaveButtonClickEvent);

  window.addEventListener("beforeunload", Book.saveAll);
},
handleBookSelectionEvent: function () {
  var formEl = document.forms['Book'];
  var selectBookEl = formEl.selectBook,
      book=null, key = selectBookEl.value;
  if (key) {
    book = Book.instances[key];
    formEl.isbn.value = book.isbn;
    formEl.title.value = book.title;
    formEl.year.value = book.year;
  } else {
    formEl.reset();
  }
  },
  // save updated data
  handleUpdateButtonClickEvent: function () {
    var formEl = document.forms['Book'];
    var slots = { isbn: formEl.isbn.value,
        title: formEl.title.value,
        year: formEl.year.value
    };
    Book.update( slots);
    selectBookEl.options[selectBookEl.selectedIndex].text = slots.title;
    formEl.reset();
  }
};

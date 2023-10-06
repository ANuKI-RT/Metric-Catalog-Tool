function initAddMarginToLastItemInTreeView() {
  const allListItems = document.querySelectorAll(".treeview li")
  if (!allListItems) return;

  allListItems.forEach((listItem) => {
    const hasChildren = listItem.children.length > 0;
    if (!hasChildren) {
      listItem.classList.add("lastListItem");
    }
  })
}

function initAddTreeView() {
  let toggler = document.getElementsByClassName("caret");
  let i;
  if (!toggler) return;

  for (i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
      this.parentElement.querySelector(".nested").classList.toggle("active");
      this.classList.toggle("caret-down");
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  initAddMarginToLastItemInTreeView()
  initAddTreeView()
})

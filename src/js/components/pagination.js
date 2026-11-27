import { renderEventsSection } from "./event.js";

const listEl = document.querySelector("[data-pagination-list]");
const PAGE_SIZE = 20;
let currentPage = 1;
let totalPages = 1;
const getPages = (total, current) => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }
  return [1, "...", current - 1, current, current + 1, "...", total];
};
const renderPagination = () => {
  if (!listEl) return;
  if (totalPages <= 1) {
    listEl.innerHTML = "";
    return;
  }
  listEl.innerHTML = getPages(totalPages, currentPage)
    .map((item) => {
      if (item === "...") {
        return `<li class="pagination__item"><span class="pagination__dots">...</span></li>`;
      }
      const activeClass =
        item === currentPage ? " pagination__btn--active" : "";
      return `
        <li class="pagination__item">
          <button type="button" class="pagination__btn${activeClass}" data-page="${item}">
            ${item}
          </button>
        </li>
      `;
    })
    .join("");
};
const loadPage = async (page) => {
  try {
    currentPage = page;
    totalPages = await renderEventsSection({ page, size: PAGE_SIZE });
    renderPagination();
  } catch (error) {
    console.log("Помилка при завантаженні сторінки:", error);
  }
};
if (listEl) {
  listEl.addEventListener("click", (event) => {
    const btn = event.target.closest("[data-page]");
    if (!btn) return;
    const page = Number(btn.dataset.page);
    if (!page || page === currentPage) return;
    loadPage(page);
  });
  loadPage(1);
}

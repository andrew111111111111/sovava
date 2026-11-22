// import { renderEventsSection } from "./event.js";

// export class Pagination {
//   constructor({ listSelector, totalPages = 1, currentPage = 1, onPageChange }) {
//     this.listEl = document.querySelector(listSelector);
//     this.totalPages = totalPages;
//     this.currentPage = currentPage;
//     this.onPageChange = onPageChange;

//     if (this.listEl) {
//       this.bindEvents();
//       this.render();
//     }
//   }

//   setTotalPages(totalPages, currentPage = 1) {
//     this.totalPages = Math.max(1, totalPages);
//     this.currentPage = Math.min(Math.max(1, currentPage), this.totalPages);
//     this.render();
//   }

//   setCurrentPage(page) {
//     if (page < 1 || page > this.totalPages || page === this.currentPage) return;
//     this.currentPage = page;
//     this.render();
//   }

//   bindEvents() {
//     this.listEl.addEventListener("click", (event) => {
//       const btn = event.target.closest("[data-page]");
//       if (!btn) return;

//       const page = Number(btn.dataset.page);
//       if (Number.isNaN(page) || page === this.currentPage) return;

//       this.currentPage = page;
//       this.render();

//       if (typeof this.onPageChange === "function") {
//         this.onPageChange(this.currentPage);
//       }
//     });
//   }

//   getPageItems() {
//     const total = this.totalPages;
//     const current = this.currentPage;

//     if (total <= 7) {
//       return Array.from({ length: total }, (_, idx) => idx + 1);
//     }

//     const items = [];

//     if (current <= 4) {
//       items.push(1, 2, 3, 4, 5, "...", total);
//     } else if (current >= total - 3) {
//       items.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
//     } else {
//       items.push(1, "...", current - 1, current, current + 1, "...", total);
//     }

//     return items;
//   }

//   render() {
//     if (!this.listEl) return;

//     if (this.totalPages <= 1) {
//       this.listEl.innerHTML = "";
//       return;
//     }

//     const markup = this.getPageItems()
//       .map((item) => {
//         if (item === "...") {
//           return `<li class="pagination__item"><span class="pagination__dots">...</span></li>`;
//         }

//         const activeClass = item === this.currentPage ? " pagination__btn--active" : "";
//         return `
//           <li class="pagination__item">
//             <button type="button" class="pagination__btn${activeClass}" data-page="${item}">
//               ${item}
//             </button>
//           </li>
//         `;
//       })
//       .join("");

//     this.listEl.innerHTML = markup;
//   }
// }

// const PAGE_SIZE = 20;

// const pagination = new Pagination({
//   listSelector: "[data-pagination-list]",
//   totalPages: 1,
//   currentPage: 1,
//   onPageChange: async (page) => {
//     try {
//       const totalPages = await renderEventsSection({ page, size: PAGE_SIZE });
//       pagination.setTotalPages(totalPages, page);
//     } catch (error) {
//       console.log("Відбулася помилка при зміні сторінки:", error);
//     }
//   },
// });

// (async () => {
//   try {
//     const totalPages = await renderEventsSection({ page: 1, size: PAGE_SIZE });
//     pagination.setTotalPages(totalPages, 1);
//   } catch (error) {
//     console.log("Відбулася помилка при першому завантаженні:", error);
//   }
// })();
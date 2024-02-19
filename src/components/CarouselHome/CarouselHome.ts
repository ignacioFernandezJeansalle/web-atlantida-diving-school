/************/
/* Constant */
/************/
const SELECTOR_ITEM = "carousel__item";
const SELECTOR_PAGINATION = "carousel__pagination";
const SELECTOR_BTN_NEXT = "carousel__controls-next";
const SELECTOR_BTN_PREV = "carousel__controls-prev";
const CLASS_NAME_ACTIVE = "active";
const CLASS_NAME_START = "carousel__item--start";
const CLASS_NAME_END = "carousel__item--end";
const CLASS_NAME_NEXT = "carousel__item--next";
const CLASS_NAME_PREV = "carousel__item--prev";
const INTERVAL = 10000;

/***************/
/* HTMLElement */
/***************/
const items = document.getElementsByClassName(SELECTOR_ITEM) as HTMLCollectionOf<HTMLElement>;
const pagination = document.getElementsByClassName(SELECTOR_PAGINATION) as HTMLCollectionOf<HTMLElement>;
const btnNext = document.getElementById(SELECTOR_BTN_NEXT);
const btnPrev = document.getElementById(SELECTOR_BTN_PREV);

/*************/
/* Variables */
/*************/
let intervalId: number;
let orderIndex = -1;
let isMoving = false;
const numberOfItems = items.length;
const withPagination = pagination.length > 0 && pagination[0].children.length > 0;

/**********/
/* Events */
/**********/

// Pagination

if (withPagination) {
  for (let i = 0; i < pagination[0].children.length; i++) {
    pagination[0].children[i].addEventListener("click", (event) => {
      event.preventDefault();
      if (!isMoving) {
        clearInterval(intervalId);
        move(i);
        intervalId = setInterval(loop, INTERVAL);
      }
    });
  }
}

// Control Next

btnNext?.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isMoving) {
    clearInterval(intervalId);
    move((orderIndex += 1));
    intervalId = setInterval(loop, INTERVAL);
  }
});

// Control Prev

btnPrev?.addEventListener("click", (event) => {
  event.preventDefault();
  if (!isMoving) {
    clearInterval(intervalId);
    move((orderIndex -= 1));
    intervalId = setInterval(loop, INTERVAL);
  }
});

/*************/
/* Functions */
/*************/
const getActive = () => {
  for (let i = 0; i < numberOfItems; i++) {
    if (items[i].classList.contains(CLASS_NAME_ACTIVE)) return i;
  }
  return -1;
};

const reflow = (element: HTMLElement) => {
  element.offsetHeight;
};

const setActivePagination = (n: number) => {
  for (let i = 0; i < pagination[0].children.length; i++) {
    if (n === i) {
      pagination[0].children[i].classList.add(CLASS_NAME_ACTIVE);
    } else {
      pagination[0].children[i].classList.remove(CLASS_NAME_ACTIVE);
    }
  }
};

const move = (index: number) => {
  const activeItemIndex = getActive();

  if (activeItemIndex === -1 || activeItemIndex === index) return;

  isMoving = true; // Block buttons

  const isNext = index > activeItemIndex;

  orderIndex = isNext ? (index >= numberOfItems ? 0 : index) : index < 0 ? numberOfItems - 1 : index;

  const orderClassName = isNext ? CLASS_NAME_NEXT : CLASS_NAME_PREV;
  const directionalClassName = isNext ? CLASS_NAME_START : CLASS_NAME_END;

  items[orderIndex].classList.add(orderClassName);
  reflow(items[orderIndex]);
  items[activeItemIndex].classList.add(directionalClassName);
  items[orderIndex].classList.add(directionalClassName);

  setTimeout(() => {
    items[activeItemIndex].classList.remove(CLASS_NAME_ACTIVE, directionalClassName);
    items[orderIndex].classList.remove(orderClassName, directionalClassName);
    items[orderIndex].classList.add(CLASS_NAME_ACTIVE);
    if (withPagination) {
      setActivePagination(orderIndex);
    }
    isMoving = false; // Unblock buttons
  }, 600);
};

const loop = () => {
  clearInterval(intervalId);
  move((orderIndex += 1));
  intervalId = setInterval(loop, INTERVAL);
};

loop();

const navMenu = document.getElementById("navMenu");
const navBtnOpen = document.getElementById("navBtnOpen");
const navBtnClose = document.getElementById("navBtnClose");

navBtnOpen?.addEventListener("click", (event) => {
  event.stopPropagation();
  navMenu?.classList.add("nav__menu--show");
});

navBtnClose?.addEventListener("click", (event) => {
  event.stopPropagation();
  navMenu?.classList.remove("nav__menu--show");
});

document.addEventListener("click", (event) => {
  const iEvent = event as Event;
  iEvent.stopPropagation();

  const eTarget = event.target as HTMLElement;
  if (navMenu?.classList.contains("nav__menu--show") && !navMenu.contains(eTarget)) {
    navMenu?.classList.remove("nav__menu--show");
  }
});

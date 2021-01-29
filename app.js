// initalizing the site
function init() {
    this.initNavBar();
    this.toggleActiveState();
    this.scrollHandler();

  }
  //Create nav item
  //normal state => <li><a href="#section1 class="menu__link">section 1 </a></i>
  //active state => <li> <a href="#section1" class="menu__link" "link__active"> section 1 </a></i>
  function createNavItem(section) {
    // Get Text for anchor from data-nav &&   // Set href attribute
    const anchor = document.createElement("a");
    const text = section.getAttribute("data-nav");
    anchor.setAttribute("href", `#${section.id}`);
    anchor.className = "menu__link";
    anchor.textContent = text;
    const li = document.createElement("li");
    li.appendChild(anchor);
    return li;
  }
  // Building the whole navbar
  function initNavBar() {
    // Get the nav list element
    const navbar = document.querySelector("#navbar__list");
    // Get all sections
    const sections = document.querySelectorAll("section");
    // Iterate through sections to build nav
    for (let i = 0; i < sections.length; i++) {
      // function create nav Item => Create Item in navbar
      const navItem = createNavItem(sections[i]);
      navbar.appendChild(navItem);
    }
  }
  //Responsible for changing when scrolling
  function scrollHandler() {
    const element = document.getElementById("navbar__list");
    element.addEventListener("click", (e) => {
      const href = element.getAttribute("href");
      // Remove old active class and add the new active class
      const active = document.getElementsByClassName(".your-active-class");
      if (active !== null) {
        active.classList.remove(".your-active-class");
      }
      e.target.className = "link__active";
      element.scrollIntoView({ block: 'end',  behavior: 'smooth' });
    });
  }
  //Check if the element in current view or not
  function isElementOnScreen(section) {
      const rec = section.getBoundingClientRect();
      return (
        rec.top >= 0 &&
        rec.left >= 0 &&
        rec.bottom <=
          (window.innerHeight +
            window.scrollY  || document.documentElement.clientHeight) &&
        rec.right <= (window.innerWidth || document.documentElement.clientWidth) //
      );
    }
  //This event is triggered during window scroll
  function toggleActiveState() {
    document.addEventListener("scroll", function (event) {
      const sections = document.querySelectorAll("section");
      let links = document.querySelectorAll(".menu__link");
      for (const section of sections) {
        if(isElementOnScreen(section)) {
            section.classList.add('your-active-class') //
            links.forEach((link) => {
              const isActiveLink = link.getAttribute("href") === section.id;
              link.classList.toggle("link__active", isActiveLink);
            });
        } else {
            section.classList.remove("your-active-class");
        }
      }
    });
  }
  
  init();
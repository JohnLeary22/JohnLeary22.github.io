const eye = document.querySelector(".eye");
const iris = document.querySelector(".iris");
const tabs = document.querySelectorAll(".tab");
const title = document.getElementById("theme-title");
const description = document.getElementById("theme-description");

const themeInfo = {
  normal: {
    title: "Normal classroom view",
    description:
      "A clear classroom view where written work, board content, and the teacher can all be seen clearly.",
    image: "normal-vision.png"
  },

  myopia: {
    title: "Myopia — short-sightedness",
    description:
      "Nearby work may remain clear while distant information, such as the whiteboard and teacher, appears blurred.",
    image: "myopia-vision.png"
  },

  hyperopia: {
    title: "Hyperopia — long-sightedness",
    description:
      "Close-up work may appear blurred or difficult to focus on, while more distant objects can remain clearer.",
    image: "hyperopia-vision.png"
  },

  cataracts: {
    title: "Cataracts",
    description:
      "Vision may appear cloudy, hazy, washed out, or affected by glare, reducing contrast across the classroom.",
    image: "cataracts-vision.png"
  },

  cmv: {
    title: "CMV retinitis",
    description:
      "Vision can include blurred or missing areas, dark spots, floaters, and irregular patches across the visual field.",
    image: "cmv-retinitis-vision.png"
  },

  glaucoma: {
    title: "Glaucoma",
    description:
      "Peripheral vision can gradually reduce, making the classroom feel narrower and causing information at the edges to be missed.",
    image: "glaucoma-vision.png"
  },

  macular: {
    title: "Macular degeneration",
    description:
      "Central vision can become blurred or missing, making detailed tasks such as reading and recognising faces more difficult.",
    image: "macular-degeneration-vision.png"
  },

  diabetic: {
    title: "Diabetic retinopathy",
    description:
      "Vision may be interrupted by blurry areas, dark spots, floaters, and patches of reduced clarity.",
    image: "diabetic-retinopathy-vision.png"
  }
};

const maxOffset = 22;

function updateEye(event) {
  if (!eye || !iris) return;

  const rect = eye.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const deltaX = event.clientX - centerX;
  const deltaY = event.clientY - centerY;

  const angle = Math.atan2(deltaY, deltaX);

  const distance = Math.min(
    Math.hypot(deltaX, deltaY),
    maxOffset
  );

  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  iris.style.setProperty("--look-x", `${x}px`);
  iris.style.setProperty("--look-y", `${y}px`);
}

function setTheme(theme) {
  const info = themeInfo[theme];

  if (!info) return;

  document.body.dataset.theme = theme;

  tabs.forEach((tab) => {
    tab.classList.toggle(
      "active",
      tab.dataset.theme === theme
    );
  });

  title.textContent = info.title;
  description.textContent = info.description;

  document.documentElement.style.setProperty(
    "--classroom-image",
    `url("${info.image}")`
  );
}

document.addEventListener("pointermove", updateEye);

document.addEventListener("pointerleave", () => {
  if (!iris) return;

  iris.style.setProperty("--look-x", "0px");
  iris.style.setProperty("--look-y", "0px");
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setTheme(tab.dataset.theme);
  });
});

window.addEventListener("load", () => {
  setTheme("normal");

  updateEye({
    clientX: window.innerWidth / 2,
    clientY: window.innerHeight * 0.8
  });
});

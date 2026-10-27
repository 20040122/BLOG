
  function generateDots(n, color) {
    return Array.from({ length: n }, () => `${getRandom(2560)}px ${getRandom(2560)}px ${color}`).join(", ");
  }

  function getRandom(max) {
    return Math.floor(Math.random() * max);
  }

  function initBG() {
    // Deliberately static. Each layer is a 1px element whose box-shadow scatter spans
    // ~2560x2560px, so any per-frame transform on it forces a full texture composite.
    // The dark theme's star field is static too — animating only the light theme's
    // particles is what made it feel less smooth than dark.
    const particlesSmall = generateDots(1000, "#000");
    const particlesMedium = generateDots(500, "#000");
    const particlesLarge = generateDots(250, "#000");
    const particles1 = document.getElementById('particles1');
    const particles2 = document.getElementById('particles2');
    const particles3 = document.getElementById('particles3');

    if (particles1) {
      particles1.style.cssText = `
      width: 1px;
      height: 1px;
      border-radius: 50%;
      box-shadow: ${particlesSmall};
      `;
    }

    if (particles2) {
      particles2.style.cssText = `
      width: 1.5px;
      height: 1.5px;
      border-radius: 50%;
      box-shadow: ${particlesMedium};
      `;
    }

    if (particles3) {
      particles3.style.cssText = `
      width: 2px;
      height: 2px;
      border-radius: 50%;
      box-shadow: ${particlesLarge};
      `;
    }

    const starsSmall = generateDots(1000, "#fff");
    const starsMedium = generateDots(500, "#fff");
    const starsLarge = generateDots(250, "#fff");
    const stars1 = document.getElementById('stars1');
    const stars2 = document.getElementById('stars2');
    const stars3 = document.getElementById('stars3');

    if (stars1) {
      stars1.style.cssText = `
      width: 1px;
      height: 1px;
      border-radius: 50%;
      box-shadow: ${starsSmall};
      `;
    }

    if (stars2) {
      stars2.style.cssText = `
      width: 1.5px;
      height: 1.5px;
      border-radius: 50%;
      box-shadow: ${starsMedium};
      `;
    }

    if (stars3) {
      stars3.style.cssText = `
      width: 2px;
      height: 2px;
      border-radius: 50%;
      box-shadow: ${starsLarge};
      `;
    }
  }

  document.addEventListener('astro:after-swap', initBG);
  initBG();

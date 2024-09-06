(function (global) {
  function createCard(options) {
    const { imageUrl, videoUrl, description, price, containerId } = options;

    // Check if container exists
    const container = containerId ? document.getElementById(containerId) : document.body;

    if (!container) {
      console.warn(`Container with ID "${containerId}" not found. Appending to body.`);
    }

    // Card container
    const card = document.createElement('div');
    card.className = 'kechup-card';
    card.draggable = true; // Make the card draggable

    // Image or Video Element
    if (imageUrl) {
      const img = document.createElement('img');
      img.src = imageUrl;
      img.className = 'kechup-card-image';
      card.appendChild(img);
    } else if (videoUrl) {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.autoplay = true; // Enable autoplay
      video.muted = true; // Mute the video to allow autoplay in modern browsers
      video.loop = true; // Optional: Loop the video for a better user experience
      video.className = 'kechup-card-video';
      card.appendChild(video);
    }

    // Description
    if (description) {
      const desc = document.createElement('p');
      desc.className = 'kechup-card-description';
      desc.innerText = description;
      card.appendChild(desc);
    }

    // Price
    if (price) {
      const priceElement = document.createElement('p');
      priceElement.className = 'kechup-card-price';
      priceElement.innerText = `Price: ${price}`;
      card.appendChild(priceElement);
    }

    // Enable dragging
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', null); // Required for Firefox
      e.target.classList.add('dragging');
    });

    card.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });

    // Swipe horizontally (touch)
    let startX;
    let currentX = 0;
    let isDragging = false;

    card.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      card.style.transition = 'none'; // Disable transition for smooth dragging
    });

    card.addEventListener('touchmove', (e) => {
      if (!isDragging) return;

      const currentTouchX = e.touches[0].clientX;
      const diffX = currentTouchX - startX;
      currentX = diffX;
      card.style.transform = `translateX(${diffX}px)`; // Adjust the horizontal position of the card
    });

    card.addEventListener('touchend', () => {
      isDragging = false;
      card.style.transition = 'transform 0.3s ease'; // Re-enable transition for smooth snap-back
      card.style.transform = 'translateX(0)'; // Reset the position after swipe
    });

    // Swipe horizontally (mouse)
    let startMouseX;

    card.addEventListener('mousedown', (e) => {
      startMouseX = e.clientX;
      isDragging = true;
      card.style.transition = 'none';
    });

    card.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const currentMouseX = e.clientX;
      const diffMouseX = currentMouseX - startMouseX;
      currentX = diffMouseX;
      card.style.transform = `translateX(${diffMouseX}px)`; // Adjust the horizontal position for mouse drag
    });

    card.addEventListener('mouseup', () => {
      isDragging = false;
      card.style.transition = 'transform 0.3s ease';
      card.style.transform = 'translateX(0)'; // Reset the position after dragging
    });

    card.addEventListener('mouseleave', () => {
      if (isDragging) {
        isDragging = false;
        card.style.transition = 'transform 0.3s ease';
        card.style.transform = 'translateX(0)'; // Reset if the mouse leaves while dragging
      }
    });

    // Append card to the specified container or body
    (container || document.body).appendChild(card);
  }

  // Expose to global scope
  global.Ketchup = {
    createCard,
  };
})(window);

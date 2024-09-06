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
      video.muted = true; // Mute the video to allow autoplay in modern browserss
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

    // Swipe vertically
    let startY;
    card.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });

    card.addEventListener('touchmove', (e) => {
      const currentY = e.touches[0].clientY;
      const diffY = currentY - startY;

      // Adjust the vertical position of the card
      card.style.transform = `translateY(${diffY}px)`;
    });

    card.addEventListener('touchend', () => {
      // Reset the position after swipe
      card.style.transform = 'translateY(0)';
    });

    // Append card to the specified container or body
    (container || document.body).appendChild(card);
  }

  // Expose to global scope
  global.Ketchup = {
    createCard,
  };
})(window);

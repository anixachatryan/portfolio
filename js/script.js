var typed = new Typed(".typing", {
    strings:["", "interior designer", "and", "exterior visualizer"],
        typeSpeed:100,
        BackSpeed:65,
        loop:true
})




// Get the modal element
const modal = document.getElementById('myModal');
const aside = document.getElementsByClassName('aside')[0]

// Get the image gallery container
const imageGallery = document.getElementById('imageGallery');

const styleSwitcher = document.getElementsByClassName('style-switcher')[0]
// Get the image element inside the modal
const modalImg = document.getElementById('modalImage');

const images = document.querySelectorAll(".galleryImage");



// Get the close button element
const closeButton = document.getElementsByClassName('close')[0];
let currentImageIndex = 0; // Set the initial current image index to 0

// Function to show the loading indicator
function showLoadingIndicator() {
  const loadingSpinner = document.querySelector(".loading-spinner");
  loadingSpinner.style.display = "block";
}

// Function to hide the loading indicator and show the images
function hideLoadingIndicatorAndShowImages() {
  const loadingSpinner = document.querySelector(".loading-spinner");
  loadingSpinner.style.display = "none";

  // Show the images by setting their display property to "block"
  images.forEach((image) => {
    image.style.display = "block";
  });
}

// Function to lazy load the images using Intersection Observer API
function lazyLoadImage(target) {
  const image = target.querySelector("img[data-src]");
  if (!image) return;

  const imageUrl = image.getAttribute("data-src");
  if (!imageUrl) return;

  // Set the data-src attribute to src attribute to load the image
  image.setAttribute("src", imageUrl);
  image.removeAttribute("data-src");
}

// Function to open the modal and set the current image
function openModal(index) {
  const modal = document.getElementById("myModal");
  const modalImage = document.getElementById("modalImage");

  if (index >= 0 && index < images.length) {
    modal.style.display = "block";
    aside.style.display = "none"
    styleSwitcher.style.display = "none"
    modalImage.src = images[index].src;
    currentImageIndex = index;
  }
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
  aside.style.display = "flex"
  styleSwitcher.style.display = "block"
}

// Function to switch to the previous or next image
function changeImage(offset) {
  currentImageIndex += offset;
  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  } else if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }
  const modalImage = document.getElementById("modalImage");
  modalImage.src = images[currentImageIndex].src;
}

// Additional Function to get the current image index
function getCurrentImageIndex(image) {
  for (let i = 0; i < images.length; i++) {
    if (images[i] === image) {
      return i;
    }
  }
  return -1; // Image not found in the gallery
}

// Add event listeners to each image for opening the modal
images.forEach((image, index) => {
  image.addEventListener("click", () => openModal(index));
});

// Add event listener to close the modal when the close button is clicked
document.querySelector(".close").addEventListener("click", closeModal);

// Add event listener to switch to the previous image when the previous button is clicked
document.querySelector(".prev").addEventListener("click", () => changeImage(-1));

// Add event listener to switch to the next image when the next button is clicked
document.querySelector(".next").addEventListener("click", () => changeImage(1));

// Add event listener to navigate with arrow keys
document.addEventListener("keydown", (event) => {
  if (modal.style.display === "block") {
    switch (event.key) {
      case "ArrowLeft":
        changeImage(-1);
        break;
      case "ArrowRight":
        changeImage(1);
        break;
      case "Escape":
        closeModal();
        break;
      default:
        break;
    }
  }
});

// Wait for the full DOM to load before showing the images
document.addEventListener("DOMContentLoaded", () => {
  // Get all gallery items

  // Set up Intersection Observer to lazy load images
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lazyLoadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  // Observe each lazy image element
  images.forEach((image) => {
    imageObserver.observe(image);
  });

  // Show the loading indicator
  showLoadingIndicator();

  // Hide the loading indicator and show the images once they are fully loaded
  hideLoadingIndicatorAndShowImages();
});

// Close the modal when the user clicks outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});
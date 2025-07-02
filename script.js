
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

function subscribeNewsletter() {
  const email = document.getElementById('newsletter-email').value;
  if (email) {
    alert('Thank you for subscribing to our newsletter!');
    document.getElementById('newsletter-email').value = '';
  } else {
    alert('Please enter a valid email address.');
  }
}

function toggleNewsletter() {
  const newsletterSection = document.getElementById('newsletter-section');
  const toggleButton = document.querySelector('.newsletter-toggle');
  
  if (newsletterSection.classList.contains('collapsed')) {
    newsletterSection.classList.remove('collapsed');
    toggleButton.textContent = '−';
  } else {
    newsletterSection.classList.add('collapsed');
    toggleButton.textContent = '+';
  }
}

function selectService(button, service) {
  // Remove selected class from all buttons
  document.querySelectorAll('.service-button').forEach(btn => {
    btn.classList.remove('selected');
  });
  
  // Add selected class to clicked button
  button.classList.add('selected');
  
  // Update service details
  const details = document.getElementById('service-details');
  const serviceInfo = {
    consulting: 'Our consulting services help organizations identify opportunities and develop strategic plans for sustainable growth.',
    development: 'We provide comprehensive development services from project planning to implementation and evaluation.',
    training: 'Our training programs build capacity within communities and organizations to ensure long-term success.',
    support: 'Ongoing support and maintenance services to ensure your projects continue to deliver value over time.'
  };
  
  details.innerHTML = `<p>${serviceInfo[service]}</p>`;
}

function toggleFAQ(faqId) {
  const faq = document.getElementById(faqId);
  const icon = document.getElementById(faqId + '-icon');
  
  if (faq.style.display === 'none') {
    faq.style.display = 'block';
    icon.textContent = '-';
  } else {
    faq.style.display = 'none';
    icon.textContent = '+';
  }
}

function submitContact(event) {
  event.preventDefault();
  
  // Show thank you message
  document.getElementById('thank-you').style.display = 'block';
  
  // Reset form
  event.target.reset();
  
  // Hide thank you message after 5 seconds
  setTimeout(() => {
    document.getElementById('thank-you').style.display = 'none';
  }, 5000);
}

// Review functionality
let selectedRating = 0;

// Initialize star rating functionality
document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star');
  
  stars.forEach(star => {
    star.addEventListener('click', function() {
      selectedRating = parseInt(this.getAttribute('data-rating'));
      document.getElementById('rating-value').value = selectedRating;
      updateStarDisplay();
    });
    
    star.addEventListener('mouseover', function() {
      const hoverRating = parseInt(this.getAttribute('data-rating'));
      highlightStars(hoverRating);
    });
  });
  
  document.querySelector('.star-rating').addEventListener('mouseleave', function() {
    updateStarDisplay();
  });
});

function highlightStars(rating) {
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

function updateStarDisplay() {
  highlightStars(selectedRating);
}

function submitReview(event) {
  event.preventDefault();
  
  const name = document.getElementById('reviewer-name').value;
  const rating = selectedRating;
  const reviewText = document.getElementById('review-text').value;
  
  if (rating === 0) {
    alert('Please select a rating before submitting your review.');
    return;
  }
  
  // Create star display
  const starDisplay = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  
  // Get current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Create new review element
  const newReview = document.createElement('div');
  newReview.className = 'review';
  newReview.innerHTML = `
    <div class="review-header">
      <strong>${name}</strong>
      <div class="stars">${starDisplay}</div>
    </div>
    <p>"${reviewText}"</p>
    <small>Posted on ${currentDate}</small>
  `;
  
  // Add to top of reviews container
  const reviewsContainer = document.getElementById('reviews-container');
  reviewsContainer.insertBefore(newReview, reviewsContainer.firstChild);
  
  // Reset form
  event.target.reset();
  selectedRating = 0;
  updateStarDisplay();
  
  // Show success message
  alert('Thank you for your review! Your feedback has been submitted.');
  
  // Scroll to the new review
  newReview.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

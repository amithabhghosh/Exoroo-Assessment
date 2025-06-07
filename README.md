# Exoroo-Assessment


Built with React and Tailwind CSS for fast UI development and responsiveness.

Infinite scroll implemented via IntersectionObserver to load posts in batches for performance.

Theme toggle between dark and grey modes, persisted in localStorage, applying global CSS classes with smooth transitions.

Posts displayed as responsive cards, optimized for different screen sizes with image resizing and layout adjustments.

Post creation form supports text and optional image uploads stored as base64 or URLs.

Likes update in real-time using API PUT calls, with UI state syncing.

Additional UI touches include loading skeletons and a back-to-top button for usability.

Backend:

Node.js + Express REST API connected to MongoDB using Mongoose.

Posts schema includes text, username, image, createdAt, and likes.

Pagination implemented using .skip() and .limit() for efficient batch fetching.

Like endpoint increments likes atomically.

Basic validation and error handling ensure data integrity.

Static user info endpoint simulates user profile data for simplicity.

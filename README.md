# Magazine Website

A modern, scalable magazine website built with React, following best practices for structure, performance, and maintainability.

## Features

- Landing page with navigation
- Blog and Vlog showcase with detail pages
- Magazine issues showcase with e-book (flipbook) preview
- About Us and Contact Us pages
- Responsive, reusable components
- Error boundaries for robust error handling
- ESLint and Prettier for code quality

## Project Structure

```
src/
  components/
    Common/
      Navbar/
      Footer/
      ErrorBoundary/
    Magazine/
    Blog/
    Vlog/
    Layout/
  pages/
    Home.jsx
    Blogs.jsx
    BlogDetail.jsx
    Vlogs.jsx
    VlogDetail.jsx
    Magazines.jsx
    MagazinePreview.jsx
    About.jsx
    Contact.jsx
  assets/
  hooks/
  utils/
  App.js
  index.js
  index.css
```

## Development

- Run `npm install` to install dependencies
- Run `npm start` to start the development server
- Code is formatted with Prettier and linted with ESLint

## E-Book Preview

Magazine issues are previewed using a flipbook (powered by `react-pageflip`).

---

Feel free to extend with real data, backend integration, and more advanced features!

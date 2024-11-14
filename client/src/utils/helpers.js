export const convertToUTC = (time) => {
  if (time) {
    const date = new Date(time);
    date.setHours(date.getHours() + 3);
    return date.toISOString().replace("T", " ").slice(0, 19);
  }
  return ''
};

export const slickSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1024,        // For medium screens
      settings: {
        slidesToShow: 3,       // Show 3 slides on medium screens
        slidesToScroll: 1,     // Scroll 1 slide at a time
        infinite: true,        // Infinite scroll
        dots: true,            // Show dots navigation
      }
    },
    {
      breakpoint: 768,         // For smaller screens (tablets and below)
      settings: {
        slidesToShow: 2,       // Show 2 slides on small screens
        slidesToScroll: 1,     // Scroll 1 slide at a time
        initialSlide: 0,       // Initial slide index
        arrows: false,         // Disable arrows on small screens
        dots: true,            // Show dots navigation
      }
    },
    {
      breakpoint: 480,         // For very small screens (mobile)
      settings: {
        slidesToShow: 1,       // Show 1 slide on mobile
        slidesToScroll: 1,     // Scroll 1 slide at a time
        initialSlide: 0,       // Initial slide index
        arrows: false,         // Disable arrows on mobile
        dots: true,            // Show dots navigation
      }
    }
  ]
}; 
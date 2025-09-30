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
  slidesToShow: 5,
  slidesToScroll: 4,
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

export const imageToBase64 = async(img) => {
  const reader = new FileReader()
  reader.readAsDataURL(img);

  const data = await new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error)
  })

  return data;
}

export const getUserInfoFromLocalStorage = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  return userInfo;
}

export const hideUserName = (name) => {
  if (!name) return '';
  const names = name.split(' ');
  if (names.length === 1) {
    return names[0][0] + '*'.repeat(names[0].length - 1);
  } else {
    return names.map(n => n[0] + '*'.repeat(n.length - 1)).join(' ');
  }
}
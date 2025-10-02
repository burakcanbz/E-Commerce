export const convertToUTC = (time) => {
  if (time) {
    const date = new Date(time);
    date.setHours(date.getHours() + 3);
    return date.toISOString().replace("T", " ").slice(0, 19);
  }
  return "";
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
  centerMode: false,
  responsive: [
    {
      breakpoint: 1400, // For large screens
      settings: {
        slidesToShow: 4, // Show 4 slides on large screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        infinite: true, // Infinite scroll
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 1200, // For large screens
      settings: {
        slidesToShow: 3.5, // Show 4 slides on large screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        infinite: true, // Infinite scroll
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 1024, // For medium screens
      settings: {
        slidesToShow: 3, // Show 3 slides on medium screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        infinite: true, // Infinite scroll
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 991, // For medium screens
      settings: {
        slidesToShow: 2.5, // Show 3 slides on medium screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        infinite: true, // Infinite scroll
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 767, // For smaller screens (tablets and below)
      settings: {
        slidesToShow: 2, // Show 2 slides on small screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on small screens
        dots: true, // Show dots navigation
        centerMode: false, // Disable center mode
      },
    },
    {
      breakpoint: 550, // For very small screens (small tablets)
      settings: {
        slidesToShow: 1.75, // Show 1.5 slides on very small screens
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on very small screens
        dots: true, // Show dots navigation
        centerMode: false, // Center the slide
      },
    },
    {
      breakpoint: 480, // For very small screens (mobile)
      settings: {
        slidesToShow: 1.2, // Show 1 slide on mobile
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on mobile
        dots: true, // Show dots navigation
        centerMode: true, // Center the slide
      },
    },
    {
      breakpoint: 425, // For very small screens (mobile)
      settings: {
        slidesToShow: 1, // Show 1 slide on mobile
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on mobile
        dots: true, // Show dots navigation
        centerMode: true, // Center the slide
      },
    },
    {
      breakpoint: 375, // For very small screens (mobile)
      settings: {
        slidesToShow: 0.9, // Show 1 slide on mobile
        slidesToScroll: 1, // Scroll 1 slide at a time
        initialSlide: 0, // Initial slide index
        arrows: false, // Disable arrows on mobile
        dots: true, // Show dots navigation
        centerMode: true, // Center the slide
      },
    },
  ],
};

export const imageToBase64 = async (img) => {
  const reader = new FileReader();
  reader.readAsDataURL(img);

  const data = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

  return data;
};

export const getUserInfoFromLocalStorage = () => {
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  return userInfo;
};

export const hideUserName = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  if (names.length === 1) {
    return names[0][0] + "*".repeat(names[0].length - 1);
  } else {
    return names.map((n) => n[0] + "*".repeat(n.length - 1)).join(" ");
  }
};

export const spacer = () => {
  const length = 18;
  return "\u00A0".repeat(length);
}
$(function () {
  $(".product-grid .cloud").on({
    mouseenter: function () {
      $(".product-grid .cloud img").attr("src", "./images/svg/cloud-white.svg");
    },
    mouseleave: function () {
      $(".product-grid .cloud img").attr("src", "./images/svg/cloud-black.svg");
    },
  });

  // collapse all active buttons
  $(document).on("click", () => {
    const show = document.getElementsByClassName("nav-sub-container");
    const contact = document.getElementById("collapseContact");
    const signIn = document.getElementById("collapseSignIn");
    for (let i = 0; i < show.length; i++) {
      show[i].classList.remove("show");
    }
    contact.classList.remove("show");
    signIn.classList.remove("show");
  });

  // display promo-code-input
  $(".promo-code > .cart-btn").on("click", () => {
    $(".promo-code-input").css("display", "flex");
  });
  // hide promo-code-input
  $(".hide-input").on("click", () => {
    $(".promo-code-input").css("display", "none");
  });
});

document.body.onload = () => {
  var modal = document.getElementById("myModal");

  // Get the image and insert it inside the modal - use its "alt" text as a caption
  var img = document.getElementById("myImg");
  var playId = document.getElementById("play");
  var modalImg = document.getElementById("img01");
  var captionText = document.getElementById("caption");

  img.onclick = function () {
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
  };
  playId.onclick = function () {
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
  };

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
};

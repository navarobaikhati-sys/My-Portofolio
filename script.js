// Mobile fallback for cursor
document.addEventListener('touchstart', function() {
    const cursor = document.querySelector(".magnetic-cursor");
    if (cursor) {
        cursor.style.display = "none";
    }
}, { once: true });

// Reveal on Scroll
function reveal() {
    var reveals = document.querySelectorAll("section");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Magnetic Cursor
const magnetCursor = document.querySelector(".magnetic-cursor");

document.addEventListener("mousemove", e => {
    let x = e.clientX;
    let y = e.clientY;
    magnetCursor.style.left = `${x}px`;
    magnetCursor.style.top = `${y}px`;
});

// Magnetic Effect on Buttons
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("mousemove", (e) => {
        magnetCursor.style.width = "50px";
        magnetCursor.style.height = "50px";
    });

    button.addEventListener("mouseleave", (e) => {
        magnetCursor.style.width = "30px";
        magnetCursor.style.height = "30px";
    });
});

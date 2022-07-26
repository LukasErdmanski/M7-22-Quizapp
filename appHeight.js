// This sets the application height to the height of the device windows innerHeight at the beginning before the html body is build ("solution for the the safari browser in order no y-overflow arises because of the adress ba).
const windowHeight = window.innerHeight;
document.documentElement.style.setProperty('height', `${windowHeight}px`, 'important');
// document.documentElement.style.setProperty('border', `2px solid red`, 'important');

window.addEventListener("resize", function () {
    const windowHeight = window.innerHeight;
    document.documentElement.style.setProperty('height', `${windowHeight}px`, 'important');
}
);